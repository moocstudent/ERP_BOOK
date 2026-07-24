# ERP 自学 · self-taught erp

中英双语的 ERP(企业资源计划)自学网站:**11 个模块、34 章**,每章「沙盘 + 解释」——含 MRP、角色、3D 多端协同、工厂硬件,以及**协议分层对接**(RS-485/Modbus ↔ MQTT/HTTPS ↔ ERP)。

A bilingual ERP self-study site: **11 modules, 34 chapters** — including factory hardware and **protocol-layer integration** (RS-485/Modbus ↔ MQTT/HTTPS ↔ ERP).

## 模块 Modules

| # | 模块 | Chapters |
| --- | --- | --- |
| E1–E8 | 基础 → 实施 | FD / MD / P2P / O2C / MFG / INV / FIN / IMP |
| E9 | 角色视角 Role Perspectives | ROLE1–ROLE3 |
| E10 | 多端协同 Multi-party Sync | COL1–COL3 |
| E11 | 工厂硬件与现场采集 Factory Hardware | HW1–HW4 |

### E11 工厂硬件

- **HW1** 硬件图鉴 · **HW2** 安灯 · **HW3** 扫码到过账
- **HW4** `protoStack` — **RS-485/Modbus 连设备, MQTT/HTTPS 进 ERP**(含 OPC-UA / RF 枪对照情景)
- 交互拓扑用 **SVG 拓扑图 / 分层流程图** 展示，并与 E10 的 **Three.js 3D** 对照（五端单据、产线令牌）
- 硬件接线与 MCU 侧实验对照姊妹站 **HARDWARE_BOOK H9**（扫码 UART/HID、安灯 GPIO、边缘网关迷你实验）

## 运行

```bash
python -m http.server 5670 --directory D:/webcode/ERP_BOOK
```

协议章（SVG 拓扑）: http://localhost:5670/?v=6#/c/erp34
多端 3D: http://localhost:5670/?v=6#/c/erp28

MIT · 2026
