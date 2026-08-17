/*
  ============================================================================
  PRICING DATA SOURCE
  ----------------------------------------------------------------------------
  Plans are fetched from the backend rather than typed into the locale files.
  The same `PricingPackage` rows drive the plan picker in app.aylo.uz and the
  amount Payme actually charges, so a price hardcoded in this repo is a price
  that can silently disagree with what a customer is billed. It already had:
  this page advertised four tiers starting at 199,000 while the backend held
  three starting at 299,000.

  `GET /api/v1/payment/pricing-packages/` is public (the view drops to
  `AllowAny` for GET) and returns a plain JSON array of the active packages —
  no pagination envelope. Ordering is `-created_time`, i.e. arbitrary for
  display, so the page sorts by price itself.

  Only safelisted request headers are used (`Accept-Language`), so the browser
  issues no CORS preflight; the API's allow-list does not include custom
  headers. No credentials are sent — this is public data.
  ============================================================================
*/

// Overridable so a local/staging build can point somewhere else. Unlike
// VITE_CONTACT_ENDPOINT this has a real default: the endpoint is public and
// identical for every deploy, and an unset variable must not mean "no prices".
const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'https://api.aylo.uz').replace(/\/+$/, '')

export const PRICING_ENDPOINT = `${API_BASE}/api/v1/payment/pricing-packages/`

function toNumber(value) {
  // DRF serialises DecimalField as a string ("299000.00").
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

/*
  Backend snake_case → the shape this page renders. Field names mirror
  `PricingPlan` in the app repo (src/lib/subscription-data.ts) so the two
  front-ends describe the same row the same way.
*/
function mapPlan(raw) {
  const price = toNumber(raw.price)
  const discount = raw.discount_price == null ? null : toNumber(raw.discount_price)

  return {
    id: raw.id,
    name: raw.name ?? '',
    description: raw.description ?? '',
    price,
    // A promo price only counts when it is genuinely below the list price —
    // otherwise the card would strike through a number that isn't a saving.
    discountPrice: discount != null && discount < price ? discount : null,
    currency: (raw.currency ?? 'uzs').toLowerCase(),
    requestCount: toNumber(raw.request_count),
    durationDays: toNumber(raw.duration_days) || 30,
    isPopular: Boolean(raw.is_popular),
    /*
      The "for companies" tier: sales agrees the price per customer, so the
      row carries `price: 0` and `request_count: 0` with `type: "custom"`.
      Without this flag such a package is indistinguishable from the free tier
      by price alone, and the card would advertise a negotiated enterprise plan
      as free. Absent on older API builds — `undefined` is correctly falsy.
    */
    isCustom: Boolean(raw.is_custom ?? raw.type === 'custom'),
    features: Array.isArray(raw.features)
      ? raw.features.filter((f) => f && f.name).map((f) => ({ id: f.id, name: f.name }))
      : [],
  }
}

/** What the customer is actually charged — the promo price when there is one. */
export function effectivePrice(plan) {
  return plan.discountPrice ?? plan.price
}

/**
 * Free means "costs nothing", not merely "has no price on the row". A custom
 * tier also stores 0, so it must be excluded before reading the number.
 */
export function isFreePlan(plan) {
  return !plan.isCustom && effectivePrice(plan) === 0
}

/**
 * Fetch the active plans, cheapest first.
 *
 * `lang` is passed as `Accept-Language`; the backend runs modeltranslation on
 * `name`/`description` and on feature names, so translated rows come back in
 * the visitor's language once they exist in the database. Until then every
 * language gets the Uzbek source text, which is the documented fallback.
 *
 * Throws on network failure, timeout, a non-2xx status, or a payload that
 * isn't an array — the caller renders an error state rather than a price it
 * cannot vouch for.
 */
export async function fetchPricingPlans(lang, signal) {
  const response = await fetch(PRICING_ENDPOINT, {
    method: 'GET',
    headers: { Accept: 'application/json', 'Accept-Language': lang },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Pricing request failed with ${response.status}`)
  }

  const data = await response.json()
  if (!Array.isArray(data)) {
    throw new Error('Pricing response was not a list')
  }

  /*
    Cheapest first, but a custom tier sorts last however small its stored
    price is: it is the top of the ladder, and its `0` means "ask us", not
    "free". Sorting it by number would drop it beside the free plan.
  */
  return data
    .map(mapPlan)
    .sort(
      (a, b) =>
        Number(a.isCustom) - Number(b.isCustom) ||
        effectivePrice(a) - effectivePrice(b) ||
        a.requestCount - b.requestCount,
    )
}
