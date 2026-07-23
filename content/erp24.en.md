## Core notes

### Deployment shapes: server room, private cloud, SaaS

| Shape | Hardware | Upgrades | Customization freedom | Typical payment |
| --- | --- | --- | --- | --- |
| **On-premise** | yours | yours (often skipped for years) | maximal | one-off license + ~18–22% annual maintenance |
| **Private cloud / hosted** | the cloud provider | you or the host | high | subscription or license + hosting |
| **Public SaaS** | the vendor | the vendor (quarterly, automatic) | bounded (within the extension platform) | per user per month |

The directional fact: new ERP purchases are now cloud-first and vendor R&D has moved almost entirely to cloud editions — yet factory floors (where a network drop must not stop the line) still commonly run "cloud ERP + local MES" hybrids.

### TCO: the five-year bill is the real price

Never compare quote sheets alone. **Total Cost of Ownership** counts at least four buckets:

1. **Software**: licenses (one-off) or subscription (annual, growing with headcount);
2. **Implementation**: consultants + internal effort (often 1–2× the software, more with heavy customization);
3. **Operations**: on-prem = hardware + facility + DBAs + patching; cloud = folded into the subscription;
4. **Hidden**: upgrade projects (on-prem every 5–7 years ≈ a mini re-implementation), custom-code maintenance, training churn.

The sandbox model's law: **cloud is light early and heavy late; on-prem the reverse** — over a long horizon with flat headcount, the on-prem cumulative curve can cross below (a breakeven year); with fast headcount growth, snowballing subscriptions push breakeven earlier. **Customization is the amplifier**: heavy custom code is expensive in both shapes, and in the cloud it adds the standing risk of upgrade breakage.

### Selection: turning gut feel into a scorecard

The disciplined six steps:

1. **Requirements list**: co-written by the business, tiered must / important / nice — musts are veto lines;
2. **Long list → short list**: filter to 3–4 by industry, size, budget;
3. **Demo scripts**: make vendors demo **your scenarios** ("run MRP on this BOM in front of us") — refuse the standard slide show;
4. **Reference calls**: real users of similar industry and size — "would you choose it again?", "what bit you during implementation?";
5. **Scorecard**: e.g. features 40% + technology & openness 20% + partner capability 20% + TCO 20% — weights fixed in advance so nobody back-fits the winner;
6. **Contract**: beyond price, nail three things — **named implementation staff in the contract** (against the elite-presales-rookie-delivery switch), acceptance criteria, and exit terms (your right to export your data).

### The principle: standard first, customize last

This course's recurring theme is sharpest at selection time: **every customization is a private liability you will service for a decade** — your tests, your maintenance, your problem at every upgrade. The test:

> Is this "special requirement" a **core differentiator**, or merely a **habit**?
> Differentiator (a unique pricing model, proprietary process) → worth building. Habit (report layouts, approval depths) → change the process to fit the standard.

### Trends: the next decade

- **Composable ERP**: not one monolith but "core ERP + best-of-breed satellites + iPaaS glue" — flexible, with integration governance becoming the new core competency;
- **Low-code extension**: apps, forms and workflows built inside the platform's guardrails, displacing classic heavy customization;
- **Embedded AI**: invoice OCR auto-posting, intelligent cash application, demand forecasting, anomaly detection — plus arriving fast: **conversational operation** ("split last month's East-region margin by product") and **agentic automation** (an AI planner clearing the low-risk items of the MRP exception list);
- **Continuous delivery replaces big-version leaps**: in the cloud there is no "last major upgrade"; the system evolves quarterly like a phone app — and the organization's learning cadence must keep up.

### Closing the course

Look back across 24 chapters: from "what is ERP" to how to select it, implement it, and grow it into the enterprise's nervous system. One sentence to keep: **ERP is not really software — it is the discipline of running the whole company on one shared set of numbers.** The software will change generations; the discipline will not.

## Exercises

1. Using the sandbox's TCO logic, hand-estimate five-year costs for a 120-user company with medium customization in both shapes — and name the two shakiest assumptions in your model.
2. Write a 10-item requirements list (4 must, 4 important, 2 nice) for a food manufacturer with an e-commerce channel (hint: is batch traceability a must or an important?).
3. Essay: "Composable ERP turns selection from choosing a vendor into choosing an architecture." Agree or not? What new costs does integration governance bring?
