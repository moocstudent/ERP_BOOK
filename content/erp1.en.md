## Core notes

### Start with a chaotic Monday

Picture a bicycle factory with no ERP: sales tracks orders in Excel, the warehouse keeps paper stock cards, purchasing orders on gut feel, and finance receives a shoebox of documents to reconcile at month-end. On Monday morning, sales promises a customer "500 units by next Friday" — unaware the warehouse holds only 60, or that the wheel supplier announced a delay last week. Every department has its own books, and those books **don't know each other**.

That is the **information silo**: data exists, but it is scattered, duplicated and contradictory. The same customer is "CityRide Co." in the sales sheet and "CityRide (Shanghai)" in the finance system — and that's exactly where unreconcilable receivables begin.

ERP — Enterprise Resource Planning — answers with a single sentence: **the whole company shares one integrated database, and when any business event happens, every related figure updates at once**. The second the warehouse posts a receipt, purchasing sees the order fulfilled, finance sees the accrued liability, planning sees available stock rise. That is the **single source of truth**.

### The evolution: each generation solved a new problem

| Era | Name | The new problem it solved |
| --- | --- | --- |
| 1960s–70s | **MRP** — Material Requirements Planning | To build 100 bicycles: which parts, when, how many? |
| 1980s | **MRP II** — Manufacturing Resource Planning | Is the plan even feasible for our capacity? What does it cost? |
| 1990s–2000s | **ERP** | Can finance, HR, sales and inventory share one database? |
| 2010s– | **Cloud / intelligent ERP** | Can we skip the server room, subscribe monthly, automate with AI? |

Three transitions worth memorizing:

1. **MRP → MRP II** added the **closed loop** of capacity and finance. MRP only says "400 wheels in week 3"; MRP II asks back "can the shop actually run that week? which account did that material cost hit?"
2. **MRP II → ERP** widened scope from manufacturing to the **whole enterprise**. Gartner coined "ERP" in 1990; the landmark product was SAP R/3 (1992), with finance, logistics and HR grown on one database.
3. **ERP → cloud ERP** revolutionized delivery: from "buy a license + build a server room" to "subscribe + open a browser", with vendor-pushed upgrades and APIs that let ERP talk to e-commerce, banks and MES in real time.

### How ERP truly differs from bookkeeping software

Many assume ERP is "fancy accounting software". The difference is the **direction of causality**:

- Bookkeeping software: business happens → an accountant **manually types** journal entries → reports. Data is recorded after the fact — late and error-prone.
- ERP: operational users post **business documents** (receipts, deliveries, confirmations) → journal entries generate **automatically** → reports are real-time.

In ERP, financial figures are not "entered"; they are a **by-product** of operational actions. This is the "finance-operations integration" this course returns to again and again.

### A formula worth chewing on

> **ERP = process × data × rules**

- Process: procure-to-pay, order-to-cash, plan-to-produce — documents flowing one after another.
- Data: master data (materials, partners, BOMs) plus transactional documents, one shared copy company-wide.
- Rules: three-way match, credit checks, release strategies, account determination — management policy hardened into enforced system logic.

The remaining 23 chapters are nothing but these three things, unfolded.

## Exercises

1. Take an organization you know (even a school canteen) and list at least 4 places where separate books are kept — and what contradictions result.
2. Without looking at the table, recite the "new problem solved" at each stage: MRP → MRP II → ERP → cloud.
3. Explain in your own words, to a friend with zero IT background: "why does one barcode scan in the warehouse change the finance ledgers?"
