## Core notes

### Why bother with the vendor landscape

Concepts don't require a vendor, but ignoring vendors costs you twice: in interviews you can't map terminology (what SAP calls a "company code", Yonyou calls an "account set"), and in a future selection project you have no coordinate system. This chapter builds the map — it sells nothing.

### The two giants: SAP and Oracle

**SAP** (Germany, 1972) is synonymous with ERP. R/3 (1992) established the classic client-server-one-database architecture; today's flagship **S/4HANA** sits on SAP's in-memory database HANA and leads with real-time analytics. Traits: rigorous processes and the deepest industry coverage (discrete, process, retail, utilities…), but heavy implementations, long timelines, expensive consultants. Business One serves the SME line.

**Oracle** (US) grew ERP out of database dominance: home-built **Fusion Cloud ERP** plus **NetSuite** (acquired 2016) — the original cloud-native ERP, SaaS-only since 1998 and hugely popular in the midmarket. Traits: deep finance, full-stack cloud infrastructure.

**Microsoft Dynamics 365** is the third pole: deeply wired into Office/Teams/Power BI, with the Power Platform letting business users build their own extensions low-code. Fastest growth in the midmarket.

### The local powers: Yonyou and Kingdee

China's two champions both began as **accounting software** (Yonyou 1988, Kingdee 1993), which set their DNA: **unmatched local tax-and-compliance capability** — Golden Tax interfaces, e-invoicing, Chinese GAAP, out of the box.

- **Yonyou**: #1 share among larger Chinese enterprises. U8 (midsize), NC/U9, and the **BIP** cloud platform.
- **Kingdee**: focused on SMEs and growth companies, the most aggressive cloud pivot — **Cosmic** (large PaaS+SaaS) and **Galaxy** (midsize SaaS).

Foreign multinationals in China often run "global SAP template + Yonyou/Kingdee for local statutory" — a common hybrid architecture in its own right.

### Open source and the challengers

- **Odoo** (Belgium): the modular open-source king — 40+ apps (CRM, inventory, MRP, e-commerce, accounting) enabled à la carte; community edition free, enterprise by subscription. A large partner ecosystem. Great for SMEs and hands-on teams.
- **ERPNext** (India): fully open source (GPL) on the Frappe framework — a frequent self-hosted choice for small teams.
- **Vertical ERPs**: apparel, food service, pharma distribution and more trade generality for built-in industry best practice.

### One concept, many names

| Generic concept | SAP | Oracle/NetSuite | Yonyou/Kingdee | Odoo |
| --- | --- | --- | --- | --- |
| Legal entity | Company Code | Legal Entity / Subsidiary | Account set / org | Company |
| Material | Material | Item | Inventory item | Product |
| Purchase order | PO | PO | 采购订单 | Purchase Order |
| Plant | Plant | Location | Plant / org | Warehouse |
| Chart of accounts | Chart of Accounts | CoA | 科目表 | CoA |

The concepts are perfectly isomorphic — **learn the skeleton and a new skin never changes the brain**.

### Five dimensions for evaluating any ERP

1. **Industry fit**: mature solutions and reference customers in your industry?
2. **Size fit**: does the product's sweet spot (users, document volume) cover your next 5 years?
3. **Ecosystem**: credible local implementation partners and a talent market?
4. **Openness**: complete APIs? cost of connecting your e-commerce/MES/banks?
5. **Total cost of ownership**: the 5-year bill for licenses + implementation + operations + upgrades (see chapter IMP3).

## Exercises

1. Recommend an ERP, with reasons, for: (a) a 500-person export manufacturer; (b) a 30-person cross-border e-commerce firm; (c) a subsidiary of a state-owned conglomerate.
2. Reproduce the synonym table from memory, then add a row: what is a "vendor/supplier" called in each product? (Research it.)
3. Find an ERP job posting, circle every vendor-specific term, and translate each into this course's generic concept.
