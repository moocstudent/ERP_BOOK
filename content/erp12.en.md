## Core notes

### Billing: reference the delivery, not the order

**Billing** creates the invoice from the delivery — you bill what you shipped. This one rule blocks two classic failures: billing before shipping (inflated revenue — an audit red line) and shipping without billing (leaked revenue — free goods). The system's "shipped, not yet billed" list is finance's leak radar.

The instant posting at billing:

```
Dr Accounts receivable   ¥90,400
  Cr Revenue                ¥80,000
  Cr Output VAT             ¥10,400
```

Set against the cost entry from goods issue, gross margin lives in the system as **the difference of two postings**: revenue 80,000 − cost 59,000 = 21,000. Separate entries let profitability resolve to the individual order line.

**The invoice is the birth of a receivable.** Carrying its payment terms (net 30), it joins the customer's **open items** — and everything in AR management revolves around open items.

### Payment and clearing: matching is harder than recording

¥90,400 lands in the bank. Finance must answer: **which invoice is this paying?** That step is **clearing**:

- **Exact match**: the customer referenced the invoice number — one-to-one, the ideal;
- **Amount match**: the receipt equals one invoice or a combination — system-suggested;
- **FIFO**: the customer says "apply to the oldest";
- **Partial payment and residuals**: ¥90,000 arrives, ¥400 short — bank charges? cash discount? underpayment? The gap becomes a **residual item** to chase, or posts to P&L if trivial.

Modern "intelligent cash application" auto-matches 80–95% of receipts using history and machine learning; the rest queue for humans.

### Aging analysis: an X-ray of collection risk

The **aging report** buckets every open invoice by days overdue:

| Bucket | Amount | Meaning |
| --- | --- | --- |
| Current | ¥120k | healthy |
| 1–30 d | ¥90k | normal noise; a reminder suffices |
| 31–60 d | ¥60k | manual collection needed |
| 61–90 d | ¥45k | alarm: review shipment holds |
| > 90 d | ¥30k | critical: legal / provision |

The companion metric, **DSO (Days Sales Outstanding)** ≈ AR balance ÷ average daily sales. DSO drifting from 45 to 60 days means half a month of revenue financed for free — potentially fatal for a cash-tight business.

### Dunning and bad debt: institutionalized asking

The **dunning procedure** turns collection into an automatic pipeline:

1. 7 days overdue: automatic statement email (level 1);
2. 30 days: dunning letter + sales follow-up, **credit block on new orders** (level 2);
3. 60 days: formal notice + shipment hold (level 3);
4. 90+ days: hand to legal; book a **bad-debt provision** per accounting policy (Dr Impairment loss / Cr Allowance), and write off when truly uncollectible.

Each customer can follow a different scheme (strategic accounts handled manually, small accounts fully automatic). The golden rule: **the earlier and more regular the chase, the higher the recovery** — every bucket an invoice ages through drops its odds sharply.

## Exercises

1. Write the entries for "billing ¥33,900 (incl. 13% VAT)" and its later clearing, then compute the order's gross margin (shipment cost ¥21,000).
2. ¥50,000 arrives; open invoices are ¥28,000, ¥15,000, ¥9,000 (oldest first). Give two defensible clearing plans and the treatment of the leftover.
3. Your DSO runs 42 → 51 → 63 days over three months on flat sales. List three possible causes and the report you'd pull to check each.
