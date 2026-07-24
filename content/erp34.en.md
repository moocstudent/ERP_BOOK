## Core notes

### One sentence first

**RS-485 / Modbus solves “how devices link to each other”; MQTT / HTTPS solves “how events enter IT/ERP”.**  
Between them you need an **edge gateway** as translator — ERP never “listens” to raw 485 register frames.

### Four-layer integration stack (memorize this)

```
┌─────────────────────────────────────────────┐
│ ④ ERP / MES transaction layer               │
│    confirmations, GR, downtime, stock, cost │
│    entry: REST API / IDoc / middleware      │
├─────────────────────────────────────────────┤
│ ③ Messaging / integration layer             │
│    MQTT broker, Kafka, iPaaS, HTTPS hooks   │
│    topics/queues, QoS, retry, dead-letter   │
├─────────────────────────────────────────────┤
│ ② Edge gateway layer                        │
│    protocol convert · enrich · validate     │
│    · offline buffer (IPC / soft gateway)    │
├─────────────────────────────────────────────┤
│ ① Fieldbus / device layer                   │
│    RS-485 + Modbus RTU, CAN, IO-Link…       │
│    meters, PLCs, andon controllers, nodes   │
└─────────────────────────────────────────────┘
```

The `protoStack` sandbox offers two views:

- **SVG topology**: shop-floor net (left) vs IT net (right); an orange packet flies the active-layer path (scene A shows multi-drop 485 → gateway → MQTT fan-out to MES/ERP).
- **Layer flowchart**: the four-layer stack laid out horizontally, synced with the clickable layer cards below.

Andon `andonBoard`, scan `scanToPost`, multi-party `collabWorld`, and line twin `factoryTwin` also ship plane topology SVGs alongside their 3D / state-machine sandboxes.

### ① Field layer: why RS-485 + Modbus

| Point | Meaning |
| --- | --- |
| **RS-485** | Physical: differential, multi-drop, noise-hardy, ~100 m runs — common by cabinets |
| **Modbus RTU** | App: master polls slaves, reads holding regs/coils (“shift yield”, “running bit”) |
| **Not for ERP** | Frames hold address + register values — no material, WO, or posting period |

HARDWARE_BOOK analogy: UART grown into a multi-drop differential bus, plus a convention for “which register”.

Typical wiring:

```
[Temp/RH]──┐
[Meter]────┼── RS-485 bus ──► [Edge gateway as Modbus master]
[PLC]──────┘
```

### ② Edge gateway: what the translator does

The gateway loops four jobs:

1. **Poll** Modbus: `read slave 3 regs 40001–40004`;
2. **Map**: register values + station config → `{ wo: "WO-5521", op: "0020", good: 12 }`;
3. **Validate**: WO released? qty sane? clocks synced?;
4. **Publish**: JSON via `MQTT publish` or `HTTPS POST`; on failure, local queue.

Skip this layer and either ERP drowns in register floods or the line “forgets” during outages.

### ③ Message layer: how MQTT meets ERP

Common pattern (sandbox default):

```
Topic:  plant/{plantId}/line/{lineId}/confirm
QoS:    1 (at least once)  →  ERP side must be idempotent
Retain: false              →  don’t retain confirmation events
```

Sample payload:

```json
{
  "eventId": "gw01-20260724-153012-0007",
  "plant": "1000",
  "wo": "WO-5521",
  "op": "0020",
  "goodQty": 12,
  "scrapQty": 0,
  "hours": 0.8,
  "source": { "bus": "modbus-rtu", "slave": 3, "reg": 40001 },
  "ts": "2026-07-24T15:30:12+08:00"
}
```

**How does ERP take MQTT?**

- Path A: ERP/MES ships an MQTT adapter → internal confirm API;
- Path B: middleware subscribes MQTT → REST/IDoc into ERP (common with packaged suites);
- Path C: gateway skips MQTT and `HTTPS POST /api/confirmations` (typical for guns/tablets).

MQTT fits **many async events on flaky nets**; REST fits **request/response with instant OK/fail**. Plants often run both.

### ④ ERP transaction layer: subscribe ≠ posted

On message receipt the adapter must still:

1. **Idempotency** on `eventId` (retries must not double-post);
2. Validate WO/material masters;
3. Call the standard transaction (confirm, GR 101, downtime…);
4. **Acknowledge**: success ACK; failure → dead-letter + alert — never silent drop.

Same survival kit as IMP2: idempotency, retry/DLQ, reconciliation.

### Three contrast scenes (switchable in the sandbox)

| Scene | Field side | IT side | Typical use |
| --- | --- | --- | --- |
| **A piece confirm** | PLC↔gateway **RS-485/Modbus** | gateway→broker **MQTT**→ERP | High-speed auto confirm |
| **B handheld GR** | RF gun **USB/Wi-Fi HID or proprietary** | app **HTTPS REST**→ERP | Warehouse GR/GI |
| **C CNC collect** | CNC **OPC-UA** | gateway→**MQTT** or OPC bridge | Utilization, program, alarms |

Note: **OPC-UA usually rides shop Ethernet**, not 485 — but the layered idea (field protocol → gateway → IT message) stays.

### Anti-patterns (classic project fails)

1. Every sensor MQTT-direct to the public cloud, no gateway — security and master-data mapping both collapse;
2. ERP itself as Modbus master — management software glued to cabinet topology;
3. MQTT QoS1 without idempotency — weak nets double-post;
4. Treating raw register values as “business done” — yield without WO context is noise.

### Quick chooser

| Need | Prefer |
| --- | --- |
| Many cabinet meters, long noisy runs | RS-485 + Modbus RTU |
| Rich models on shop Ethernet | OPC-UA |
| Cloud / many subscribers / intermittent net | MQTT |
| User needs instant success/fail | HTTPS REST |
| Many systems, heavy mapping | MQTT/REST + iPaaS (IMP2) |

## Exercises

1. Draw your line’s four-layer diagram with real protocol names (or “proposed”).
2. Write MQTT topics + minimal JSON for andon call and andon clear.
3. Gateway reads `good=12` but the config lost the WO id — publish, drop, or dead-letter? Why?
