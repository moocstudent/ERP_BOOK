## Core notes

### Why the lowest bid is often the most expensive

A vendor at ¥4.5 undercuts one at ¥5.0 by 10%. But if he delivers on time only 62% of the time (stopping your line), passes inspection at 91% (forcing sorting and rework), and vanishes when problems arise — total cost of ownership usually comes out higher. **Vendor management exists to convert "cheap" back into "overall performance".**

### Vendor rating: let the data speak

**Scoring model = criteria × weights × automated data.** The classic four:

| Criterion | Data source | Computation (example) |
| --- | --- | --- |
| Price | purchasing info records | vendor's price vs. lowest price for the material |
| Delivery | **goods receipts vs. PO dates** | on-time receipts / total receipts |
| Quality | **inspection lots** | accepted lots / inspected lots; defect ppm |
| Service | manual rating | responsiveness, after-sales, cooperation |

The bold rows are the point: **delivery and quality scores are not opinions — they precipitate automatically out of everyday documents.** Every receipt and every inspection quietly adds to the record, so when the quarterly review comes, the data is already there and no vendor can charm their way to a better score. Another win for integration: the documents of the last two chapters become management evidence here.

Weights express **purchasing strategy**: automotive weighs quality heavily, FMCG weighs delivery, commodities weigh price. Flipping weights in the sandbox above and watching the ranking invert is exactly a strategy switch.

### The sourcing toolbox

Knowing who is good must harden into who gets the orders:

- **Source list**: allowed / preferred / banned vendors per material, with validity dates. MRP-generated PRs pick vendors from it;
- **Quota arrangement**: "60% to A, 40% to B" — supply security (no single basket) plus incentive for the runner-up. The system splits demand by quota automatically;
- **Outline agreements**: covered last chapter — volume and price fixed, daily business just calls off.

Together these turn "whom to buy from" from a per-order improvisation into a **strategy decided once and executed automatically**.

### The vendor lifecycle

```
prospect → onboarding (qualification / samples / trial lots)
        → qualified (in the source list, normal orders)
        → strategic (agreements / quotas / joint improvement)
        → watch (performance slipping, new orders restricted)
        → phased out (master record blocked, no transactions)
```

Two system points:

1. **Onboarding = record-keeping**: licenses, quality certificates and bank details filed in master data with **expiry reminders** — an expired certificate raises an alert;
2. **Phase-out is not deletion**: vendor masters are blocked, never deleted (history still references them); a blocked vendor simply cannot receive a new PO.

### Advanced sourcing topics

- **VMI (vendor-managed inventory)**: the vendor watches your stock levels and replenishes automatically — inventory responsibility shifts to them;
- **Consignment**: goods sit in your warehouse but remain the vendor's property; you settle only on withdrawal — zero capital tied up;
- **Multi-tier risk**: when your supplier's supplier breaks, you break. Since the chip crisis, leading firms map their n-2 supply tiers into risk registers.

## Exercises

1. Using the sandbox's three vendors, design weights for (a) a medical-device maker and (b) a promotional-goods trader, and justify the difference.
2. Design a quota: annual demand 120k units; vendor A caps at 80k capacity; vendor B quotes 5% higher but has never been late. State your quota and reasoning.
3. What loophole hides in "on-time receipts / total receipts"? (Hint: a vendor delivering many partial shipments, each "on time", yet chronically short.) Propose a better formula.
