## Core notes

### Where demand comes from

Purchasing starts not with "buy" but with "**someone needs**". Demand enters the system by three roads:

1. **Manual purchase requisitions (PR)**: the shop floor, admin or IT fills in "what, how many, by when";
2. **MRP-generated**: covered in module E5 — after netting, MRP throws PRs for externally procured materials automatically;
3. **Reorder-point triggers**: stock crosses the ROP and the system raises a replenishment request (module E6).

The PR is an **internal document**: never sent to a vendor, no legal force. Its purpose is to make demand *visible, approvable and poolable* — a buyer can merge five PRs for the same material into one big PO and negotiate a discount.

### Release strategy: who may approve how much

The **release strategy** on PRs/POs hardens the authority matrix into the system. A typical value dimension:

| Value | Approval chain |
| --- | --- |
| < ¥5,000 | purchasing supervisor |
| ¥5,000 – 50,000 | purchasing manager |
| ¥50,000 – 500,000 | purchasing director + finance manager |
| > ¥500,000 | VP + CFO |

Layer category rules on top (IT equipment adds an IT sign-off; hazardous chemicals add EHS). The point: **approval is a control, not a ritual** — an unreleased document simply cannot proceed to ordering or receiving.

### Where prices come from

PO prices should never be typed from memory. Three regular sources:

1. **Purchasing info records**: the "material × vendor" file — last price, lead time, minimum order quantity. Auto-proposed at PO creation;
2. **Outline agreements**: negotiated long-term contracts. Two kinds: **quantity contracts** (100k units this year at ¥4.8) and **scheduling agreements** (deliveries against a rolling schedule);
3. **RFQs**: for new materials or big buys, send requests to several vendors, compare, award — the winning price writes back into the info record.

Both the priority of price sources and whether manual overrides are allowed are configured rules. A system that lets buyers freely overtype prices makes three-way match toothless — an internal-audit checklist item.

### Purchase order anatomy

A PO is "header + line items + delivery schedule":

- **Header**: vendor, currency, payment terms, purchasing organization — applies to the whole order;
- **Line item**: one material per line: quantity, price, receiving plant, account assignment (stock material to inventory; expense material to a cost center);
- **Delivery schedule**: one line can split into multiple deliveries — 1,000 units over 4 weeks, 250 per week.

Once the PO is out, the system **tracks the commitment**: open quantity (ordered, not yet received), expediting, vendor order acknowledgments. Open POs are what MRP sees as **inbound supply** — if buyers don't maintain PO status, planning double-orders.

### Centralized vs. decentralized purchasing

- **Central**: HQ negotiates and signs (volume pricing, easier compliance); plants call off against the agreements;
- **Decentralized**: each plant buys locally (fast, close to the need) but prices and compliance scatter;
- Common compromise: **strategic materials central (outline agreements), incidental materials local (with value caps)**. The ERP purchasing-organization structure exists precisely to express this.

## Exercises

1. Design a three-tier approval matrix (value × category) for your team, then identify which tier is easiest to dodge by order-splitting — and how to prevent it.
2. State three essential differences between a PR and a PO (audience, legal force, data source).
3. A PO line reads "1,000 units in 4 weekly deliveries"; in week 2 the vendor delivers only 150. Write the open quantity now, and explain how MRP treats this supply line.
