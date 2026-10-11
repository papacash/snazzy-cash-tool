---
doc: spec
status: approved
---

# SnazzyCash — Technical Spec

## How This Works, In Plain Language
This is a one-screen pricing check for small-business owners. The user picks a category like office supplies or subscriptions, fills in the item details, and sees whether the price looks fair compared with a small set of bundled sample prices. The app also asks whether they are a loyal customer or a new customer, because that changes the likely recommendation and the language the owner can use when they ask for a better deal.

The app is intentionally small: no accounts, no database, and no live market scraping. The product is about proving the idea quickly: enter a price, compare it to sample examples, and get a clear win/loss result plus a short next step. That keeps the build tight enough for a demo while preserving the core kernel from the PRD: fairness depends on the purchase relationship and on sample typical prices, not on a generic “expensive” score.

This shape keeps the proof of concept quick to run and easy to record locally. Local use is enough for the demo, with optional hosting later if a shareable link is wanted.

## The Core Journey Through the System
The PRD flow is traced here as a system path:

1. The owner opens the app and sees a single-screen layout with category selection, the intake form, and a summary panel.
2. The app loads a category list and a small sample-price dataset from project files. No server or database is required.
3. The user picks a category. If they switch categories later, the app clears the previous purchase details and result, keeps the new category, and explains that fresh details are needed for the selected category.
4. The intake fields match the purchase: office supplies ask for the total purchase price and number of units; software/subscriptions ask for the price per seat/license, seat/license count, and monthly, quarterly, or yearly billing cadence.
5. The form validates required answers and shows a message if anything is missing instead of pretending to score incomplete data.
6. On valid submit, office-supply totals are divided by units. Recurring prices are converted to a per-seat monthly equivalent (quarterly divided by 3; yearly divided by 12) before comparison to the bundled sample range.
7. The summary panel renders the win/loss result, score, sample comparison basis, and a plain-language talking point. For recurring categories it also states the bill total for the selected cadence.
8. The user can edit the form and resubmit. If the price changes, the app shows old and new prices with their purchase terms alongside the current result.
9. The page stays in one place the whole time, which keeps the demo fast and easy to explain.

## Stack
- Next.js with React and TypeScript
- Custom CSS with variables, not a shadcn-style default kit
- A local JSON data file for bundled sample prices
- No database, no auth, no real-time sync

Rationale:
- Next.js is a good keep for this project: it is familiar enough to be easy to demo, and it is a sensible fit for a single-screen app without unnecessary moving parts.
- A simple custom CSS approach is closer to the PRD's requirement for a vibrant, non-generic look than a default UI kit or shadcn clone.
- Sample prices in a JSON file keep the fairness engine honest while staying lean and easy to edit.
- The tradeoff is that the app is intentionally lightweight; if the project later needs live data, history, or multi-user behavior, that will be a separate phase.

Documentation:
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs/

## Where It Runs and How Someone Tries It
Runtime: local browser app, served by a Next.js dev server.

Environment:
- Node.js 18+ recommended
- npm
- No API keys required
- No deployment requirement for the PoC demo

Run locally:
```bash
npm install
npm run dev
```
Then open:
```text
http://localhost:3000
```

Recording the demo:
- Open the app locally in the browser.
- Fill in a category, sample item, and price.
- Capture the summary with the win/loss comparison and next-step talking point.

Optional deployment:
- If a live URL is wanted later, Cloudflare Pages or another simple static-friendly host is a better fit than a multi-service setup.
- Deployment remains optional and does not replace the required demo video or public GitHub repository.

## Look and Feel
The visual direction is vibrant, inviting, and approachable rather than corporate or bank-brochure. Use a warm cream canvas with crisp, flat coral and violet accents, soft mint for positive feedback, and rounded surfaces with clear hierarchy. Give the SnazzyCash wordmark a high-contrast coral badge so the product identity is easy to spot. Keep enough contrast that the brighter styling remains easy to read. This aligns with the brand direction and the PRD's requirement to avoid the default AI app look.

Implementation direction:
- Warm light neutrals and punchy solid coral, violet, and mint accents; avoid gradient-heavy surfaces
- Large readable labels and short explanatory copy
- Simple but memorable layout, with distinct form and result surfaces, clear contrast, and restrained hover/focus motion
- No shadcn default style; a custom stylesheet with CSS variables is the preferred path

This is consistent with the chosen stack because Next.js can render custom CSS without adding extra dependencies or design-system overhead.

## Components

### CategoryPicker
Lets the user choose a product category before or as they start the interview. It drives which bundled sample-price dataset is used to judge fairness. Switching categories clears the previous purchase details, validation message, and result, then confirms the new category and requests fresh details. Implements `prd.md > Category selection`.

### IntakeForm
Collects vendor, item, relationship (loyalty vs new-customer), and category-specific purchase details. Office supplies use total purchase price and units purchased. Software and subscriptions use per-seat/per-license price, seat/license count, and billing cadence (monthly, quarterly, yearly). It remains visible after submit so the user can update values and re-score. Implements `prd.md > Intake interview` and `prd.md > Update after result`.

### SummaryPanel
Displays the methodology before submission, then after valid input shows the fairness result, score, win/loss state, comparison basis, and relationship-aware next steps. For recurring categories, it also shows per-seat monthly comparison and total bill for the selected cadence. Implements `prd.md > Fairness summary` and `prd.md > Update after result`.

### PriceHistoryStrip
A lightweight way to show the old and new price side by side when the user updates the form. This is a UI helper to satisfy the PRD's requirement that updated prices show both values in context without creating a separate history system. Implements `prd.md > Update after result`.

## Data Model
The app does not require a persistent database in this POC. Data lives in memory while the page is active, and the category sample set is stored as static JSON in the project.

Core state:
```ts
type PurchaseRelationship = 'loyalty' | 'new-customer';

type PurchaseInput = {
  category: string;
  vendor: string;
  item: string;
  price: number;
  quantity: number;
  cadence?: 'monthly' | 'quarterly' | 'yearly';
  relationship: PurchaseRelationship;
};

type FairnessResult = {
  verdict: 'fair' | 'not-fair';
  winLoss: 'win' | 'loss';
  score: number;
  message: string;
  nextSteps: string[];
  sampleRange?: {
    min: number;
    max: number;
  };
};
```

Where each piece lives:
- Category list and sample prices: `src/data/pricing-data.json`
- Sample ranges are explicitly labeled by comparison basis: per unit for office supplies, per seat/license per month for subscriptions and software.
- UI state: component state in the page or a small state container
- Result output: derived from the submitted form values and bundled pricing data. Office supply totals are divided by units; recurring prices are divided by billing-period months before per-seat comparison. Recurring quantity is used to display the total bill for the selected cadence.
- History of old vs new price: ephemeral UI state for the current session only

When the user leaves and returns:
- The app resets to a fresh default state, which matches the PRD's “no persistence” boundary.
- They can start a new comparison immediately without saved history.

## File Structure
```text
project/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── category-picker.tsx
│   │   ├── intake-form.tsx
│   │   ├── price-history-strip.tsx
│   │   └── summary-panel.tsx
│   ├── data/
│   │   └── pricing-data.json
│   ├── lib/
│   │   ├── fairness.ts
│   │   └── formatters.ts
│   └── types/
│       └── pricing.ts
├── devpost/
│   ├── prd.md
│   ├── scope.md
│   ├── spec.md
│   └── spec.html
├── package.json
├── tsconfig.json
├── next.config.js
├── README.md
└── .gitignore
```

## External Services and Dependencies
This project intentionally avoids most external infrastructure.

- Next.js framework: used for the app shell and client-side rendering
  Documentation: https://nextjs.org/docs
- React + TypeScript: used for component structure and typed pricing logic
  Documentation: https://react.dev, https://www.typescriptlang.org/docs/
- No database: avoids setup and complexity beyond the POC
- No auth: avoids login complexity and is aligned with “single-user demo, no account layer”
- Optional hosting later: Cloudflare Pages or another simple deployment target if a public link is wanted

Since the app never sends user-entered pricing to an external service, there are no real API keys, rate limits, or external request contracts for the demo.

## Important Failure Modes
- **Blank or incomplete submit** → the app shows a brief validation message and keeps the methodology copy visible. This prevents fake scoring and matches the PRD.
- **Unknown category or missing sample data** → the app falls back to a neutral explanation instead of crashing or mis-scoring the purchase.
- **The user edits a price after a previous result** → the summary updates with both the old and new values and a current win/loss reading.

## What Was Simplified and Why
- **Bundled sample prices instead of live market pricing** — this keeps the fairness engine grounded in realistic examples while staying within the POC boundary and avoiding scraping or external APIs.
- **No auth or accounts** — the product is about a price check, not a user system; this avoids unnecessary complexity in the first build.
- **No saved history or persistence** — the PRD explicitly says “not in this PoC,” and this keeps the demo short and focused.
- **No complex negotiation workflow** — the app gives a plain-language next step instead of building a larger negotiation engine.

## Decisions and Open Issues
Decisions made:
- The product stays as a single-screen tool, not a multi-page app.
- The fairness system uses bundled sample typical prices rather than live data.
- Relationship-aware logic is part of the score: loyalty vs new-customer changes the interpretation and suggestion.
- Hosting is optional and local dev is the default way to record the demo.
- Styling is custom CSS with a vibrant look, not a shadcn-like default UI kit.
- A JSON file is the correct storage mechanism for sample pricing in this build.

Open issues and clarified items:
- The exact category list can stay small for the PoC, with office supplies and subscriptions as the anchor examples.
- Category-specific pricing inputs are resolved: office supplies compare total price per unit; recurring software/subscriptions compare per-seat monthly equivalents and show the bill total per selected cadence.
- No unresolved technical blocker remains; the design and architecture are consistent with the scope and PRD.

One technical uncertainty clarified during planning:
- Whether a local one-screen app could still be shared later. The chosen local-first design supports the required demo without hosting; optional deployment can be considered separately if a public try-it link is wanted.

## Sharing
- Public GitHub repository: https://github.com/papacash/snazzy-cash-tool
- Demo video: not recorded yet
