# SnazzyCash

SnazzyCash is a one-screen proof of concept for small-business owners to compare a purchase price with bundled sample prices and see a plain-language next step. The sample prices are illustrative data, not live market pricing.

## Run locally

Requirements: Node.js 18.17 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To create a production build:

```bash
npm run build
npm start
```

## How the comparison works

- **Office supplies:** Enter the total purchase price and number of units. SnazzyCash compares the resulting per-unit price with the bundled sample range.
- **Software and subscriptions:** Enter the price per seat or license, the number of seats/licenses, and monthly, quarterly, or yearly billing cadence. SnazzyCash converts the price to a monthly per-seat amount for comparison and shows the total bill for the selected cadence.
- Loyalty vs. new-customer status affects the score and suggested talking point.

Changing categories clears the current purchase details and result so a price is not carried across different sample sets.

## Project files

- `src/app/page.tsx` — form, category behavior, comparison, and result
- `src/data/pricing-data.json` — categories and illustrative comparison ranges
- `src/app/globals.css` — custom visual styling
- `devpost/` — product scope, requirements, technical spec, build checklist, and app map

There is no database, account system, external pricing API, or saved history in this proof of concept.
