## Core notes

### Department view vs. process view

The traditional org chart is **vertical**: sales, purchasing, production, finance — each with its own boss and its own KPIs. But value creation is **horizontal**: one customer order must cross sales (capture) → planning (schedule) → purchasing (buy parts) → warehouse (receive/ship) → shop floor (make) → finance (bill and collect) before it becomes revenue.

A **business process** is that horizontal value chain. A classic observation from management science: most delays and errors happen not inside departments but at the **hand-offs between them** — planning never hears the date sales promised; finance never hears what the warehouse shipped. Those wall-gaps are precisely what ERP exists to fill.

### Swimlanes: the standard language for processes

In a swimlane diagram, each lane is a role or department, each box an activity, each arrow a hand-off. Reading the sandbox above, watch three things:

1. **Whose lane an activity sits in** — accountability at a glance;
2. **How many lanes an arrow crosses** — the more crossings, the higher the coordination cost;
3. **Which system action each activity maps to** — in ERP a process isn't drawn, it is *walked*, document by document.

### Document flow: the process embodied in the system

ERP records every process step as a **document**. The key mechanism is **reference**: each document is created from its predecessor, inheriting its data.

```
Sales order SO-10992
  └─ created w/ reference → Delivery DN-80331 (quantities carried over)
        └─ → Goods issue posting (stock auto-deducted)
              └─ → Invoice INV-2301 (prices carried over)
```

Three payoffs of the reference chain:

- **Less typing, fewer errors**: invoice prices come from the order, quantities from the delivery — not editable by hand;
- **End-to-end traceability**: from any invoice you can click back to the original order (auditors love this);
- **Enforced sequence**: no delivery, no invoice — process discipline enforced by the system, not by goodwill.

### The three core loops

| Loop | Money | Start → end | Module here |
| --- | --- | --- | --- |
| **P2P** procure-to-pay | flows out | requisition → payment | E3 |
| **O2C** order-to-cash | flows in | quotation → receipt of cash | E4 |
| **Plan-to-produce** | value created | demand plan → finished-goods receipt | E5 |

All three share the same master data (E2) and all converge in finance (E7) — every step of every loop writes journal entries into the ledger automatically.

### Hand-offs = risk points

Memorize this "broken hand-off table"; it explains most chaos in manufacturing companies:

| Hand-off | Typical failure |
| --- | --- |
| Sales → planning | promising dates that can't be met (no ATP check) |
| Planning → purchasing | demand changed, purchasing never heard (MRP not re-run) |
| Purchasing → warehouse | goods received but never posted — books diverge from reality |
| Warehouse → finance | shipped but never billed — revenue leaks |
| Shop floor → finance | late confirmations — distorted costs |

## Exercises

1. Pick a process you've lived through (an online return, an expense claim, a leave request) and draw its swimlane diagram: at least 3 lanes and 6 activities.
2. Mark every lane-crossing arrow on your diagram and write down what breaks if that hand-off fails.
3. Explain why "billing must reference the delivery" is more reliable than "finance is careful not to over-bill" — and which of ERP's three ingredients (process × data × rules) it demonstrates.
