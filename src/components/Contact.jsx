import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useT } from '../i18n'
import { Send, CheckCircle2, Loader2, AlertCircle, Info } from 'lucide-react'
import RobotMascot from './RobotMascot'

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY_FORM = { name: '', email: '', message: '' }

/*
  `t` is passed in rather than pulled from a hook: this runs outside the
  component (and is called from the submit handler), and the messages have to
  re-resolve when the visitor switches language mid-form.
*/
function validate(form, t) {
  const errors = {}
  if (!form.name.trim()) errors.name = t('contact.errors.name')
  if (!form.email.trim()) errors.email = t('contact.errors.email')
  else if (!EMAIL_RE.test(form.email.trim()))
    errors.email = t('contact.errors.emailInvalid')
  if (!form.message.trim()) errors.message = t('contact.errors.message')
  return errors
}

/*
  `text-base sm:text-sm` is deliberate, not sloppy: iOS Safari zooms the whole
  page in when a focused input's font-size is under 16px, and it does not zoom
  back out afterwards — the visitor is left on a horizontally-scrolled page
  mid-form. 16px on phones prevents that; the 14px size returns from `sm:` up,
  where no browser does this.
*/
const fieldBase =
  'rounded-xl border bg-[#f7f7f8] px-4 py-3 text-base outline-none transition focus:ring-2 sm:text-sm'
const fieldOk = 'border-black/10 focus:border-brand-500 focus:ring-brand-500/20'
const fieldBad = 'border-red-500 focus:border-red-500 focus:ring-red-500/20'

export default function Contact() {
  const t = useT()
  // 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [showErrors, setShowErrors] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const abortRef = useRef(null)

  const submitting = status === 'submitting'

  const updateField = (key) => (e) => {
    const next = { ...form, [key]: e.target.value }
    setForm(next)
    // Re-validate live only after the first submit attempt, so we never
    // scold someone who is still typing their first character.
    if (showErrors) setErrors(validate(next, t))
    // Editing after a completed attempt returns the button to its idle label.
    if (status === 'success' || status === 'error' || status === 'unconfigured') {
      setStatus('idle')
      setStatusMessage('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    const nextErrors = validate(form, t)
    setErrors(nextErrors)
    setShowErrors(true)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setStatusMessage(t('contact.status.fixFields'))
      return
    }

    // Honesty guard: with no endpoint configured there is nowhere to send
    // this message, so we must never report success.
    if (!CONTACT_ENDPOINT) {
      setStatus('unconfigured')
      setStatusMessage(
        t('contact.status.unconfigured'),
      )
      return
    }

    setStatus('submitting')
    setStatusMessage('')

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const timeout = setTimeout(() => controller.abort(), 15000)

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
        signal: controller.signal,
      })

      if (!res.ok) {
        throw new Error(
          res.status >= 500
            ? t('contact.status.server', { code: res.status })
            : t('contact.status.client', { code: res.status }),
        )
      }

      setStatus('success')
      setStatusMessage(t('contact.status.success'))
      setForm(EMPTY_FORM)
      setErrors({})
      setShowErrors(false)
    } catch (err) {
      setStatus('error')
      setStatusMessage(
        err?.name === 'AbortError'
          ? t('contact.status.timeout')
          : err?.message || t('contact.status.generic'),
      )
    } finally {
      clearTimeout(timeout)
      abortRef.current = null
    }
  }

  const banner =
    status === 'success'
      ? {
          icon: CheckCircle2,
          className: 'border-emerald-600/25 bg-emerald-50 text-emerald-800',
          role: 'status',
        }
      : status === 'unconfigured'
        ? {
            icon: Info,
            className: 'border-amber-600/25 bg-amber-50 text-amber-900',
            role: 'alert',
          }
        : status === 'error'
          ? {
              icon: AlertCircle,
              className: 'border-red-600/25 bg-red-50 text-red-800',
              role: 'alert',
            }
          : null
  const BannerIcon = banner?.icon

  return (
    <section id="contact" className="bg-white py-28 text-ink">
      <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t('contact.title')}</h2>
          <p className="mt-3 max-w-sm text-ink/60">{t('contact.subtitle')}</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="sr-only">
                {t('contact.nameLabel')}
              </label>
              <input
                required
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t('contact.nameLabel')}
                value={form.name}
                onChange={updateField('name')}
                disabled={submitting}
                aria-invalid={showErrors && !!errors.name}
                aria-describedby={showErrors && errors.name ? 'contact-name-error' : undefined}
                className={`${fieldBase} ${showErrors && errors.name ? fieldBad : fieldOk} disabled:opacity-60`}
              />
              {showErrors && errors.name && (
                <p id="contact-name-error" className="px-1 text-xs font-medium text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="sr-only">
                {t('contact.emailLabel')}
              </label>
              <input
                required
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t('contact.emailLabel')}
                value={form.email}
                onChange={updateField('email')}
                disabled={submitting}
                aria-invalid={showErrors && !!errors.email}
                aria-describedby={showErrors && errors.email ? 'contact-email-error' : undefined}
                className={`${fieldBase} ${showErrors && errors.email ? fieldBad : fieldOk} disabled:opacity-60`}
              />
              {showErrors && errors.email && (
                <p id="contact-email-error" className="px-1 text-xs font-medium text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="sr-only">
                {t('contact.messageLabel')}
              </label>
              <textarea
                required
                id="contact-message"
                name="message"
                rows={4}
                placeholder={t('contact.messagePlaceholder')}
                value={form.message}
                onChange={updateField('message')}
                disabled={submitting}
                aria-invalid={showErrors && !!errors.message}
                aria-describedby={
                  showErrors && errors.message ? 'contact-message-error' : undefined
                }
                className={`${fieldBase} resize-none ${showErrors && errors.message ? fieldBad : fieldOk} disabled:opacity-60`}
              />
              {showErrors && errors.message && (
                <p id="contact-message-error" className="px-1 text-xs font-medium text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            <motion.button
              whileHover={submitting ? undefined : { scale: 1.02 }}
              whileTap={submitting ? undefined : { scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-brand-500"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> {t('contact.sending')}
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 size={16} /> {t('contact.sent')}
                </>
              ) : status === 'error' || status === 'unconfigured' ? (
                <>
                  <Send size={16} /> {t('contact.tryAgain')}
                </>
              ) : (
                <>
                  <Send size={16} /> {t('contact.send')}
                </>
              )}
            </motion.button>

            {/* Live region: announces submitting / success / failure to screen readers. */}
            <p className="sr-only" role="status" aria-live="polite">
              {submitting ? t('contact.srSending') : ''}
            </p>

            {banner && statusMessage && (
              <div
                role={banner.role}
                aria-live={banner.role === 'alert' ? 'assertive' : 'polite'}
                className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-sm ${banner.className}`}
              >
                <BannerIcon size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {statusMessage}
                  {status === 'unconfigured' && import.meta.env.DEV && (
                    <span className="mt-1 block text-xs opacity-80">
                      Developer note: set <code className="font-mono">VITE_CONTACT_ENDPOINT</code>{' '}
                      to the URL that should receive this form.
                    </span>
                  )}
                </span>
              </div>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl bg-[#f7f7f8] p-6"
        >
          <RobotMascot />
        </motion.div>
      </div>
    </section>
  )
}
