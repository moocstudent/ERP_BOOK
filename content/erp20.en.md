## Core notes

### The ledger system: GL and subledgers divide the work

- **General ledger (GL)**: balances summarized **by account** — statements come from here;
- **Subledgers**: balances expanded **by object** — AR by customer, AP by vendor, fixed assets by asset record;
- **Reconciliation accounts** bridge the two. Posting to a customer writes the customer subledger **and** the AR reconciliation account simultaneously; manual postings directly to reconciliation accounts are forbidden — which keeps "sum of details = GL balance" true **by construction**.

When they nonetheless diverge (interfaces, manual adjustments), finding the offending documents is the close's first hunt.

### The close checklist: ten steps to land the month

The month-end close is finance's fixed cadence. The standard runbook:

1. **Cutoff**: lock logistics postings (period control); later receipts/issues belong to next month;
2. **Clear GR/IR**: analyze every goods-vs-invoice mismatch; chase or adjust;
3. **Reconcile AR/AP** to the GL; tick off the bank statements;
4. **Accruals**: depreciation, payroll, interest, rent, utilities — **accrual accounting** in action: the expense belongs to this period whether or not cash moved;
5. **Order settlement**: WIP review, production variances posted out (MFG3's settlement executes here);
6. **Inventory revaluation**: allocate price differences, test for write-downs;
7. **Allocations**: cost-center distributions (detailed in FIN3);
8. **Trial balance**: debit/credit totals across all accounts;
9. **Roll P&L**: zero revenue/expense into retained earnings; produce balance sheet, P&L, cash-flow statement;
10. **Close the period**: the posting-period table locks the month, leaving only adjustment access for designated roles.

The order is not ritual: publish statements before step 4 finishes and expenses are understated, profit inflated; skip step 1 and every later number stands on quicksand.

### Period control: authorization along the time axis

**Posting periods** typically number 12 plus a few special periods (for year-end audit adjustments). The control matrix can express: "logistics users post current period only; finance posts current + previous; only the controller role posts special periods." It prevents two evils: **back-dating** (pushing this month's expense into last month to dress results) and **stragglers** (an old invoice surfacing after statements shipped).

### Accrual accounting: why "provisions" exist

Cash accounting books when money moves; accrual accounting books **when the obligation or right arises**. Electricity used in December, bill arriving in January:

```
Dec accrual:  Dr Overhead—utilities 8,000 / Cr Accrued liabilities 8,000 (estimate)
Jan actual:   reverse the accrual, book the invoice at 8,236; difference hits January
```

Without the accrual, December's profit is overstated by 8,000 and January's understated — **month-to-month comparability** breaks. Accrual amounts are estimates (last month, contract values, meter readings); estimating *reasonably* is professional judgment, and an audit focus.

### From trial balance to the three statements

The **trial balance** lists every account's balance. That it balances proves only that double-entry held — not that classification is right. From there:

- Balance-sheet account balances → the **balance sheet** (the inventory line comes from INV3's valuation!);
- P&L balances → the **income statement** (revenue from O2C billing, cost from goods issues and orders);
- The **cash-flow statement** is hardest: translating accrual profit back into cash (indirect method: net income ± non-cash items ± working-capital changes).

See this generation chain clearly and the course's refrain lands: **statements are not made by finance — they grow out of the whole company's documents.**

## Exercises

1. Order these correctly and state the dependencies: roll P&L, clear GR/IR, cutoff, accrue depreciation, trial balance.
2. Goods worth ¥40,000 received Dec 28; the invoice arrives Jan 5. Show how this appears on the Dec 31 balance sheet (which account, which side) and GR/IR's role in it.
3. Your close takes 12 working days; the CFO wants 5. Name the three likeliest bottlenecks and a systematic fix for each (hints: accrual automation, bank-statement interfaces, period discipline).
