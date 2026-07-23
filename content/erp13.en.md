## Core notes

### Why planning must be layered

A natural question: why not just "schedule production when orders arrive"? Because **decisions live on different time scales**:

- A new production line takes 18 months — an **annual** decision;
- Hiring and training workers takes 2 months — **quarterly**;
- Long-lead materials take 6 weeks — **monthly**;
- Which job runs first on this machine — **hourly**.

Cram all of that into one plan and it is either too fine to compute or too coarse to execute. The **planning pyramid** layers by time scale so each level answers only its own question.

### The four layers

**1. S&OP (Sales & Operations Planning)** — monthly, 12–24 months out, at **product-family** granularity.
Sales, operations and finance align three numbers at one table: the demand plan (what we can sell), the supply plan (what we can make), the financial plan (what we can fund). The output is **one consensus number** — "8,000 bikes/month for the family next quarter". S&OP is a management process, not an algorithm; meeting discipline beats software.

**2. MPS (Master Production Schedule)** — weekly, 3–6 months out, at **model** granularity.
Split the family's 8,000 into: 1,200/week of the 26" city model, 600/week of the 27.5" MTB… MPS schedules only **key products / key resources** and runs **rough-cut capacity**: if final assembly caps at 2,000/week and you schedule 2,200, it's overtime or cuts.

**3. MRP** — nightly/daily, at **every material, every date**.
Takes the MPS as input; explodes through the BOM, nets, offsets (the whole next chapter). Outputs: planned orders, purchase requisitions, exception messages.

**4. Shop-floor scheduling** — daily/per shift, at **operation and machine** granularity.
Sequences MRP's orders onto specific machines considering changeovers, tooling, skills. Often owned by an APS or MES.

### Demand management: forecasts "consumed" by orders

MPS input is **demand** = forecast + actual orders — but **never a naive sum** (that double-counts). The standard mechanism is **forecast consumption**:

```
Monthly forecast: 1,000 units
Orders arrive: 300
Remaining forecast = 1,000 − 300 = 700
Total demand = 300 orders + 700 remaining forecast = 1,000  ✓ (not 1,300)
```

This is exactly where make-to-stock and make-to-order diverge: MTS runs mostly on forecast, MTO mostly on orders, and hybrid ATO (assemble-to-order) stocks components on forecast while assembling on orders — the standard play in consumer electronics.

### Time fences: why the frozen zone resists change

Plans re-roll weekly, but **the nearer the change, the dearer it is**: material issued, lines set, workers scheduled. **Time fences** cut the axis into three zones:

- **Frozen** (e.g. next 2 weeks): no automatic changes; manual changes need approval — the shop floor's quiet zone;
- **Slushy** (2–8 weeks): quantities may flex; new orders get evaluated;
- **Liquid** (beyond 8 weeks): MRP re-plans freely.

Too long a frozen zone and you respond slowly to the market; too short and the floor is whiplashed daily. This is the eternal negotiation between planning and sales.

## Exercises

1. Place each decision on its pyramid level: (a) which order runs first on machine 3 tomorrow; (b) whether to stock 20k units before the Singles' Day peak; (c) next week's mix across three models; (d) whether to build a new southern plant.
2. Compute forecast consumption: forecast 800, orders received 950. What is the remaining forecast? Total demand? What signal does this configuration send?
3. As planning manager, the sales director demands the frozen zone shrink from 2 weeks to 3 days "for responsiveness". Write the three facts/figures you would put on the table.
