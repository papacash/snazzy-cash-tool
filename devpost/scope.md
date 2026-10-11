---
doc: scope
status: approved
---

# SnazzyCash

A simple tool for small-business owners to check whether what they’re paying a vendor is fair, and get plain-language next steps to negotiate.

## The Unique Kernel
Fairness isn’t a generic “this is expensive” score. Intake includes whether this is a **loyalty** relationship (same vendor) or a **new customer** (new vendor). That relationship helps score the fairness summary and shapes the talking points: same vendor → you may qualify for a loyalty discount; new vendor → you may get a new-customer special. The owner should easily understand **how and why** they might save.

## Who It's For
A small-business owner who keeps buying supplies, notices prices going up, and doesn’t have a clean way to check if the price is fair or what to say next. Today they absorb the increase, or try to negotiate from memory without a simple “why this isn’t fair / what to ask for.”

## The Core Loop
They open the app, enter the vendor, the item, what they pay now, and whether this is loyalty or new-customer. They get a quick summary: is the price fair against **sample typical prices**, and what to do next in natural language. They come back the next time a price jumps or they’re about to buy again.

## Inspiration & Identity
- [Credit Karma](https://www.creditkarma.com) — tracking and recommendations that are easy to understand.
- [Ibotta](https://www.ibotta.com) — saving on things you’re already buying, not a treasure hunt for random deals.
- Brand: SnazzyCash — money with a bit of personality; keep the first version simple and snazzy, not bank-brochure.

## Why This Product Matters
The product should give small-business owners a practical way to check rising costs and decide what to ask a vendor. The goal is a usable tool, not a full finance product.

## What "Working" Looks Like
In about a minute on a screen: open the app → enter vendor, item, current price, and loyalty vs new-customer → see a fairness summary against sample typical prices, with a short talking point for next steps. That “here’s whether it’s fair, and here’s what you could say” beat is the demo.

Hackathon shape: short demo video, public GitHub; about 2–4 hours of active work; deployment optional.

## The POC Boundary
In: one intake for one item; sample typical prices bundled in the app (not live market data); a fairness summary; next-step talking points driven in part by loyalty vs new-customer. Enough for a one-minute demo.

## Later
- Natural-language dump of “what’s happening” instead of filling every field.
- Fairness against numbers the owner already knows (what they used to pay).
- Real price tracking / hunting the internet for specials.
- Deeper negotiation tools beyond talking points.
- More items, history, and richer recommendations.

## Explicitly Cut
- A live coupon/cashback marketplace like Ibotta — too big, needs real vendor deals.
- Full credit-style tracking product like Credit Karma — not the kernel, and not a 2–4 hour PoC.
- Scraping or searching the web for current vendor specials — can’t be the fairness engine in this timeframe.
- Building a real loyalty-program or vendor network — the PoC *suggests* the talking point; it doesn’t enroll anyone.
