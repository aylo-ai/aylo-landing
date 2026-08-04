import { useCallback, useEffect, useRef, useState } from 'react'
import './NeonFaceHero.css'

// ───────────────────────────────────────────────────────────────────────────
// Tunable design tokens — change these to restyle or retime the scene
// without touching the tracking/tilt math below. Ratios (not fixed px) are
// used wherever a value needs to stay proportional to the phone's own size.
// ───────────────────────────────────────────────────────────────────────────
const ACCENT = '#4fd8ff' // eyes/brows/mouth glow color. Try '#7b5cff' (purple) or '#4f8bff' (blue).
const EYE_MAX_OFFSET_RATIO = 0.035 // pupil travel range (fraction of phone width) — smaller than the tilt, so it reads as its own layer of motion
const BROW_MAX_DEG = 4 // max eyebrow tilt while tracking
const BROW_MAX_LIFT_RATIO = 0.015 // max eyebrow vertical shift while tracking (fraction of phone width)
const TRACK_RADIUS = 420 // px from phone center at which eye offset reaches its max
const TRACK_EASE = 0.14 // lerp factor per frame for eye/brow tracking (0-1: lower = laggier)
const TILT_MAX_DEG = 32 // max whole-phone rotateX/rotateY on desktop
const TILT_MAX_DEG_MOBILE = 16 // max tilt on narrow screens — subtler on small glass
const TILT_EASE = 0.08 // lerp factor per frame for the parallax tilt
const BREATH_AMPLITUDE = 5 // px the phone bobs up/down
const BREATH_PERIOD = 4200 // ms per breathing cycle
const BLINK_MIN_DELAY = 2600 // ms, idle blink interval range
const BLINK_MAX_DELAY = 6000
const BLINK_DURATION = 140 // ms
const EXPRESSION_HOLD = 700 // ms an expression holds before easing back to neutral
const IDLE_TIMEOUT = 2500 // ms with no pointer/orientation input before the scene drives itself
const IDLE_EYE_SWEEP_RADIUS = 260 // px, radius of the autonomous eye look-around sweep
const IDLE_TILT_DEG = 6 // degrees, amplitude of the autonomous tilt sweep
const IDLE_SWEEP_PERIOD = 5200 // ms per autonomous sweep cycle
const SHADOW_MAX_SHIFT_RATIO = 1.1 // px of ground-shadow shift per degree of tilt
const DEVICE_TILT_RANGE_DEG = 20 // raw beta/gamma range (degrees) mapped to full tilt

// Five vertical offsets (in "pixel units") for the mouth's pixel row, per expression.
const MOUTH_SHAPES = {
  neutral: [0, 0, 0, 0, 0],
  happy: [-2, -0.6, 0, -0.6, -2], // ends lift up → a soft ⌣ smile curl
  surprised: [0, 1, 1.6, 1, 0], // center drops → mouth falls open
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const lerp = (from, to, t) => from + (to - from) * t

function hexToRgbTriplet(hex) {
  const [r, g, b] = hex.replace('#', '').match(/.{2}/g).map((h) => parseInt(h, 16))
  return `${r}, ${g}, ${b}`
}

export default function NeonFaceHero() {
  const wrapRef = useRef(null) // static, untransformed — the only element we measure
  const phoneRef = useRef(null) // gets the live rotateX/rotateY/translateY each frame
  const shadowRef = useRef(null)
  const eyeLRef = useRef(null)
  const eyeRRef = useRef(null)
  const pupilLRef = useRef(null)
  const pupilRRef = useRef(null)
  const browLRef = useRef(null)
  const browRRef = useRef(null)

  const [expression, setExpression] = useState('neutral')
  const expressionTimeout = useRef(null)

  // Live input lives in refs, not React state: listeners only record where
  // the input currently is, they never touch the DOM. The rAF loop below is
  // the sole reader of these refs and the sole writer of styles, so input
  // never triggers a re-render or fights the browser's layout pass.
  const pointerRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const lastPointerAt = useRef(-Infinity)
  const orientationRef = useRef({ beta: 0, gamma: 0 })
  const lastOrientationAt = useRef(-Infinity)

  useEffect(() => {
    const onPointerMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY }
      lastPointerAt.current = performance.now()
    }
    // Pointer Events unify mouse, touch and pen, so drag-tracking on
    // touchscreens (and tilt-by-dragging) falls out of this one listener.
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerMove, { passive: true })

    // Best-effort device-tilt input for phones/tablets that expose it. iOS
    // requires a permission prompt behind a tap to enable this, so on iOS
    // it simply stays silent and the idle/pointer paths cover it instead.
    const onOrientation = (event) => {
      if (event.beta == null || event.gamma == null) return
      orientationRef.current = { beta: event.beta, gamma: event.gamma }
      lastOrientationAt.current = performance.now()
    }
    window.addEventListener('deviceorientation', onOrientation, { passive: true })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Respect the OS setting: land on a static neutral pose and skip the
      // continuous rAF loop (tilt, tracking, breathing, gloss) entirely.
      return () => {
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerdown', onPointerMove)
        window.removeEventListener('deviceorientation', onOrientation)
      }
    }

    // Measured once, then only on resize/scroll — never inside the loop —
    // and always from the untransformed wrapper, never from the rotating
    // phone itself (measuring a live 3D-transformed element would feed its
    // own projected position back into the next frame's math and drift).
    let wrapRect = wrapRef.current.getBoundingClientRect()
    let remeasureScheduled = false
    const remeasure = () => {
      if (remeasureScheduled) return
      remeasureScheduled = true
      requestAnimationFrame(() => {
        wrapRect = wrapRef.current.getBoundingClientRect()
        remeasureScheduled = false
      })
    }
    window.addEventListener('resize', remeasure)
    window.addEventListener('scroll', remeasure, { passive: true })

    let eyeX = 0
    let eyeY = 0
    let browTilt = 0
    let browLift = 0
    let tiltX = 0
    let tiltY = 0
    let rafId

    const loop = (now) => {
      const maxTilt = window.innerWidth < 640 ? TILT_MAX_DEG_MOBILE : TILT_MAX_DEG
      const centerX = wrapRect.left + wrapRect.width / 2
      const centerY = wrapRect.top + wrapRect.height / 2

      const orientationFresh = now - lastOrientationAt.current < IDLE_TIMEOUT
      const pointerFresh = now - lastPointerAt.current < IDLE_TIMEOUT

      // ── Pick one input source for this frame, in priority order ──
      let targetTiltX
      let targetTiltY
      let targetPointerX
      let targetPointerY

      if (orientationFresh) {
        const normX = clamp(orientationRef.current.gamma / DEVICE_TILT_RANGE_DEG, -1, 1)
        const normY = clamp(orientationRef.current.beta / DEVICE_TILT_RANGE_DEG, -1, 1)
        targetTiltY = normX * maxTilt
        targetTiltX = -normY * maxTilt
        targetPointerX = centerX + normX * TRACK_RADIUS
        targetPointerY = centerY + normY * TRACK_RADIUS
      } else if (pointerFresh) {
        // Map cursor position, normalized to the viewport center, onto tilt
        // degrees: rotateY follows horizontal offset, rotateX follows
        // vertical offset (inverted, so moving the cursor up tilts the top
        // of the phone toward the viewer).
        const normX = (pointerRef.current.x / window.innerWidth) * 2 - 1 // -1..1
        const normY = (pointerRef.current.y / window.innerHeight) * 2 - 1
        targetTiltY = normX * maxTilt
        targetTiltX = -normY * maxTilt
        targetPointerX = pointerRef.current.x
        targetPointerY = pointerRef.current.y
      } else {
        // No live input: sweep both the tilt and the eyes slowly so the
        // scene stays alive instead of freezing in a static neutral pose.
        const t = (now / IDLE_SWEEP_PERIOD) * Math.PI * 2
        targetTiltY = Math.sin(t) * Math.min(IDLE_TILT_DEG, maxTilt)
        targetTiltX = Math.sin(t * 0.7) * Math.min(IDLE_TILT_DEG, maxTilt) * 0.6
        targetPointerX = centerX + Math.cos(t) * IDLE_EYE_SWEEP_RADIUS
        targetPointerY = centerY + Math.sin(t * 0.6) * IDLE_EYE_SWEEP_RADIUS * 0.4
      }

      // ── Eye angle + magnitude from the phone's center to the target ──
      // atan2(dy, dx) gives the direction to look regardless of distance.
      // Capping the *magnitude* (not the angle) means a far-off target
      // still points the eyes the right way — it just can't drag the
      // pupils past the edge of their socket.
      const dx = targetPointerX - centerX
      const dy = targetPointerY - centerY
      const angle = Math.atan2(dy, dx)
      const distance = Math.hypot(dx, dy)
      const magnitude = clamp(distance / TRACK_RADIUS, 0, 1)

      const eyeMaxOffset = wrapRect.width * EYE_MAX_OFFSET_RATIO
      const browMaxLift = wrapRect.width * BROW_MAX_LIFT_RATIO

      const targetEyeX = Math.cos(angle) * eyeMaxOffset * magnitude
      const targetEyeY = Math.sin(angle) * eyeMaxOffset * magnitude
      const targetBrowTilt = Math.cos(angle) * BROW_MAX_DEG * magnitude
      const targetBrowLift = Math.sin(angle) * browMaxLift * magnitude

      // ── Easing: linear interpolation toward the target, every frame ──
      // Moving a fixed *fraction* of the remaining distance each frame (vs.
      // a fixed speed) gives the classic "settles in smoothly, slows as it
      // arrives" feel without any timers or velocity bookkeeping. The same
      // formula drives the eyes, the brows and the whole-phone tilt below —
      // just at different ease factors, so the tilt (slower) reads as the
      // rigid object and the eyes (faster) read as an independent layer.
      eyeX = lerp(eyeX, targetEyeX, TRACK_EASE)
      eyeY = lerp(eyeY, targetEyeY, TRACK_EASE)
      browTilt = lerp(browTilt, targetBrowTilt, TRACK_EASE)
      browLift = lerp(browLift, targetBrowLift, TRACK_EASE)
      tiltX = lerp(tiltX, targetTiltX, TILT_EASE)
      tiltY = lerp(tiltY, targetTiltY, TILT_EASE)

      pupilLRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`
      pupilRRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`
      browLRef.current.style.transform = `rotate(${-browTilt}deg) translateY(${browLift}px)`
      browRRef.current.style.transform = `rotate(${browTilt}deg) translateY(${browLift}px)`

      // ── The phone tilts as one rigid object ──
      const breath = Math.sin((now / BREATH_PERIOD) * Math.PI * 2) * BREATH_AMPLITUDE
      phoneRef.current.style.transform = `translateY(${breath}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
      // Exposed as custom properties (not just baked into one transform) so
      // the bezel gradient and gloss streak in the stylesheet can react to
      // the *current* light angle — this is what sells the tilt as a real
      // material catching light, not a flat card rotating in place.
      phoneRef.current.style.setProperty('--tilt-x', tiltX.toFixed(2))
      phoneRef.current.style.setProperty('--tilt-y', tiltY.toFixed(2))

      // Ground shadow shifts opposite the tilt direction, so the phone
      // visually lifts off the page as it rotates toward the viewer.
      const shadowShift = -tiltY * SHADOW_MAX_SHIFT_RATIO
      shadowRef.current.style.transform = `translateX(calc(-50% + ${shadowShift}px))`
      shadowRef.current.style.opacity = String(clamp(0.55 - (Math.abs(tiltX) + Math.abs(tiltY)) / 120, 0.3, 0.55))

      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerMove)
      window.removeEventListener('deviceorientation', onOrientation)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('scroll', remeasure)
    }
  }, [])

  // Idle blink: an independent timer loop that reschedules itself with a new
  // random delay after every blink, unrelated to the tracking rAF above.
  useEffect(() => {
    let timeoutId
    const scheduleBlink = () => {
      const delay = BLINK_MIN_DELAY + Math.random() * (BLINK_MAX_DELAY - BLINK_MIN_DELAY)
      timeoutId = setTimeout(() => {
        eyeLRef.current?.classList.add('is-blinking')
        eyeRRef.current?.classList.add('is-blinking')
        setTimeout(() => {
          eyeLRef.current?.classList.remove('is-blinking')
          eyeRRef.current?.classList.remove('is-blinking')
        }, BLINK_DURATION)
        scheduleBlink()
      }, delay)
    }
    scheduleBlink()
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => () => clearTimeout(expressionTimeout.current), [])

  const triggerExpression = useCallback((next) => {
    clearTimeout(expressionTimeout.current)
    setExpression(next)
    expressionTimeout.current = setTimeout(() => setExpression('neutral'), EXPRESSION_HOLD)
  }, [])

  return (
    <section
      className="relative bg-ink pb-0 pt-32 sm:pt-40"
      style={{ '--accent': ACCENT, '--accent-rgb': hexToRgbTriplet(ACCENT) }}
    >
      <div className="section-container flex justify-center">
        <div className="nfh-stage">
          {/* wrapRef: the static anchor we measure. Never transformed, so
              its rect never drifts as the phone inside it rotates. */}
          <div ref={wrapRef} className="nfh-phone-wrap">
            <span ref={shadowRef} className="nfh-shadow" />

            <div
              ref={phoneRef}
              className="nfh-phone"
              onPointerEnter={() => triggerExpression('surprised')}
              onClick={() => triggerExpression('happy')}
            >
              {/* Back panel: slightly larger, sits behind on the Z axis —
                  peeks out at the edges as the phone tilts, selling thickness. */}
              <div className="nfh-back" />

              {/* Front bezel: the metal/glass casing. Its gradient reads
                  --tilt-x/--tilt-y (written every frame in JS) to fake the
                  edge catching more or less light as the angle changes. */}
              <div className="nfh-front">
                {/* Screen: sits forward of the bezel on the Z axis, with an
                    inset shadow so the display area still reads as recessed
                    glass rather than a flat sticker. */}
                <div className="nfh-screen">
                  <span className="nfh-scanlines" />
                  <span className="nfh-island" />

                  <div className={`nfh-face nfh-face--${expression}`}>
                    <div className="nfh-brows">
                      <span className="nfh-brow-wrap">
                        <span ref={browLRef} className="nfh-brow" />
                      </span>
                      <span className="nfh-brow-wrap">
                        <span ref={browRRef} className="nfh-brow" />
                      </span>
                    </div>
                    <div className="nfh-eyes">
                      <div ref={eyeLRef} className="nfh-eye">
                        <span ref={pupilLRef} className="nfh-pupil" />
                      </div>
                      <div ref={eyeRRef} className="nfh-eye">
                        <span ref={pupilRRef} className="nfh-pupil" />
                      </div>
                    </div>
                    <div className="nfh-mouth">
                      {MOUTH_SHAPES[expression].map((offset, i) => (
                        <span key={i} className="nfh-mouth-pixel" style={{ '--offset': offset }} />
                      ))}
                    </div>
                  </div>

                  {/* Glass reflection streak, layered on top of the face.
                      Its own transform reads --tilt-x/--tilt-y so the
                      highlight visibly slides as the light angle changes —
                      the single biggest cue that sells this as 3D glass. */}
                  <span className="nfh-gloss" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
