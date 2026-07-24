## Core notes

### Front-line users are who make ERP "run every day"

Process modules (E3–E6) show how documents chain; this chapter swaps shoes: sales, purchasing, planning, warehouse, shop floor — **which transactions each person actually hits in a day**. If ERP is only a cockpit for leaders while the floor stays on Excel, go-live never happened.

Five roles map onto three loops plus inventory:

| Role | Primary loop | "Main documents" in a day |
| --- | --- | --- |
| Sales rep | O2C | Quote → sales order → delivery chase |
| Buyer | P2P | Requisition → PO → invoice variance |
| Planner | Plan-to-produce | MRP exceptions → firm planned orders |
| Warehouse clerk | Inventory | GR / GI / cycle count |
| Shop-floor supervisor | Manufacturing | Confirmation → FG receipt |

### A sales day: promises must go through the system

Sales' classic failure is not "can't click" — it is **verbal replanning**: promising a new date or qty on the phone while the sales order stays frozen, so ATP, credit, delivery and billing all run on yesterday's truth.

Healthy cadence (see the sandbox timeline):

1. Inquiry → **quotation** (price from condition records);
2. Accept → **sales order** (reference the quote; fewer typed fields);
3. On save: **ATP + credit** run automatically — if they fail, change the date or seek exception approval, do not force-save;
4. Customer change → **order change** (a change is a document);
5. Near due date → check open deliveries, expedite the warehouse — **sales never posts the goods issue**.

Sales' core ERP skill: **turn every customer promise into an inspectable document state**.

### A buyer day: from proposal to contract to expedite

Much of a buyer's input is MRP (planned requisitions); the output is a legally binding PO:

1. Clear requisitions: consolidate, source, convert to PO;
2. Over-amount hits approval — **can create ≠ can approve**;
3. Expedite late lines: vendor-confirmed dates write back to the PO and feed MRP as planned supply;
4. On three-way price failure, **purchasing owns the price gap** (change PO or reject invoice);
5. Review vendor scores — fed automatically from GR/QI; **buyers cannot edit scores, only strategy**.

Buyer discipline: POs with no demand origin, or asking warehouse to receive without a PO, are control alarms.

### A planner day: translator, not firefighter

Planners sit between sales promises and shop capacity:

- Morning: read the **MRP exception list** (shortage, pull-in, push-out, cancel);
- **Firm** planned orders into production orders or PRs — only then are resources truly claimed;
- Align with sales: slip the promise or expedite;
- After master-data or big-order shocks, **local re-run** so you are not deciding on stale exceptions;
- Safety stock, lead time and lot size are **policy parameters**, not casual "keep a bit more".

The best planner KPI in ERP: **the exception list shrinks** — master data and sales behavior are improving, not that the planner is busier.

### Warehouse & shop floor: the last centimetre of books = reality

**Warehouse** owns quantity, never price:

- GI against delivery note (scan) → stock and COGS move in the same second;
- GR against PO → GR without PO is a red line in most companies;
- Issue to production order → what leaves the bin must post;
- Cycle-count variance → **approve, then post**; no silent stock edits.

**Shop-floor supervisors** make orders real:

- Do not start short-material orders;
- Confirmations carry yield and hours → backflush and cost collection;
- Downtime uses reason codes; fake yield poisons efficiency variance and standards;
- Final confirm triggers FG receipt → planning sees supply, finance sees stock;
- Explain qty/scrap variances before close, or cost centers eat the blame.

### Super users: translators and fire extinguishers after go-live

Each department needs 1–2 **super users**:

- Can walk their full loop and the hand-offs upstream/downstream;
- Front-line stuck tickets go to them first — not straight to consultants or IT;
- Separate "real need" from "bad habit" when tuning rights and flows.

Without super users, ERP retreats to chat groups by week three — nobody translates between business language and system language in real time.

### Three traps the floor loves

1. **Skip references**: GR without PO, billing without delivery — document flow breaks; audit and auto-copy die;
2. **Backfill later**: work first, system later — during the gap ATP/MRP/finance are all lying;
3. **Ignore exceptions**: treat MRP exceptions, match failures and credit blocks as "the system complaining again" — until they become customer complaints.

## Exercises

1. Pick one role and write a "forbidden actions" list (≥ 4). Name the control risk each line protects.
2. Sales verbally promises a delivery two days earlier. Describe the wrong path (no system change) and the right path (which documents move).
3. Why is "planners getting busier" usually a symptom of master data or sales behaviour — not a signal to hire more planners?
