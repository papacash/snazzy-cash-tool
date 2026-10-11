---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. The user can enter a purchase and get a clear fairness result**
  Becomes usable: A live one-screen app where the user chooses a category, fills in vendor/item/price/quantity/relationship, submits, and sees a win/loss fairness result with a short talking point.
  Why now: This is the unique kernel and the highest-risk behavior. If it works here, the rest of the app is a polish and refinement layer.
  PRD ref: `prd.md > Category selection`, `prd.md > Intake interview`, `prd.md > Fairness summary`, `prd.md > The Core Journey`
  Spec ref: `spec.md > Components`, `spec.md > Data Model`, `spec.md > File Structure`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Scaffolded the Next.js project, added custom styles and one-screen layout, created the form and category data, computed a fairness verdict from bundled sample prices, and rendered the summary and next steps.
  Verify (mechanical): `npm run build` succeeded, and the app was started with `npm run dev` and verified in the browser at `http://localhost:3000`.
  Learner check: Opened the app, entered a real value, and confirmed the result was understandable and aligned with the intended flow.
  Commit: `Build fairness checker UI and pricing logic`

- [x] **2. The app handles updates and incomplete input cleanly**
  Becomes usable: Editing a price after a result shows both old and new values, and blank submissions show a validation message instead of a fake score.
  Why now: The PRD requires a strong update behavior and a required validation state, and these are direct user-facing correctness checks.
  PRD ref: `prd.md > Update after result`, `prd.md > Blank submit`, `prd.md > The Core Journey`
  Spec ref: `spec.md > Data Model`, `spec.md > Important Failure Modes`
  Build: Added validation messaging for incomplete input, preserved a prior price for comparison, updated the summary on resubmission, and kept the form visible while editing.
  Verify (mechanical): Submitted blank data to confirm the warning appears, then tested a successful re-submit and verified the summary updated with the comparison.
  Learner check: Submitted incomplete data, then updated a price after a result and confirmed the app still felt clear and correct.
  Commit: `Add validation and price-update comparison`

- [x] **3. The app is demo-ready and polished for the first pass**
  Becomes usable: The app matches the planned visual direction, is easy to run locally, and is ready to record in a short demo.
  Why now: The proof of concept is complete once the core journey is stable and presentable.
  PRD ref: `prd.md > Look and Feel`, `prd.md > What "Working" Looks Like`, `prd.md > The Core Journey`
  Spec ref: `spec.md > Look and Feel`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Tightened the styling, confirmed the single-screen layout, and refined the app for demo presentation.
  Verify (mechanical): Started the app fresh and confirmed the happy path succeeded from open to result to update in a local browser session.
  Learner check: Launching the app and testing the full flow from open to result to update felt good and was ready for demo capture.
  Commit: `Polish demo-ready pricing tool`

## Hands-on Checkpoints

- [x] Early usable behavior explored — app shell and fairness result tested in the browser
- [x] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Final review complete — category-specific price and billing-cadence flows were verified; visual feedback was applied, reviewed, and approved.

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: The app was built in a local Next.js project; `npm run build` succeeded, then `npm run dev` served the app at `http://localhost:3000`. Browser checks confirmed a yearly subscription at $240/seat/year normalizes to $20/seat/month and displays a $1,200 annual bill for five seats; changing it to $90/seat/quarter displays $30/seat/month and the old/new billing terms.
Route and stops: `src/app/page.tsx` for the form and fairness logic; `src/data/pricing-data.json` for bundled category pricing; `src/app/globals.css` for styling; `devpost/app-map.html` as the route summary.
Edit outcome: The requested category-specific pricing workflow was implemented and passed build plus browser checks. Vendor placeholders now switch to Salesforce for subscriptions, Google for software, and Office Depot for office supplies. The flatter warm palette with sharp coral/violet accents and a high-contrast SnazzyCash brand badge was reviewed and approved.
Reflection: The key reusable practice is defining one observable acceptance criterion and tracing the exact code path that creates it; in this case, the success condition was “a valid input produces a clear win/loss result.”
Activity mode: live app and editor

## Revisions

- The app logic and UI were adjusted to preserve the original PRD and spec: validation stays visible instead of faking a result, and price updates show the prior and current values in the same summary.
- Switching categories now clears the previous form values and result while preserving the selected category, and a status message confirms the switch; this prevents stale purchase details or results from being mistaken for the new category's comparison.
- Intake now follows purchase conventions: office supplies compare total price per unit, while software/subscriptions ask for per-seat/license price, seat/license quantity, and monthly/quarterly/yearly cadence. Recurring prices are normalized to a monthly per-seat comparison and show the total bill for the chosen period.
- Vendor examples now change with the selected category (Office Depot for office supplies, Salesforce for subscriptions, Google for software), avoiding an irrelevant office-supply example in recurring-purchase flows.
- The styling now uses a warm cream base with coral/orange and violet accents, mint success cues, distinct rounded surfaces, and visible keyboard focus, preserving custom CSS while making the interface more vibrant and inviting.
- After visual review feedback, gradients were reduced to solid warm, coral, violet, and mint color blocks, and the SnazzyCash wordmark was emphasized with a high-contrast brand badge.
