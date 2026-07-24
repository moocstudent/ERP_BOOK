## Core notes

### Role ≠ department

Org charts show "Sales" and "Finance"; ERP rarely authorizes by department — it authorizes by **role / persona**.

- One person can wear many roles: a purchasing manager may be both "PO approver" and "vendor-master maintainer";
- One role can be assigned to many people: every warehouse clerk shares a "warehouse posting" role pack;
- **Menus and buttons follow the role**, not the headcount roster.

So when this chapter says "CEO view" or "CFO view", it means **what you see after login, what you may click, which numbers you are accountable for** — not the job title alone.

### Leaders barely enter documents — yet they decide if ERP is worth it

In go-live reviews, key users ask: "Will leadership actually use it?" Honest answer: **leaders almost never enter documents**, but they must **watch exceptions every day**.

| Role | Typical actions | Almost never does |
| --- | --- | --- |
| CEO | Read the cockpit, chase red lights, break cross-team deadlocks | Create POs, post goods receipts |
| CFO | Watch cash & aging, drive the close, approve large payments | Key invoices line by line |
| GL accountant | Review auto-journals, open/close periods, reconcile accounts | Backfill warehouse receipts |

If the boss's home screen is a queue of data-entry todos, the role is mis-assigned. If every KPI is green forever, the KPIs are not wired to real documents — **a cockpit must drill into documents and owners**, or it is just a pretty picture.

### CEO cockpit: exception lists beat pretty reports

Four signals a CEO cares about (drill them in the sandbox above):

1. **Delivery**: late-order count — into sales orders and planning exceptions;
2. **Profit**: margin trend — into product groups and price-variance accounts;
3. **Efficiency**: inventory turns — into slow-moving materials;
4. **Customer voice**: open complaints / quality notices — into the QM module.

The CEO's job is to **call the owner, demand an explanation, and when needed change the rule** (credit policy, safety stock, approval thresholds) — not to edit documents herself. ERP's gift is turning "things feel messy" into "12 documents, 3 owners, one root-cause pattern".

### CFO view: cash, risk, close cadence

The CFO's home screen is shorter-cycle:

- **Cash on hand** = bank GL − payment proposals generated but not yet executed;
- **Overdue AR** = the red band of aging (E4), often tied to credit blocks;
- **AP due soon** = matched-and-payable + invoices stuck in matching (the latter means purchasing/warehouse still have open work);
- **Close progress** = checklist completion (E7) — you see exactly which step is stuck.

CFOs seldom press "Post", but they set **when a month may close, when the payment run fires, and how tight credit is**. Change those parameters and every salesperson's and buyer's "may I?" flips instantly — that is finance's hard constraint on operations.

### GL accountant: QA for finance–ops integration

The GL accountant stands at the exit of auto-posting:

1. **Sample today's operational journals** (GR, GI, confirmations) — odd amounts must drill back through document flow;
2. **Manage posting periods**: logistics current-only; finance current+prior; special periods for controllers — stops back-dating and late stragglers;
3. **Clear GR/IR and other suspense** — if they won't clear, statements can't be trusted;
4. **The only manual journals**: accruals, reclass, FX — operational documents are never re-keyed.

Her stance is the opposite of a bookkeeping-software clerk: **trust the auto-post, audit the exception** — not "finish the ops, then catch up the books".

### Drill-down: shortest path from red light to owner

A good role home screen shares one interaction pattern:

```
Red KPI → detail list → single document → document flow → master data / owner
```

Break any link and leadership falls back to Excel and chat groups — and ERP's "single source of truth" evaporates. When configuring cockpits, wire **existing documents and reports** first; do not paint a non-drillable video wall.

## Exercises

1. List four CEO KPIs for your company (or a fictional bike plant). For each, write what fields the first drill screen must show.
2. Explain why "CFO approves payment" and "cashier executes payment" are usually two roles. (ROLE3 expands SoD.)
3. A GL accountant spots an odd goods-receipt journal. Write the shortest click path in the system (at least three steps).
