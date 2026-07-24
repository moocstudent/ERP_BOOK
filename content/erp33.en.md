## Core notes

### One capture, four layers

```
Hardware event → edge validate/buffer → MES/ERP transaction → stock & cost ledger
```

The sandbox’s four-stage pipe is exactly this. Drop a layer and weak networks or dirty labels will hurt you.

### Choosing auto-ID

| Mode | Good at | Weak at |
| --- | --- | --- |
| 1D/2D barcode | Pieces, documents, bins; cheap | Blind bulk pallet moves |
| RFID/UHF | Gate passes without aiming | Metal/liquid, cost, collisions |
| Vision | Defects, unlabeled scenes | Compute and lighting |
| PLC pulses | High-speed counts, machine sync | No business context (gateway must add doc IDs) |

### Four typical loops

1. **Scan GR**: scan PO → scan label → tolerance/QI checks → movement 101;
2. **Scan issue**: scan WO → scan component+bin → BOM/ATP checks → issue to WIP;
3. **Piece confirm**: pulse or traveler → station confirm → idempotent dedupe → op confirm + backflush;
4. **Cycle count**: scan bin → count → over-threshold approve → write-on/off posting.

### Reliability triad

1. **Validate**: doc exists, qty in tolerance, bin allows material;
2. **Idempotency key**: same gun + label on retry never double-posts (same rule as the integration chapter);
3. **Offline queue**: edge stores to disk, replays in order when the net returns, clocks stay synced.

### Bridge HARDWARE_BOOK again

A scan engine is photo/imaging sense + decode silicon + UART/USB; PLC digital inputs are GPIO at industrial scale; the edge gateway normalizes many buses (industrial cousins of UART/I²C/SPI) into ERP-friendly HTTPS/queues.

**Same discipline**: read the signal right before you drive the most expensive actuator — the posting.

## Exercises

1. Design idempotency-key fields for scan-then-post (include device id, label id, time window at least).
2. If the PLC only emits pulses with no WO id, what master data must the edge layer attach?
3. Name two transaction types you may buffer for 30 minutes offline, and two you must not write straight to the GL.
