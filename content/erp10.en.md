## Core notes

### Pre-sales: inquiries and quotations

A customer asks "what do 50 units cost?" and sales creates a **quotation**: material, quantity, price, **validity period**. Validity is a legal concept — order within it and you must honor the quote. The system tracks conversion: 40 quotations sent, 22 became orders — the first layer of funnel data.

### The sales order: a promise behind two gates

On confirmation, the **sales order** is created **with reference to** the quotation. Two big checks fire immediately (next chapter dives deep):

1. **ATP check**: computes the date you can truly promise, written into the order's **schedule lines**;
2. **Credit check**: does existing debt plus this order exceed the limit? If so, the order blocks.

Key fields:

- **Sold-to vs. ship-to**: headquarters signs, a warehouse receives — different partner roles. Add **bill-to** and **payer**: four roles, possibly four different companies;
- **Pricing procedure**: the price is not one number but a stack of **conditions**:

```
Base price PR00       ¥1,700
- Customer discount     −5%     (contract rate)
- Quantity discount     −¥15/EA (≥50 units)
= Net price           ¥1,600
+ VAT 13%              ¥208
= Gross               ¥1,808
```

Every condition has a source (price master / agreement / manual) — audit can trace every fen of discount.

### The delivery: the warehouse's work order

On the ship date, the system (often a batch **delivery due list**) creates the **delivery** from the order. It drives three things:

- **Picking**: which storage location, which batch, how much — printed pick lists or sent to a WMS/handhelds;
- **Batch determination**: auto-select batches FIFO or by expiry (mandatory in food and pharma);
- **Packing & shipping**: cartons, weights, labels, carrier booking.

Note: **creating the delivery and completing picking move no stock in the books** — the goods are still yours, merely reserved.

### Goods issue: three things in one second

The truck leaves; the warehouse clicks **post goods issue**. In that second:

1. **Stock drops**: finished goods −50 (quantity and value together);
2. **Cost books**: auto-entry "Dr COGS ¥59,000 / Cr Finished goods ¥59,000" (at inventory cost, not sales price!);
3. **Title and risk transfer**: legally the goods leave you (exact timing per the trade terms).

**Cost posts at shipment; revenue posts at billing** — possibly different days, even different months. This creates the matching problem accountants watch: month-end close specifically reviews the "shipped, not yet billed" list.

### After shipment: the trigger for billing

The posted delivery joins the **billing due list**, from which finance (or a batch job) bills — next chapter covers ATP and credit, the one after covers billing and receivables, all growing off this chain.

## Exercises

1. Draw the QT → SO → DN → GI reference chain and mark at each node whether stock has moved and whether the books have moved.
2. A customer signs at Shanghai HQ, wants shipment to their Chengdu warehouse, invoices to a Beijing shared-service center, payment from a Hong Kong entity. Describe the order using the four partner roles.
3. Pricing drill: base ¥2,000, contract discount 8%, an extra ¥30/unit off at 100+, VAT 13%. Compute net, tax and gross for 120 units.
