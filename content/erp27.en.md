## Core notes

### Twin pillars: least privilege and segregation of duties

"Who may do what" in ERP is constrained by two mechanisms together:

1. **Authorization**: does the menu even show "Post invoice" after login — **may execute**;
2. **Workflow**: after save, must a manager approve — **may approve**.

Workflow without authorization: a cashier might still change a vendor bank account. Authorization without workflow: anyone can create a huge PO. You need both.

Add one more principle — **least privilege**: grant only the transactions required to do the job, never a "might need someday" kitchen sink.

### Three layers: user → role → authorization objects

Vendor names differ; the skeleton is usually three layers:

```
User (Zhang) ──assigned──▶ Role pack (Buyer / Warehouse clerk / …)
                              │
                              └──contains──▶ Auth objects (txn codes, company code, plant, amount limits…)
```

Design role packs by **job**, then assign them to people — when someone leaves, revoke the role; do not claw back menus one by one. Multi-job users stack packs, then SoD rules (next section) check whether the combination is dangerous.

### Segregation of duties: conflicting pairs are the point

SoD does not ask "is this too much access?" — it asks about **dangerous combinations**:

| Conflicting pair | Risk story |
| --- | --- |
| Create/change PO × goods receipt | Fake order + fake receipt, off-books stock |
| Create/change PO × post invoice | Self-set prices |
| Goods receipt × post invoice | Bypass three-way match |
| Post invoice × run payment | Classic misappropriation path |
| Change vendor bank × payment | Divert funds |
| Sales order × goods issue | Divert goods |
| Goods issue × billing | Manipulate revenue timing |

In the sandbox, ticking rights marks △ (potential conflict) and ✗ (this user currently holds both). Real projects scan everyone with a rules engine; before go-live and every quarter you should produce a **conflict-user list**. Conflicts must be split across roles or mitigated with compensating controls (dual custody, sampling).

### Workflow boundaries and traps

Workflow handles "how do we release an exception above normal rights". Common designs:

- **Amount thresholds**: supervisor / manager / VP+finance by band;
- **Substitutes**: auto-forward on leave — limit scope and duration;
- **Emergency path**: skip-approval "rush" — must leave an audit mark and a post-hoc review, or it is not control.

Remember: **approver said yes ≠ executor may do anything**. Workflow clears this document; authorization still limits master-data edits and payment execution.

### Audit trail: reconstruct every click after the fact

Post-event control rests on three traces:

1. **Change logs**: who, when, which master/config field (old → new);
2. **Document flow**: which GR / PO / PR this invoice references — unbroken chains enable accountability;
3. **Journal numbers and users**: even auto-posts carry the triggering business user or batch job.

Audit does not ask "is there a log switch?" — it asks whether **critical objects force logging, whether logs resist tampering, how long they keep, and who may read them**. Turning change logs off "to save space" is removing the black box on purpose.

### Packing a job: sample buyer role

A minimal useful "Buyer" pack roughly includes:

- Display/process purchase requisitions; create/change PO (own company code + purchasing org);
- Display vendors and info records (usually **cannot** change bank details — that is master-data or finance);
- Display GR and invoice status (cannot post GR, cannot run payment);
- Display own purchasing-group reports and exceptions.

Explicitly **exclude**: GR posting, invoice verification posting, payment run, vendor bank fields, posting-period switches. Even if workflow is loose, SoD still has a floor.

### Closing the role arc

The three role threads meet here:

- **Leadership** (ROLE1) interrogates exceptions from the cockpit;
- **Front line** (ROLE2) walks loops with documents;
- **Authorization & SoD** (ROLE3) keep "who can" aligned with "who should", and auditable.

Processes teach you to run the system; roles teach you to put it in the right hands — and that often decides, by month three after go-live, whether ERP is the company's nervous system or a pile of unloved menus.

## Exercises

1. Design an "AP accountant" role pack: five rights to grant, five to forbid.
2. User U01 holds both "change vendor bank" and "run payment". Write your response steps (immediate action, root cause, compensating control).
3. Explain why "two people review a paper invoice before paying" can still be insufficient after ERP — and why SoD must be split in the system.
