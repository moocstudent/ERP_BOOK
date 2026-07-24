## Core notes

### Progress must come from the document state machine

If “80% done” is typed by hand, nobody trusts it in three weeks. Reliable progress has one algorithm:

```
progress = f(system status of key documents)
```

Example O2C milestones projected outward:

| Customer-visible | Internal document condition |
| --- | --- |
| Order accepted | SO saved and credit passed |
| In production | Released, incomplete production order exists |
| In stock | FG goods receipt posted |
| Shipped | Delivery goods issue posted |
| Invoiced | Billing document posted |

Internal five lanes can be finer (inbound PO, QI, picking), but **external copy must be a function of internal state**, never a parallel fiction.

### How to run the five-lane board

Each lane in the sandbox answers four questions:

1. **% complete** — computed from that end’s documents;
2. **Current document** — a number you can drill into;
3. **Tip** — business meaning of the next move;
4. **Blocked?** — a red light must name an owning role.

Project this in the ops meeting; it beats a non-drillable “project progress” deck by an order of magnitude.

### Blocker types and escalation

| Type | Typical document signal | First owner |
| --- | --- | --- |
| Shortage | Order shortage / late PO | Planning + purchasing |
| Credit | SO credit block | Credit clerk / sales mgr |
| Quality | QI stock not released | Quality |
| Match fail | Invoice verification variance | Purchasing / AP |
| Capacity | Long WO queue | Shop / planning |

Write escalation into SLAs: red older than N hours auto-CCs the next tier — in workflow, not a pinned chat message.

### Honest 0%

In the shortage scenario, warehouse at 0% **is correct**: nothing to pick, no delivery. Painting warehouse at 50% “preparing” lies to both the portal and the war room. The board’s ethic: **better red than fake green**.

## Exercises

1. Define five customer-visible milestones for your industry; write one internal document condition each.
2. Under Credit block, list downstream documents that must not be created (at least three).
3. Design a red-light SLA: who must respond in how many hours, and who gets CC’d on timeout.
