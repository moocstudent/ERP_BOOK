## Core notes

### Master data vs. transactional data

ERP data splits in two:

- **Master data**: the relatively static "files" — materials, customers, vendors, accounts, BOMs. Created once, referenced by thousands of documents.
- **Transactional data**: the daily "events" — orders, receipts, invoices.

The relationship: **a document = master data + a quantity + a date**. A purchase order is essentially "material M6-bolt + vendor Huafeng + qty 100 + due 07-30". So one error in master data gets **copied and amplified** by every document that references it — garbage-in-garbage-out, ERP edition.

### The material master: one record, many views

The material master has more fields than any other master record. The trick is its **view** structure — one record, with different field groups maintained by different departments:

| View | Owning department | Example fields |
| --- | --- | --- |
| Basic | R&D / MDM | number, description, base UoM, material group, weight |
| Purchasing | Purchasing | purchasing group, order UoM, planned delivery days, min. order qty |
| Sales | Sales | sales UoM, tax class, delivering plant, pricing reference |
| Storage / plant | Warehouse + planning | MRP type, lot-size rule, safety stock, batch management |
| Accounting | Finance | valuation class, price control (S/V), standard price |

The **material type** decides which views exist and which accounts postings hit:

- ROH raw material: bought, never sold → purchasing view, no sales view;
- HALB semi-finished: made and consumed internally → usually neither;
- FERT finished good: made and sold → sales view, no purchasing view;
- HAWA trading good: bought and resold → both.

**Units of measure** are the hidden trap: base unit "each", purchasing in "cartons" (1 = 10 ea), sales in "dozens" — every conversion factor lives in the master record. Enter one wrong and stock quantities corrupt from then on.

### Customer and vendor master data

Key groupings of business-partner data:

- **General**: name, tax ID, address — invoice headers come from here; wrong = void invoice;
- **Financial**: reconciliation account (which GL account carries their AR/AP), payment terms (net 30; 2/10 net 30), bank details;
- **Sales / purchasing**: sold-to and ship-to may differ (HQ orders, stores receive), credit limit, default currency.

Modern systems unify customers and vendors into one "business partner" — the same company can easily be both your customer and your supplier.

### Governance: keeping the model is harder than building it

Master data's four natural enemies: **duplicates** (one material under two numbers — stock split in half, MRP planning each half separately), **errors and gaps** (lead time 0 → MRP believes same-day supply), **staleness** (vendor changed banks, nobody updated — payment lands in the old account), **rogue creation** (records created around the approval flow, numbering rules ignored).

Three governance tools:

1. **Numbering rules**: meaningful codes (FG-BIKE-26) read well but rot; sequential numbers + searchable descriptions are steadier; most firms mix both;
2. **Approval workflow**: new materials pass a duplicate check by the MDM team, then each department completes its views before activation;
3. **Data owners**: every object and every view written into a role description — "whoever uses it maintains it" always fails; it must be "whoever is expert maintains it".

## Exercises

1. Choose material types for "a laptop (bought finished, resold)" and "a self-made circuit board", and list which views each needs.
2. What UoM conversions would your company (or an imagined bubble-tea shop) need? Write 3 sets and note where the factors are stored.
3. Design a "new material request form": at least 8 mandatory fields and 3 approval roles, with what each role checks.
