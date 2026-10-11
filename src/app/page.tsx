"use client";

import { useMemo, useState } from 'react';
import pricingData from '@/data/pricing-data.json';

const categories = Object.keys(pricingData) as Array<keyof typeof pricingData>;

type Relationship = 'loyalty' | 'new-customer';
type BillingCadence = 'monthly' | 'quarterly' | 'yearly';

type FormState = {
  category: string;
  vendor: string;
  item: string;
  price: string;
  quantity: string;
  cadence: BillingCadence;
  relationship: Relationship;
};

type Review = {
  winLoss: 'win' | 'loss';
  score: number;
  verdict: string;
  summary: string;
  suggestion: string;
  oldPrice?: number;
  oldPriceDescription?: string;
  newPrice?: number;
  newPriceDescription: string;
  comparisonPrice: number;
  comparisonUnit: string;
  billingSummary?: string;
  sampleRange?: { min: number; max: number };
};

const cadenceMonths: Record<BillingCadence, number> = {
  monthly: 1,
  quarterly: 3,
  yearly: 12,
};

const cadenceLabels: Record<BillingCadence, string> = {
  monthly: 'month',
  quarterly: 'quarter',
  yearly: 'year',
};

const defaultForm: FormState = {
  category: categories[0] ?? 'office-supplies',
  vendor: '',
  item: '',
  price: '',
  quantity: '1',
  cadence: 'monthly',
  relationship: 'loyalty',
};

export default function HomePage() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [error, setError] = useState('');
  const [categoryNotice, setCategoryNotice] = useState('');
  const [review, setReview] = useState<Review | null>(null);

  const sampleSet = useMemo(() => {
    return pricingData[form.category as keyof typeof pricingData] ?? pricingData['office-supplies'];
  }, [form.category]);
  const isRecurringCategory = sampleSet.purchaseType === 'recurring-per-seat';
  const vendorPlaceholder = isRecurringCategory
    ? form.category === 'subscriptions' ? 'e.g. Salesforce' : 'e.g. Google'
    : 'e.g. Office Depot';

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setForm({ ...defaultForm, category });
    setError('');
    setReview(null);
    setCategoryNotice(`Category changed to ${pricingData[category as keyof typeof pricingData].label}. Enter the purchase details for this category.`);
  };

  const calculateReview = () => {
    const price = Number(form.price);
    const quantity = Number(form.quantity);
    const sampleRange = sampleSet.range;

    if (!form.vendor.trim() || !form.item.trim() || !form.price || !Number.isFinite(price) || price <= 0
      || !Number.isInteger(quantity) || quantity <= 0) {
      setError('Enter the vendor, item, a price greater than $0, and a whole-number quantity of at least 1.');
      setReview(null);
      return;
    }

    const minTypical = Number(sampleRange.min);
    const maxTypical = Number(sampleRange.max);
    const itemPrice = isRecurringCategory ? price / cadenceMonths[form.cadence] : price / quantity;
    const rangeWidth = maxTypical - minTypical;
    const rangePosition = rangeWidth > 0 ? (itemPrice - minTypical) / rangeWidth : 1;
    const relationshipAdjustment = form.relationship === 'loyalty' ? 5 : -5;
    const adjustedScore = Math.max(0, Math.min(100, 100 - rangePosition * 40 + relationshipAdjustment));

    const winLoss: 'win' | 'loss' = itemPrice <= maxTypical ? 'win' : 'loss';
    const verdict = winLoss === 'win' ? 'Fair price' : 'Price looks high';
    const summary = winLoss === 'win'
      ? 'This is in line with the sample typical prices for this category.'
      : 'This is above the sample range for this category, so it may be worth asking for a better price.';

    const suggestion = form.relationship === 'loyalty'
      ? 'Mention that you’ve been a repeat customer and ask whether there is a loyalty rate or bulk discount.'
      : 'Ask whether they have a first-time or new-customer offer, or if they can match a lower competitor price.';

    const priceDescription = isRecurringCategory
      ? `per seat/license per ${cadenceLabels[form.cadence]}`
      : `total for ${quantity} ${quantity === 1 ? 'unit' : 'units'}`;
    const billingSummary = isRecurringCategory
      ? `Current bill: $${(price * quantity).toFixed(2)} per ${cadenceLabels[form.cadence]} for ${quantity} ${quantity === 1 ? 'seat/license' : 'seats/licenses'}. Compared at $${itemPrice.toFixed(2)} per seat/license per month.`
      : undefined;

    setError('');
    setCategoryNotice('');
    setReview({
      winLoss,
      score: Math.round(adjustedScore),
      verdict,
      summary,
      suggestion,
      oldPrice: review?.newPrice ?? undefined,
      oldPriceDescription: review?.newPriceDescription,
      newPrice: price,
      newPriceDescription: priceDescription,
      comparisonPrice: itemPrice,
      comparisonUnit: sampleSet.benchmarkUnit,
      billingSummary,
      sampleRange: { min: minTypical, max: maxTypical },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    calculateReview();
  };

  return (
    <main className="page-shell">
      <div className="app-frame">
        <section className="panel left-panel">
          <div className="header-row">
            <div>
              <p className="eyebrow">SnazzyCash</p>
              <h1>Price fairness check</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              <span>Category</span>
              <select value={form.category} onChange={(event) => handleCategoryChange(event.target.value)}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {pricingData[category].label}
                  </option>
                ))}
              </select>
            </label>

            {categoryNotice ? <p className="category-notice" role="status">{categoryNotice}</p> : null}

            <label>
              <span>Item</span>
              <input value={form.item} onChange={(event) => handleChange('item', event.target.value)} placeholder={isRecurringCategory ? 'e.g. design platform' : 'e.g. copy paper'} />
            </label>

            <label>
              <span>Vendor</span>
              <input value={form.vendor} onChange={(event) => handleChange('vendor', event.target.value)} placeholder={vendorPlaceholder} />
            </label>

            <div className="row-two">
              <label>
                <span>{isRecurringCategory ? 'Price per seat / license' : 'Total purchase price'}</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) => handleChange('price', event.target.value)}
                  placeholder="$0.00"
                  inputMode="decimal"
                  aria-label={isRecurringCategory ? 'Price per seat or license in US dollars' : 'Total purchase price in US dollars'}
                />
              </label>

              <label>
                <span>{isRecurringCategory ? 'Seats / licenses' : 'Units purchased'}</span>
                <input type="number" min="1" step="1" value={form.quantity} onChange={(event) => handleChange('quantity', event.target.value)} />
              </label>
            </div>

            {isRecurringCategory ? (
              <>
                <label>
                  <span>Billing cadence</span>
                  <select value={form.cadence} onChange={(event) => handleChange('cadence', event.target.value as BillingCadence)}>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </label>
                <p className="field-help">Enter the price for one seat/license for the selected billing period. We compare its monthly equivalent.</p>
              </>
            ) : (
              <p className="field-help">Enter the full amount paid for this purchase. We divide it by the number of units to compare per-unit prices.</p>
            )}

            <label>
              <span>Relationship</span>
              <div className="toggle-wrap">
                <button type="button" className={form.relationship === 'loyalty' ? 'active' : ''} onClick={() => handleChange('relationship', 'loyalty')}>
                  Loyal customer
                </button>
                <button type="button" className={form.relationship === 'new-customer' ? 'active' : ''} onClick={() => handleChange('relationship', 'new-customer')}>
                  New customer
                </button>
              </div>
            </label>

            <button type="submit" className="primary-button">Check fairness</button>
          </form>

          {error ? <p className="error-text">{error}</p> : null}
        </section>

        <aside className="panel right-panel">
          <div className="summary-header">
            <p className="eyebrow">Fairness summary</p>
            <h2>{review ? review.verdict : 'Methodology'}</h2>
          </div>

          {!review ? (
            <div className="methodology-box">
              {isRecurringCategory ? (
                <p>
                  Enter the price for one seat/license and choose how often you are billed. We convert quarterly and yearly prices to a monthly per-seat amount before comparing them with sample prices. Your total bill for the selected period is shown too.
                </p>
              ) : (
                <p>
                  Enter the full purchase total and quantity. We compare the per-unit amount with sample typical prices for this category.
                </p>
              )}
              <p>A loyalty relationship can make a better discount more realistic, while a new-customer scenario may suggest a fresh-offer angle.</p>
              <p className="range-note">Sample data is illustrative, not live market pricing.</p>
            </div>
          ) : (
            <div className="result-box">
              {review.oldPrice !== undefined ? (
                <div className="price-compare">
                  <span>Old: ${review.oldPrice.toFixed(2)} {review.oldPriceDescription}</span>
                  <span>New: ${review.newPrice?.toFixed(2)} {review.newPriceDescription}</span>
                </div>
              ) : null}

              <div className={`badge ${review.winLoss === 'win' ? 'good' : 'bad'}`}>
                {review.winLoss === 'win' ? 'Win' : 'Loss'}
              </div>

              <div className="score-row">
                <strong>{review.score}</strong>
                <span>fairness score</span>
              </div>

              <p>{review.summary}</p>
              {review.billingSummary ? <p className="range-note">{review.billingSummary}</p> : null}
              <p className="range-note">Compared price: ${review.comparisonPrice.toFixed(2)} {review.comparisonUnit}</p>
              {review.sampleRange ? (
                <p className="range-note">
                  Sample range: ${review.sampleRange.min.toFixed(2)}–${review.sampleRange.max.toFixed(2)} {review.comparisonUnit}
                </p>
              ) : null}

              <div className="suggestion-box">
                <h3>What to say next</h3>
                <p>{review.suggestion}</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
