## Core notes

### Double-entry: a 500-year-old blockchain

Double-entry bookkeeping rests on one axiom: **every transaction touches at least two accounts, and total debits always equal total credits.** The accounting equation is its static form:

```
Assets = Liabilities + Equity
```

Directions (understand, don't chant):

| Account class | Increase | Decrease | Examples |
| --- | --- | --- | --- |
| Assets | Dr | Cr | bank, inventory, receivables, equipment |
| Liabilities | Cr | Dr | payables, loans, GR-IR |
| Equity | Cr | Dr | share capital, retained earnings |
| Revenue | Cr | Dr | sales revenue |
| Expenses | Dr | Cr | COGS, wages, depreciation |

"Debits must equal credits" is a built-in self test: an unbalanced entry cannot be saved, period. Mistakes remain possible (wrong account), but **imbalance is impossible** — which is why the method has survived five centuries.

### The chart of accounts: finance's directory tree

The **chart of accounts** lists every account code, in two broad families:

- **Balance-sheet accounts**: carry balances, roll into next year (bank, AR, inventory, AP);
- **P&L accounts**: zeroed at year-end into retained earnings (revenue, COGS, admin expense).

Detail comes from **subledger dimensions**, not account proliferation: AR is one reconciliation account analyzed **by customer**; expenses are analyzed **by cost center**. Keep the chart lean and push dimensions to subledgers — the first principle of chart design.

### Events → entries: one continuous story

Chaining the auto-postings of previous chapters (illustrative amounts):

| Event | Entry |
| --- | --- |
| Goods receipt | Dr Raw materials 500 / Cr GR-IR 500 |
| Invoice verification | Dr GR-IR 500 + Input VAT 65 / Cr AP 565 |
| Payment | Dr AP 565 / Cr Bank 565 |
| Issue to production | Dr Production cost 500 / Cr Raw materials 500 |
| Production receipt | Dr Finished goods 900 / Cr Production cost 900 |
| Goods issue (sale) | Dr COGS 900 / Cr Finished goods 900 |
| Billing | Dr AR 1,356 / Cr Revenue 1,200 + Output VAT 156 |
| Customer payment | Dr Bank 1,356 / Cr AR 1,356 |

Read the table by **following the value**: cash becomes material, material becomes WIP, WIP becomes finished goods, finished goods become cost and receivables, receivables become cash again. The whole P2P + production + O2C chain is eight transformations of value.

### Account determination: how the system knows which account

The warehouse worker posting a receipt is never asked "which account?" — **account determination** decides for him:

```
account = f(movement type, material's valuation class, plant/valuation area)
e.g. movement 101 × class 3000 (raw)      → Dr Raw materials
     movement 101 × class 7920 (finished) → Dr Finished goods
```

It is a mapping table configured at implementation. Its deeper meaning: **operational users perform operations; accounting policy is frozen into configuration** — the error surface shrinks from "anyone might pick a wrong account" to "is the table right?". Getting that table complete and tested is among the finance consultant's most important pre-go-live jobs.

## Exercises

1. From memory, write the entries for "receive ¥2,000 of raw material" and "bill ¥5,650 (incl. 13% VAT)".
2. Draw the eight events as a value chain — cash → material → WIP → FG → cost/AR → cash — labeling each transformation with its event.
3. The company adds a material family "packaging" to be tracked separately. List what configuration changes (valuation class? accounts?) and what must not change (movement types).
