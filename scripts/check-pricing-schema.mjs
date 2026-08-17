#!/usr/bin/env node
/*
  Guards the one place backend prices are still copied by hand.

  The pricing *section* fetches plans at runtime, so it cannot drift. The
  schema.org `Offer`s in index.html can: crawlers read the served HTML and
  never run the fetch, so those numbers are a manual snapshot. This script
  fetches the live packages and diffs them against that snapshot.

    node scripts/check-pricing-schema.mjs          # against api.aylo.uz
    API_BASE=http://localhost:8000 node scripts/check-pricing-schema.mjs

  Exit codes: 0 in sync, 1 drifted, 2 the API could not be reached (a network
  problem is not a reason to fail a build, so this is reported separately).
*/

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const API_BASE = (process.env.API_BASE || 'https://api.aylo.uz').replace(/\/+$/, '')
const ENDPOINT = `${API_BASE}/api/v1/payment/pricing-packages/`

function fail(message) {
  console.error(`✗ ${message}`)
  process.exitCode = 1
}

const html = await readFile(join(ROOT, 'index.html'), 'utf8')
const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
if (!block) {
  fail('no application/ld+json block found in index.html')
  process.exit(1)
}

const graph = JSON.parse(block[1])['@graph']
const aggregate = graph.find((node) => node.offers)?.offers
if (!aggregate) {
  fail('the ld+json graph has no offers')
  process.exit(1)
}

let live
try {
  const response = await fetch(ENDPOINT, { headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  live = await response.json()
} catch (error) {
  console.error(`! could not reach ${ENDPOINT}: ${error.message}`)
  console.error('  Skipping the comparison — this is not a schema failure.')
  process.exit(2)
}

// What the customer is charged: the promo price when one is set.
const charged = (p) => Number(p.discount_price ?? p.price)
const expected = live
  .map((p) => ({ name: p.name, price: charged(p) }))
  .sort((a, b) => a.price - b.price)

const published = (aggregate.offers ?? [])
  .map((o) => ({ name: o.name, price: Number(o.price) }))
  .sort((a, b) => a.price - b.price)

const asLine = (list) => list.map((p) => `${p.name}=${p.price}`).join(', ')

if (asLine(expected) !== asLine(published)) {
  fail('index.html ld+json offers no longer match the backend')
  console.error(`  backend:  ${asLine(expected)}`)
  console.error(`  index.html: ${asLine(published)}`)
}

const bounds = [
  ['offerCount', String(expected.length), String(aggregate.offerCount)],
  ['lowPrice', String(Math.min(...expected.map((p) => p.price))), String(aggregate.lowPrice)],
  ['highPrice', String(Math.max(...expected.map((p) => p.price))), String(aggregate.highPrice)],
]
for (const [field, want, got] of bounds) {
  if (want !== got) fail(`AggregateOffer.${field} is "${got}", backend says "${want}"`)
}

if (!process.exitCode) {
  console.log(`✓ ld+json offers match ${ENDPOINT} (${asLine(expected)})`)
}
