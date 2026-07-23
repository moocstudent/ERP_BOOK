# ERP 自学 · self-taught erp

中英双语的 ERP(企业资源计划)自学网站:**8 个模块、24 章**,每章「沙盘 + 解释」——先玩可交互的业务沙盘(MRP 展开、三单匹配、库存估价、复式记账、TCO 对比……),再读讲清逻辑的双语讲义。

A bilingual (zh/en) self-study site for ERP: **8 modules, 24 chapters**, each following "sandbox + explanation" — play a live business sandbox first (MRP explosion, three-way match, inventory valuation, double-entry postings, TCO comparison…), then read the notes that explain the logic. Vendor-neutral throughout.

## 模块 Modules

| # | 模块 | Chapters |
| --- | --- | --- |
| E1 | ERP 基础与全景 Foundations | FD1–FD3 |
| E2 | 主数据与组织建模 Master Data | MD1–MD3 |
| E3 | 采购到付款 Procure-to-Pay | P2P1–P2P3 |
| E4 | 订单到收款 Order-to-Cash | O2C1–O2C3 |
| E5 | 生产与计划 Manufacturing & Planning | MFG1–MFG3 |
| E6 | 库存与仓储 Inventory & Warehousing | INV1–INV3 |
| E7 | 财务与成本 Finance & Controlling | FIN1–FIN3 |
| E8 | 实施与集成 Implementation & Integration | IMP1–IMP3 |

## 技术 Stack

无构建(no build):React 18 UMD + Babel standalone + marked,浏览器里直接跑 JSX。进度/主题/语言保存在 `localStorage`(键 `erp_book_*`),无登录、无后端。

- `index.html` — 入口(CDN 脚本 + 各 jsx)
- `styles.css` — 设计系统(与 MATH_BOOK/EFFECTS_BOOK 同源)
- `erp.css` — 沙盘演示样式
- `i18n.jsx` / `data.jsx` / `viz.jsx` / `viz2.jsx` / `pages.jsx` / `app.jsx`
- `content/<id>.<zh|en>.md` — 每章双语讲义(fetch 加载,需 http 访问)

## 运行 Run

```bash
python -m http.server 5670 --directory D:/webcode/ERP_BOOK
```

然后打开 http://localhost:5670 (must be served over http — the `.md` notes are fetched).

MIT · 2026
