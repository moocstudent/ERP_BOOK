## Core notes

### Org modeling: the most important translation before go-live

The first big workshop of any ERP project is not about features. It asks: **what does your company look like inside the system?** Real-world groups, subsidiaries, divisions, sites and warehouses must be translated into a fixed hierarchy of system org units. The translation matters because:

- **Every document must hang on an org unit**: which plant owns this PO? which company code receives this journal entry?
- **Authorizations and reports cut along org lines**: a Suzhou planner can't see Chengdu stock; subsidiary reports come out per company code;
- **It is nearly immutable after go-live**: thousands of historical documents hang off each unit — restructuring means migration.

### Three views, one tree

The model must satisfy three constituencies at once. Common units (SAP naming; other vendors isomorphic):

**Finance view**

- **Company code = legal entity**. One company code, one complete set of books: its own balance sheet, P&L and tax filings. The test is hard-edged: **must it publish independent statements? Then it must be a company code.**
- Several company codes can share one **chart of accounts** (the precondition for group consolidation), each keeping local account mappings.

**Logistics view**

- **Plant**: the core unit of planning and inventory — MRP runs per plant, stock is counted per plant, BOMs and routings attach to plants. A plant need not manufacture; a major distribution center is modeled as a plant too.
- **Storage location**: stock subdivisions inside a plant — raw materials, finished goods, line-side, returns. Quantities are managed at storage-location level; value is usually carried at plant level.

**Sales view**

- **Sales organization**: the selling entity, attached to a company code (whose books take the revenue).
- **Distribution channel**: online / offline / dealer / direct — the same material can price differently per channel.

### A worked example

Huacheng Group: two legal entities (manufacturing, trading); manufacturing runs plants in Suzhou and Chengdu; trading only warehouses:

```
Group (consolidation)
├─ Company code 1000 Huacheng Manufacturing
│    ├─ Plant 1100 Suzhou (production) ── s.locs: raw / FG / line-side
│    └─ Plant 1200 Chengdu (production) ── s.locs: raw / FG
└─ Company code 2000 Huacheng Trading
     └─ Plant 2100 Shanghai DC (no production) ── s.locs: FG / returns
```

Key corollary: manufacturing selling to trading is **not a stock transfer — it is an intercompany transaction**: invoices, revenue recognition, reconciliation on both sides. Many groups imagine it as an internal move, then hit tax problems after go-live; the rework is brutal.

### Classic modeling mistakes

| Mistake | Consequence |
| --- | --- |
| Modeling departments as plants | org tree scrapped at the next reorg |
| Blurring legal boundaries (two entities in one company code) | cannot file taxes independently; audit fails |
| Storage locations too granular (one per shelf) | document-entry explosion; counts never reconcile |
| One lazy plant for everything | two sites' stock blended; MRP output unusable |

Rule of thumb: **legal entities strictly (the law decides), plants realistically (physics and planning logic decide), storage locations sparingly (just enough).**

## Exercises

1. Draw the org tree for "a bakery chain group with 2 legal entities, 3 production sites and 5 forward warehouses", labeling company codes / plants / storage locations.
2. True or false, with reasons: "The East-China sales region should be modeled as a plant."
3. In a company you know: which entity must be a company code? Which needs only a storage location?
