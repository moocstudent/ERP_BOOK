## Core notes

### The station chain is “real progress”

If office work-order status cannot map to physical stations, due dates and cost are illusions. A practical chain:

```
Receive → Machine → Assemble → Pack → Ship (FG receipt)
```

The sandbox token is **where one production order sits on the floor**; it advances only after a **successful confirmation** — “looks done” without a scan must not jump the token.

The **station topology SVG** above the 3D line highlights the current station in sync; the orange dot is the token’s plane projection.

### Each confirmation moves three things at once

| On confirm | Stock | Cost | Planning visibility |
| --- | --- | --- | --- |
| Operation confirm | Backflush / WIP move | Hours × rate on the order | Downstream sees supply approaching |
| Final confirm | FG receipt | Settle finished-goods cost | Warehouse may create delivery |

That is finance–ops integration on the floor: one scan, three ledgers move.

### The MES ↔ ERP boundary

| | MES | ERP |
| --- | --- | --- |
| Time grain | Seconds, machine signals | Management events (confirm, receipt) |
| Users | Operators, line leads | Planning, costing, warehouse, finance |
| On failure | Line may buffer offline | Management ledger must not drift for long |

A practical digital twin: **floor and system in lockstep** — 3D makes the step visible; interfaces and confirmation discipline *are* the twin.

### Exception stations freeze downstream

On downtime, rework, or QI failure:

- Token stays (or enters a rework spur);
- Downstream warehouse deliveries should not be created;
- Customer portal stays on “in production”, never jumps to “shipped”.

Fake station progress lies to warehouse and customer together, and is a classic way to poison efficiency variances in cost analysis.

## Exercises

1. Draw ≥ 4 stations for a line you know; mark the ERP confirmation point at each.
2. Explain why “do first, confirm later” simultaneously breaks ATP, cost and the customer portal.
3. Write a rule: within 2 hours of MES disconnect, what ERP may allow and what it must forbid.
