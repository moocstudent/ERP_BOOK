## Core notes

### The BOM: the product's recipe

The **Bill of Materials** answers "which components, in what quantities, make one parent". It looks like a table but is really a tree:

```
Bicycle ×1              ← L0 finished good
├─ Frame ×1             ← L1
├─ Wheel ×2             ← L1 semi-finished (has its own BOM)
│    ├─ Hub ×1          ← L2
│    ├─ Spokes ×36      ← L2
│    └─ Tire ×1         ← L2
├─ Chain ×1
└─ Derailleur ×1
```

A **single-level BOM** records one parent-child layer (bicycle → frame, wheels, chain, derailleur); a **multi-level explosion** is the system recursively attaching each component's own BOM. MRP and cost roll-ups both consume the exploded result.

### Quantity logic: more than multiplication

- **Quantity per**: components needed for one parent. Watch the units: frames in "each", paint in "liters per unit", wire in "meters per unit".
- **Scrap factor**: actual issue = theoretical usage × (1 + scrap). Assembly scrap lives on the BOM line; operation scrap lives on the routing — don't mix them.
- **Lot-dependent usage**: some consumption depends on the batch, not the unit count (2 m of lead wire lost per line changeover) — maintain as "fixed quantity".
- **Alternative components**: if chip A is short, chip B may substitute — maintained as an alternative group with priorities; MRP picks by strategy.

**One product can carry several BOMs**: production BOM (shop-floor view), engineering BOM (design view — the EBOM/MBOM split), costing BOM (estimation basis). A "usage" field separates them; don't force one BOM to please everyone.

### The routing: the product's method

The BOM says "made of what"; the **routing** says "made how":

| Operation | Work center | Setup | Run time / unit |
| --- | --- | --- | --- |
| 0010 Frame welding | Welding line WC-10 | 30 min | 6 min |
| 0020 Wheel assembly | Bench WC-20 | 10 min | 8 min |
| 0030 Final assembly | Line WC-30 | 20 min | 12 min |
| 0040 QC & packing | QC station WC-40 | 0 | 4 min |

- A **work center** is the machine/crew executing an operation. It carries **capacity** (16 h/day) and **rates** (¥80/h) — capacity planning and costing both read from here.
- **Setup time** is lot-independent; **run time** multiplies by quantity — which is why small lots cost more per unit: the setup never amortizes.
- Components can be **assigned to operations**: wheels are issued at operation 0020, not all upfront — precise staging and backflushing depend on this.

### Engineering change: editing a BOM is serious business

Products improve, so BOMs must change — but **never edit in place**: running production orders and computed costs reference the old structure. The proper tools:

1. **Validity dates**: the new BOM line becomes effective Aug 1, the old line expires the same day; orders created before use the old part, after use the new;
2. **Engineering change numbers**: one change bundles edits across BOM + routing + drawings, with traceability of who/when/why;
3. **Phase-in / phase-out**: run down old stock first, or switch immediately and scrap the rest? A planning decision that needs purchasing and the shop floor at the table.

## Exercises

1. Write a two-level BOM for "a cup of bubble tea" (tea base / milk / pearls; pearls → tapioca starch / sugar), with units and quantities.
2. Add "8% pearl cooking scrap" and recompute the starch needed for 200 cups.
3. Explain why deleting a BOM line is dangerous while letting it expire is safe.
