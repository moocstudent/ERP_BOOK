## Core notes

### The production order: the shop floor's contract

A planner confirms MRP's planned order into a **production order**. At creation the system takes two snapshots:

- BOM copy → the **component list**: what this order will draw (later BOM edits don't disturb existing orders);
- Routing copy → the **operation list**: operations, work centers, standard times.

The order's **status chain** is its lifecycle: `CRTD created → REL released → PCNF partially confirmed → CNF confirmed → DLV delivered → TECO technically complete → CLSD closed`. Each status locks and unlocks actions — no issue before release, no end to cost collection before closing.

**Release** is not ceremony: the system checks **material availability** (releasing short = a line waiting on parts) and **capacity**, generates staging demands, prints tickets. A plant's release discipline largely determines its level of chaos.

### Issuing material: two philosophies

**Picked issue**: the warehouse issues per the component list, movement 261:

```
Dr Production cost (this order)  ¥35,000
  Cr Raw materials                 ¥35,000
```

Stock leaves the warehouse and becomes **work-in-process (WIP)**. Right for valuable or serialized parts.

**Backflush**: no issue postings during the run; **theoretical BOM quantities deduct automatically at confirmation**. Right for screws-and-washers — thousands of postings saved. The price: stock records lag briefly (used at the line, not yet deducted), and **real overconsumption is never recorded** (BOM says 4, it deducts 4). Backflushed parts therefore rely on cycle counting to re-true.

The choice is **record precision vs. transaction cost**. Most plants mix: structural parts picked, commodity parts backflushed.

### Confirmations: data flowing back from the floor

A **confirmation** is the floor telling the system what got done: operation, yield, scrap, machine and labor hours. It triggers a cascade:

- Hours × work-center rates → **labor and overhead into order cost**;
- Final-operation confirmation → **goods receipt of finished goods** (or a manual 101);
- Backflushed components deduct now;
- Capacity is released (the scheduler knows the machine is free).

Confirmation timeliness governs everything downstream: work done today but reported in three days means stock, cost and schedules are all wrong for three days. This is the core reason MES, scanners and station terminals exist — turning confirmation from an end-of-shift form into an incidental scan.

### Completion and variance: the order's cost verdict

Goods receipt posts `Dr Finished goods (at standard cost) / Cr Production cost`. The order's account now reads:

```
Debits (inputs):  actual materials ¥35,600 + actual time ¥21,000 = ¥56,600
Credits (output): 50 units × standard ¥1,100 = ¥55,000
Variance = ¥1,600 unfavorable
```

**Variance analysis** decomposes the ¥1,600: material overuse? time overrun? rate change? 2 scrapped units? Month-end **settlement** posts the variance out (to P&L, or proportionally into inventory), zeroing and closing the order.

Variances are the shop's medical report: chronic overuse points to a wrong BOM or degraded process; chronic "savings" suggest an inflated BOM — either way, fix the master data. **Execution data feeding back into master data is the real payoff of the production module.**

## Exercises

1. Order and explain the statuses REL, CLSD, CRTD, TECO, CNF — and which control principle "no issue before release" embodies.
2. An order: issues ¥12,400; confirmations 30 machine-hours × ¥140; receipt 40 units × standard ¥620. Compute the variance and give two plausible causes.
3. Your plant consumes 2 million screws a year. Argue for backflushing them, and design the compensating cycle-count scheme (frequency, triggers).
