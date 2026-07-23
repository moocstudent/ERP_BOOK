## Core notes

### Stock is not a number — it's a state machine

Ask "how much stock do we have?" and ERP asks back: "which kind?" The same material in the same warehouse can simultaneously be:

- **Unrestricted**: freely usable — MRP availability and ATP promises count only this;
- **Quality inspection**: received, awaiting judgment — visible but untouchable;
- **Blocked**: failed inspection / pending claim / awaiting scrap — fully unusable.

**Transfer postings** move stock between states (pass → unrestricted; fail → blocked). The machine's purpose: **separating "we have it" from "we can use it"**. Sales sees 1,000 units and promises a customer — while 200 sit in inspection and 50 are condemned. Stock records without states are incident reports waiting to happen.

### Movement types: a code for every motion

ERP assigns each stock action a **movement type** (SAP codes; other vendors isomorphic):

| Code | Action | Stock | Accounting |
| --- | --- | --- | --- |
| 101 | purchase/production receipt | + | Dr Inventory / Cr GR-IR (or Production cost) |
| 261 | issue to production order | − | Dr Production cost / Cr Inventory |
| 601 | goods issue for delivery | − | Dr COGS / Cr Inventory |
| 311 | transfer between storage locations | shift | no entry (same plant, same value) |
| 321 | inspection → unrestricted | state | no entry |
| 551 | scrapping | − | Dr Scrap loss / Cr Inventory |
| 701/702 | count gain / loss | ± | Dr/Cr Inventory vs count difference |

The movement type is the **translator between logistics and finance**: it determines both how quantity moves and which entry books (an input to account determination — chapter FIN1 closes that loop). Auditors reviewing inventory start by profiling movement types — if 551 scrap doubles, there's a story.

Every movement generates a **material document**: who, when, what, how much, from where to where. Material documents are **unchangeable and undeletable** — errors are reversed with a counter-document. That is the audit trail.

### Batches: identity cards for stock

A **batch** slices one material's stock into identified lots: milk lot B-20260701, steel coil L-4471. Batches carry attributes: production date, expiry, vendor, inspection results. Three uses:

1. **Shelf-life management**: first-expired-first-out picking; expired lots auto-block;
2. **Traceability**: a complaint on one product batch → trace back to the ingredient lots used → trace forward to every other product touched by those lots. Food and pharma law mandates both directions; recalls shrink from "everything" to "one batch";
3. **Attribute-dependent use**: chemical concentration differs by lot; recipes adjust dosing from batch attributes.

### Physical inventory: the last defense of book-equals-real

Books are books, goods are goods; **counting** aligns them:

- **Annual wall-to-wall**: production stops, everything counted — audit-required, exhausting;
- **Cycle counting**: A items monthly, B quarterly, C annually — workload spread into daily routine;
- **Spot counts**: audit or management surprises.

Differences post via 701/702. The difference rate (difference value / stock value) is a warehouse's core KPI. Root causes, in order: unposted documents > wrong quantities > genuine loss. **A high difference rate is not fixed by counting more — fix the process** (e.g. backflushed parts missing their cycle-count scheme, as flagged in MFG3).

## Exercises

1. A 500-unit receipt: into inspection; 480 pass, 20 fail and return to vendor. Write the movement types end-to-end and the three stock balances after each step.
2. Explain why material documents can only be reversed, never deleted — and which accounting principle this mirrors.
3. Design a batch strategy for "bubble-tea pearls (2-day shelf life)": numbering rule, issue rule, expiry handling — one sentence each.
