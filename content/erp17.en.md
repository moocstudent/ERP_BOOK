## Core notes

### Replenishment's two questions: when, and how much

Every inventory policy ultimately answers two questions: **when to order** and **how much at a time**. The reorder-point method turns "when" into an automatic rule:

```
Reorder point ROP = daily demand d × lead time LT + safety stock SS
```

Stock drains; the instant it crosses ROP an order fires; during the LT days of waiting, the "lead-time demand d×LT" carries you; if everything runs at average, the shipment arrives exactly as stock touches SS. That is the sandbox's **sawtooth**: drain → trigger → wait → jump, forever.

### Safety stock: insurance against "not average"

If demand equaled its average every day and vendors were never late, SS = 0 would be fine. Reality wobbles twice:

- **Demand variability**: 20/day on average, 35 some weeks;
- **Lead-time variability**: 7 days promised, occasionally 12.

The statistical formula (normal assumption):

```
SS = z × σ_demand-over-LT
z: service-level factor — 90% → 1.28, 95% → 1.65, 99% → 2.33
```

**The key intuition: z is nonlinear.** Going from 95% to 99% service inflates safety stock by ~41% (2.33/1.65); pushing toward 99.9% costs another huge slab. "Never stock out" is bought with exponentially growing inventory — so service levels are **tiered decisions**: 99% for critical A items, 90% for generic C items, letting stockout cost and holding cost each find their level.

The honest way to shrink SS is not slashing the number but **shrinking variability**: better vendor punctuality and better forecasts reduce σ, and SS slims by itself.

### How much: EOQ's idea and its reality

The **Economic Order Quantity** balances two costs:

```
EOQ = √(2 × annual demand D × ordering cost S / holding cost per unit-year H)
```

- Order often: high ordering cost (processing, freight, receiving), low holding;
- Order big: the reverse. EOQ is the valley of the total-cost curve.

Real lot sizes add: vendor minimums, full-carton/pallet constraints, price breaks, warehouse space and shelf life. EOQ's value is not the precise figure but the **reminder that a valley exists** — and the curve is flat near the bottom, so a convenient round number close to it is fine.

### Choosing policies: not every material deserves MRP

| Method | Fits | Character |
| --- | --- | --- |
| MRP (demand-driven) | A items, structural parts, demand derivable from BOMs | precise, data-hungry |
| Reorder point (consumption-driven) | C items, steady-running commodity parts | simple and robust, blind to the future |
| Kanban / two-bin | low-value line-side parts | physical signal, zero system effort |
| Buy-to-order | custom or project material | zero stock, long lead |

The classic combination is **ABC analysis** (by value) × **XYZ analysis** (by demand stability): manage AX tightly with MRP, free-range CZ with two bins — spend attention where it pays.

## Exercises

1. Compute: d=30/day, LT=10 days, σ_LT=45 units, 95% service. Find SS and ROP; at 99% service, how many more units of SS, and what %?
2. EOQ drill: D=24,000/yr, S=¥200/order, H=¥6/unit-yr. Compute EOQ; the vendor ships full pallets of 500 — what do you actually order, and why is the deviation harmless?
3. Pick a replenishment policy, with one sentence each, for: engine assemblies, packaging cartons, custom nameplates, screws.
