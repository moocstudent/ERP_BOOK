/* =========================================================
   viz2.jsx — live business sandboxes, part 2: E5–E8
   + the <Viz> registry (loaded after viz.jsx).
   ========================================================= */

/* ============================================================
   MFG1 · planningPyramid — S&OP → MPS → MRP → scheduling
   ============================================================ */
function PlanningPyramidViz() {
  const L = useL();
  const [sel, setSel] = React.useState(0);
  const LV = [
    { zh: "S&OP 销售与运营计划", en: "S&OP", w: 96,
      d: [["周期 Cadence", L("月度滚动,展望 12–24 月", "monthly rolling, 12–24 mo horizon")],
          ["颗粒度 Granularity", L("产品族 · 金额/总量", "product families · value/volume")],
          ["负责人 Owner", L("管理层(销售+运营+财务)", "leadership (sales + ops + finance)")],
          ["回答 Answers", L("明年大概卖多少?产能钱够不够?", "roughly how much next year? enough capacity and cash?")]] },
    { zh: "MPS 主生产计划", en: "Master Production Schedule", w: 76,
      d: [["周期", L("周度,展望 3–6 月", "weekly, 3–6 mo horizon")],
          ["颗粒度", L("具体型号 · 台数/周", "specific models · units per week")],
          ["负责人", L("计划部", "planning dept.")],
          ["回答", L("每个型号每周排产多少?", "how many of each model, which week?")]] },
    { zh: "MRP 物料需求计划", en: "MRP", w: 56,
      d: [["周期", L("每日/每夜运算", "nightly / daily run")],
          ["颗粒度", L("每颗物料 · 数量+日期", "every material · qty + date")],
          ["负责人", L("系统自动 + 计划员处理例外", "the system, planners handle exceptions")],
          ["回答", L("什么料、何时、买/造多少?", "which material, when, buy or make how many?")]] },
    { zh: "车间排程与执行", en: "Shop-floor scheduling", w: 38,
      d: [["周期", L("每日/每班", "daily / per shift")],
          ["颗粒度", L("工单 · 工序 · 机台", "orders · operations · machines")],
          ["负责人", L("车间调度", "shop-floor dispatcher")],
          ["回答", L("今天这台机器先干哪个活?", "which job runs first on this machine today?")]] },
  ];
  const v = LV[sel];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-pyramid">
          {LV.map((x, i) => (
            <div key={i} className={`erp-pyr-level ${i === sel ? "on" : ""}`}
              style={{ width: `${x.w}%` }} onClick={() => setSel(i)}>
              <span>{L(x.zh, x.en)}</span>
              {L("", " ") && <span className="p-en">{i === sel ? "▼" : ""}</span>}
            </div>
          ))}
        </div>
        <div className="erp-doc-detail">
          <strong>{L(v.zh, v.en)}</strong>
          <div className="erp-kv" style={{ marginTop: 10 }}>
            {v.d.map(([k, val], i) => <div className="pair" key={i}><span className="k">{k}</span><span>{val}</span></div>)}
          </div>
        </div>
      </div>
      <div className="viz-readout">
        {L("越往下:期间越短、颗粒度越细、改动越贵。上层定方向,下层出指令——每层的输出就是下一层的输入。跳层直接改车间计划,是计划体系崩坏的开始。",
           "Going down: shorter horizons, finer granularity, costlier changes. Upper levels set direction; lower levels issue instructions — each level's output is the next one's input. Skipping levels to hack the shop schedule is how planning systems rot.")}
      </div>
    </div>
  );
}

/* ============================================================
   MFG2 · mrpRun — two-level MRP explosion with lead times
   ============================================================ */
function MrpRunViz() {
  const L = useL();
  const [demand, setDemand] = React.useState(200);
  const [fgStock, setFgStock] = React.useState(40);
  const [whStock, setWhStock] = React.useState(120);
  const [whLt, setWhLt] = React.useState(2);
  const asmLt = 1, dueWk = 5, perBike = 2;
  const fgNet = Math.max(0, demand - fgStock);
  const fgRelease = dueWk - asmLt;
  const whGross = fgNet * perBike;
  const whNet = Math.max(0, whGross - whStock);
  const whRelease = fgRelease - whLt;
  const late = whNet > 0 && whRelease < 1;
  return (
    <div>
      <div className="erp-stage">
        <table className="erp-table">
          <thead>
            <tr><th>{L("物料 / 步骤", "Item / step")}</th><th>{L("计算", "Calculation")}</th><th>{L("结果", "Result")}</th></tr>
          </thead>
          <tbody>
            <tr className="hl"><td colSpan={3} style={{ textAlign: "left" }}>🚲 {L("自行车(成品)· 需求在第", "Bicycle (FG) · demand due W")}{dueWk}{L(" 周", "")}</td></tr>
            <tr><td>{L("毛需求", "Gross requirement")}</td><td className="lbl">{L("客户订单", "customer orders")}</td><td className="erp-qty">{demand}</td></tr>
            <tr><td>{L("净需求", "Net requirement")}</td><td className="lbl">{demand} − {fgStock} ({L("现有", "on-hand")})</td><td className="erp-qty">{fgNet}</td></tr>
            <tr><td>{L("计划(生产)订单", "Planned (production) order")}</td><td className="lbl">{L("下达", "release")} = W{dueWk} − {asmLt}{L("周组装", "wk assembly")}</td>
              <td className={fgNet ? "pos" : "lbl"}>{fgNet ? `${fgNet} @ W${fgRelease}` : L("无需生产", "nothing to make")}</td></tr>
            <tr className="hl"><td colSpan={3} style={{ textAlign: "left" }}>◎ {L("车轮(下层)· 每台 2 只", "Wheel (component) · 2 per bike")}</td></tr>
            <tr><td>{L("毛需求(由上层展开)", "Gross req. (exploded)")}</td><td className="lbl">{fgNet} × {perBike}, {L("需求日", "needed")} W{fgRelease}</td><td className="erp-qty">{whGross}</td></tr>
            <tr><td>{L("净需求", "Net requirement")}</td><td className="lbl">{whGross} − {whStock} ({L("现有", "on-hand")})</td><td className="erp-qty">{whNet}</td></tr>
            <tr><td>{L("计划(采购)订单", "Planned (purchase) order")}</td><td className="lbl">{L("下达", "release")} = W{fgRelease} − {whLt}{L("周采购", "wk purchasing")}</td>
              <td className={whNet ? (late ? "neg" : "pos") : "lbl"}>{whNet ? `${whNet} @ W${whRelease}` : L("库存足够", "stock covers it")}</td></tr>
          </tbody>
        </table>
        {late && (
          <div className="erp-doc-detail" style={{ borderLeftColor: "var(--accent)" }}>
            <strong>{L("⚠ 例外信息:提前期不足!", "⚠ Exception: lead time violated!")}</strong>
            <div className="erp-note">
              {L(`车轮需要在第 ${whRelease} 周下单,但现在已经是第 1 周——按正常提前期已来不及。计划员的选项:加急采购(加钱)、部分交货、或与销售商量推迟交期。MRP 不会替你决定,它只把矛盾暴露出来。`,
                 `The wheel order must release in week ${whRelease}, but it is already week 1 — the normal lead time no longer fits. The planner's options: expedite (pay more), partial delivery, or renegotiate the date with sales. MRP never decides for you — it exposes the conflict.`)}
            </div>
          </div>
        )}
      </div>
      <div className="viz-ctrl">
        <Slider label={L("成品需求 @W5", "FG demand @W5")} min={0} max={500} step={10} value={demand} onChange={setDemand} />
        <Slider label={L("成品现有库存", "FG on-hand")} min={0} max={200} step={10} value={fgStock} onChange={setFgStock} />
        <Slider label={L("车轮现有库存", "Wheel on-hand")} min={0} max={600} step={20} value={whStock} onChange={setWhStock} />
        <Slider label={L("车轮采购提前期", "Wheel lead time")} min={1} max={4} value={whLt} onChange={setWhLt} unit={L(" 周", " wk")} />
      </div>
      <CodeOut code={`${L("MRP 三板斧(每层重复)", "MRP's three moves (repeat per level)")}:
1. ${L("净算", "net")}      ${L("净需求", "net req.")} = max(0, ${L("毛需求", "gross")} − ${L("现有", "on-hand")} − ${L("在途", "open receipts")})
2. ${L("展开", "explode")}   ${L("子项毛需求", "component gross")} = ${L("父项净需求", "parent net")} × ${L("单位用量", "qty-per")}
3. ${L("偏置", "offset")}    ${L("下达日", "release date")} = ${L("需求日", "due date")} − ${L("提前期", "lead time")}`} />
      <div className="viz-readout">
        {L("把车轮提前期调到 4 周,或把需求加大——看例外信息何时出现。真实系统里 MRP 每晚对几万颗物料跑同样的三步,计划员早上处理的就是这些红色例外。",
           "Push the wheel lead time to 4 weeks or raise demand and watch the exception appear. A real system runs these same three moves nightly over tens of thousands of materials; the red exceptions are what planners triage each morning.")}
      </div>
    </div>
  );
}

/* ============================================================
   MFG3 · workOrder — production order lifecycle & WIP cost
   ============================================================ */
function WorkOrderViz() {
  const L = useL();
  const [cur, setCur] = React.useState(0);
  const [scrap, setScrap] = React.useState(2);
  const qty = 50, matCost = 700 * qty / 50, laborRate = 80, hours = 25, ohRate = 60;
  const mat = 35000, labor = laborRate * hours * 10, oh = ohRate * hours * 10; // scaled demo numbers
  const good = Math.max(0, qty - scrap);
  const total = mat + labor + oh;
  const unitCost = good > 0 ? total / good : 0;
  const STEPS = [
    { zh: "创建工单", en: "Create order", dZh: "计划订单转为生产工单:50 台自行车,带组件清单(BOM 副本)与工序(工艺路线副本)。状态 CRTD。", dEn: "The planned order becomes a production order: 50 bikes, with a component list (BOM copy) and operations (routing copy). Status CRTD.", wip: 0 },
    { zh: "下达", en: "Release", dZh: "检查料是否齐、产能是否有,放行到车间。可以打印领料单与工票。状态 REL。", dEn: "Availability and capacity checked, order released to the floor. Pick lists and job tickets print. Status REL.", wip: 0 },
    { zh: "领料", en: "Issue materials", dZh: "仓库按组件清单发料:原材料库存 −,价值进入在制品(WIP)。借:生产成本 / 贷:原材料 ¥35,000。", dEn: "The warehouse issues components: raw-material stock down, value flows into WIP. Dr Production cost / Cr Raw materials ¥35,000.", wip: mat },
    { zh: "报工", en: "Confirm operations", dZh: `各工序报工时与数量:250 机时 × 费率。人工 ¥${fm(labor)} 与制造费用 ¥${fm(oh)} 追加进 WIP。`, dEn: `Operations confirm hours and quantities: 250 machine hours × rates. Labor ¥${fm(labor)} and overhead ¥${fm(oh)} add into WIP.`, wip: mat + labor + oh },
    { zh: "完工入库", en: "Goods receipt", dZh: `合格品入成品库,WIP 转出:借:库存商品 / 贷:生产成本。报废 ${scrap} 台不入库,但成本已花——由合格品分摊。`, dEn: `Good units enter finished stock; WIP transfers out: Dr Finished goods / Cr Production cost. The ${scrap} scrapped units never arrive — but their cost was spent, borne by the good ones.`, wip: 0 },
    { zh: "结算与关闭", en: "Settle & close", dZh: "月末结算:工单成本清零,差异转出,状态 TECO/CLSD。工单从此只读,留作成本追溯。", dEn: "At month-end the order settles: balance to zero, variances posted out, status TECO/CLSD. The order becomes read-only cost history.", wip: 0 },
  ];
  const s = STEPS[cur];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-flow">
          {STEPS.map((x, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="erp-flow-arrow">→</div>}
              <div className={`erp-doc ${i < cur ? "on" : ""} ${i === cur ? "now" : ""}`} onClick={() => setCur(i)}>
                <div className="d-code">{String(i + 1).padStart(2, "0")}</div>
                <div className="d-name">{L(x.zh, x.en)}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="erp-doc-detail">
          <strong>{L(s.zh, s.en)}</strong>
          <p style={{ margin: "6px 0" }}>{L(s.dZh, s.dEn)}</p>
          <div className="erp-bars">
            <div className="erp-bar-row">
              <span>{L("在制品 WIP", "WIP balance")}</span>
              <div className="b-track"><div className="b-fill acc" style={{ width: `${(s.wip / (total || 1)) * 100}%` }} /></div>
              <span className="b-val">¥{fm(s.wip)}</span>
            </div>
          </div>
          {cur >= 4 && (
            <div className="erp-posting">
              {L("单位成本", "Unit cost")} = (¥{fm(mat)} {L("料", "mat")} + ¥{fm(labor)} {L("工", "labor")} + ¥{fm(oh)} {L("费", "OH")}) ÷ {good} {L("合格台", "good units")} = ¥{fm(round2(unitCost))}{L(" / 台", " / unit")}
            </div>
          )}
        </div>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("报废数量", "Scrap qty")} min={0} max={10} value={scrap} onChange={setScrap} unit={L(" 台", " EA")} />
      </div>
      <StepCtl cur={cur} setCur={setCur} max={STEPS.length - 1} L={L} />
      <div className="viz-readout">
        {L("走到第 5 步再拖动报废数:总成本不变,合格品变少,单位成本上升——报废不是「少了几台」,而是「每台都变贵了」。",
           "Reach step 5 and drag the scrap slider: total cost stays put, good output shrinks, unit cost climbs. Scrap isn't 'a few units missing' — it makes every remaining unit more expensive.")}
      </div>
    </div>
  );
}

/* ============================================================
   INV1 · stockMovement — stock types as a state machine
   ============================================================ */
function StockMovementViz() {
  const L = useL();
  const init = { un: 300, qi: 0, bl: 0 };
  const [st, setSt] = React.useState(init);
  const [log, setLog] = React.useState([]);
  const post = (mvt, zh, en, fn) => {
    setSt((s) => {
      const next = fn({ ...s });
      if (!next) return s;
      setLog((lg) => [`${String(lg.length + 1).padStart(2, "0")} · ${mvt} · ${L(zh, en)}`, ...lg].slice(0, 12));
      return next;
    });
  };
  const total = st.un + st.qi + st.bl;
  const B = ({ v, cls, zh, en }) => (
    <div className="erp-bar-row">
      <span>{L(zh, en)}</span>
      <div className="b-track"><div className={`b-fill ${cls}`} style={{ width: `${total ? (v / Math.max(total, 400)) * 100 : 0}%` }} /></div>
      <span className="b-val">{v}</span>
    </div>
  );
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-bars">
          <B v={st.un} cls="" zh="非限制库存(可用可卖)" en="Unrestricted (usable, sellable)" />
          <B v={st.qi} cls="warn" zh="质检库存(待检验)" en="Quality inspection (pending)" />
          <B v={st.bl} cls="acc" zh="冻结库存(不可用)" en="Blocked (unusable)" />
        </div>
        <div className="erp-note">{L("总账面库存", "Total book stock")}: <strong>{total}</strong> · {L("其中可承诺给销售的只有非限制部分", "only the unrestricted part is promisable to sales")}: <strong>{st.un}</strong></div>
        <div className="erp-btnrow">
          <button className="btn erp-minibtn" onClick={() => post("101", "采购收货 +100 → 质检", "GR +100 → inspection", (s) => ({ ...s, qi: s.qi + 100 }))}>{L("收货 +100(入质检)", "Receive +100 (to QI)")}</button>
          <button className="btn erp-minibtn" onClick={() => post("321", "质检合格 → 非限制", "QI pass → unrestricted", (s) => s.qi >= 50 ? { ...s, qi: s.qi - 50, un: s.un + 50 } : null)}>{L("质检合格 50", "QI pass 50")}</button>
          <button className="btn erp-minibtn" onClick={() => post("350", "质检不合格 → 冻结", "QI fail → blocked", (s) => s.qi >= 50 ? { ...s, qi: s.qi - 50, bl: s.bl + 50 } : null)}>{L("质检不合格 50", "QI fail 50")}</button>
          <button className="btn erp-minibtn" onClick={() => post("261", "生产领料 −80", "Issue to production −80", (s) => s.un >= 80 ? { ...s, un: s.un - 80 } : null)}>{L("生产领料 −80", "Issue −80")}</button>
          <button className="btn erp-minibtn" onClick={() => post("551", "报废(自冻结)", "Scrap from blocked", (s) => s.bl >= 50 ? { ...s, bl: s.bl - 50 } : null)}>{L("报废 50(冻结→无)", "Scrap 50 (blocked)")}</button>
          <button className="btn erp-minibtn" onClick={() => post("701", "盘盈 +5", "Count gain +5", (s) => ({ ...s, un: s.un + 5 }))}>{L("盘盈 +5", "Count +5")}</button>
          <button className="btn erp-minibtn" onClick={() => { setSt(init); setLog([]); }}>{L("重置", "Reset")}</button>
        </div>
        {log.length > 0 && <div className="erp-log">{log.map((l, i) => <div key={i}>{l}</div>)}</div>}
      </div>
      <div className="viz-readout">
        {L("每个按钮都是一个「移动类型」(101 收货、321 转库、261 领料、551 报废、701 盘盈)。留意:按钮在库存不够时会拒绝执行——负库存在标准 ERP 里是被禁止的;每一条日志都是一张不可删除的物料凭证。",
           "Each button is a movement type (101 receipt, 321 transfer, 261 issue, 551 scrap, 701 count gain). Notice buttons refuse when stock is short — negative stock is forbidden in a standard ERP; and every log line is an undeletable material document.")}
      </div>
    </div>
  );
}

/* ============================================================
   INV2 · reorderPoint — sawtooth simulation on canvas
   ============================================================ */
function ReorderPointViz() {
  const L = useL();
  const [d, setD] = React.useState(20);      // demand/day
  const [lt, setLt] = React.useState(7);     // lead time days
  const [ss, setSs] = React.useState(60);    // safety stock
  const [q, setQ] = React.useState(300);     // order qty
  const ref = React.useRef(null);
  const rop = d * lt + ss;
  React.useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const W = cv.clientWidth || 640, H = 260;
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext("2d"); ctx.scale(dpr, dpr);
    const css = (n, fb) => { try { return getComputedStyle(document.documentElement).getPropertyValue(n).trim() || fb; } catch (e) { return fb; } };
    const inkSoft = css("--muted", "#888"), accent = css("--accent", "#ff4d1f"), primary = css("--primary", "#0e3a3a");
    ctx.clearRect(0, 0, W, H);
    // simulate 120 days
    const days = 120; let stock = rop + q; let pend = []; const series = [];
    for (let t = 0; t < days; t++) {
      pend = pend.filter((p) => { if (p.due === t) { stock += q; return false; } return true; });
      stock -= d;
      if (stock <= rop && pend.length === 0) pend.push({ due: t + lt });
      series.push(Math.max(stock, -40));
    }
    const maxY = Math.max(rop + q + 40, ...series) * 1.05;
    const x = (t) => 38 + (t / (days - 1)) * (W - 50);
    const y = (v) => H - 24 - ((v) / maxY) * (H - 40);
    // axes
    ctx.strokeStyle = inkSoft; ctx.lineWidth = 1; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.moveTo(38, 8); ctx.lineTo(38, y(0)); ctx.lineTo(W - 10, y(0)); ctx.stroke(); ctx.globalAlpha = 1;
    // ROP + SS lines
    const dash = (v, color, label) => {
      ctx.strokeStyle = color; ctx.setLineDash([5, 4]); ctx.beginPath();
      ctx.moveTo(38, y(v)); ctx.lineTo(W - 10, y(v)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = color; ctx.font = "600 10px JetBrains Mono, monospace";
      ctx.fillText(label + " " + v, 44, y(v) - 4);
    };
    dash(rop, accent, "ROP");
    dash(ss, inkSoft, "SS");
    // stock polyline
    ctx.strokeStyle = primary; ctx.lineWidth = 2; ctx.beginPath();
    series.forEach((v, t) => { const px = x(t), py = y(v); t === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); });
    ctx.stroke();
    // stockout shading
    ctx.fillStyle = accent; ctx.globalAlpha = 0.15;
    series.forEach((v, t) => { if (v < 0) ctx.fillRect(x(t), y(0), (W - 50) / days + 1, 18); });
    ctx.globalAlpha = 1;
  }, [d, lt, ss, q]);
  const stockout = d * lt > rop; // never true by construction; guard anyway
  return (
    <div>
      <div className="erp-canvas-wrap"><canvas ref={ref} style={{ height: 260 }} /></div>
      <div className="viz-ctrl">
        <Slider label={L("日均需求", "Daily demand")} min={5} max={60} value={d} onChange={setD} unit={L(" 件/天", "/day")} />
        <Slider label={L("采购提前期", "Lead time")} min={1} max={20} value={lt} onChange={setLt} unit={L(" 天", " d")} />
        <Slider label={L("安全库存", "Safety stock")} min={0} max={300} step={10} value={ss} onChange={setSs} />
        <Slider label={L("订货批量", "Order qty")} min={100} max={800} step={20} value={q} onChange={setQ} />
      </div>
      <CodeOut code={`${L("再订货点", "Reorder point")} ROP = ${L("日均需求", "daily demand")} × ${L("提前期", "lead time")} + ${L("安全库存", "safety stock")}
        = ${d} × ${lt} + ${ss} = ${rop}
${L("库存降到 ROP → 触发订货(批量", "stock hits ROP → order placed (qty")} ${q})${L(",提前期后到货", ", arrives after the lead time")}`} />
      <div className="viz-readout">
        {L("把安全库存调到 0,再把日均需求调大:曲线开始扎进红色区域(缺货)。安全库存保的不是「平均」,而是「波动」——平均需求刚好用完 ROP 里的提前期需求,一点意外就断料。",
           "Set safety stock to 0 and raise demand: the curve starts dipping into the red (stockout). Safety stock insures against variability, not averages — average demand exactly consumes the lead-time portion of ROP, so any surprise breaks supply.")}
      </div>
    </div>
  );
}

/* ============================================================
   INV3 · valuation — moving average / FIFO / standard cost
   ============================================================ */
function ValuationViz() {
  const L = useL();
  const [method, setMethod] = React.useState("MAP");
  const STD = 11;
  const TX = [
    { t: "R", q: 100, p: 10 }, { t: "R", q: 100, p: 13 }, { t: "I", q: 120 },
    { t: "R", q: 50, p: 15 }, { t: "I", q: 80 },
  ];
  // compute rows per method
  const rows = [];
  let qty = 0, val = 0, layers = [], pdSum = 0;
  TX.forEach((tx, i) => {
    let desc, unit, moveVal;
    if (tx.t === "R") {
      qty += tx.q;
      if (method === "MAP") { val += tx.q * tx.p; unit = val / qty; }
      else if (method === "FIFO") { layers.push({ q: tx.q, p: tx.p }); val += tx.q * tx.p; unit = val / qty; }
      else { val += tx.q * STD; pdSum += tx.q * (tx.p - STD); unit = STD; }
      moveVal = tx.q * (method === "STD" ? STD : tx.p);
      desc = `${L("收货", "Receive")} ${tx.q} @ ¥${tx.p}`;
    } else {
      let cost;
      if (method === "MAP") { const u = val / qty; cost = tx.q * u; unit = u; }
      else if (method === "FIFO") {
        let rem = tx.q; cost = 0;
        while (rem > 0 && layers.length) {
          const ly = layers[0]; const take = Math.min(rem, ly.q);
          cost += take * ly.p; ly.q -= take; rem -= take;
          if (ly.q === 0) layers.shift();
        }
        unit = cost / tx.q;
      } else { cost = tx.q * STD; unit = STD; }
      qty -= tx.q; val -= cost; moveVal = -cost;
      desc = `${L("发出", "Issue")} ${tx.q}`;
    }
    rows.push({ i: i + 1, desc, unit, moveVal, qty, val });
  });
  return (
    <div>
      <div className="erp-stage">
        <table className="erp-table">
          <thead>
            <tr><th>#</th><th>{L("业务", "Transaction")}</th><th>{L("本笔单价", "Unit cost")}</th><th>{L("本笔金额", "Move value")}</th><th>{L("结存数量", "Bal. qty")}</th><th>{L("结存金额", "Bal. value")}</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.i}>
                <td className="lbl">{r.i}</td>
                <td style={{ textAlign: "left" }}>{r.desc}</td>
                <td>¥{round2(r.unit).toFixed(2)}</td>
                <td className={r.moveVal < 0 ? "neg" : "pos"}>{r.moveVal < 0 ? "−" : "+"}¥{fm(Math.abs(round2(r.moveVal)))}</td>
                <td>{r.qty}</td>
                <td className="erp-qty">¥{fm(round2(r.val))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {method === "STD" && (
          <div className="erp-note">
            {L("标准价 ¥11 固定入账;实际价与标准价的差进「材料价差」科目:累计价差", "Standard ¥11 books everything; actual-vs-standard goes to the price-difference account: cumulative")} <strong>{pdSum >= 0 ? "+" : "−"}¥{fm(Math.abs(pdSum))}</strong>
          </div>
        )}
      </div>
      <div className="viz-ctrl">
        <Choice label={L("估价方法", "Valuation method")} value={method} onChange={setMethod}
          options={[{ v: "MAP", l: L("V · 移动平均", "V · Moving average") }, { v: "FIFO", l: L("先进先出 FIFO", "FIFO") }, { v: "STD", l: L("S · 标准成本(¥11)", "S · Standard (¥11)") }]} />
      </div>
      <div className="viz-readout">
        {L("同一串业务,三种方法给出不同的发料成本与期末存货值。移动平均每次收货重算加权单价;FIFO 严格按「先买的先出」分层计价;标准成本永远记 ¥11,把真实波动全部推进价差科目——让采购的好坏在一个科目里现形。",
           "The same transactions, three different issue costs and closing values. Moving average re-weights at every receipt; FIFO strictly prices issues from the oldest layers; standard cost always books ¥11 and shoves all real fluctuation into the price-difference account — making purchasing performance visible in one line.")}
      </div>
    </div>
  );
}

/* ============================================================
   FIN1 · doubleEntry — operational events become postings
   ============================================================ */
function DoubleEntryViz() {
  const L = useL();
  const [ev, setEv] = React.useState("GR");
  const [amt, setAmt] = React.useState(1000);
  const vat = round2(amt * 0.13);
  const EV = {
    GR:  { zh: "采购收货", en: "Goods receipt (purchase)", lines: [
            { d: 1, zh: "原材料", en: "Raw materials", v: amt }, { d: 0, zh: "GR/IR 暂估", en: "GR/IR clearing", v: amt }],
          whyZh: "货进了仓库(资产 +),发票还没来,先挂暂估负债——货与账同一秒动。", whyEn: "Goods entered the warehouse (asset up); no invoice yet, so a clearing liability holds the other side — goods and books move in the same second." },
    IV:  { zh: "发票校验", en: "Invoice verification", lines: [
            { d: 1, zh: "GR/IR 暂估", en: "GR/IR clearing", v: amt }, { d: 1, zh: "进项税", en: "Input VAT", v: vat }, { d: 0, zh: "应付账款", en: "Accounts payable", v: amt + vat }],
          whyZh: "发票到了:冲掉暂估,确认对供应商的真实负债与可抵扣税金。", whyEn: "The invoice arrives: reverse the estimate, recognize the real vendor liability and the deductible tax." },
    GI:  { zh: "销售发货", en: "Goods issue (sales)", lines: [
            { d: 1, zh: "主营业务成本", en: "Cost of goods sold", v: amt }, { d: 0, zh: "库存商品", en: "Finished goods", v: amt }],
          whyZh: "货出库(资产 −),同额进入成本费用——注意此刻只动成本,不动收入。", whyEn: "Goods leave stock (asset down) and the same value becomes expense — note: cost moves now, revenue does not." },
    BI:  { zh: "销售开票", en: "Billing", lines: [
            { d: 1, zh: "应收账款", en: "Accounts receivable", v: amt + vat }, { d: 0, zh: "主营业务收入", en: "Revenue", v: amt }, { d: 0, zh: "销项税", en: "Output VAT", v: vat }],
          whyZh: "开票确认收入与对客户的债权。收入与成本分两笔记,毛利 = 收入 − 成本。", whyEn: "Billing recognizes revenue and the claim on the customer. Revenue and cost are separate entries; margin is their difference." },
    PAY: { zh: "客户付款", en: "Customer payment", lines: [
            { d: 1, zh: "银行存款", en: "Bank", v: amt + vat }, { d: 0, zh: "应收账款", en: "Accounts receivable", v: amt + vat }],
          whyZh: "钱到账,应收清零。资产内部一换一:债权变现金。", whyEn: "Cash arrives, the receivable clears. One asset swaps for another: claim becomes cash." },
    CF:  { zh: "生产完工入库", en: "Production receipt", lines: [
            { d: 1, zh: "库存商品", en: "Finished goods", v: amt }, { d: 0, zh: "生产成本(WIP)", en: "Production cost (WIP)", v: amt }],
          whyZh: "在制品完工转为成品库存——料工费从 WIP 池子转进存货。", whyEn: "WIP converts to finished stock — material, labor and overhead move from the WIP pool into inventory." },
  };
  const e = EV[ev];
  const drs = e.lines.filter((l) => l.d), crs = e.lines.filter((l) => !l.d);
  const drSum = drs.reduce((s, l) => s + l.v, 0), crSum = crs.reduce((s, l) => s + l.v, 0);
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-posting" style={{ marginBottom: 14 }}>
          {drs.map((l, i) => `${L("借", "Dr")}: ${L(l.zh, l.en)}  ¥${fm(round2(l.v))}`).join("\n")}{"\n"}
          {crs.map((l, i) => `${L("贷", "Cr")}: ${L(l.zh, l.en)}  ¥${fm(round2(l.v))}`).join("\n")}
        </div>
        <div className="erp-taccounts">
          {e.lines.map((l, i) => (
            <div className="erp-tacc" key={i}>
              <div className="t-title">{L(l.zh, l.en)}</div>
              <div className="t-body">
                <div className="t-dr t-head">{L("借方 DR", "DR")}</div><div className="t-cr t-head">{L("贷方 CR", "CR")}</div>
                <div className="t-dr">{l.d ? "¥" + fm(round2(l.v)) : ""}</div><div className="t-cr">{!l.d ? "¥" + fm(round2(l.v)) : ""}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="erp-note">
          {L("借方合计", "Total debits")} ¥{fm(round2(drSum))} = {L("贷方合计", "total credits")} ¥{fm(round2(crSum))} ✓ — {L(e.whyZh, e.whyEn)}
        </div>
      </div>
      <div className="viz-ctrl">
        <Choice label={L("业务事件", "Business event")} value={ev} onChange={setEv}
          options={Object.keys(EV).map((k) => ({ v: k, l: `${k} · ${L(EV[k].zh, EV[k].en)}` }))} />
        <Slider label={L("净额(不含税)", "Net amount")} min={100} max={5000} step={100} value={amt} onChange={setAmt} fmt={(v) => "¥" + fm(v)} />
      </div>
      <div className="viz-readout">
        {L("挨个切换六个事件,把 P2P 与 O2C 的分录串成一条线。没有一笔是财务手工录的——单据过账的瞬间,科目确定规则自动挑好借贷科目。借贷永远相等,这就是复式记账的自检机制。",
           "Cycle through all six events and chain the P2P and O2C postings into one story. Not a single entry was typed by an accountant — the moment a document posts, account-determination rules pick the accounts. Debits always equal credits: double-entry's built-in self check.")}
      </div>
    </div>
  );
}

/* ============================================================
   FIN2 · monthEnd — the closing checklist
   ============================================================ */
function MonthEndViz() {
  const L = useL();
  const [done, setDone] = React.useState(0);
  const STEPS = [
    { zh: "业务止单:关闭本期物流过账", en: "Cutoff: lock logistics postings for the period", sZh: "本期不再允许补录收发货——期间控制是月结的第一道闸。", sEn: "No more back-dated receipts or issues — period control is the close's first gate." },
    { zh: "清 GR/IR:货票差异清理", en: "Clear GR/IR: goods-vs-invoice differences", sZh: "货到票未到、票到货未到的挂账逐项分析、催办或调整。", sEn: "Analyze every 'goods received, invoice pending' (and reverse) item; chase or adjust." },
    { zh: "应收应付对账:明细账 = 总账", en: "Reconcile AR/AP subledgers to the GL", sZh: "客户/供应商明细余额之和必须等于统驭科目余额。", sEn: "The sum of customer/vendor balances must equal the reconciliation accounts." },
    { zh: "计提:折旧、工资、利息、费用", en: "Accruals: depreciation, payroll, interest, expenses", sZh: "权责发生制:费用属于本期就记本期,不管付没付钱。", sEn: "Accrual accounting: expenses belong to the period they occur in, paid or not." },
    { zh: "库存重估与差异结转", en: "Inventory revaluation & variance settlement", sZh: "工单结算、价差分摊,存货价值回到真实成本。", sEn: "Settle production orders and allocate price differences; inventory returns to true cost." },
    { zh: "费用分摊:成本中心 → 承担对象", en: "Allocations: cost centers → receivers", sZh: "水电、房租、IT 按动因分摊到产线与产品。", sEn: "Utilities, rent and IT flow to lines and products by driver." },
    { zh: "试算平衡:借贷合计核对", en: "Trial balance: debits = credits", sZh: "所有科目余额汇总,借贷不平就查凭证。", sEn: "Sum every account; if debits ≠ credits, hunt the document." },
    { zh: "结转损益 → 出三大报表", en: "Roll P&L to retained earnings → statements", sZh: "收入费用清零转入留存收益,生成资产负债表、利润表、现金流量表。", sEn: "Zero out revenue/expense into retained earnings; produce the balance sheet, P&L and cash-flow statement." },
    { zh: "关闭会计期间", en: "Close the posting period", sZh: "本期彻底锁死,任何补录只能进下期——审计轨迹自此固化。", sEn: "The period locks for good; corrections go to the next one — the audit trail is now frozen." },
  ];
  const allDone = done >= STEPS.length;
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-bars" style={{ marginBottom: 12 }}>
          <div className="erp-bar-row">
            <span>{L("月结进度", "Close progress")}</span>
            <div className="b-track"><div className="b-fill acc" style={{ width: `${(done / STEPS.length) * 100}%` }} /></div>
            <span className="b-val">{done}/{STEPS.length}</span>
          </div>
        </div>
        <div className="erp-check">
          {STEPS.map((s, i) => (
            <div key={i} className={`c-item ${i < done ? "done" : ""} ${i === done ? "now" : ""}`}
              onClick={() => setDone(i < done ? i : i === done ? i + 1 : done)}>
              <span className="c-box">{i < done ? "✓" : ""}</span>
              <span>
                <span className="c-name"><strong>{String(i + 1).padStart(2, "0")}</strong> · {L(s.zh, s.en)}</span>
                <div className="c-sub">{L(s.sZh, s.sEn)}</div>
              </span>
            </div>
          ))}
        </div>
        {allDone && (
          <div className="erp-doc-detail" style={{ borderLeftColor: "var(--primary)", marginTop: 14 }}>
            <strong>{L("✓ 本期已关账", "✓ Period closed")}</strong>
            <div className="erp-posting">
              {L("利润表(简)", "P&L (mini)")}:{"\n"}
              {L("  收入", "  Revenue")}      ¥ 1,240,000{"\n"}
              {L("− 主营成本", "− COGS")}    ¥   860,000{"\n"}
              {L("− 期间费用", "− Opex")}    ¥   210,000{"\n"}
              {L("= 净利润", "= Net income")}  ¥   170,000
            </div>
          </div>
        )}
      </div>
      <div className="erp-btnrow">
        <button className="btn erp-minibtn" onClick={() => setDone(0)}>{L("重新月结", "Restart the close")}</button>
      </div>
      <div className="viz-readout">
        {L("按顺序点完九步(顺序是强制的——试试跳步)。真实企业的月结要 3–10 个工作日,ERP 成熟度越高、平时业务过账越干净,月结越快;「实时关账」是 CFO 们的圣杯。",
           "Click through the nine steps in order (order is enforced — try skipping). Real closes take 3–10 working days; the cleaner the daily postings, the faster the close. A 'continuous close' is every CFO's holy grail.")}
      </div>
    </div>
  );
}

/* ============================================================
   FIN3 · costRollup — product cost roll-up
   ============================================================ */
function CostRollupViz() {
  const L = useL();
  const [rate, setRate] = React.useState(80);
  const [ohPct, setOhPct] = React.useState(150);
  const [wheelP, setWheelP] = React.useState(60);
  const hours = 0.5;
  const mat = 180 + wheelP * 2 + 40 + 160;
  const labor = round2(hours * rate);
  const oh = round2(labor * ohPct / 100);
  const total = round2(mat + labor + oh);
  const seg = (v, c) => ({ width: `${(v / total) * 100}%`, background: c, height: "100%", display: "inline-block" });
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-tree">
          <div className="t-node"><span className="erp-tag acc">FERT</span><strong>{L("自行车 · 单台成本", "Bicycle · unit cost")}</strong><span className="erp-qty" style={{ marginLeft: "auto" }}>¥{fm(total)}</span></div>
          <div className="t-kids">
            <div className="t-node"><span className="erp-tag">{L("材料", "MAT")}</span>{L("材料成本(BOM × 价格)", "Material (BOM × prices)")}<span className="erp-qty" style={{ marginLeft: "auto" }}>¥{fm(mat)}</span></div>
            <div className="t-kids">
              <div className="t-node">{L("车架", "Frame")} 1 × ¥180<span className="erp-qty" style={{ marginLeft: "auto" }}>¥180</span></div>
              <div className="t-node">{L("车轮", "Wheels")} 2 × ¥{wheelP}<span className="erp-qty" style={{ marginLeft: "auto" }}>¥{wheelP * 2}</span></div>
              <div className="t-node">{L("链条", "Chain")} 1 × ¥40<span className="erp-qty" style={{ marginLeft: "auto" }}>¥40</span></div>
              <div className="t-node">{L("变速器", "Derailleur")} 1 × ¥160<span className="erp-qty" style={{ marginLeft: "auto" }}>¥160</span></div>
            </div>
            <div className="t-node"><span className="erp-tag">{L("人工", "LAB")}</span>{L("人工(工艺路线 × 费率)", "Labor (routing × rate)")} {hours}h × ¥{rate}<span className="erp-qty" style={{ marginLeft: "auto" }}>¥{fm(labor)}</span></div>
            <div className="t-node"><span className="erp-tag">{L("制费", "OH")}</span>{L("制造费用(人工 ×", "Overhead (labor ×")} {ohPct}%)<span className="erp-qty" style={{ marginLeft: "auto" }}>¥{fm(oh)}</span></div>
          </div>
        </div>
        <div style={{ marginTop: 14, height: 22, border: "1px solid var(--ink)", borderRadius: 4, overflow: "hidden", whiteSpace: "nowrap" }}>
          <span style={seg(mat, "var(--primary)")} />
          <span style={seg(labor, "var(--accent)")} />
          <span style={seg(oh, "color-mix(in srgb, var(--accent) 45%, var(--surface-2))")} />
        </div>
        <div className="erp-legend">
          <span><span className="sw" style={{ background: "var(--primary)" }} />{L("材料", "Material")} {Math.round((mat / total) * 100)}%</span>
          <span><span className="sw" style={{ background: "var(--accent)" }} />{L("人工", "Labor")} {Math.round((labor / total) * 100)}%</span>
          <span><span className="sw" style={{ background: "color-mix(in srgb, var(--accent) 45%, var(--surface-2))" }} />{L("制造费用", "Overhead")} {Math.round((oh / total) * 100)}%</span>
        </div>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("车轮采购价", "Wheel price")} min={40} max={120} value={wheelP} onChange={setWheelP} fmt={(v) => "¥" + v} />
        <Slider label={L("工时费率", "Labor rate")} min={40} max={160} step={5} value={rate} onChange={setRate} fmt={(v) => "¥" + v + "/h"} />
        <Slider label={L("制造费用率", "Overhead %")} min={50} max={300} step={10} value={ohPct} onChange={setOhPct} unit=" %" />
      </div>
      <div className="viz-readout">
        {L("成本卷积 = BOM 自下而上逐层累加:子项价格 × 用量得材料费,工艺路线工时 × 费率得人工,再按分摊率加制造费用。改车轮价格 ±¥10,成品成本立刻 ±¥20——这就是为什么标准成本每年要随 BOM 与价格「重估」。",
           "Cost roll-up climbs the BOM bottom-up: component prices × usage give material, routing hours × rates give labor, overhead applies on top. Move the wheel price ±¥10 and unit cost moves ±¥20 instantly — which is why standard costs are re-estimated whenever BOMs and prices shift.")}
      </div>
    </div>
  );
}

/* ============================================================
   IMP1 · implPlan — implementation phases timeline
   ============================================================ */
function ImplPlanViz() {
  const L = useL();
  const [month, setMonth] = React.useState(1);
  const PH = [
    { zh: "项目准备", en: "Preparation", from: 1, to: 2,
      taskZh: "定范围与目标、组队(业务骨干+顾问)、立章程、定计划。", taskEn: "Scope and goals, team (key users + consultants), charter, plan.",
      outZh: "项目章程 · 团队矩阵 · 主计划", outEn: "Charter · team matrix · master plan",
      riskZh: "最大风险:一把手不挂帅,项目从第一天就没人拍板。", riskEn: "Top risk: no executive sponsor — nobody can decide from day one." },
    { zh: "业务蓝图", en: "Blueprint", from: 2, to: 4,
      taskZh: "流程访谈画现状(As-Is),设计未来(To-Be),差异分析定「改流程还是改系统」。", taskEn: "Workshops map As-Is, design To-Be; fit-gap decides 'change the process or the system'.",
      outZh: "蓝图文档 · 差异清单 · 二开清单", outEn: "Blueprint · gap list · RICEFW list",
      riskZh: "最大风险:把烂流程原样搬进系统(「上了 ERP 的手工作坊」)。", riskEn: "Top risk: paving the cow path — automating a broken process as-is." },
    { zh: "系统实现", en: "Realization", from: 4, to: 8,
      taskZh: "按蓝图配置系统、开发接口与报表、准备主数据收集模板。", taskEn: "Configure to blueprint, build interfaces and reports, prepare master-data templates.",
      outZh: "配置完成的系统 · 接口 · 数据模板", outEn: "Configured system · interfaces · data templates",
      riskZh: "最大风险:二开失控——每个「特殊需求」都写代码,升级成噩梦。", riskEn: "Top risk: customization sprawl — coding every 'special need' makes upgrades a nightmare." },
    { zh: "测试与培训", en: "Testing & training", from: 8, to: 10,
      taskZh: "单元测试→集成测试→UAT 用真实数据全流程演练;培训关键用户与最终用户。", taskEn: "Unit → integration → UAT rehearses full flows on real data; train key and end users.",
      outZh: "测试报告 · 培训记录 · 上线就绪评估", outEn: "Test sign-off · training records · readiness review",
      riskZh: "最大风险:UAT 走形式,上线第一周才发现流程跑不通。", riskEn: "Top risk: rubber-stamp UAT — broken flows surface in week one of production." },
    { zh: "上线与支持", en: "Go-live & support", from: 10, to: 12,
      taskZh: "数据迁移终演、切换周末执行、超级用户驻场、每日问题清单。", taskEn: "Final migration rehearsal, cutover weekend, super users on the floor, daily issue list.",
      outZh: "上线切换清单 · 应急预案 · 稳定期报告", outEn: "Cutover checklist · fallback plan · stabilization report",
      riskZh: "最大风险:没有回退预案——迁移失败时进退两难。", riskEn: "Top risk: no fallback plan — a failed migration leaves you stranded." },
  ];
  const cur = PH.find((p) => month >= p.from && month < p.to) || PH[PH.length - 1];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-bars">
          {PH.map((p, i) => (
            <div className="erp-bar-row" key={i}>
              <span>{L(p.zh, p.en)}</span>
              <div className="b-track" style={{ position: "relative" }}>
                <div className={`b-fill ${p === cur ? "acc" : ""}`}
                  style={{ marginLeft: `${((p.from - 1) / 12) * 100}%`, width: `${((p.to - p.from) / 12) * 100}%`, opacity: p === cur ? 1 : 0.5 }} />
              </div>
              <span className="b-val">M{p.from}–{p.to}</span>
            </div>
          ))}
        </div>
        <div className="erp-doc-detail">
          <strong>{L("第", "Month ")}{month}{L(" 月 · ", " · ")}{L(cur.zh, cur.en)}</strong>
          <p style={{ margin: "6px 0" }}>{L(cur.taskZh, cur.taskEn)}</p>
          <div className="fields"><span>{L("产出:", "Deliverables: ")}{L(cur.outZh, cur.outEn)}</span></div>
          <div className="erp-posting">⚠ {L(cur.riskZh, cur.riskEn)}</div>
        </div>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("项目月份", "Project month")} min={1} max={12} value={month} onChange={setMonth} fmt={(v) => "M" + v} />
      </div>
      <div className="viz-readout">
        {L("拖动月份,注意每个阶段的「最大风险」都与技术无关——章程、流程、纪律、预案。这印证了本模块的开篇:ERP 项目失败,几乎从来不是软件问题。",
           "Drag through the months and notice every phase's top risk is non-technical — sponsorship, process, discipline, fallback. Which proves the module's opening line: when ERP projects fail, it is almost never the software.")}
      </div>
    </div>
  );
}

/* ============================================================
   IMP2 · integration — message flows between systems
   ============================================================ */
function IntegrationViz() {
  const L = useL();
  const [scn, setScn] = React.useState("EC");
  const [cur, setCur] = React.useState(0);
  const SCN = {
    EC: {
      zh: "电商订单 → ERP", en: "E-commerce order → ERP",
      steps: [
        { from: "Shop", to: "iPaaS", zh: "顾客下单,平台推送订单事件(webhook)", en: "Customer buys; the platform pushes an order event (webhook)",
          pl: `POST /orders\n{ "order": "EC-88231", "sku": "BIKE-26", "qty": 1, "paid": true }` },
        { from: "iPaaS", to: "ERP", zh: "中间件转换字段并映射客户/物料编码,调用 ERP API 建销售订单", en: "Middleware maps fields and codes, calls the ERP API to create a sales order",
          pl: `POST /api/salesorders\n{ "customer": "C-EC01", "material": "FG-BIKE-26", "qty": 1 }` },
        { from: "ERP", to: "iPaaS", zh: "ERP 返回订单号;若库存不足或客户冻结则返回错误,消息进重试队列", en: "ERP returns the order number; on stock or credit errors the message enters the retry queue",
          pl: `201 Created { "so": "SO-10992", "atp": "2026-07-29" }` },
        { from: "iPaaS", to: "Shop", zh: "回写平台:承诺交期与 ERP 单号,发货后再回传运单号", en: "Write back promise date and ERP number; tracking follows after goods issue",
          pl: `PATCH /orders/EC-88231\n{ "erpRef": "SO-10992", "eta": "2026-07-29" }` },
      ],
    },
    MES: {
      zh: "MES 报工 → ERP", en: "MES confirmation → ERP",
      steps: [
        { from: "MES", to: "iPaaS", zh: "工位扫码报工:工单、工序、合格数、工时", en: "A station scans a confirmation: order, operation, yield, hours",
          pl: `{ "order": "PO-5521", "op": "0020", "good": 48, "scrap": 2, "hrs": 6.5 }` },
        { from: "iPaaS", to: "ERP", zh: "幂等检查(同一报工只处理一次),转换后调用 ERP 报工接口", en: "Idempotency check (each confirmation processed once), then the ERP confirmation API",
          pl: `POST /api/confirmations  (key = MES msg-id)` },
        { from: "ERP", to: "ERP", zh: "ERP 内部联动:倒冲扣料、工时进成本、完工触发入库", en: "ERP chains internally: backflush components, hours into cost, completion triggers receipt",
          pl: L(`自动过账:借 生产成本 / 贷 原材料…`, `auto-post: Dr Production cost / Cr Raw materials…`) },
      ],
    },
    BANK: {
      zh: "银企直联(付款与对账)", en: "Bank connectivity (payments & statements)",
      steps: [
        { from: "ERP", to: "Bank", zh: "付款程序生成付款文件/API 指令(收款人、账号、金额)", en: "The payment run sends instructions (payee, account, amount) via file or API",
          pl: `pain.001 payment initiation · 3 items · ¥ 152,300` },
        { from: "Bank", to: "ERP", zh: "银行回执:成功/失败逐笔回传,失败项自动解核销", en: "The bank acknowledges item by item; failures auto-unclear",
          pl: `pain.002 status: 2 OK · 1 REJECTED (account closed)` },
        { from: "Bank", to: "ERP", zh: "日终对账单导入,系统自动勾对银行账与账面银行科目", en: "The end-of-day statement imports; the system auto-matches bank vs. book",
          pl: `camt.053 statement · auto-matched 47/49 lines` },
      ],
    },
  };
  const s = SCN[scn];
  const step = s.steps[Math.min(cur, s.steps.length - 1)];
  const boxes = [...new Set(s.steps.flatMap((x) => [x.from, x.to]))];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-flow" style={{ marginBottom: 12 }}>
          {boxes.map((b, i) => (
            <React.Fragment key={b}>
              {i > 0 && <div className="erp-flow-arrow">⇄</div>}
              <div className={`erp-doc ${b === step.from || b === step.to ? "now" : "on"}`} style={{ cursor: "default" }}>
                <div className="d-code">{b === "iPaaS" ? L("中间件", "MIDDLEWARE") : b === "Shop" ? L("电商平台", "SHOP") : b === "Bank" ? L("银行", "BANK") : b}</div>
                <div className="d-name">{b}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="erp-doc-detail">
          <strong>{String(Math.min(cur, s.steps.length - 1) + 1).padStart(2, "0")} · {step.from} → {step.to}</strong>
          <p style={{ margin: "6px 0" }}>{L(step.zh, step.en)}</p>
          <pre className="erp-code" style={{ marginTop: 8 }}>{step.pl}</pre>
        </div>
      </div>
      <div className="viz-ctrl">
        <Choice label={L("集成场景", "Scenario")} value={scn} onChange={(v) => { setScn(v); setCur(0); }}
          options={Object.keys(SCN).map((k) => ({ v: k, l: L(SCN[k].zh, SCN[k].en) }))} />
      </div>
      <StepCtl cur={cur} setCur={setCur} max={s.steps.length - 1} L={L} />
      <div className="viz-readout">
        {L("三个场景共用同一套模式:事件 → 映射/转换 → 调用 → 回执,外加两件保命设计——幂等(同一条消息重发不重复过账)与重试队列(对方宕机时消息不丢)。集成挂掉的系统,ERP 就退化成孤岛。",
           "All three scenarios share one pattern: event → map/transform → call → acknowledge, plus two survival designs — idempotency (a resent message never double-posts) and retry queues (nothing is lost when the other side is down). Lose the integrations and ERP degenerates back into an island.")}
      </div>
    </div>
  );
}

/* ============================================================
   IMP3 · tcoCompare — on-premise vs cloud 5-year TCO
   ============================================================ */
function TcoCompareViz() {
  const L = useL();
  const [users, setUsers] = React.useState(100);
  const [years, setYears] = React.useState(5);
  const [custom, setCustom] = React.useState(1); // 0 low 1 mid 2 high
  const cf = [0.6, 1.0, 1.8][custom];
  // on-prem: license (per user) + implementation + annual maintenance & IT
  const opLicense = users * 12;         // k¥ one-off
  const opImpl = Math.round(opLicense * 1.1 * cf);
  const opAnnual = Math.round(opLicense * 0.18 + 80 + users * 0.4); // maintenance + servers/IT
  // cloud: subscription per user/year + lighter implementation
  const clImpl = Math.round(users * 5 * cf);
  const clAnnual = Math.round(users * 1.8 * 12 * 0.35 + users * 4.8); // subscription k¥
  const rows = [];
  let op = opLicense + opImpl, cl = clImpl, breakeven = null;
  for (let y = 1; y <= years; y++) {
    op += opAnnual; cl += clAnnual;
    rows.push({ y, op, cl });
    if (breakeven === null && op < cl) breakeven = y;
  }
  const maxV = Math.max(op, cl);
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-bars">
          {rows.map((r) => (
            <React.Fragment key={r.y}>
              <div className="erp-bar-row">
                <span>{L("第", "Yr ")}{r.y}{L(" 年 · 本地", " · on-prem")}</span>
                <div className="b-track"><div className="b-fill" style={{ width: `${(r.op / maxV) * 100}%` }} /></div>
                <span className="b-val">¥{fm(r.op)}k</span>
              </div>
              <div className="erp-bar-row" style={{ marginBottom: 8 }}>
                <span style={{ color: "var(--muted)" }}>{L("　　　 · 云", "     · cloud")}</span>
                <div className="b-track"><div className="b-fill acc" style={{ width: `${(r.cl / maxV) * 100}%` }} /></div>
                <span className="b-val">¥{fm(r.cl)}k</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="erp-note">
          {breakeven
            ? L(`第 ${breakeven} 年起,本地部署的累计成本反而更低(前期投入被逐年摊薄)。`, `From year ${breakeven}, on-premise cumulative cost drops below cloud (the upfront spend amortizes).`)
            : L(`在 ${years} 年内,云的累计成本一直更低——订阅制把大额前期投入换成了逐年支出。`, `Within ${years} years cloud stays cheaper — subscription trades the big upfront hit for annual spend.`)}
        </div>
      </div>
      <div className="viz-ctrl">
        <Slider label={L("用户数", "Users")} min={20} max={500} step={10} value={users} onChange={setUsers} />
        <Slider label={L("比较年限", "Horizon")} min={3} max={10} value={years} onChange={setYears} unit={L(" 年", " yr")} />
        <Choice label={L("二次开发程度", "Customization")} value={String(custom)} onChange={(v) => setCustom(parseInt(v, 10))}
          options={[{ v: "0", l: L("低 · 基本用标准", "Low · mostly standard") }, { v: "1", l: L("中 · 常规二开", "Medium · typical") }, { v: "2", l: L("高 · 深度定制", "High · heavy custom") }]} />
      </div>
      <CodeOut code={`${L("本地", "On-prem")}: ${L("许可", "license")} ¥${fm(opLicense)}k + ${L("实施", "impl.")} ¥${fm(opImpl)}k + ${fm(opAnnual)}k/${L("年(维保+IT)", "yr (maint.+IT)")}
${L("云", "Cloud")}:   ${L("实施", "impl.")} ¥${fm(clImpl)}k + ${L("订阅", "subscription")} ¥${fm(clAnnual)}k/${L("年", "yr")}`} />
      <div className="viz-readout">
        {L("把二开调到「高」:两条曲线同时抬升,但本地抬得更狠——定制代码在本地要自己养,在云上还可能被升级冲掉。真实选型远不止算钱:数据主权、行业合规、IT 团队能力,都在这张表之外。",
           "Set customization to High: both curves rise, on-prem harder — custom code must be maintained forever, and in the cloud upgrades may break it. Real selection goes beyond money: data sovereignty, industry compliance and your IT team's capability all live outside this table.")}
      </div>
    </div>
  );
}

/* ---------------- registry & dispatch ---------------- */
const VIZ = {
  erpEvolution:    () => <ErpEvolutionViz />,
  processFlow:     () => <ProcessFlowViz />,
  marketMap:       () => <MarketMapViz />,
  orgModel:        () => <OrgModelViz />,
  materialMaster:  () => <MaterialMasterViz />,
  bomExplosion:    () => <BomExplosionViz />,
  p2pFlow:         () => <P2pFlowViz />,
  threeWayMatch:   () => <ThreeWayMatchViz />,
  vendorScore:     () => <VendorScoreViz />,
  o2cFlow:         () => <O2cFlowViz />,
  atpCheck:        () => <AtpCheckViz />,
  arAging:         () => <ArAgingViz />,
  planningPyramid: () => <PlanningPyramidViz />,
  mrpRun:          () => <MrpRunViz />,
  workOrder:       () => <WorkOrderViz />,
  stockMovement:   () => <StockMovementViz />,
  reorderPoint:    () => <ReorderPointViz />,
  valuation:       () => <ValuationViz />,
  doubleEntry:     () => <DoubleEntryViz />,
  monthEnd:        () => <MonthEndViz />,
  costRollup:      () => <CostRollupViz />,
  implPlan:        () => <ImplPlanViz />,
  integration:     () => <IntegrationViz />,
  tcoCompare:      () => <TcoCompareViz />,
};

function Viz({ name }) {
  const names = (Array.isArray(name) ? name : [name]).filter((n) => VIZ[n]);
  if (!names.length) return null;
  return (
    <>
      {names.map((n) => <div className="viz" key={n}>{VIZ[n]()}</div>)}
    </>
  );
}

window.Viz = Viz;
