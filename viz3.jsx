/* =========================================================
   viz3.jsx — E10 multi-party collaboration & 3D sandboxes
   ---------------------------------------------------------
   Requires global THREE (three.min.js UMD). Extends the VIZ
   registry from viz2.jsx. Buildings are simple BoxGeometry
   compositions — readable in a teaching sandbox, not CAD.
   ========================================================= */

function threeReady() {
  return typeof THREE !== "undefined";
}

/** Shared: mount a Three.js scene into a container, return dispose + helpers. */
function useThreeScene(containerRef, buildScene) {
  const api = React.useRef({});
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !threeReady()) return undefined;
    const w = el.clientWidth || 640;
    const h = Math.max(320, Math.round(w * 0.55));
    const scene = new THREE.Scene();
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    scene.background = new THREE.Color(dark ? 0x1c1f24 : 0xf3efe6);
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 200);
    camera.position.set(0, 14, 22);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    el.innerHTML = "";
    el.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xfff6e8, 0x8a9a88, 0.85);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.75);
    dir.position.set(8, 18, 6);
    dir.castShadow = true;
    scene.add(dir);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(28, 64),
      new THREE.MeshStandardMaterial({ color: dark ? 0x2a2e34 : 0xd9d2c3, roughness: 0.95 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(40, 40, 0xb8b0a0, 0xcfc7b8);
    grid.position.y = 0.01;
    scene.add(grid);

    const ctx = { scene, camera, renderer, el, groups: {}, markers: [] };
    buildScene(ctx);

    let dragging = false, px = 0, py = 0, theta = 0.35, phi = 0.85, dist = 26;
    const applyCam = () => {
      camera.position.x = dist * Math.sin(phi) * Math.cos(theta);
      camera.position.y = dist * Math.cos(phi) + 2;
      camera.position.z = dist * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(0, 1.2, 0);
    };
    applyCam();

    const onDown = (e) => { dragging = true; px = e.clientX; py = e.clientY; };
    const onUp = () => { dragging = false; };
    const onMove = (e) => {
      if (!dragging) return;
      theta -= (e.clientX - px) * 0.005;
      phi = Math.max(0.25, Math.min(1.35, phi + (e.clientY - py) * 0.004));
      px = e.clientX; py = e.clientY;
      applyCam();
    };
    const onWheel = (e) => {
      e.preventDefault();
      dist = Math.max(14, Math.min(40, dist + e.deltaY * 0.02));
      applyCam();
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

    let raf = 0, t0 = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const t = (now - t0) / 1000;
      if (api.current.tick) api.current.tick(t, ctx);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => {
      const nw = el.clientWidth || 640;
      const nh = Math.max(320, Math.round(nw * 0.55));
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    api.current.ctx = ctx;
    api.current.applyCam = applyCam;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.dispose();
      el.innerHTML = "";
    };
  }, [containerRef, buildScene]);
  return api;
}

function box(w, h, d, color, y = 0) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.05 })
  );
  m.position.y = y + h / 2;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function makeBuilding(kind, accent) {
  const g = new THREE.Group();
  if (kind === "supplier") {
    g.add(box(2.8, 1.6, 2.2, 0x6b7c5e));
    g.add(box(1.4, 0.9, 1.2, 0x8a9a7a, 1.6));
    const silo = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 2.2, 12),
      new THREE.MeshStandardMaterial({ color: 0xc4b59a })
    );
    silo.position.set(1.5, 1.1, 0.9);
    silo.castShadow = true;
    g.add(silo);
  } else if (kind === "factory") {
    g.add(box(4.2, 2.2, 3.0, 0x4a5a6a));
    g.add(box(1.6, 1.4, 1.6, 0x3d4d5c, 2.2));
    const chim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 3.2, 10),
      new THREE.MeshStandardMaterial({ color: 0x2f3a44 })
    );
    chim.position.set(-1.4, 3.0, -0.8);
    chim.castShadow = true;
    g.add(chim);
    g.add(box(0.8, 0.5, 2.4, accent || 0xc45c3e, 0.9));
  } else if (kind === "office") {
    g.add(box(2.4, 3.6, 2.0, 0x5c6d7e));
    for (let i = 0; i < 4; i++) {
      const band = box(2.45, 0.18, 0.08, 0xd8e4ef, 0.7 + i * 0.7);
      band.position.z = 1.02;
      g.add(band);
    }
    g.add(box(0.9, 0.15, 0.9, accent || 0xc45c3e, 3.6));
  } else if (kind === "warehouse") {
    g.add(box(3.4, 1.8, 2.6, 0x8b7355));
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(2.4, 0.9, 4),
      new THREE.MeshStandardMaterial({ color: 0x6e5a42 })
    );
    roof.position.y = 2.25;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    g.add(roof);
    g.add(box(1.2, 1.1, 0.15, 0x3a3a3a, 0.2));
  } else {
    // customer storefront
    g.add(box(2.6, 2.0, 2.2, 0x7a5c6e));
    g.add(box(1.6, 1.0, 0.12, 0xe8d5c4, 0.6));
    g.add(box(0.7, 0.35, 0.7, accent || 0xc45c3e, 2.0));
  }
  // ground pad
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(2.6, 2.6, 0.08, 24),
    new THREE.MeshStandardMaterial({ color: 0xe8e2d6, roughness: 1 })
  );
  pad.position.y = 0.04;
  g.add(pad);
  return g;
}

function makeRoad(a, b) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.06, len),
    new THREE.MeshStandardMaterial({ color: 0xb0a898, roughness: 0.9 })
  );
  mesh.position.copy(mid);
  mesh.position.y = 0.05;
  mesh.lookAt(b.x, 0.05, b.z);
  return mesh;
}

/* ============================================================
   COL1 · collabWorld — 3D five-end supply network
   ============================================================ */
/* ---- SVG companions for E10 (topology / flow alongside 3D) ---- */
function CollabTopoSvg({ nodes, steps, step, L }) {
  const layout = {
    SUP: { x: 40, y: 90 }, FAC: { x: 200, y: 40 }, OFF: { x: 280, y: 150 },
    WH: { x: 420, y: 40 }, CUS: { x: 560, y: 100 },
  };
  const cur = steps[step];
  const cx = (id) => layout[id].x + 50;
  const cy = (id) => layout[id].y + 24;
  return (
    <svg className="erp-mini-topo" viewBox="0 0 680 210" role="img">
      <defs>
        <marker id="col-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <text x="24" y="22" className="erp-topo-zone-lab">
        {L("五端单据拓扑（平面）· 下方 3D 是同一网络", "Five-party document topology (2D) · 3D below is the same net")}
      </text>
      {steps.map((s, i) => {
        const a = layout[s.from], b = layout[s.to];
        if (!a || !b) return null;
        const hot = i === step;
        const on = i <= step;
        return (
          <line key={i}
            x1={a.x + 50} y1={a.y + 24} x2={b.x + 50} y2={b.y + 24}
            className={`erp-topo-edge ${on ? "on" : ""} ${hot ? "hot" : ""}`}
            markerEnd={hot ? "url(#col-arrow)" : undefined} />
        );
      })}
      {nodes.map((n) => {
        const p = layout[n.id];
        const hot = cur.from === n.id || cur.to === n.id;
        return (
          <g key={n.id} className={`erp-topo-node ${hot ? "hot on" : "on"}`} transform={`translate(${p.x},${p.y})`}>
            <rect width="100" height="48" rx="8" />
            <text x="50" y="20" textAnchor="middle" className="erp-topo-node-t">{L(n.zh, n.en)}</text>
            <text x="50" y="36" textAnchor="middle" className="erp-topo-node-s">{n.id}</text>
          </g>
        );
      })}
      <circle cx={(cx(cur.from) + cx(cur.to)) / 2} cy={(cy(cur.from) + cy(cur.to)) / 2} r="6" className="erp-topo-pkt" />
      <text x="24" y="200" className="erp-topo-edge-lab">{cur.doc} · {L(cur.zh, cur.en)}</text>
    </svg>
  );
}

function E2eFlowSvg({ lanes, tick, timeline, L }) {
  return (
    <svg className="erp-flow-svg" viewBox="0 0 720 168" role="img">
      <text x="24" y="20" className="erp-topo-zone-lab">
        {L("端到端里程碑流程图 · 红点 = 当前时点", "E2E milestone flowchart · red = current tick")}
      </text>
      {timeline.map((t, i) => {
        const x = 28 + i * 96;
        const cls = i === tick ? "now" : i < tick ? "on" : "";
        return (
          <g key={i} className={`erp-flow-box ${cls}`}>
            <rect x={x} y={36} width="84" height="40" rx="7" />
            <text x={x + 42} y={52} textAnchor="middle" className="t1">{String(i + 1).padStart(2, "0")}</text>
            <text x={x + 42} y={68} textAnchor="middle" className="t2">{L(t.zh, t.en)}</text>
            {i < timeline.length - 1 && (
              <line x1={x + 86} y1={56} x2={x + 94} y2={56} className={`erp-flow-link ${i < tick ? "on" : ""}`} />
            )}
          </g>
        );
      })}
      {lanes.map((lane, i) => {
        const x = 28 + i * 138;
        const wait = lane.wait;
        return (
          <g key={lane.id} className={`erp-topo-node ${wait ? "hot" : "on"}`} transform={`translate(${x},100)`}>
            <rect width="120" height="48" rx="8" />
            <text x="60" y="20" textAnchor="middle" className="erp-topo-node-t">{L(lane.zh, lane.en)}</text>
            <text x="60" y="36" textAnchor="middle" className="erp-topo-node-s">{lane.pct}%{wait ? " · BLOCK" : ""}</text>
          </g>
        );
      })}
    </svg>
  );
}

function FactoryLineSvg({ stations, st, L }) {
  return (
    <svg className="erp-mini-topo" viewBox="0 0 680 120" role="img">
      <defs>
        <marker id="ft-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <text x="24" y="22" className="erp-topo-zone-lab">
        {L("产线工位拓扑 · 令牌跟报工走", "Line station topology · token follows confirms")}
      </text>
      {stations.map((s, i) => {
        const x = 24 + i * 130;
        return (
          <g key={s.id}>
            <g className={`erp-topo-node ${i < st ? "on" : ""} ${i === st ? "hot on" : ""}`} transform={`translate(${x},40)`}>
              <rect width="110" height="48" rx="8" />
              <text x="55" y="22" textAnchor="middle" className="erp-topo-node-t">{L(s.zh, s.en)}</text>
              <text x="55" y="38" textAnchor="middle" className="erp-topo-node-s">{s.id}</text>
            </g>
            {i < stations.length - 1 && (
              <line x1={x + 110} y1="64" x2={x + 130} y2="64"
                className={`erp-topo-edge ${i < st ? "on hot" : ""}`} markerEnd="url(#ft-arrow)" />
            )}
          </g>
        );
      })}
      <circle cx={24 + st * 130 + 55} cy={64} r="6" className="erp-topo-pkt" />
    </svg>
  );
}

/* ============================================================
   COL1 · collabWorld — 3D multi-party collaboration map
   ============================================================ */
function CollabWorldViz() {
  const L = useL();
  const wrapRef = React.useRef(null);
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const stepRef = React.useRef(0);
  stepRef.current = step;

  const NODES = React.useMemo(() => ([
    { id: "SUP", kind: "supplier", zh: "供应商", en: "Supplier", x: -9, z: 1, color: 0x6b7c5e },
    { id: "FAC", kind: "factory", zh: "工厂", en: "Plant", x: -2.5, z: 3.5, color: 0x4a5a6a },
    { id: "OFF", kind: "office", zh: "办公室", en: "HQ Office", x: 0.5, z: -3.5, color: 0x5c6d7e },
    { id: "WH", kind: "warehouse", zh: "成品仓", en: "FG Warehouse", x: 4.5, z: 3.2, color: 0x8b7355 },
    { id: "CUS", kind: "customer", zh: "客户", en: "Customer", x: 10, z: 0.5, color: 0x7a5c6e },
  ]), []);

  const STEPS = React.useMemo(() => ([
    { from: "CUS", to: "OFF", doc: "SO", zh: "客户下单 → 销售订单进办公室", en: "Customer order → sales order at HQ",
      erpZh: "建 SO · ATP/信用检查 · 承诺交期写回", erpEn: "Create SO · ATP/credit · promise date back" },
    { from: "OFF", to: "FAC", doc: "PRD", zh: "计划下达生产工单到工厂", en: "Planning releases production order to plant",
      erpZh: "计划订单 → 生产工单下达", erpEn: "Planned order → production order release" },
    { from: "FAC", to: "SUP", doc: "PO", zh: "缺料触发采购订单飞向供应商", en: "Shortage triggers PO to supplier",
      erpZh: "MRP 申请转 PO · 发给供应商(EDI/门户)", erpEn: "MRP PR→PO · send via EDI/portal" },
    { from: "SUP", to: "FAC", doc: "ASN", zh: "供应商发货通知 / 原料在途", en: "Supplier ASN / inbound materials",
      erpZh: "ASN 写入在途 · 收货参照 PO", erpEn: "ASN as in-transit · GR vs PO" },
    { from: "FAC", to: "WH", doc: "GR", zh: "完工入库到成品仓", en: "Finished goods receipt into warehouse",
      erpZh: "工单完工确认 → 成品收货过账", erpEn: "Final confirm → FG goods receipt" },
    { from: "WH", to: "CUS", doc: "DN", zh: "拣配发货 → 客户收货", en: "Pick & ship → customer receipt",
      erpZh: "交货单 · 发货过账 · 库存与销货成本", erpEn: "Delivery · GI · stock + COGS" },
    { from: "OFF", to: "CUS", doc: "INV", zh: "办公室开票 → 客户应付", en: "HQ bills → customer AP",
      erpZh: "参照交货开票 · 应收挂账", erpEn: "Bill vs delivery · AR open" },
    { from: "CUS", to: "OFF", doc: "PAY", zh: "客户付款回笼办公室", en: "Customer payment returns to HQ",
      erpZh: "收款核销 · 清应收", erpEn: "Incoming payment clears AR" },
  ]), []);

  const buildScene = React.useCallback((ctx) => {
    const { scene } = ctx;
    const pos = {};
    NODES.forEach((n) => {
      const b = makeBuilding(n.kind, 0xc45c3e);
      b.position.set(n.x, 0, n.z);
      scene.add(b);
      pos[n.id] = new THREE.Vector3(n.x, 0, n.z);
      ctx.groups[n.id] = b;
    });
    // roads between common pairs
    [["SUP", "FAC"], ["FAC", "OFF"], ["FAC", "WH"], ["WH", "CUS"], ["OFF", "CUS"], ["OFF", "SUP"]].forEach(([a, b]) => {
      scene.add(makeRoad(pos[a], pos[b]));
    });
    // glowing packet
    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xc45c3e, emissive: 0xc45c3e, emissiveIntensity: 0.55, roughness: 0.35 })
    );
    packet.position.set(0, 1.8, 0);
    scene.add(packet);
    ctx.packet = packet;
    ctx.pos = pos;
    // halo rings under active nodes
    ctx.halos = {};
    NODES.forEach((n) => {
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(2.2, 2.55, 32),
        new THREE.MeshBasicMaterial({ color: 0xc45c3e, transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      halo.rotation.x = -Math.PI / 2;
      halo.position.set(n.x, 0.08, n.z);
      scene.add(halo);
      ctx.halos[n.id] = halo;
    });
  }, [NODES]);

  const api = useThreeScene(wrapRef, buildScene);

  React.useEffect(() => {
    api.current.tick = (t) => {
      const ctx = api.current.ctx;
      if (!ctx || !ctx.packet) return;
      const s = STEPS[stepRef.current];
      const a = ctx.pos[s.from], b = ctx.pos[s.to];
      const u = (Math.sin(t * 1.4) * 0.5 + 0.5);
      ctx.packet.position.lerpVectors(a, b, u);
      ctx.packet.position.y = 1.6 + Math.sin(t * 3) * 0.25;
      Object.keys(ctx.halos).forEach((id) => {
        const on = id === s.from || id === s.to;
        ctx.halos[id].material.opacity = on ? 0.55 + Math.sin(t * 4) * 0.15 : 0;
      });
    };
  }, [api, STEPS]);

  React.useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2800);
    return () => clearInterval(id);
  }, [playing, STEPS.length]);

  const cur = STEPS[step];
  if (!threeReady()) {
    return <div className="erp-note">{L("正在加载 Three.js…刷新页面或检查网络。", "Loading Three.js… refresh or check the network.")}</div>;
  }

  return (
    <div>
      <div className="erp-topo-wrap" style={{ marginBottom: 10 }}>
        <CollabTopoSvg nodes={NODES} steps={STEPS} step={step} L={L} />
      </div>
      <div className="erp-3d-shell">
        <div className="erp-3d-canvas" ref={wrapRef} />
        <div className="erp-3d-legend">
          {NODES.map((n) => (
            <span key={n.id} className={`erp-3d-chip ${(cur.from === n.id || cur.to === n.id) ? "on" : ""}`}>
              <i style={{ background: "#" + n.color.toString(16).padStart(6, "0") }} />
              {L(n.zh, n.en)}
            </span>
          ))}
          <span className="erp-3d-hint">{L("拖拽旋转 · 滚轮缩放", "Drag to orbit · scroll to zoom")}</span>
        </div>
      </div>
      <div className="erp-doc-detail" style={{ marginTop: 12 }}>
        <strong>{String(step + 1).padStart(2, "0")} / {STEPS.length} · {cur.doc} · {L(cur.zh, cur.en)}</strong>
        <div className="fields" style={{ marginTop: 8 }}>
          <span>{L("从", "From")} {L(NODES.find((n) => n.id === cur.from).zh, NODES.find((n) => n.id === cur.from).en)}</span>
          <span>{L("到", "To")} {L(NODES.find((n) => n.id === cur.to).zh, NODES.find((n) => n.id === cur.to).en)}</span>
        </div>
        <div className="erp-posting">ERP · {L(cur.erpZh, cur.erpEn)}</div>
      </div>
      <div className="viz-ctrl" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <button className="btn erp-minibtn" onClick={() => setPlaying((p) => !p)}>{playing ? L("暂停", "Pause") : L("自动播放", "Autoplay")}</button>
        <StepCtl cur={step} setCur={setStep} max={STEPS.length - 1} L={L} />
      </div>
      <div className="viz-readout">
        {L("光点飞过的不是「物流动画片」,而是 ERP 单据状态在五端之间的投影:供应商门户、工厂报工、办公室开票、仓库发货、客户收货——物理分散,事实唯一。拖动视角,找找哪条路上还没有光——那就是协同断点。",
           "The flying light is not a logistics cartoon — it is ERP document status projected across five ends: supplier portal, plant confirmation, HQ billing, warehouse GI, customer receipt. Physically scattered, one truth. Orbit and spot the dark road — that is where collaboration breaks.")}
      </div>
    </div>
  );
}

/* ============================================================
   COL2 · e2eProgress — five-lane end-to-end progress board
   ============================================================ */
function E2eProgressViz() {
  const L = useL();
  const [scene, setScene] = React.useState("happy");
  const [tick, setTick] = React.useState(4);

  const SCENES = {
    happy: {
      zh: "顺利交付", en: "Happy path",
      lanes: [
        { id: "SUP", zh: "供应商", en: "Supplier", pct: 100, doc: "PO-7781 ✓ ASN ✓", wait: false,
          tipZh: "原料已到厂并完成收货", tipEn: "Materials received at plant" },
        { id: "FAC", zh: "工厂", en: "Plant", pct: 100, doc: "WO-5521 完工", wait: false,
          tipZh: "全部工序报工完成", tipEn: "All operations confirmed" },
        { id: "OFF", zh: "办公室", en: "Office", pct: 85, doc: "SO-11040 · 待开票", wait: false,
          tipZh: "等发货过账后自动可开票", tipEn: "Billing unlocks after GI" },
        { id: "WH", zh: "仓库", en: "Warehouse", pct: 70, doc: "DN-80331 拣配中", wait: false,
          tipZh: "拣配完成后发货过账", tipEn: "GI after pick complete" },
        { id: "CUS", zh: "客户", en: "Customer", pct: 40, doc: "门户:生产完成", wait: false,
          tipZh: "对外只显示里程碑,不暴露内部阻塞细节", tipEn: "Portal shows milestones, not internal blockers" },
      ],
    },
    blocked: {
      zh: "缺料阻塞", en: "Material shortage",
      lanes: [
        { id: "SUP", zh: "供应商", en: "Supplier", pct: 55, doc: "PO-7781 逾期", wait: true,
          tipZh: "确认交期未回写 → MRP 在途失真", tipEn: "No confirmed date → MRP in-transit wrong" },
        { id: "FAC", zh: "工厂", en: "Plant", pct: 20, doc: "WO-5521 缺料冻结", wait: true,
          tipZh: "工单不能开工,进度条故意停住", tipEn: "Order frozen — progress bar must stop" },
        { id: "OFF", zh: "办公室", en: "Office", pct: 35, doc: "SO 承诺风险", wait: true,
          tipZh: "销售应改承诺或加急,而不是假装绿灯", tipEn: "Sales must re-promise or expedite — not fake green" },
        { id: "WH", zh: "仓库", en: "Warehouse", pct: 0, doc: "无交货单", wait: false,
          tipZh: "上游未完工,仓库无单可拣", tipEn: "Nothing to pick until upstream finishes" },
        { id: "CUS", zh: "客户", en: "Customer", pct: 15, doc: "门户:排产中", wait: true,
          tipZh: "对外文案保持诚实区间,避免「已发货」谎言", tipEn: "Honest milestone band — never claim 'shipped'" },
      ],
    },
    credit: {
      zh: "信用冻结", en: "Credit block",
      lanes: [
        { id: "SUP", zh: "供应商", en: "Supplier", pct: 0, doc: "—", wait: false,
          tipZh: "订单未确认,尚未触发采购", tipEn: "SO not confirmed — purchasing not triggered" },
        { id: "FAC", zh: "工厂", en: "Plant", pct: 0, doc: "—", wait: false,
          tipZh: "无工单", tipEn: "No production order" },
        { id: "OFF", zh: "办公室", en: "Office", pct: 25, doc: "SO 信用拦截", wait: true,
          tipZh: "责任:信用专员 / 销售经理特批", tipEn: "Owner: credit clerk / sales exception" },
        { id: "WH", zh: "仓库", en: "Warehouse", pct: 0, doc: "—", wait: false,
          tipZh: "无交货", tipEn: "No delivery" },
        { id: "CUS", zh: "客户", en: "Customer", pct: 5, doc: "门户:审核中", wait: true,
          tipZh: "不要对客户说「系统坏了」——说「信用评估中」", tipEn: "Don't say 'system down' — say 'credit review'" },
      ],
    },
  };

  const TIMELINE = [
    { zh: "客户下单", en: "Customer orders" },
    { zh: "信用/ATP", en: "Credit / ATP" },
    { zh: "计划排产", en: "Plan & release" },
    { zh: "采购到料", en: "Buy & receive" },
    { zh: "生产报工", en: "Produce & confirm" },
    { zh: "拣配发货", en: "Pick & ship" },
    { zh: "开票收款", en: "Bill & collect" },
  ];

  const sc = SCENES[scene];
  const overall = Math.round(sc.lanes.reduce((s, l) => s + l.pct, 0) / sc.lanes.length);

  return (
    <div>
      <div className="erp-stage">
        <div className="erp-topo-wrap" style={{ marginBottom: 12 }}>
          <E2eFlowSvg lanes={sc.lanes} tick={tick} timeline={TIMELINE} L={L} />
        </div>
        <div className="erp-e2e-head">
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--muted)" }}>SO-11040 · BIKE-26 × 500</div>
            <div style={{ fontFamily: "Noto Serif SC, serif", fontSize: 22, marginTop: 4 }}>{L("端到端协同进度", "E2E collaboration progress")}</div>
          </div>
          <div className="erp-e2e-overall">
            <span className="mono">{L("综合", "Overall")}</span>
            <strong>{overall}%</strong>
          </div>
        </div>

        <div className="erp-e2e-timeline">
          {TIMELINE.map((t, i) => (
            <div key={i} className={`erp-e2e-node ${i <= tick ? "on" : ""} ${i === tick ? "now" : ""}`}
              onClick={() => setTick(i)}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="l">{L(t.zh, t.en)}</span>
            </div>
          ))}
        </div>

        <div className="erp-e2e-lanes">
          {sc.lanes.map((lane) => (
            <div key={lane.id} className={`erp-e2e-lane ${lane.wait ? "wait" : ""}`}>
              <div className="lane-meta">
                <strong>{L(lane.zh, lane.en)}</strong>
                <span className="mono">{lane.pct}%</span>
              </div>
              <div className="lane-track">
                <div className="lane-fill" style={{ width: `${lane.pct}%` }} />
              </div>
              <div className="lane-doc mono">{lane.doc}</div>
              <div className="lane-tip">{L(lane.tipZh, lane.tipEn)}</div>
              {lane.wait && <div className="lane-flag">{L("阻塞 · 需升级", "BLOCKED · escalate")}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="viz-ctrl">
        <Choice label={L("情景", "Scenario")} value={scene} onChange={setScene}
          options={Object.keys(SCENES).map((k) => ({ v: k, l: L(SCENES[k].zh, SCENES[k].en) }))} />
      </div>
      <div className="viz-readout">
        {L("进度条的每一个百分点都必须能点回一张单据状态——手工填「完成 80%」的协同看板,三周后就会变成互不信任的 Excel。切换到「缺料阻塞」:工厂与供应商变红,仓库保持 0% 是正确的诚实,不是系统失灵。",
           "Every percent on these bars must drill to a document state — a board where people type '80% done' becomes an untrusted spreadsheet in three weeks. Switch to Material shortage: plant and supplier go red; warehouse staying at 0% is honest, not a bug.")}
      </div>
    </div>
  );
}

/* ============================================================
   COL3 · factoryTwin — 3D factory stations + work-order token
   ============================================================ */
function FactoryTwinViz() {
  const L = useL();
  const wrapRef = React.useRef(null);
  const [st, setSt] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  const stRef = React.useRef(0);
  stRef.current = st;

  const STATIONS = React.useMemo(() => ([
    { id: "RCV", zh: "收料", en: "Receive", x: -8, z: 0, erpZh: "参照 PO 收货 · 质检库存", erpEn: "GR vs PO · QI stock" },
    { id: "MCH", zh: "机加", en: "Machine", x: -4, z: 2, erpZh: "工序 0010 报工 · 倒冲材料", erpEn: "Op 0010 confirm · backflush" },
    { id: "ASM", zh: "组装", en: "Assemble", x: 0, z: 0, erpZh: "工序 0020 报工 · 工时进成本", erpEn: "Op 0020 confirm · hours to cost" },
    { id: "PKG", zh: "包装", en: "Pack", x: 4, z: 2, erpZh: "工序 0030 · 序列号/批次", erpEn: "Op 0030 · serial/batch" },
    { id: "SHP", zh: "出货", en: "Ship", x: 8, z: 0, erpZh: "完工入库 → 可建交货单", erpEn: "FG receipt → delivery eligible" },
  ]), []);

  const buildScene = React.useCallback((ctx) => {
    const { scene } = ctx;
    // factory hall shell
    const hall = box(22, 0.2, 10, 0xcfc6b6, 0);
    hall.position.set(0, 0, 0);
    scene.add(hall);
    // back wall
    const wall = box(22, 3.2, 0.25, 0x9aa3ad);
    wall.position.set(0, 0, -4.8);
    scene.add(wall);

    ctx.stations = {};
    STATIONS.forEach((s, i) => {
      const g = new THREE.Group();
      const bench = box(2.2, 1.1, 1.6, i % 2 ? 0x5a6a78 : 0x6a5a4a);
      g.add(bench);
      const arm = box(0.35, 1.6, 0.35, 0x333333, 1.1);
      arm.position.x = 0.7;
      g.add(arm);
      const light = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x88aa88, emissive: 0x224422, emissiveIntensity: 0.2 })
      );
      light.position.set(0, 2.0, 0);
      g.add(light);
      g.position.set(s.x, 0, s.z);
      scene.add(g);
      ctx.stations[s.id] = { group: g, light };
      // conveyor segment
      if (i < STATIONS.length - 1) {
        const n = STATIONS[i + 1];
        const a = new THREE.Vector3(s.x, 0, s.z);
        const b = new THREE.Vector3(n.x, 0, n.z);
        scene.add(makeRoad(a, b));
      }
    });

    const token = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.5, 0.7),
      new THREE.MeshStandardMaterial({ color: 0xc45c3e, emissive: 0xc45c3e, emissiveIntensity: 0.35 })
    );
    token.position.set(STATIONS[0].x, 1.4, STATIONS[0].z);
    scene.add(token);
    ctx.token = token;

    // office balcony hint (small office block overlooking floor)
    const office = makeBuilding("office", 0xc45c3e);
    office.scale.set(0.55, 0.55, 0.55);
    office.position.set(-10.5, 0, -3.5);
    scene.add(office);
  }, [STATIONS]);

  const api = useThreeScene(wrapRef, buildScene);

  React.useEffect(() => {
    api.current.tick = (t) => {
      const ctx = api.current.ctx;
      if (!ctx || !ctx.token) return;
      const i = stRef.current;
      const s = STATIONS[i];
      const next = STATIONS[Math.min(i + 1, STATIONS.length - 1)];
      const phase = (Math.sin(t * 1.6) * 0.5 + 0.5);
      const a = new THREE.Vector3(s.x, 1.4, s.z);
      const b = new THREE.Vector3(next.x, 1.4, next.z);
      if (i < STATIONS.length - 1) ctx.token.position.lerpVectors(a, b, phase * 0.35);
      else ctx.token.position.copy(a);
      ctx.token.rotation.y = t * 0.8;
      STATIONS.forEach((stn, idx) => {
        const lit = ctx.stations[stn.id].light;
        const on = idx === i;
        lit.material.emissiveIntensity = on ? 0.9 + Math.sin(t * 5) * 0.2 : 0.15;
        lit.material.color.setHex(on ? 0xc45c3e : idx < i ? 0x6aaa6a : 0x556655);
      });
    };
  }, [api, STATIONS]);

  React.useEffect(() => {
    if (!auto) return undefined;
    const id = setInterval(() => setSt((s) => (s + 1) % STATIONS.length), 2400);
    return () => clearInterval(id);
  }, [auto, STATIONS.length]);

  const cur = STATIONS[st];
  const pct = Math.round(((st + 1) / STATIONS.length) * 100);

  if (!threeReady()) {
    return <div className="erp-note">{L("正在加载 Three.js…", "Loading Three.js…")}</div>;
  }

  return (
    <div>
      <div className="erp-topo-wrap" style={{ marginBottom: 10 }}>
        <FactoryLineSvg stations={STATIONS} st={st} L={L} />
      </div>
      <div className="erp-3d-shell">
        <div className="erp-3d-canvas" ref={wrapRef} />
        <div className="erp-3d-legend">
          {STATIONS.map((s, i) => (
            <button key={s.id} className={`erp-3d-chip ${i === st ? "on" : i < st ? "done" : ""}`}
              onClick={() => setSt(i)}>
              {L(s.zh, s.en)}
            </button>
          ))}
          <span className="erp-3d-hint">{L("左侧小楼 = 办公室俯瞰现场", "Small building = office overlooking the floor")}</span>
        </div>
      </div>
      <div className="erp-doc-detail" style={{ marginTop: 12 }}>
        <strong>WO-5521 · {L(cur.zh, cur.en)} · {L("工单进度", "WO progress")} {pct}%</strong>
        <div className="erp-posting" style={{ marginTop: 8 }}>ERP ← {L(cur.erpZh, cur.erpEn)}</div>
        <div className="erp-note" style={{ marginTop: 8 }}>
          {L("令牌只在报工成功后才应跳到下一工位——现场「看起来做完了」但没扫码,办公室进度条不得前进。",
             "The token should advance only after a successful confirmation — if the floor 'looks done' but nobody scanned, the office progress bar must not move.")}
        </div>
      </div>
      <div className="viz-ctrl" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <button className="btn erp-minibtn" onClick={() => setAuto((p) => !p)}>{auto ? L("暂停", "Pause") : L("自动流转", "Auto flow")}</button>
        <StepCtl cur={st} setCur={setSt} max={STATIONS.length - 1} L={L} />
      </div>
      <div className="viz-readout">
        {L("MES 可以按秒采集机台信号;ERP 要的是管理账上的状态跃迁与成本归集。两者之间靠报工/接口对齐——这就是「数字孪生」在制造 ERP 里的务实含义:不是炫酷的 3D 本身,而是现场与系统同一步伐。",
           "MES may sample machines by the second; ERP needs management-ledger state jumps and cost collection. Confirmations/APIs align the two — that is the practical meaning of a digital twin in manufacturing ERP: not the 3D gloss itself, but floor and system in lockstep.")}
      </div>
    </div>
  );
}

/* ============================================================
   HW1 · hwCatalog — factory hardware catalog mapped to ERP
   ============================================================ */
function HwCatalogViz() {
  const L = useL();
  const [zone, setZone] = React.useState("ALL");
  const [sel, setSel] = React.useState("ANDON");
  const ITEMS = [
    { id: "ANDON", zone: "LINE", zh: "安灯系统", en: "Andon system",
      hwZh: "灯塔/拉绳/工位屏/蜂鸣", enHw: "Tower / cord / HMI / buzzer",
      evtZh: "呼叫、停机、原因码", evtEn: "Call, downtime, reason code",
      erpZh: "冻结报工 · 停机进 OEE/成本中心", erpEn: "Freeze confirm · downtime → OEE/cost center",
      bridgeZh: "HARDWARE: LED/蜂鸣器执行器 + 按钮消抖 + MCU", bridgeEn: "HARDWARE: LED/buzzer actuators + debounce + MCU" },
    { id: "SCAN", zone: "WH", zh: "条码/二维码枪", en: "Barcode / QR scanner",
      hwZh: "手持枪、固定式扫码头", enHw: "Handheld / fixed mount",
      evtZh: "识别单号·物料·库位", evtEn: "ID doc · material · bin",
      erpZh: "收发货过账、报工、盘点", erpEn: "GR/GI, confirm, cycle count",
      bridgeZh: "HARDWARE: 光电传感 + UART/USB HID", bridgeEn: "HARDWARE: photo sensor + UART/USB HID" },
    { id: "RFID", zone: "WH", zh: "RFID / UHF 门", en: "RFID / UHF gate",
      hwZh: "门禁天线、托盘标签", enHw: "Portal antenna, pallet tags",
      evtZh: "整托过门自动计数", evtEn: "Auto count on gate pass",
      erpZh: "批量收发、在途校验", erpEn: "Bulk GR/GI, in-transit check",
      bridgeZh: "HARDWARE: RF 前端 + 边缘网关", bridgeEn: "HARDWARE: RF front-end + edge gateway" },
    { id: "TAB", zone: "LINE", zh: "工位平板 / HMI", en: "Station tablet / HMI",
      hwZh: "工业平板、触控面板", enHw: "Industrial tablet, touch panel",
      evtZh: "选工单、报工、看图纸", evtEn: "Pick WO, confirm, view drawings",
      erpZh: "工序确认、质检记录", erpEn: "Op confirm, QI record",
      bridgeZh: "HARDWARE: 显示屏 + 触摸 I/O + Wi-Fi SoC", bridgeEn: "HARDWARE: display + touch I/O + Wi-Fi SoC" },
    { id: "PLC", zone: "LINE", zh: "PLC / 机床接口", en: "PLC / machine I/F",
      hwZh: "PLC、CNC、OPC-UA/Modbus", enHw: "PLC, CNC, OPC-UA/Modbus",
      evtZh: "计件脉冲、运行/停机信号", evtEn: "Piece pulse, run/stop signals",
      erpZh: "自动报工、设备利用率", erpEn: "Auto confirm, equipment utilization",
      bridgeZh: "HARDWARE: 数字 I/O + 工业总线(类比 UART/SPI 思想)", bridgeEn: "HARDWARE: digital I/O + fieldbus (UART/SPI mindset)" },
    { id: "SCALE", zone: "QI", zh: "电子秤 / 检重秤", en: "Scale / checkweigher",
      hwZh: "台秤、动态检重", enHw: "Bench / in-line checkweigher",
      evtZh: "重量回传", evtEn: "Weight callback",
      erpZh: "收货数量校验、BOM 耗用", erpEn: "GR qty check, BOM consumption",
      bridgeZh: "HARDWARE: 应变片/称重传感 + ADC", bridgeEn: "HARDWARE: load-cell family + ADC" },
    { id: "LBL", zone: "WH", zh: "标签打印机", en: "Label printer",
      hwZh: "热敏/热转印条码机", enHw: "Thermal / TTR barcode printer",
      evtZh: "打印物料/托盘/序列号标签", evtEn: "Print material/pallet/serial labels",
      erpZh: "主数据条码、批次/序列闭环", erpEn: "Master barcodes, batch/serial loop",
      bridgeZh: "HARDWARE: 热敏头驱动 + 串口/网络", bridgeEn: "HARDWARE: thermal-head drive + serial/net" },
    { id: "PTL", zone: "WH", zh: "拣选灯 / 电子看板", en: "Pick-to-light / e-kanban",
      hwZh: "货位灯、数码管、按钮确认", enHw: "Bay lights, digits, confirm buttons",
      evtZh: "指引拣配并确认取货", evtEn: "Guide pick and confirm take",
      erpZh: "交货拣配、电子看板补货", erpEn: "Delivery picking, e-kanban replenish",
      bridgeZh: "HARDWARE: LED 矩阵 + 按钮 + 总线寻址", bridgeEn: "HARDWARE: LED matrix + buttons + bus addressing" },
    { id: "AGV", zone: "LOG", zh: "AGV / AMR", en: "AGV / AMR",
      hwZh: "自动搬运车、调度系统", enHw: "Mobile robots + fleet SW",
      evtZh: "任务完成、库位到达", evtEn: "Task done, bin arrived",
      erpZh: "库内转移过账、线边配送", erpEn: "Bin transfer, line-side delivery",
      bridgeZh: "HARDWARE: 电机驱动 + 传感导航 + Wi-Fi", bridgeEn: "HARDWARE: motor drive + nav sensors + Wi-Fi" },
    { id: "VISION", zone: "QI", zh: "视觉 / AOI", en: "Vision / AOI",
      hwZh: "工业相机、光源、工控机", enHw: "Camera, lighting, IPC",
      evtZh: "合格/不合格判定", evtEn: "Pass/fail judgment",
      erpZh: "质检结果、废品入库原因", erpEn: "QI result, scrap reason",
      bridgeZh: "HARDWARE: 图像传感 + 边缘算力", bridgeEn: "HARDWARE: imaging sensor + edge compute" },
    { id: "IOT", zone: "LINE", zh: "IoT 环境/振动传感", en: "IoT env / vibration",
      hwZh: "温湿度、振动、能耗表", enHw: "Temp/RH, vibration, power meters",
      evtZh: "超限报警、预测性维护事件", evtEn: "Threshold alerts, PdM events",
      erpZh: "设备工单、能耗进成本中心", erpEn: "Maint. orders, energy to cost center",
      bridgeZh: "HARDWARE: DHT 类传感 + I²C/Modbus + ESP/网关", bridgeEn: "HARDWARE: DHT-class sensors + I²C/Modbus + ESP/gateway" },
    { id: "CLOCK", zone: "INFRA", zh: "考勤 / 门禁", en: "Time clock / access",
      hwZh: "刷卡、指纹、人脸闸机", enHw: "Badge, fingerprint, face gate",
      evtZh: "出勤、进入受控区", evtEn: "Attendance, controlled-area entry",
      erpZh: "工时归集、关键工序身份校验", erpEn: "Labor collection, station identity check",
      bridgeZh: "HARDWARE: 生物特征传感 + 安全存储", bridgeEn: "HARDWARE: biometric sense + secure storage" },
    { id: "EDGE", zone: "INFRA", zh: "边缘网关 / 工控机", en: "Edge gateway / IPC",
      hwZh: "协议转换、本地缓存", enHw: "Protocol convert, local buffer",
      evtZh: "汇聚现场信号、断网续传", evtEn: "Aggregate signals, store-and-forward",
      erpZh: "保证幂等写入 MES/ERP", erpEn: "Idempotent writes to MES/ERP",
      bridgeZh: "HARDWARE: 多总线 MCU/工控机", bridgeEn: "HARDWARE: multi-bus MCU/IPC" },
    { id: "VOICE", zone: "WH", zh: "语音拣选耳机", en: "Voice-picking headset",
      hwZh: "头戴麦、语音引擎", enHw: "Headset + speech engine",
      evtZh: "听指令拣货并口述确认", evtEn: "Hear pick cmds, speak confirm",
      erpZh: "交货拣配确认", erpEn: "Delivery pick confirm",
      bridgeZh: "HARDWARE: 麦/喇叭 + 边缘 ASR", bridgeEn: "HARDWARE: mic/speaker + edge ASR" },
    { id: "TORQUE", zone: "LINE", zh: "智能扭矩工具", en: "Smart torque tool",
      hwZh: "带传感扳手/电批", enHw: "Sensor wrench / electric driver",
      evtZh: "扭矩达标/未达标", evtEn: "Torque OK / NOK",
      erpZh: "装配工序强制质检点", erpEn: "Mandatory assembly QI point",
      bridgeZh: "HARDWARE: 力传感 + 无线回传", bridgeEn: "HARDWARE: force sense + wireless backhaul" },
  ];
  const ZONES = [
    { v: "ALL", zh: "全部", en: "All" },
    { v: "LINE", zh: "产线", en: "Line" },
    { v: "WH", zh: "仓储", en: "Warehouse" },
    { v: "QI", zh: "质检", en: "QI" },
    { v: "LOG", zh: "物流", en: "Logistics" },
    { v: "INFRA", zh: "基础设施", en: "Infra" },
  ];
  const list = ITEMS.filter((x) => zone === "ALL" || x.zone === zone);
  const cur = ITEMS.find((x) => x.id === sel) || list[0];
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-hw-zones">
          {ZONES.map((z) => (
            <button key={z.v} className={`erp-3d-chip ${zone === z.v ? "on" : ""}`}
              onClick={() => setZone(z.v)}>{L(z.zh, z.en)}</button>
          ))}
        </div>
        <div className="erp-hw-grid">
          {list.map((it) => (
            <button key={it.id} className={`erp-hw-card ${cur && cur.id === it.id ? "sel" : ""}`}
              onClick={() => setSel(it.id)}>
              <span className="code mono">{it.id}</span>
              <strong>{L(it.zh, it.en)}</strong>
              <span className="zone mono">{it.zone}</span>
            </button>
          ))}
        </div>
        {cur && (
          <div className="erp-doc-detail" style={{ marginTop: 14 }}>
            <strong>{L(cur.zh, cur.en)}</strong>
            <div className="erp-hw-kv">
              <div><span className="k">{L("硬件形态", "Hardware")}</span><span>{L(cur.hwZh, cur.enHw)}</span></div>
              <div><span className="k">{L("现场事件", "Floor event")}</span><span>{L(cur.evtZh, cur.evtEn)}</span></div>
              <div><span className="k">{L("写入 ERP/MES", "Writes ERP/MES")}</span><span>{L(cur.erpZh, cur.erpEn)}</span></div>
              <div><span className="k">{L("HARDWARE_BOOK 桥", "HARDWARE_BOOK bridge")}</span><span>{L(cur.bridgeZh, cur.bridgeEn)}</span></div>
            </div>
          </div>
        )}
      </div>
      <div className="viz-readout">
        {L(`图鉴共 ${ITEMS.length} 类常见工厂硬件。优先「扫码枪 + 工位屏 + 安灯 + 标签机」往往就能让报工与库存不再靠回忆;PLC/RFID/AGV 是第二波自动化。点卡片看它到底写进哪张单。`,
           `${ITEMS.length} common plant hardware classes. A first wave of scanner + station screen + andon + labeler often stops confirmation-by-memory; PLC/RFID/AGV is wave two. Click a card to see which document it writes.`)}
      </div>
    </div>
  );
}

/* ============================================================
   HW2 · andonBoard — andon pull → escalate → ERP freeze
   ============================================================ */
function AndonBoardViz() {
  const L = useL();
  const [state, setState] = React.useState("GREEN");
  const [reason, setReason] = React.useState("MAT");
  const [mins, setMins] = React.useState(0);
  const REASONS = {
    MAT: { zh: "缺料", en: "Material shortage", esc: 2 },
    EQ: { zh: "设备故障", en: "Equipment fault", esc: 2 },
    QL: { zh: "质量异常", en: "Quality issue", esc: 3 },
    MAN: { zh: "人员不足", en: "Manpower short", esc: 1 },
  };
  const COLORS = {
    GREEN: { bg: "#2f6b4f", zh: "正常生产", en: "Running" },
    CALL: { bg: "#c45c3e", zh: "呼叫中 · 等待响应", en: "Calling · awaiting ack" },
    ACK: { bg: "#b8892d", zh: "已响应 · 处置中", en: "Acknowledged · fixing" },
    FIX: { bg: "#2f6b4f", zh: "已关闭 · 恢复生产", en: "Cleared · running" },
  };
  React.useEffect(() => {
    if (state !== "CALL" && state !== "ACK") return undefined;
    const id = setInterval(() => setMins((m) => m + 1), 800);
    return () => clearInterval(id);
  }, [state]);
  const pull = () => { setState("CALL"); setMins(0); };
  const ack = () => setState("ACK");
  const clear = () => setState("FIX");
  const reset = () => { setState("GREEN"); setMins(0); };
  const c = COLORS[state === "FIX" ? "GREEN" : state];
  const r = REASONS[reason];
  const freeze = state === "CALL" || state === "ACK";
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-topo-wrap" style={{ marginBottom: 12 }}>
          <AndonTopoSvg state={state} L={L} />
        </div>
        <div className="erp-andon">
          <div className="erp-andon-tower">
            {["#c45c3e", "#b8892d", "#2f6b4f"].map((col, i) => (
              <div key={i} className="erp-andon-lamp" style={{
                background: (state === "CALL" && i === 0) || (state === "ACK" && i === 1) || ((state === "GREEN" || state === "FIX") && i === 2) ? col : "#3a3a3a",
                boxShadow: ((state === "CALL" && i === 0) || (state === "ACK" && i === 1) || ((state === "GREEN" || state === "FIX") && i === 2))
                  ? `0 0 18px ${col}` : "none",
              }} />
            ))}
            <div className="erp-andon-pole" />
          </div>
          <div className="erp-andon-panel" style={{ borderColor: c.bg }}>
            <div className="mono" style={{ letterSpacing: "0.12em", color: "var(--muted)" }}>LINE-A3 · WO-5521</div>
            <div style={{ fontFamily: "Noto Serif SC, serif", fontSize: 28, marginTop: 6, color: c.bg }}>{L(c.zh, c.en)}</div>
            <div className="erp-andon-stats">
              <div><span className="k">{L("停机", "Downtime")}</span><strong>{mins}</strong><span className="u">{L("分钟(模拟)", "min (sim)")}</span></div>
              <div><span className="k">{L("原因", "Reason")}</span><strong>{L(r.zh, r.en)}</strong></div>
              <div><span className="k">{L("升级级", "Escalation")}</span><strong>L{r.esc}</strong></div>
            </div>
            <div className="erp-posting" style={{ marginTop: 10 }}>
              {freeze
                ? L("ERP/MES: 报工入口已冻结 · 工单进度条停止 · 停机工时写入成本中心",
                    "ERP/MES: confirmations frozen · WO progress stopped · downtime to cost center")
                : L("ERP/MES: 允许报工 · 进度可前进", "ERP/MES: confirmations allowed · progress may advance")}
            </div>
          </div>
        </div>
        <div className="erp-btnrow">
          <button className="btn erp-minibtn" onClick={pull} disabled={state === "CALL" || state === "ACK"}>{L("拉安灯", "Pull andon")}</button>
          <button className="btn erp-minibtn" onClick={ack} disabled={state !== "CALL"}>{L("班长响应", "Lead ack")}</button>
          <button className="btn erp-minibtn" onClick={clear} disabled={state !== "ACK"}>{L("关闭安灯", "Clear andon")}</button>
          <button className="btn erp-minibtn" onClick={reset}>{L("复位绿灯", "Reset green")}</button>
        </div>
      </div>
      <div className="viz-ctrl">
        <Choice label={L("停机原因码", "Downtime reason")} value={reason} onChange={setReason}
          options={Object.keys(REASONS).map((k) => ({ v: k, l: L(REASONS[k].zh, REASONS[k].en) }))} />
      </div>
      <div className="viz-readout">
        {L("安灯的价值不在「灯亮了」,而在状态机写入系统:呼叫未响应要升级,关闭必须带原因码,红灯期间禁止虚报工。否则 OEE 与客户交期都是假数。",
           "Andon’s value is not the lit lamp — it is the state machine written to the system: unanswered calls escalate, clears need reason codes, and fake confirms are blocked while red. Otherwise OEE and customer dates are fiction.")}
      </div>
    </div>
  );
}

/* ============================================================
   HW3 · scanToPost — hardware capture → ERP posting chain
   ============================================================ */
function ScanToPostViz() {
  const L = useL();
  const [mode, setMode] = React.useState("GR");
  const [step, setStep] = React.useState(0);
  const [log, setLog] = React.useState([]);
  const MODES = {
    GR: {
      zh: "扫码收货", en: "Scan goods receipt",
      steps: [
        { zh: "RF 枪扫描 PO 条码", en: "RF gun scans PO barcode", sys: "PO-7781" },
        { zh: "扫描物料/托盘标签", en: "Scan material / pallet label", sys: "ROH-WHEEL × 100" },
        { zh: "边缘校验:PO 行、数量容差、质检标识", en: "Edge validate: PO line, qty tolerance, QI flag", sys: "OK · QI required" },
        { zh: "幂等写入 ERP 收货(101)", en: "Idempotent ERP GR (mvt 101)", sys: "GR → QI stock + GR/IR" },
      ],
    },
    GI: {
      zh: "扫码发料", en: "Scan material issue",
      steps: [
        { zh: "扫描生产工单", en: "Scan production order", sys: "WO-5521" },
        { zh: "扫描组件条码与库位", en: "Scan component + bin", sys: "ROH-WHEEL @ A-01" },
        { zh: "校验BOM与可用库存", en: "Check BOM & available stock", sys: "BOM match · ATP OK" },
        { zh: "过账发料 · 成本进工单", en: "Post issue · cost to WO", sys: "GI → WIP / order cost" },
      ],
    },
    CNF: {
      zh: "计件/扫码报工", en: "Piece / scan confirm",
      steps: [
        { zh: "PLC 计件脉冲或扫流转卡", en: "PLC piece pulse or scan traveler", sys: "pulse × 12" },
        { zh: "工位终端确认合格/工时", en: "Station confirms yield / hours", sys: "good 12 · 0.8h" },
        { zh: "网关聚合并去重(同一脉冲不双记)", en: "Gateway aggregate & dedupe", sys: "idempotency key" },
        { zh: "ERP 工序确认 · 倒冲材料", en: "ERP op confirm · backflush", sys: "CNF → backflush + hours" },
      ],
    },
    CC: {
      zh: "循环盘点", en: "Cycle count",
      steps: [
        { zh: "扫描库位码", en: "Scan bin code", sys: "BIN A-01" },
        { zh: "扫描实物标签并录入实盘数", en: "Scan label & enter counted qty", sys: "count 96" },
        { zh: "与账面比较,超阈值走审批", en: "Compare to book; over-threshold → approve", sys: "book 100 · Δ -4" },
        { zh: "过账盘亏 · 财务同步", en: "Post write-off · finance sync", sys: "inventory adj. posting" },
      ],
    },
  };
  const m = MODES[mode];
  const fire = () => {
    if (step >= m.steps.length) return;
    const s = m.steps[step];
    setLog((prev) => [`${new Date().toLocaleTimeString()}  ${L(s.zh, s.en)} → ${s.sys}`, ...prev].slice(0, 8));
    setStep((x) => x + 1);
  };
  const reset = () => { setStep(0); setLog([]); };
  React.useEffect(() => { reset(); }, [mode]);
  return (
    <div>
      <div className="erp-stage">
        <div className="erp-topo-wrap" style={{ marginBottom: 12 }}>
          <ScanTopoSvg mode={mode} step={step} L={L} />
        </div>
        <div className="erp-scan-pipe">
          {["HARDWARE", "EDGE", "MES/ERP", "LEDGER"].map((lab, i) => (
            <React.Fragment key={lab}>
              {i > 0 && <div className="erp-flow-arrow">→</div>}
              <div className={`erp-doc ${step > i ? "on" : ""} ${step === i ? "now" : ""}`} style={{ cursor: "default" }}>
                <div className="d-code">{lab}</div>
                <div className="d-name">{i === 0 ? L("采集", "Capture") : i === 1 ? L("校验/缓存", "Validate/buffer") : i === 2 ? L("事务", "Transaction") : L("库存·成本", "Stock·cost")}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="erp-scan-steps">
          {m.steps.map((s, i) => (
            <div key={i} className={`erp-check c-item ${i < step ? "done" : ""} ${i === step ? "now" : ""}`}>
              <div className="c-box">{i < step ? "✓" : String(i + 1)}</div>
              <div>
                <div className="c-name">{L(s.zh, s.en)}</div>
                <div className="c-sub mono">{s.sys}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="erp-btnrow">
          <button className="btn btn-accent erp-minibtn" onClick={fire} disabled={step >= m.steps.length}>
            {step >= m.steps.length ? L("本闭环完成", "Loop complete") : L("模拟下一次采集 →", "Simulate next capture →")}
          </button>
          <button className="btn erp-minibtn" onClick={reset}>{L("重置", "Reset")}</button>
        </div>
        {log.length > 0 && <div className="erp-log">{log.join("\n")}</div>}
      </div>
      <div className="viz-ctrl">
        <Choice label={L("采集闭环", "Capture loop")} value={mode} onChange={setMode}
          options={Object.keys(MODES).map((k) => ({ v: k, l: L(MODES[k].zh, MODES[k].en) }))} />
      </div>
      <div className="viz-readout">
        {L("好的现场采集 = 硬件事件 + 边缘校验 + 幂等键。少了校验会把脏数据写进库存;少了幂等会在弱网下双倍过账。这与 HARDWARE_BOOK 里「先读对信号,再驱动执行器」是同一纪律。",
           "Good floor capture = hardware event + edge validation + idempotency key. Skip validation and dirty stock lands; skip idempotency and weak networks double-post. Same discipline as HARDWARE_BOOK: read the signal right before you drive the actuator.")}
      </div>
    </div>
  );
}

/* ============================================================
   HW4 · protoStack — SVG topology + RS-485/Modbus → MQTT → ERP
   ============================================================ */
function ProtoTopoSvg({ scn, step, L }) {
  // Node layouts per scene (viewBox 0 0 720 340)
  const MAP = {
    A: {
      zoneZh: "车间柜 / 现场网", zoneEn: "Cabinet / field net",
      itZh: "IT / 云侧", itEn: "IT / cloud side",
      nodes: [
        { id: "sens", x: 70, y: 250, w: 88, h: 44, zh: "温湿度", en: "Temp/RH", sub: "Slave 1" },
        { id: "meter", x: 180, y: 250, w: 88, h: 44, zh: "电表", en: "Meter", sub: "Slave 2" },
        { id: "plc", x: 290, y: 250, w: 88, h: 44, zh: "PLC", en: "PLC", sub: "Slave 3" },
        { id: "gw", x: 180, y: 140, w: 110, h: 52, zh: "边缘网关", en: "Edge GW", sub: "Modbus Master" },
        { id: "mqtt", x: 420, y: 140, w: 110, h: 52, zh: "MQTT Broker", en: "MQTT Broker", sub: "QoS 1" },
        { id: "mes", x: 560, y: 70, w: 100, h: 48, zh: "MES", en: "MES", sub: "Subscribe" },
        { id: "erp", x: 560, y: 200, w: 100, h: 48, zh: "ERP", en: "ERP", sub: "Confirm API" },
      ],
      // edges: from→to, label, active when step >= layerIndex
      edges: [
        { a: "sens", b: "gw", via: [124, 250, 124, 192, 180, 166], lab: "RS-485", layer: 0 },
        { a: "meter", b: "gw", via: [224, 250, 224, 192], lab: "", layer: 0 },
        { a: "plc", b: "gw", via: [334, 250, 334, 192, 235, 166], lab: "Modbus", layer: 0 },
        { a: "gw", b: "mqtt", via: [290, 166, 420, 166], lab: "Ethernet", layer: 1 },
        { a: "mqtt", b: "mes", via: [530, 140, 560, 94], lab: "sub", layer: 2 },
        { a: "mqtt", b: "erp", via: [530, 166, 560, 224], lab: "MQTT→API", layer: 2 },
        { a: "erp", b: "erp", via: [610, 248, 610, 280], lab: "Posting", layer: 3, loop: true },
      ],
      // packet path waypoints per step (centers)
      packet: [
        [[334, 250], [235, 166]],           // field poll
        [[235, 166], [290, 166]],           // at gateway map
        [[290, 166], [475, 166]],           // mqtt publish
        [[475, 166], [610, 224]],           // erp
      ],
      busY: 268,
      busX1: 60, busX2: 390,
      busLab: "RS-485 multi-drop",
    },
    B: {
      zoneZh: "仓库现场", zoneEn: "Warehouse floor",
      itZh: "ERP 侧", itEn: "ERP side",
      nodes: [
        { id: "gun", x: 80, y: 180, w: 100, h: 52, zh: "RF 枪", en: "RF gun", sub: "USB/Wi-Fi" },
        { id: "app", x: 260, y: 180, w: 120, h: 52, zh: "WMS App", en: "WMS App", sub: "Validate" },
        { id: "api", x: 460, y: 180, w: 120, h: 52, zh: "HTTPS API", en: "HTTPS API", sub: "REST" },
        { id: "erp", x: 620, y: 180, w: 80, h: 52, zh: "ERP", en: "ERP", sub: "Mvt 101" },
      ],
      edges: [
        { a: "gun", b: "app", via: [180, 206, 260, 206], lab: "scan chars", layer: 0 },
        { a: "app", b: "api", via: [380, 206, 460, 206], lab: "JSON", layer: 1 },
        { a: "api", b: "erp", via: [580, 206, 620, 206], lab: "POST", layer: 2 },
        { a: "erp", b: "erp", via: [660, 232, 660, 270], lab: "GR/IR", layer: 3, loop: true },
      ],
      packet: [
        [[130, 206], [320, 206]],
        [[320, 206], [520, 206]],
        [[520, 206], [660, 206]],
        [[660, 206], [660, 250]],
      ],
      busY: null,
    },
    C: {
      zoneZh: "车间以太网", zoneEn: "Shop Ethernet",
      itZh: "IT / 云侧", itEn: "IT / cloud side",
      nodes: [
        { id: "cnc", x: 70, y: 160, w: 110, h: 56, zh: "CNC", en: "CNC", sub: "OPC-UA Server" },
        { id: "gw", x: 260, y: 160, w: 120, h: 56, zh: "OPC 桥/网关", en: "OPC bridge", sub: "Subscribe" },
        { id: "mqtt", x: 450, y: 100, w: 110, h: 50, zh: "MQTT", en: "MQTT", sub: "counts" },
        { id: "erp", x: 450, y: 220, w: 110, h: 50, zh: "ERP", en: "ERP", sub: "Util / PM" },
        { id: "wo", x: 610, y: 160, w: 90, h: 50, zh: "工单通道", en: "WO path", sub: "Scene A" },
      ],
      edges: [
        { a: "cnc", b: "gw", via: [180, 188, 260, 188], lab: "OPC-UA", layer: 0 },
        { a: "gw", b: "mqtt", via: [380, 160, 450, 125], lab: "pub", layer: 1 },
        { a: "gw", b: "erp", via: [380, 200, 450, 245], lab: "rollup", layer: 2 },
        { a: "mqtt", b: "erp", via: [505, 150, 505, 220], lab: "agg", layer: 2 },
        { a: "erp", b: "wo", via: [560, 245, 610, 185], lab: "≠ piece CNF", layer: 3 },
      ],
      packet: [
        [[125, 188], [320, 188]],
        [[320, 188], [505, 125]],
        [[505, 125], [505, 245]],
        [[505, 245], [655, 185]],
      ],
      busY: null,
    },
  };
  const m = MAP[scn];
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf = 0, t0 = performance.now();
    const loop = (now) => {
      setT(((now - t0) / 1000) % 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scn, step]);

  const path = m.packet[Math.min(step, m.packet.length - 1)];
  const [p0, p1] = path;
  const px = p0[0] + (p1[0] - p0[0]) * t;
  const py = p0[1] + (p1[1] - p0[1]) * t;

  const activeIds = new Set();
  m.edges.forEach((e) => {
    if (e.layer <= step) { activeIds.add(e.a); activeIds.add(e.b); }
  });

  return (
    <svg className="erp-topo-svg" viewBox="0 0 720 340" role="img"
      aria-label={L("硬件到 ERP 拓扑", "Hardware-to-ERP topology")}>
      <defs>
        <marker id="erp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
        <filter id="erp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* zone bands */}
      <rect x="24" y="40" width={scn === "B" ? 360 : 390} height="280" rx="12" className="erp-topo-zone field" />
      <rect x={scn === "B" ? 400 : 430} y="40" width={scn === "B" ? 296 : 266} height="280" rx="12" className="erp-topo-zone it" />
      <text x="40" y="62" className="erp-topo-zone-lab">{L(m.zoneZh, m.zoneEn)}</text>
      <text x={scn === "B" ? 416 : 446} y="62" className="erp-topo-zone-lab">{L(m.itZh, m.itEn)}</text>

      {/* RS-485 bus line for scene A */}
      {m.busY != null && (
        <g>
          <line x1={m.busX1} y1={m.busY} x2={m.busX2} y2={m.busY} className={`erp-topo-bus ${step === 0 ? "hot" : ""}`} />
          <text x={(m.busX1 + m.busX2) / 2} y={m.busY + 18} textAnchor="middle" className="erp-topo-edge-lab">{m.busLab}</text>
        </g>
      )}

      {/* edges */}
      {m.edges.map((e, i) => {
        const hot = e.layer === step;
        const on = e.layer < step;
        const pts = e.via;
        let d = `M ${pts[0]} ${pts[1]}`;
        for (let k = 2; k < pts.length; k += 2) d += ` L ${pts[k]} ${pts[k + 1]}`;
        const midX = pts[pts.length - 4] != null ? (pts[pts.length - 4] + pts[pts.length - 2]) / 2 : pts[0];
        const midY = pts[pts.length - 3] != null ? (pts[pts.length - 3] + pts[pts.length - 1]) / 2 - 8 : pts[1] - 8;
        return (
          <g key={i} className={`erp-topo-edge ${hot ? "hot" : ""} ${on ? "on" : ""}`}>
            <path d={d} fill="none" markerEnd={e.loop ? undefined : "url(#erp-arrow)"} />
            {e.lab ? <text x={midX} y={midY} textAnchor="middle" className="erp-topo-edge-lab">{e.lab}</text> : null}
          </g>
        );
      })}

      {/* nodes */}
      {m.nodes.map((n) => {
        const on = activeIds.has(n.id) || step >= 0;
        const hot = (scn === "A" && step === 0 && (n.id === "plc" || n.id === "gw"))
          || (scn === "A" && step === 1 && n.id === "gw")
          || (scn === "A" && step === 2 && (n.id === "mqtt" || n.id === "gw"))
          || (scn === "A" && step === 3 && (n.id === "erp" || n.id === "mqtt"))
          || (scn === "B" && ["gun", "app", "api", "erp"][step] === n.id)
          || (scn === "C" && step === 0 && (n.id === "cnc" || n.id === "gw"))
          || (scn === "C" && step === 1 && (n.id === "gw" || n.id === "mqtt"))
          || (scn === "C" && step === 2 && (n.id === "mqtt" || n.id === "erp"))
          || (scn === "C" && step === 3 && (n.id === "erp" || n.id === "wo"));
        return (
          <g key={n.id} transform={`translate(${n.x},${n.y})`} className={`erp-topo-node ${hot ? "hot" : ""} ${on ? "on" : ""}`}>
            <rect width={n.w} height={n.h} rx="8" />
            <text x={n.w / 2} y={20} textAnchor="middle" className="erp-topo-node-t">{L(n.zh, n.en)}</text>
            <text x={n.w / 2} y={36} textAnchor="middle" className="erp-topo-node-s">{n.sub}</text>
          </g>
        );
      })}

      {/* flying packet */}
      <circle cx={px} cy={py} r="7" className="erp-topo-pkt" filter="url(#erp-glow)" />
      <text x="24" y="28" className="erp-topo-title">
        {L("交互拓扑 · 报文沿高亮路径飞行", "Topology · packet flies the highlighted path")}
      </text>
    </svg>
  );
}

function ProtoFlowSvg({ layers, step, L }) {
  const w = 720;
  const boxW = 150;
  const gap = 28;
  const startX = 30;
  const y = 48;
  return (
    <svg className="erp-flow-svg" viewBox="0 0 720 130" role="img">
      <defs>
        <marker id="erp-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      {layers.map((ly, i) => {
        const x = startX + i * (boxW + gap);
        const cls = i === step ? "now" : i < step ? "on" : "";
        return (
          <g key={ly.id} className={`erp-flow-box ${cls}`}>
            <rect x={x} y={y} width={boxW} height={56} rx="8" />
            <text x={x + boxW / 2} y={y + 24} textAnchor="middle" className="t1">{L(ly.zh, ly.en)}</text>
            <text x={x + boxW / 2} y={y + 42} textAnchor="middle" className="t2">{ly.proto}</text>
            {i < layers.length - 1 && (
              <line x1={x + boxW + 4} y1={y + 28} x2={x + boxW + gap - 6} y2={y + 28}
                className={`erp-flow-link ${i < step ? "on" : ""}`} markerEnd="url(#erp-flow-arrow)" />
            )}
          </g>
        );
      })}
      <text x="30" y="22" className="erp-topo-zone-lab">{L("分层流程图（点击下方或图中节点步进）", "Layer flowchart (click nodes or controls to step)")}</text>
    </svg>
  );
}

function ProtoStackViz() {
  const L = useL();
  const [scn, setScn] = React.useState("A");
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [view, setView] = React.useState("topo"); // topo | flow

  const SCENES = {
    A: {
      zh: "A · PLC 计件:485/Modbus → MQTT → ERP",
      en: "A · PLC pieces: 485/Modbus → MQTT → ERP",
      layers: [
        { id: "F", zh: "① 现场总线", en: "① Fieldbus", proto: "RS-485 + Modbus RTU",
          detailZh: "网关(主站)轮询 PLC 从站 3:读保持寄存器 40001=本秒件数 12。总线上还有电表、温湿度从站——设备互连走 485,不直连 ERP。",
          detailEn: "Gateway (master) polls PLC slave 3: holding reg 40001 = piece count 12. Meter & RH share the bus — devices interconnect on 485, never talk ERP directly.",
          pkt: "01 03 9C 41 00 02 CRC…" },
        { id: "E", zh: "② 边缘网关", en: "② Edge gateway", proto: "Map + validate + buffer",
          detailZh: "寄存器 12 + 工位配置 → wo=WO-5521, op=0020;校验工单已下达;生成 eventId;断网则先落盘。",
          detailEn: "Reg 12 + station config → wo=WO-5521, op=0020; WO must be released; mint eventId; buffer if offline.",
          pkt: `{ "eventId":"gw01-…-0007", "wo":"WO-5521", "goodQty":12 }` },
        { id: "M", zh: "③ 消息层", en: "③ Messaging", proto: "MQTT QoS1",
          detailZh: "Publish topic plant/1000/line/A3/confirm。Broker 可被 MES 与中间件同时订阅。",
          detailEn: "Publish topic plant/1000/line/A3/confirm. Broker may fan-out to MES and middleware.",
          pkt: "PUBLISH plant/1000/line/A3/confirm" },
        { id: "R", zh: "④ ERP 事务", en: "④ ERP transaction", proto: "Adapter → Confirm API",
          detailZh: "适配器按 eventId 幂等;调用报工接口;倒冲材料、工时进成本;回 ACK。重复投递直接返回已处理。",
          detailEn: "Adapter idempotent on eventId; confirm API; backflush + hours to cost; ACK. Dupes return already-processed.",
          pkt: "201 CNF-88231 · idempotent OK" },
      ],
    },
    B: {
      zh: "B · RF 枪收货:终端 → HTTPS → ERP",
      en: "B · RF-gun GR: terminal → HTTPS → ERP",
      layers: [
        { id: "F", zh: "① 采集终端", en: "① Capture terminal", proto: "USB-HID / Wi-Fi gun",
          detailZh: "保管员扫 PO 条码与托盘标签;枪把字符送进 WMS App(不是 485 总线)。",
          detailEn: "Clerk scans PO + pallet; gun injects chars into WMS app (not an RS-485 bus).",
          pkt: "PO-7781 \\n ROH-WHEEL" },
        { id: "E", zh: "② 终端 App / 边缘", en: "② App / light edge", proto: "Local validate",
          detailZh: "App 校验 PO 行、容差、质检标识;组 JSON;可离线队列。",
          detailEn: "App checks PO line, tolerance, QI flag; builds JSON; may queue offline.",
          pkt: `{ "po":"PO-7781", "qty":100, "eventId":"gun9-…" }` },
        { id: "M", zh: "③ 集成入口", en: "③ Integration entry", proto: "HTTPS REST",
          detailZh: "POST /api/goods-receipts。要即时成功/失败提示操作员——REST 比 MQTT 更合适。",
          detailEn: "POST /api/goods-receipts. Operator needs instant OK/fail — REST beats MQTT here.",
          pkt: "POST /api/goods-receipts" },
        { id: "R", zh: "④ ERP 过账", en: "④ ERP posting", proto: "Mvt 101 + GR/IR",
          detailZh: "标准收货过账:库存↑、GR/IR 挂账;响应 201 给枪机蜂鸣成功音。",
          detailEn: "Standard GR: stock↑, GR/IR; 201 makes the gun beep success.",
          pkt: "201 GR-12044 · mvt 101" },
      ],
    },
    C: {
      zh: "C · 机床:OPC-UA → 网关 → MQTT",
      en: "C · CNC: OPC-UA → gateway → MQTT",
      layers: [
        { id: "F", zh: "① 设备信息模型", en: "① Device information model", proto: "OPC-UA",
          detailZh: "CNC 在车间以太网暴露节点:Running、PartCount、AlarmCode(不是 485)。",
          detailEn: "CNC exposes Running, PartCount, AlarmCode on shop Ethernet (not 485).",
          pkt: "ns=2;s=PartCount = 1540" },
        { id: "E", zh: "② OPC 桥 / 网关", en: "② OPC bridge / gateway", proto: "Subscribe + map",
          detailZh: "网关订阅 PartCount 变化;映射到设备号与成本中心;过滤抖动脉冲。",
          detailEn: "Gateway subscribes PartCount changes; maps equipment + cost center; filters chatter.",
          pkt: `{ "eq":"CNC-12", "delta":1, "eventId":"opc-…" }` },
        { id: "M", zh: "③ 消息层", en: "③ Messaging", proto: "MQTT / Kafka",
          detailZh: "高频计数可进 MQTT;聚合后的利用率事件再给 ERP,避免每件都打总账。",
          detailEn: "High-freq counts on MQTT; roll up utilization events for ERP — don’t hit the GL per piece.",
          pkt: "plant/1000/eq/CNC-12/count" },
        { id: "R", zh: "④ ERP / 设备账", en: "④ ERP / equipment ledger", proto: "Util. + maint.",
          detailZh: "ERP 收汇总:利用率、报警工单;件级报工仍走情景 A 的工单通道。",
          detailEn: "ERP takes rollups: utilization, maint. orders; piece confirms still use scene A’s WO path.",
          pkt: "EQ util 87% · PM notice" },
      ],
    },
  };

  const s = SCENES[scn];
  const cur = s.layers[step];

  React.useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => setStep((x) => (x + 1) % s.layers.length), 2600);
    return () => clearInterval(id);
  }, [playing, scn, s.layers.length]);

  React.useEffect(() => { setStep(0); }, [scn]);

  return (
    <div>
      <div className="erp-stage">
        <div className="erp-topo-wrap">
          {view === "topo"
            ? <ProtoTopoSvg scn={scn} step={step} L={L} />
            : <ProtoFlowSvg layers={s.layers} step={step} L={L} />}
        </div>
        <div className="erp-proto-stack" style={{ marginTop: 12 }}>
          {s.layers.map((ly, i) => (
            <button key={ly.id} type="button"
              className={`erp-proto-layer ${i === step ? "now" : ""} ${i < step ? "on" : ""}`}
              onClick={() => setStep(i)}>
              <div className="pl-title">{L(ly.zh, ly.en)}</div>
              <div className="pl-proto mono">{ly.proto}</div>
              <div className="pl-pipe">{i < s.layers.length - 1 ? "↓" : ""}</div>
            </button>
          ))}
        </div>
        <div className="erp-doc-detail" style={{ marginTop: 12 }}>
          <strong>{L(cur.zh, cur.en)} · {cur.proto}</strong>
          <p style={{ margin: "8px 0" }}>{L(cur.detailZh, cur.detailEn)}</p>
          <pre className="erp-code" style={{ marginTop: 8 }}>{cur.pkt}</pre>
        </div>
        <div className="erp-proto-legend mono">
          {L("原则:现场协议(485/OPC…)留在左区车间网;IT 协议(MQTT/HTTPS)留在右区——拓扑上用颜色分区。",
             "Rule: field protocols (485/OPC…) stay in the left shop zone; IT protocols (MQTT/HTTPS) stay right — zones are color-coded on the topology.")}
        </div>
      </div>
      <div className="viz-ctrl" style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <Choice label={L("对接情景", "Integration scene")} value={scn}
          onChange={(v) => { setScn(v); setPlaying(false); }}
          options={Object.keys(SCENES).map((k) => ({ v: k, l: L(SCENES[k].zh, SCENES[k].en) }))} />
        <Choice label={L("视图", "View")} value={view} onChange={setView}
          options={[
            { v: "topo", l: L("SVG 拓扑", "SVG topology") },
            { v: "flow", l: L("分层流程", "Layer flowchart") },
          ]} />
        <button className="btn erp-minibtn" onClick={() => setPlaying((p) => !p)}>
          {playing ? L("暂停动画", "Pause anim") : L("自动步进", "Auto step")}
        </button>
        <StepCtl cur={step} setCur={setStep} max={s.layers.length - 1} L={L} />
      </div>
      <div className="viz-readout">
        {L("上图是可交互拓扑:橙点沿当前层路径飞行。情景 A 看清「485 多从站总线 → 网关 → MQTT 扇出 MES/ERP」;切到流程图视图可对照四层栈。",
           "The diagram is interactive: the orange packet flies the active-layer path. Scene A shows multi-drop 485 → gateway → MQTT fan-out to MES/ERP; switch to the flowchart view for the four-layer stack.")}
      </div>
    </div>
  );
}

/* ---- Andon / Scan SVG companions ---- */
function AndonTopoSvg({ state, L }) {
  const phase = state === "GREEN" || state === "FIX" ? 0 : state === "CALL" ? 1 : 2;
  return (
    <svg className="erp-mini-topo" viewBox="0 0 640 160" role="img">
      <defs>
        <marker id="ad-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      {[
        { x: 30, zh: "拉绳/IO", en: "Cord/IO", sub: "GPIO" },
        { x: 170, zh: "安灯控制器", en: "Andon ctrl", sub: "MCU/PLC" },
        { x: 320, zh: "MES", en: "MES", sub: "State machine" },
        { x: 470, zh: "ERP", en: "ERP", sub: "Downtime/OEE" },
      ].map((n, i) => (
        <g key={i} className={`erp-topo-node ${i <= phase + 1 ? "on" : ""} ${i === phase + 1 || (phase === 0 && i === 0) ? "hot" : ""}`} transform={`translate(${n.x},50)`}>
          <rect width="120" height="52" rx="8" />
          <text x="60" y="22" textAnchor="middle" className="erp-topo-node-t">{L(n.zh, n.en)}</text>
          <text x="60" y="40" textAnchor="middle" className="erp-topo-node-s">{n.sub}</text>
        </g>
      ))}
      {[150, 300, 450].map((x, i) => (
        <line key={i} x1={x} y1="76" x2={x + 20} y2="76"
          className={`erp-topo-edge ${i < phase + 1 ? "on" : ""} ${i === phase ? "hot" : ""}`}
          markerEnd="url(#ad-arrow)" />
      ))}
      <text x="30" y="28" className="erp-topo-zone-lab">{L("安灯信号链 · 红灯时 ERP 报工冻结", "Andon signal chain · ERP confirms freeze while red")}</text>
    </svg>
  );
}

function ScanTopoSvg({ mode, step, L }) {
  const labels = {
    GR: ["Gun", "Edge", "ERP API", "Stock"],
    GI: ["Gun", "Edge", "ERP API", "WIP"],
    CNF: ["PLC/Scan", "Gateway", "Confirm", "Cost"],
    CC: ["Gun", "Approve", "ERP", "Adj."],
  };
  const labs = labels[mode] || labels.GR;
  return (
    <svg className="erp-mini-topo" viewBox="0 0 640 120" role="img">
      <defs>
        <marker id="sc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      {labs.map((lab, i) => {
        const x = 30 + i * 155;
        return (
          <g key={i}>
            <g className={`erp-topo-node ${i < step ? "on" : ""} ${i === Math.min(step, 3) ? "hot" : ""}`} transform={`translate(${x},40)`}>
              <rect width="120" height="44" rx="8" />
              <text x="60" y="28" textAnchor="middle" className="erp-topo-node-t">{lab}</text>
            </g>
            {i < 3 && (
              <line x1={x + 120} y1="62" x2={x + 155} y2="62"
                className={`erp-topo-edge ${i < step ? "on hot" : ""}`} markerEnd="url(#sc-arrow)" />
            )}
          </g>
        );
      })}
      <text x="30" y="24" className="erp-topo-zone-lab">{L("采集→过账拓扑", "Capture→post topology")}</text>
    </svg>
  );
}

/* ---- register into viz2's VIZ map ---- */
if (typeof VIZ !== "undefined") {
  VIZ.collabWorld = () => <CollabWorldViz />;
  VIZ.e2eProgress = () => <E2eProgressViz />;
  VIZ.factoryTwin = () => <FactoryTwinViz />;
  VIZ.hwCatalog = () => <HwCatalogViz />;
  VIZ.andonBoard = () => <AndonBoardViz />;
  VIZ.scanToPost = () => <ScanToPostViz />;
  VIZ.protoStack = () => <ProtoStackViz />;
}
window.CollabWorldViz = CollabWorldViz;
window.E2eProgressViz = E2eProgressViz;
window.FactoryTwinViz = FactoryTwinViz;
window.HwCatalogViz = HwCatalogViz;
window.AndonBoardViz = AndonBoardViz;
window.ScanToPostViz = ScanToPostViz;
window.ProtoStackViz = ProtoStackViz;
