## Core notes

### MRP's input list

MRP is pure computation — wrong in, wrong out. Before running it reads five things:

1. **Demand**: sales orders + remaining forecast (independent demand), spread over dates;
2. **On-hand stock**: unrestricted only (inspection and blocked stock don't count!);
3. **Inbound supply**: open POs and released production orders — "don't reorder what's already coming";
4. **BOMs**: structures and quantities for the explosion;
5. **Planning parameters**: lead times, lot-size rules, safety stock — all from the material master (chapter MD2's foreshadowing pays off here).

### The core algorithm: net → lot → offset

**Step 1 — netting.** Per material, per period:

```
net requirement = max(0, gross − available stock − inbound + safety stock)
```

Sandbox case: FG demand 200, stock 40 → net 160. If stock covers it, this branch stops — nothing explodes further.

**Step 2 — lot sizing.** Net is 160; how big an order?

| Rule | Result | Fits |
| --- | --- | --- |
| Lot-for-lot | exactly 160 | expensive or custom items — zero excess |
| Fixed lot 200 | order 200, 40 to stock | minimum-order / full-carton constraints |
| Period lots | merge two weeks' needs into one order | high ordering-cost materials |

Lot rules trade **ordering cost against holding cost** — the EOQ idea (chapter INV2) landing as configuration.

**Step 3 — lead-time offsetting.** Walk back from the need date to get the release date:

```
planned order: 160 units, finish = W5, lead time 1 wk → release = W4
```

**Step 4 — explosion.** The parent's planned order becomes the component's gross requirement:

```
wheel gross = 160 × 2 = 320, need date = W4 (the parent's START date!)
```

Note the component is needed at the parent's **start**, not finish — wheels must be present when assembly begins. Then wheels repeat net → lot → offset… level by level down to purchased parts, emitting **purchase requisitions**. The **low-level code** ordering guarantees a shared part (one screw used by 10 products) is netted once, at its lowest level, with all demands pooled.

### Outputs: proposals and exceptions

Everything MRP outputs is a **proposal**, never a command:

- **Planned orders**: suggested production; planners convert to production orders;
- **Purchase requisitions**: suggested buys; buyers convert to POs;
- **Exception messages**: MRP's most valuable product — "lead time violated", "expedite/postpone existing order", "excess order quantity". A planner's day is not reading fifty thousand plan lines; it is **working the exception list**.

The red warning when you push the wheel lead time to 4 weeks in the sandbox is the classic exception: **demand can no longer wait for the normal lead time**. MRP won't expedite on its own — it exposes the conflict for a human to resolve: expedite (pay), split (partial), or renegotiate the date.

### Regenerative vs. net change

A regenerative run recomputes every material nightly — robust but slow. **Net change** recomputes only flagged materials (new orders, receipts, BOM edits set the flag) — fast, with occasional full runs to true things up. In-memory computing is making "full run anytime" normal, moving MRP from nightly batch toward near-real-time.

## Exercises

1. Full manual run: demand 300 @W6; FG stock 50, safety stock 20; BOM: 1 FG = 3 × component A; A stock 200, inbound 100 @W3, purchasing lead time 2 wks, fixed lot 500. Show every step and the final purchase requisition (quantity, release week).
2. Explain why inspection and blocked stock are excluded from MRP availability — and construct a scenario where counting them causes a failure.
3. Why do shared components need the low-level-code mechanism? Build a two-product example that computes wrongly without it.
