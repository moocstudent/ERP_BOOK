## Core notes

### Why look at collaboration in 3D

Flowcharts excel at **internal** swimlanes; real delivery happens on a network where **five ends are online at once**:

| End | Physical place | Typical ERP identity |
| --- | --- | --- |
| Supplier | External park | Vendor master · PO · ASN |
| Plant | Shop floor | Plant/shop · production order · confirmation |
| Office | HQ / shared services | Sales org · company code · billing & cash |
| Warehouse | Logistics node | Storage location · delivery / GI |
| Customer | Store or line-side | Customer master · sales order · portal progress |

The 3D scene is not spectacle — it forces the question: **when the light flies, which document was created or posted?** Finish one loop and “multi-party sync” means a shared document state machine, not five private spreadsheets.

### Document flight = status projection

Each hop in the sandbox is an auditable system action:

1. **Customer → office**: sales order (SO) + ATP/credit;
2. **Office → plant**: release production order;
3. **Plant → supplier**: shortage becomes PO (often EDI/portal);
4. **Supplier → plant**: ASN / GR against PO;
5. **Plant → warehouse**: FG receipt;
6. **Warehouse → customer**: delivery and goods issue;
7. **Office → customer**: billing;
8. **Customer → office**: payment clearing.

Partners often **never log into your ERP**, yet portal/EDI/API writes still hit the same documents in your database — otherwise you split into two sources of truth again.

### Cross-end waits: the dark road

Breaks are almost always “one end thinks it’s done; the other never got the document”:

- Vendor says shipped verbally, no ASN → plant MRP still sees shortage;
- Shop finished without confirmation → warehouse sees no shippable stock;
- GI posted, no billing → portal shows received while AR is empty.

The useful war-room question is not “try harder” — it is: **point at the unlit edge — which document, which owner?**

## Exercises

1. Tabulate the eight hops: step / document / from / to / does finance post?
2. If the customer refuses a portal and wants email updates only, design a way that still preserves a single source of truth.
3. Name two common delivery failures you miss if you draw only internal swimlanes and omit supplier and customer.
