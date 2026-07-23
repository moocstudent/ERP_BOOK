## Core notes

### Goods receipt: goods and books move in the same second

The vendor's truck arrives; the warehouse receives **against the purchase order** (movement type 101):

- Scan or key the PO number and the system proposes the expected material and open quantity — **you cannot receive what was never ordered**, itself a control;
- Received 95? Post 95; the PO's open quantity drops to 5;
- Inspection-relevant materials land in **quality-inspection stock** first (module E6);
- The posting instantly books: **Dr Raw materials / Cr GR/IR clearing** (PO price × received quantity).

The **GR/IR (Goods Receipt / Invoice Receipt) clearing account** is one of ERP accounting's most elegant designs: goods have arrived, the invoice hasn't; a liability exists but its final amount is unconfirmed, so it parks at PO price in this transit account. Invoice verification later clears it. The GR/IR balance at month-end = every "goods and invoice out of sync" item — it is a reconciliation list by construction.

### Three-way match: quantities and prices, doubly checked

When the invoice arrives, **invoice verification** lines up the three documents:

```
PO   ordered 100 @ ¥10.00
GR   received 95
IV   invoiced 105 @ ¥10.80   ← what the vendor billed
```

**Quantity check**: invoiced qty ≤ cumulative received qty. 105 > 95 — the extra 10 units were **never confirmed by anyone** — block.
**Price check**: |invoice price − PO price| ≤ tolerance. ¥10.80 is 8% above ¥10.00; at a 2% tolerance — block.

Why *three* documents? Each pairing guards one thing:

- PO ↔ GR: did we receive what we ordered? (against over-receipt and unordered receipts)
- GR ↔ IV: did the billed goods actually arrive? (against fictitious invoices)
- PO ↔ IV: is the price the agreed price? (against quiet mark-ups)

The mechanism stops both **error** (miscounted receipts) and **fraud** (buyer-vendor collusion). Auditors class it among the most fundamental internal controls; the common thread in several famous procurement frauds was a disabled or bypassed match.

### Tolerances: don't drown finance in pennies

A 100% strict match buries finance in ¥0.02 freight differences. **Tolerances** define how small a deviation passes automatically:

- Price: ±2% or an absolute ±¥50, whichever is smaller;
- Quantity: some industries allow ±5% (bulk chemicals settled by weight);
- Small residuals: total difference < ¥10 auto-posts to a gain/loss account.

Tolerance is a **management decision**: too tight and clerical effort explodes; too loose and the control dissolves. Drag the tolerance slider in the sandbox above and the sentence explains itself.

### Handling blocked invoices

Match fails → the invoice is **blocked**: booked, but held from payment. The paths:

| Cause | Owner | Action |
| --- | --- | --- |
| Quantity gap (billed > received) | warehouse / purchasing | await further receipts, or vendor issues a credit note |
| Price gap | purchasing | confirm new price and change the PO, or reject the invoice |
| Quality pending | QC | release after judgment, or return the goods |

Once resolved, the invoice is **released** into the payment queue. The payment run batches due items: **Dr Accounts payable / Cr Bank**. P2P is closed.

## Exercises

1. Match by hand: PO 200 @ ¥7.50; two GRs totaling 180; invoice 190 @ ¥7.65; price tolerance 1.5%. Write the quantity and price verdicts.
2. Explain why GR/IR must be cleaned at month-end, and what "goods received, invoice pending" represents on the balance sheet.
3. Real scenario: a vendor habitually bills before shipping to inflate their quarter and begs for early payment. Under three-way match, list what you can and cannot do.
