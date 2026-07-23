## Core notes

### The starting problem: one part, several prices

You buy 100 at ¥10, then 100 at ¥13. Now you issue 120 — **at what cost?** The screws on the shelf don't announce which purchase they came from, so accounting must choose a **valuation method**, and the choice rewrites two statements:

- Issue cost → the P&L (higher cost, lower profit);
- Closing inventory → the balance sheet (inventory is an asset).

### Moving average: reprice at every receipt

**Moving average (price control V)**: each receipt recomputes the weighted unit price; every issue uses the current average.

```
Receive 100 @ ¥10 → 100 units ¥1,000, avg 10.00
Receive 100 @ ¥13 → 200 units ¥2,300, avg 11.50
Issue 120         → cost 120 × 11.50 = ¥1,380; 80 left ¥920, avg still 11.50
Receive 50 @ ¥15  → 130 units ¥1,670, avg 12.85
```

Traits: automatic, smooth, maintenance-free; **issues never change the average — only receipts do**. Drawbacks: the averaging blurs price swings, so individual purchasing wins and losses vanish; and a classic trap — **a large invoice difference landing when stock is tiny slingshots the average absurdly** (worse near negative stock).

### FIFO: cost layers

**FIFO** assumes oldest-first consumption; inventory consists of **cost layers**:

```
Layer 1: 100 @ ¥10   Layer 2: 100 @ ¥13
Issue 120 → eat layer 1 (100×10=1,000), then 20 of layer 2 (260) → cost ¥1,260
Left: 80 @ ¥13 = ¥1,040
```

In rising prices: FIFO issues at **old low prices** → lower cost, higher profit, closing stock at new high prices → higher assets. Chinese standards and IFRS allow FIFO and weighted average and **forbid LIFO** (allowed under US GAAP, historically used to shelter taxes).

### Standard cost: locking volatility into one account

**Standard cost (price control S)**: fix a standard (say ¥11) at year-start; all year, every movement books **at ¥11**. Actual-vs-standard goes to the **price difference account**:

```
Receive 100 @ actual ¥10: Dr Inventory 1,100 (100×11) / Cr GR-IR 1,000 / Cr Price diff. 100 (bought cheap)
Receive 100 @ actual ¥13: Dr Inventory 1,100 / Dr Price diff. 200 (bought dear) / Cr GR-IR 1,300
```

The elegance: **inventory stays clean** (quantity × standard) and all real volatility concentrates in one account — purchasing performance readable at a glance; cost roll-ups (FIN3) get a stable basis. The price: standards need **periodic re-estimation** (typically annual), and month-end must allocate the differences proportionally back to inventory and COGS or the statements distort.

Convention: **raw materials on V** (bought prices genuinely move; let the average follow) and **semi-finished/finished on S** (self-made cost needs a stable basis for variance analysis).

### The three compared (rising prices)

| | Issue cost | Reported profit | Closing stock | Management signal |
| --- | --- | --- | --- | --- |
| Moving average | middle | middle | middle | smooth, details blurred |
| FIFO | low (old prices) | high | high (new prices) | clear layers, heavy bookkeeping |
| Standard | constant | stable | constant | price-diff account = purchasing scorecard |

The governing principle: **valuation methods change when profit is recognized, never the cash flow** — you paid the vendors the same fen either way. Once chosen, a method must be applied consistently; changes require disclosure.

## Exercises

1. Hand-compute FIFO for the sandbox's script (rcv 100@10, rcv 100@13, iss 120, rcv 50@15, iss 80): every issue cost and the closing value. Check against the sandbox.
2. Write the full entry for "standard ¥11, actual ¥13, receive 100" — and what a positive price-difference balance says.
3. The boss asks: "Copper will rise next quarter — switch us to FIFO so profits look better?" Give your two responses as the accountant.
