## Core notes

### ATP: do the math before you promise

Nothing damages a customer relationship like **promising what you can't deliver**. The Available-to-Promise check answers, at order entry: "this quantity, this date — can I commit?"

The base formula, computed period by period along the timeline:

```
cumulative availability(w) = opening stock
                           + Σ planned receipts(≤w)   ← open POs, released production
                           − Σ commitments(≤w)        ← earlier sales orders
```

**The crucial subtlety: the promisable quantity is the minimum across that week and every later week.** Stock is continuous: goods you promise to ship in week 2 can be stolen by an earlier commitment that consumes them in week 3. The sandbox's "W2 looks fine but can't be promised" case is exactly this trap.

When the check runs:

- **At order entry**: the promisable date lands in the schedule lines — "full quantity on the requested date", "full quantity later", or "split confirmation";
- **On changes**: any change to quantities or supply re-triggers it;
- **Rescheduling**: when supply slips, all affected orders are recomputed and re-prioritized — shortage season is when your allocation rules earn their keep.

### Allocation under shortage: first come, or biggest first?

ATP is naturally **first-come-first-served**: earlier orders lock stock earlier. Reality layers policy on top:

- **Allocations**: scarce or launch products carved up by customer tier or region — A-customers guaranteed 70%;
- **Partial delivery**: if the customer allows, ship the available 150 now, the rest next lot — the order carries "max partial deliveries / allowed?" fields;
- **Substitution**: equivalent products or another plant's stock — ATP can be configured to check across plants.

### Credit management: the second gate

Beyond delivery risk sits **collection risk**. The credit formula:

```
credit exposure = AR balance              ← billed, unpaid
                + open order value        ← accepted, not yet shipped
                + shipped-not-billed value
release condition: exposure + this order ≤ credit limit
```

Exceeding the limit doesn't simply reject the order — it **blocks with an exception process**: the order holds, a credit controller gets a work item and may (a) require prepayment, (b) grant a temporary limit raise (with approval), or (c) release after cash comes in. **A second check runs before shipment** — in the days since order entry, the customer's debt may have worsened.

Setting limits: a common start is one-sixth of last year's purchases (~two months of volume), tuned by payment history; new customers pay in advance or on delivery until six months of history exist.

### ATP's advanced forms

- **CTP (Capable-to-Promise)**: when stock runs out, keep computing — "does capacity fit? can material arrive?" — effectively a micro-MRP for this one order, answering "week 6 is possible";
- **Global ATP**: one check across plants and warehouses, allocating from the nearest;
- E-commerce "stock deduction" is a simplified ATP: lock on order, release on timeout.

## Exercises

1. By hand: opening 80; receipts +150 in W2, +100 in W4; commitments −60 in W1, −120 in W3. A customer wants 120 in W2 — how much is promisable? Which week allows the full quantity?
2. Limit ¥500k; AR ¥280k; open orders ¥150k. What happens to a new ¥120k order? List the credit controller's three options and each option's risk.
3. Discuss: why should "sales quietly promising a customer and asking the warehouse to ship first" be blocked by the system — and which two checks do the blocking?
