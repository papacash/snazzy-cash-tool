---
doc: prd
status: approved
---

# SnazzyCash — Product Requirements

A one-screen tool for small-business owners to check whether a vendor price is fair and get a win/loss result plus next steps.
Source: `scope.md > The Core Loop`, `scope.md > The Unique Kernel`, `scope.md > What "Working" Looks Like`.

## The Core Journey

1. A small-business owner opens SnazzyCash and sees one screen: a category picker, an intake interview, and a summary area.
2. Before they enter anything, the summary area explains how scoring works (sample typical prices, plus loyalty vs new-customer).
3. They pick a category (for example office supplies or subscriptions).
4. A short interview asks about the item whose price has risen: vendor, what they pay, loyalty vs new-customer, quantity, and the item itself.
5. They submit. If required fields are blank, a message says information is needed to validate the price; the methodology explanation stays until a valid submit.
6. On a valid submit, the summary appears **next to** the interview: whether the price is fair against the examples, a **win** (fair) or **loss** (a better sample price is available), a score, and next-step talking points shaped by loyalty vs new-customer.
7. Intake fields stay visible. They can update and submit again. When a price is updated, the summary shows **both the old and the new** price along with the new win/loss.
8. Success for the demo: in about a minute, they go from category → interview → a clear win or loss they can explain.

## Screens and Layout

**One screen.** No other pages.

Arrangement:

- **Category** — first control; choosing it starts the interview for that kind of purchase.
- **Intake** — short interview fields on the same screen.
- **Summary** — beside the interview (not a new page, not replacing the form). Empty: methodology. After submit: score, win/loss, next steps. After a price update: old price and new price together.

## Look and Feel

Vibrant and exciting, inviting rather than bank-brochure. Colors can stay warm and approachable; they do not have to be a fixed brand palette. **Do not use shadcn** (or a look that reads as the default AI-app UI kit). Keep it simple and snazzy, in line with the SnazzyCash brand direction in `scope.md > Inspiration & Identity`.

## Features and Behavior

### Category selection
Source: this interview; kernel still `scope.md > The Unique Kernel`.

The first action is choosing a category such as office supplies or subscriptions. The category sets which sample typical prices the fairness check will use.

- A stranger can see a small list of categories and pick one before (or as) the interview begins.
- Changing categories clears the previous purchase details and result, keeps the newly selected category, and tells the owner to enter details for that category. This avoids carrying inputs or a score across different sample-price sets.

### Intake interview
Source: `scope.md > The Core Loop`; this interview.

After a category, the owner answers a short interview about the item they feel has risen in price. All categories collect **item**, **vendor**, **price**, **quantity**, and **loyalty vs new-customer**. Fields stay on screen after submit so they can correct or update.

- Submitting with the required answers produces a summary without leaving the screen.
- Office supplies collect the total purchase price and number of units; fairness compares the per-unit amount.
- Software and subscriptions collect price per seat/license, number of seats/licenses, and billing cadence (monthly, quarterly, or yearly). The app compares the per-seat monthly equivalent so billing periods are comparable, and also shows the total bill for the selected period.

### Fairness summary
Source: `scope.md > The Unique Kernel`, `scope.md > What "Working" Looks Like`.

The summary judges fairness **against bundled sample typical prices** for that category/item kind — not live market data. It states that the pricing **is or isn’t fair** based on those examples. The visual is a **win** (fair price) or a **loss** (a better price is available in the samples). It includes a **score** and **next steps** in plain language. Loyalty vs new-customer helps score the situation and the talking point (loyalty discount vs new-customer special). The owner should be able to see how/why.

- Looking at the summary is enough to tell win vs loss, that it used the examples, and what to say next.

### Update after result
Intake remains editable. If they change the price (or other answers) and submit again, the summary updates. **When a price is updated, show both the old and the new price.**

- After an update, old and new prices are both visible in the summary, with a current win/loss.

## States and Boundaries

- **First open / nothing entered** — summary shows a clear explanation of the scoring methodology so they understand the process before they start.
- **Blank submit** — a message that information is needed to properly help with pricing validation. Do not pretend to score an incomplete interview.
- **Valid result** — summary beside the interview: fair/not, win/loss visual, score, next steps.
- **Price updated** — summary shows old price and new price, plus the new result.
- **Persistence** — not in this PoC. Closing and returning can start fresh (history is later per scope).
- **Assumption** — a small starter set of categories (including office supplies and subscriptions) and a handful of sample typical prices per category are bundled in the app. Quantity is collected; fairness still compares what they pay to those samples (no live catalog).
- **Pricing basis** — office supplies use total purchase price divided by units. Software and subscriptions use per-seat/per-license price converted to a monthly equivalent; quantity affects the displayed bill total, not the per-seat comparison.

## Product Decisions

- One screen — keep the tool small and demoable in a minute.
- Category first, then a short interview — easier than dumping every detail with no context.
- Category-specific price fields — office supply totals are compared per unit; recurring software/subscription prices are compared per seat/license per month, while the full billed amount is shown for the chosen cadence.
- Summary beside the interview, inputs stay — they can update without losing the form.
- Win = fair price; loss = a better sample price is available — readable without jargon.
- Methodology visible before any input — they understand scoring up front.
- Blank submit warns instead of scoring — don’t fake a result.
- On price update, show old and new — the change is visible.
- Vibrant, exciting, inviting; not shadcn — avoid the generic AI-app look.
- Sample typical prices remain the fairness basis (`scope.md > The POC Boundary`).

## What We're Building

- One screen with category, intake, and summary side by side (or equivalent same-screen layout).
- Categories including at least office supplies and subscriptions, backed by sample typical prices.
- Intake: item, vendor, category-appropriate price, quantity or seats/licenses, billing cadence for recurring categories, loyalty vs new-customer.
- Methodology copy in the summary before submit.
- Error message on incomplete submit.
- Win/loss fairness result, score, and relationship-aware next steps after a valid submit.
- Editable intake; old + new price in the summary after a price update.

## Deferred From the POC

- Natural-language dump of “what’s happening” instead of fields — later in scope; this version is a short structured interview.
- Fairness against numbers the owner already knows — later; this version uses samples.
- Saved history / coming back to past checks — later in scope.
- Accounts, sharing, live vendor networks.

## Possible Later Enhancements

Natural-language intake; owner’s historical prices; live tracking of specials; more negotiation tools; more categories and richer recommendations.

## Non-Goals

- Live coupon/cashback marketplace — `scope.md > Explicitly Cut`.
- Full Credit Karma–style tracking product — cut.
- Scraping or searching the web for vendor specials — cut; samples only.
- Enrolling anyone in a real loyalty program — talking points only.
- shadcn (or lookalike default kit) as the visual system — excluded by the project's visual direction.

## Open Questions

- Exact category list beyond the examples (office supplies, subscriptions) — can be chosen in `4-spec` / build as a small set; does not block the product idea.
- Sample prices remain illustrative bundled examples. Quantity is used to derive office-supply per-unit price; recurring plan comparisons use per-seat monthly equivalent and show total billing separately.
