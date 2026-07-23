## Core notes

### Financial vs. management accounting

One set of postings, two pairs of glasses:

- **Financial accounting (FI)**: outward-facing — shareholders, tax, banks. Standards-compliant statements answering "how much did the company make";
- **Management accounting (CO, controlling)**: inward-facing — for managers. Unbound by standards, answering "**which product, which department, which order** made or lost it".

ERP's trick: both share the underlying documents. Every expense posting carries an account (the FI view) **and** a **cost object** (the CO view) — ¥8,000 of electricity books to the "utilities" account *and* the "molding shop" cost center. One entry, two perspectives.

### Cost objects: the expense's addressee

| Cost object | Question answered | Example |
| --- | --- | --- |
| **Cost center** | what did this department spend | molding shop, QC, IT |
| **Internal order** | what did this activity cost | a trade show, a retrofit project |
| **Production order** | what did this batch really cost | covered in MFG3 |
| **Profitability segment** | profit by product × customer × region | 26" bike × East × dealer channel |

The rule: **every P&L posting must carry a cost object** — an expense without an addressee can neither land nor be analyzed.

### Two steps: collect, then allocate

Expenses first **collect** on the directly responsible cost center. But service centers (utilities, maintenance, IT) must **allocate** onward to production centers, and thence into products:

```
Step 1 collect:  electricity 80,000 → power-house cost center
Step 2 allocate: power house → production centers, by meter readings
Step 3 absorb:   production centers → orders, via machine-hour rates
```

The **allocation base** decides fairness: electricity by meters, rent by floor space, IT by headcount, QC by inspection lots. A lazy base (everything by headcount) distorts product cost — power-hungry products get subsidized, frugal ones overcharged. **Activity-based costing** is this idea taken seriously: find each activity's true driver.

### Activity rates: internal prices for services

Production cost centers convert expenses into **activity rates**:

```
Molding shop monthly cost ¥360,000, available machine time 3,000 h
→ rate = ¥120/h
An order confirms 2.5 h → absorbs ¥300 of overhead
```

Plan rates (planned cost / planned hours) run the year; actuals settle the difference at year-end. Rates mirror shop efficiency: flat spending with poor utilization sends the rate soaring — **idle-capacity cost made visible**.

### Cost roll-up: where standard cost is born

The **cost roll-up** computes product standard cost bottom-up:

```
Material: each BOM line = component standard price × usage, summed up the levels
Labor:    each routing operation = hours × labor rate
Overhead: hours × overhead rate (or % of labor)
```

Dragging the wheel price in the sandbox and watching unit cost respond is the roll-up, live. The result freezes as the year's standard cost (INV3's price-control S comes from here). Then actual vs. standard splits into **variances**:

- **Price variance**: bought dearer/cheaper (purchasing's account);
- **Quantity variance**: over/under-consumption (the shop's and process engineering's account);
- **Rate variance**: overspend or under-utilization (management's and volume's account).

Variances assigned by responsibility make reward and correction defensible — management accounting's full loop of governing by numbers.

## Exercises

1. IT spends ¥90,000/month serving R&D (40 heads), sales (25), production (85). Allocate by headcount; then propose a better base and defend it.
2. Roll-up drill: BOM material ¥560; operations: welding 0.4 h × ¥100, assembly 0.8 h × ¥75; overhead at 180% of labor. Compute unit standard cost.
3. A month shows a large unfavorable quantity variance; the shop supervisor blames "bad material from purchasing". Using price-vs-quantity attribution: what evidence would support him, and which documents would you pull?
