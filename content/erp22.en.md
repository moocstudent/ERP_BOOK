## Core notes

### The numbers first: why implementation is high-risk surgery

Industry research keeps returning similar findings: more than half of ERP projects overrun budget or schedule, and roughly a quarter are judged failures by their own companies. Hershey's chaotic go-live starved Halloween shelves; Revlon's failed migration drew a shareholder lawsuit. The common thread in the famous wrecks: **never the software's features — always scope, data, people and discipline**. Treating implementation as an IT project is the first mistake; it is a **management-change project** that happens to ship software.

### The five-phase methodology

Every vendor's method (SAP Activate, Oracle's OUM, local partners' playbooks) shares the same skeleton:

**1. Preparation (months 1–2)** — scope (which modules, entities, processes), team, charter.
The iron triangle: the **sponsor** (an executive who decides and funds), **key users** (each department's best people — the future seeds), **consultants** (method and product experience). Key users must be **released from daily duties, at least partially** — a project whose business "can't spare people" has already scheduled its blueprint rework.

**2. Blueprint (months 2–3)** — where quality is decided.
Workshops map **As-Is**, design **To-Be**; the delta is the **fit-gap analysis**. Each gap gets one of three treatments:

- **Change the process to fit the system** (preferred: standard functionality embodies industry best practice);
- **Configure** within the system's parameters;
- **Custom development** (last resort, logged in the RICEFW list: reports, interfaces, conversions, enhancements, forms, workflows).

The blueprint's biggest trap is **paving the cow path**: the business says "we've always done it this way", the consultant copies it in — and an automated bad process just produces bad results faster.

**3. Realization (months 4–7)** — configure to blueprint, build RICEFW, prepare data templates (chapter IMP2). Discipline: **every custom item must trace to a blueprint decision and an approval** — the defense against scope creep.

**4. Testing & training (months 8–9)** — the test pyramid:

- **Unit tests**: single functions (can we create a PO?);
- **Integration tests**: end-to-end chains (PR through payment), **on real migrated data**;
- **UAT**: key users sign off scenario by scenario against real business cases. UAT signatures are the key to the go-live gate — a rubber-stamp UAT quietly outsources testing to your live customers.

**5. Go-live & support (months 10–12)** — cutover and stabilization (below). Go-live is not the finish: 4–8 weeks of **super users on the floor**, a daily issue list and weekly triage decide whether the system stands or rots.

### Cutover strategies: three ways to jump

| Strategy | How | Pros | Risks |
| --- | --- | --- | --- |
| **Big bang** | old off, new on, one weekend | fast, cheap, no dual running | no way back — fallback plan mandatory |
| **Parallel** | both run 1–3 months | safest, reconcilable | double workload; staff quietly cling to the old system |
| **Phased** | by module or by site | risk spread, rolling experience | temporary interfaces needed; long campaign |

Most midsize projects choose big bang plus full rehearsals; multi-plant groups pilot one site then roll out. Whichever you choose, the **cutover checklist** runs to the hour: Fri 18:00 freeze the legacy → export → migrate → reconcile and sign → Sun 20:00 open the new system — plus the line that matters most: **the time by which, if reconciliation fails, the fallback plan executes**.

## Exercises

1. Place these in their phases: UAT sign-off, fit-gap analysis, cutover rehearsal, key-user appointments, machine-rate configuration.
2. The business insists purchasing approval must keep the legacy "seven-signature chain". Write your analysis framework as the consultant (hint: fit or gap? is seven signatures best practice or historical baggage?).
3. Design a go-live strategy for a two-plant manufacturer, with reasons: which plant first? big bang or parallel? which date for the cutover?
