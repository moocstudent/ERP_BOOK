## Core notes

### Data migration: the invisible main battlefield

However well configured the new system is, if data doesn't arrive — or arrives wrong — go-live is paralysis. Objects fall into three classes of rising difficulty:

1. **Master data**: materials, partners, BOMs, accounts, prices — bulky but well-structured;
2. **Opening balances**: stock quantities and values, open AR/AP items, GL balances, fixed-asset net values — must reconcile **to the fen** with the legacy;
3. **Open documents**: incomplete POs, in-flight production orders, unshipped sales orders — the worst, because the "scene" must be rebuilt in the new system.

Deep history (invoices from three years ago) is usually **not migrated** — the legacy stays read-only as an archive; the new system starts light.

### The migration loop: cleanse → map → trial → reconcile

**Cleansing** is the most underestimated task: after ten years, 30% of materials are dead, customers exist in triplicate, and half the lead-time fields are blank. The principle: **garbage does not migrate** — migration is the one chance for a master-data spring clean; miss it and it never comes again.

**Mapping**: the old-field → new-field translation table. Legacy "customer class A/B/C" → new "customer group 01/02/03"; old codes → new numbering rules. The mapping table itself is signed off by the business — it is the migration's contract.

**Trial loads**, at least two: round one surfaces format problems, round two proves speed and completeness. The **dress rehearsal** runs the full cutover timetable against the clock — the go-live weekend offers no second attempt.

**Reconciliation** is two-way: counts (legacy 12,480 materials → new 12,480) and values (total stock value, AR totals, trial balance account by account). The finance lead **signs** the result — a key milestone on the cutover checklist.

### Integration: the long campaign after go-live

ERP is no island; it converses with neighbors for years. Three styles:

| Style | Shape | Fits |
| --- | --- | --- |
| **Point-to-point** | A calls B's API directly | few systems (≤3), simplest |
| **Middleware / iPaaS** | one bus, central mapping & routing | many systems, complex mappings |
| **Event-driven** | publish/subscribe queues | high-volume async (e-commerce peaks) |

Point-to-point turns to spaghetti fast: n systems fully interconnected need n(n−1)/2 interfaces, each separately maintained. Middleware reduces it to n — the arithmetic that sells iPaaS.

**Three survival designs of reliable integration** (all seen in the sandbox):

1. **Idempotency**: every message carries a unique key; redelivery never double-posts — retries are normal life, and without idempotency they mean duplicate documents;
2. **Retry queue + dead-letter queue**: messages wait while the other side is down; beyond max retries they park for humans — **a message may be late, never lost**;
3. **Monitoring and reconciliation**: interface logs plus a daily document-count check across both sides — an unnoticed dead interface is scarier than the outage itself.

### Typical scenarios at a glance

- **E-commerce ↔ ERP**: orders in, stock levels back; queues absorb promotion peaks;
- **MES → ERP**: confirmations and issues flow up (ERP owns planning and cost; MES owns sequencing and stations);
- **Bank connectivity**: payment instructions down, acknowledgments and statements up (pain.001 / pain.002 / camt.053 are the standard messages);
- **EDI**: order/ship-notice/invoice exchange with major partners on industry standards (automotive especially) — the modern form of the structured fax.

## Exercises

1. Build a migration-scope decision table: material masters, sales orders closed five years ago, in-flight production orders, last month's unpaid vendor invoices, the staff phone directory — migrate or not, and why?
2. Legacy stock value ¥8,412,300; after migration the new system shows ¥8,398,100. List three plausible causes and how to investigate each (hints: valuation method, rounding, missed batches).
3. Design exception handling for the e-commerce order interface: material missing in ERP, customer credit-blocked, network timeout — what happens in each case?
