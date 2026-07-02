import { useState, useEffect, useRef } from "react";

const PALETTE = {
  bg: "#080F1C",
  surface: "#0D1A2D",
  card: "#112238",
  border: "#1E3A5F",
  gold: "#E8A020",
  goldLight: "#F5C060",
  teal: "#00C9B1",
  risk: "#FF6B6B",
  text: "#EEE8DC",
  muted: "#7A90A8",
  dim: "#3D5470",
};

const PRESET_QUERIES = [
  { label: "Raw Cotton", query: "500kg raw cotton by Friday under ₹80/kg, Tamil Nadu" },
  { label: "Packaging", query: "Packaging material suppliers, rating above 4, Bangalore" },
  { label: "Electronics", query: "Electronic components, 1000 units, Mumbai, verified GST" },
];

const agentDefs = [
  {
    id: "procurement",
    icon: "🔍",
    label: "Procurement Agent",
    color: "#4A9EFF",
    steps: ["Parsing NLP query...", "Semantic search across 500 suppliers...", "Filtering by location, price, rating..."],
    getResult: (q) => {
      const suppliers = ["Rajan Textiles Pvt. Ltd.", "Mohanty & Sons", "Sharma Enterprises", "Patel Industrial Co."];
      const s = suppliers[Math.floor(Math.random() * suppliers.length)];
      return { supplier: s, match: `${88 + Math.floor(Math.random() * 10)}% semantic match`, found: `${3 + Math.floor(Math.random() * 8)} suppliers found` };
    },
  },
  {
    id: "risk",
    icon: "🛡️",
    label: "Risk Intelligence Agent",
    color: "#FF6B6B",
    steps: ["Loading ML risk model...", "Checking GST verification, fraud flags...", "Running Random Forest classifier..."],
    getResult: (q) => {
      const score = 74 + Math.floor(Math.random() * 24);
      const risk = score > 85 ? "LOW" : score > 75 ? "MEDIUM" : "HIGH";
      const color = score > 85 ? "#00C9B1" : score > 75 ? "#E8A020" : "#FF6B6B";
      return { trust: `${score}/100`, risk, color, accuracy: "82% model accuracy" };
    },
  },
  {
    id: "negotiation",
    icon: "💰",
    label: "Negotiation Agent",
    color: "#E8A020",
    steps: ["Initiating price negotiation rounds...", "RL-inspired bidding strategy...", "Reaching 95% confidence threshold..."],
    getResult: (q) => {
      const disc = 3 + Math.floor(Math.random() * 6);
      const base = 300 + Math.floor(Math.random() * 200);
      const final = Math.round(base * (1 - disc / 100));
      return { discount: `${disc}% saved`, originalPrice: `₹${base}/unit`, finalPrice: `₹${final}/unit`, rounds: `${2 + Math.floor(Math.random() * 4)} rounds` };
    },
  },
  {
    id: "logistics",
    icon: "🚛",
    label: "Logistics Agent",
    color: "#A78BFA",
    steps: ["Analyzing multi-modal routes...", "Comparing Road / Rail / Air...", "Optimizing for cost + speed..."],
    getResult: (q) => {
      const modes = [{ m: "Rail", d: "2 days", cost: "₹2,400" }, { m: "Road", d: "1 day", cost: "₹3,100" }, { m: "Air", d: "6 hours", cost: "₹8,900" }];
      const pick = modes[Math.floor(Math.random() * 2)];
      return { mode: pick.m, delivery: pick.d, cost: pick.cost, route: "Optimized via hub network" };
    },
  },
  {
    id: "finance",
    icon: "⛓️",
    label: "Finance + Blockchain Agent",
    color: "#00C9B1",
    steps: ["Scoring buyer credit profile...", "Generating smart contract...", "Locking escrow on Polygon PoS..."],
    getResult: (q) => {
      const total = 150000 + Math.floor(Math.random() * 200000);
      const escrow = Math.round(total * 0.3);
      return { total: `₹${total.toLocaleString("en-IN")}`, escrow: `₹${escrow.toLocaleString("en-IN")} locked`, chain: "Polygon PoS", contract: `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}...` };
    },
  },
];

function AgentCard({ agent, phase, result, stepIdx }) {
  const isIdle = phase === "idle";
  const isRunning = phase === "running";
  const isDone = phase === "done";

  return (
    <div style={{
      background: isDone ? PALETTE.card : isRunning ? "#0E1F38" : PALETTE.surface,
      border: `1px solid ${isDone ? agent.color + "60" : isRunning ? agent.color + "40" : PALETTE.border}`,
      borderRadius: 12,
      padding: "16px",
      transition: "all 0.4s ease",
      boxShadow: isDone ? `0 0 20px ${agent.color}15` : "none",
      minHeight: 130,
      position: "relative",
      overflow: "hidden",
    }}>
      {isRunning && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${agent.color}, transparent)`,
          animation: "scanline 1.2s linear infinite",
        }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 18 }}>{agent.icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: isDone || isRunning ? agent.color : PALETTE.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {agent.label}
        </span>
        {isDone && <span style={{ marginLeft: "auto", fontSize: 11, background: agent.color + "20", color: agent.color, borderRadius: 20, padding: "2px 8px" }}>✓ DONE</span>}
        {isRunning && <span style={{ marginLeft: "auto", fontSize: 11, color: agent.color, opacity: 0.8 }}>RUNNING</span>}
      </div>

      {isIdle && <div style={{ color: PALETTE.dim, fontSize: 12 }}>Waiting for orchestrator...</div>}

      {isRunning && (
        <div>
          {agent.steps.map((s, i) => (
            <div key={i} style={{
              fontSize: 12, color: i <= stepIdx ? PALETTE.text : PALETTE.dim,
              marginBottom: 4, display: "flex", alignItems: "center", gap: 6,
              transition: "color 0.3s",
            }}>
              <span style={{ color: i < stepIdx ? "#00C9B1" : i === stepIdx ? agent.color : PALETTE.dim }}>
                {i < stepIdx ? "✓" : i === stepIdx ? "›" : "○"}
              </span>
              {s}
            </div>
          ))}
        </div>
      )}

      {isDone && result && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
          {Object.entries(result).map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 10, color: PALETTE.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</div>
              <div style={{ fontSize: 13, color: k === "risk" ? result.color || agent.color : k === "trust" ? agent.color : PALETTE.text, fontWeight: 600 }}>{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DealSeal({ result, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      background: `linear-gradient(135deg, #0A1628, #0D2A1A)`,
      border: `1px solid #00C9B130`,
      borderRadius: 16,
      padding: "28px 32px",
      marginTop: 24,
      boxShadow: "0 0 60px #00C9B115",
      animation: "fadeSlideUp 0.6s ease forwards",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#00C9B120", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⛓️</div>
        <div>
          <div style={{ fontSize: 11, color: PALETTE.teal, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>Blockchain Smart Contract</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: PALETTE.text }}>✅ TRUSTTRADE — DEAL COMPLETE</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 11, color: PALETTE.muted }}>Execution time</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: PALETTE.gold }}>0.08s</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { label: "Supplier", value: result.supplier, sub: result.match },
          { label: "Trust Score", value: result.trust, sub: `🟢 ${result.risk} RISK` },
          { label: "Final Price", value: result.finalPrice, sub: result.discount },
          { label: "Delivery", value: `${result.mode} — ${result.delivery}`, sub: result.logCost },
          { label: "Total Contract", value: result.total, sub: `Escrow: ${result.escrow}` },
          { label: "Smart Contract", value: result.contract, sub: result.chain },
        ].map((item, i) => (
          <div key={i} style={{ background: "#ffffff08", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 10, color: PALETTE.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: PALETTE.text, marginBottom: 2 }}>{item.value}</div>
            <div style={{ fontSize: 11, color: PALETTE.teal }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ flex: 1, height: 1, background: PALETTE.border }} />
        <div style={{ fontSize: 11, color: PALETTE.muted }}>97% confidence · Polygon PoS · Auto-escrow active</div>
        <div style={{ flex: 1, height: 1, background: PALETTE.border }} />
      </div>
    </div>
  );
}

const STATS = [
  { value: "82%", label: "Risk Model Accuracy", sub: "Random Forest" },
  { value: "95.4%", label: "Demand Forecast", sub: "Gradient Boosting" },
  { value: "0.08s", label: "Deal Execution", sub: "End-to-end" },
  { value: "500", label: "Verified Suppliers", sub: "15 Indian cities" },
];

export default function TrustTradeDemo() {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | running | done
  const [agentPhases, setAgentPhases] = useState(agentDefs.map(() => "idle"));
  const [agentSteps, setAgentSteps] = useState(agentDefs.map(() => 0));
  const [agentResults, setAgentResults] = useState(agentDefs.map(() => null));
  const [dealResult, setDealResult] = useState(null);
  const [showDeal, setShowDeal] = useState(false);
  const [activeTab, setActiveTab] = useState("demo");
  const runningRef = useRef(false);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const runDemo = async () => {
    if (!query.trim() || runningRef.current) return;
    runningRef.current = true;
    setPhase("running");
    setShowDeal(false);
    setDealResult(null);
    setAgentPhases(agentDefs.map(() => "idle"));
    setAgentSteps(agentDefs.map(() => 0));
    setAgentResults(agentDefs.map(() => null));

    const collectedResults = {};

    for (let i = 0; i < agentDefs.length; i++) {
      const agent = agentDefs[i];
      setAgentPhases((p) => { const n = [...p]; n[i] = "running"; return n; });

      for (let s = 0; s < agent.steps.length; s++) {
        setAgentSteps((p) => { const n = [...p]; n[i] = s; return n; });
        await sleep(600 + Math.random() * 300);
      }

      const res = agent.getResult(query);
      collectedResults[agent.id] = res;
      setAgentResults((p) => { const n = [...p]; n[i] = res; return n; });
      setAgentPhases((p) => { const n = [...p]; n[i] = "done"; return n; });
      await sleep(200);
    }

    const deal = {
      supplier: collectedResults.procurement.supplier,
      match: collectedResults.procurement.match,
      trust: collectedResults.risk.trust,
      risk: collectedResults.risk.risk,
      finalPrice: collectedResults.negotiation.finalPrice,
      discount: collectedResults.negotiation.discount,
      mode: collectedResults.logistics.mode,
      delivery: collectedResults.logistics.delivery,
      logCost: collectedResults.logistics.cost,
      total: collectedResults.finance.total,
      escrow: collectedResults.finance.escrow,
      chain: collectedResults.finance.chain,
      contract: collectedResults.finance.contract,
    };

    setDealResult(deal);
    setShowDeal(true);
    setPhase("done");
    runningRef.current = false;
  };

  const reset = () => {
    setPhase("idle");
    setShowDeal(false);
    setDealResult(null);
    setAgentPhases(agentDefs.map(() => "idle"));
    setAgentSteps(agentDefs.map(() => 0));
    setAgentResults(agentDefs.map(() => null));
    setQuery("");
    runningRef.current = false;
  };

  return (
    <div style={{ background: PALETTE.bg, minHeight: "100vh", color: PALETTE.text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @keyframes scanline { from { transform: translateX(-100%); } to { transform: translateX(400%); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 10px #E8A02040; } 50% { box-shadow: 0 0 30px #E8A02080; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea, input { outline: none; }
        textarea::placeholder { color: #3D5470; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0D1A2D; } ::-webkit-scrollbar-thumb { background: #1E3A5F; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${PALETTE.border}`, padding: "16px 32px", display: "flex", alignItems: "center", gap: 16, background: PALETTE.surface }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${PALETTE.gold}, #C87000)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>TrustTrade <span style={{ color: PALETTE.gold }}>2.0</span></div>
            <div style={{ fontSize: 10, color: PALETTE.muted, letterSpacing: "0.08em" }}>INDIA'S B2B AI SUPPLY CHAIN OS</div>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {["demo", "metrics", "about"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "6px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, textTransform: "capitalize", letterSpacing: "0.05em",
              background: activeTab === tab ? PALETTE.gold : "transparent",
              color: activeTab === tab ? "#080F1C" : PALETTE.muted,
              transition: "all 0.2s",
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>

        {activeTab === "demo" && (
          <>
            {/* Hero */}
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.15em", color: PALETTE.gold, textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>Live Orchestrator Demo</div>
              <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>
                Describe your procurement.<br />
                <span style={{ color: PALETTE.gold }}>9 agents handle the rest.</span>
              </h1>
              <p style={{ color: PALETTE.muted, fontSize: 14, maxWidth: 500, margin: "0 auto" }}>
                Watch AI agents collaborate in real-time — procurement, risk scoring, negotiation, logistics, and blockchain escrow — all in under a second.
              </p>
            </div>

            {/* Presets */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
              {PRESET_QUERIES.map((p) => (
                <button key={p.label} onClick={() => setQuery(p.query)} style={{
                  padding: "6px 14px", borderRadius: 20, border: `1px solid ${PALETTE.border}`, background: "transparent",
                  color: PALETTE.muted, cursor: "pointer", fontSize: 12, transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.target.style.borderColor = PALETTE.gold; e.target.style.color = PALETTE.gold; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = PALETTE.border; e.target.style.color = PALETTE.muted; }}
                >
                  Try: {p.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ background: PALETTE.surface, border: `1px solid ${phase === "running" ? PALETTE.gold + "60" : PALETTE.border}`, borderRadius: 14, padding: "16px 20px", marginBottom: 24, transition: "border-color 0.3s", animation: phase === "running" ? "glow 2s ease infinite" : "none" }}>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='e.g. "500kg organic cotton by Friday under ₹80/kg, Tamil Nadu, rating 4+"'
                rows={2}
                style={{ width: "100%", background: "transparent", border: "none", color: PALETTE.text, fontSize: 15, resize: "none", lineHeight: 1.5 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <div style={{ fontSize: 11, color: PALETTE.dim }}>Natural language · No forms needed</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {phase !== "idle" && (
                    <button onClick={reset} style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${PALETTE.border}`, background: "transparent", color: PALETTE.muted, cursor: "pointer", fontSize: 13 }}>Reset</button>
                  )}
                  <button onClick={runDemo} disabled={!query.trim() || phase === "running"} style={{
                    padding: "8px 24px", borderRadius: 8, border: "none", cursor: query.trim() && phase !== "running" ? "pointer" : "not-allowed",
                    background: query.trim() && phase !== "running" ? `linear-gradient(135deg, ${PALETTE.gold}, #C87000)` : PALETTE.border,
                    color: query.trim() && phase !== "running" ? "#080F1C" : PALETTE.dim,
                    fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                    animation: phase === "running" ? "pulse 1s ease infinite" : "none",
                  }}>
                    {phase === "running" ? "Running..." : phase === "done" ? "Run Again" : "⚡ Execute"}
                  </button>
                </div>
              </div>
            </div>

            {/* Agent Pipeline */}
            {phase !== "idle" && (
              <>
                <div style={{ fontSize: 11, color: PALETTE.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
                  🤖 Multi-Agent Orchestration Pipeline
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
                  {agentDefs.map((agent, i) => (
                    <AgentCard key={agent.id} agent={agent} phase={agentPhases[i]} result={agentResults[i]} stepIdx={agentSteps[i]} />
                  ))}
                </div>
              </>
            )}

            {/* Deal Seal */}
            {showDeal && dealResult && <DealSeal result={dealResult} visible={showDeal} />}
          </>
        )}

        {activeTab === "metrics" && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", color: PALETTE.gold, textTransform: "uppercase", marginBottom: 24, fontWeight: 700 }}>Performance Metrics</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 32 }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: "24px 28px" }}>
                  <div style={{ fontSize: 44, fontWeight: 900, color: PALETTE.gold, letterSpacing: "-0.03em" }}>{s.value}</div>
                  <div style={{ fontSize: 14, color: PALETTE.text, fontWeight: 600, marginTop: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: PALETTE.muted, marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: "24px 28px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: PALETTE.text, marginBottom: 16 }}>The ₹45 Billion Problem</div>
              {[
                { label: "SMEs with no digital supply chain", value: "94%", color: PALETTE.risk },
                { label: "Face payment delays", value: "60%", color: PALETTE.gold },
                { label: "Rejected by traditional banks", value: "78%", color: "#A78BFA" },
                { label: "Demand forecast accuracy", value: "95.4%", color: PALETTE.teal },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: PALETTE.muted }}>{item.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.value}</span>
                  </div>
                  <div style={{ height: 4, background: PALETTE.border, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: item.value, background: item.color, borderRadius: 4, transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div style={{ maxWidth: 600 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", color: PALETTE.gold, textTransform: "uppercase", marginBottom: 24, fontWeight: 700 }}>About the Project</div>

            <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: "24px", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: PALETTE.muted, letterSpacing: "0.06em", marginBottom: 6 }}>DEVELOPER</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Anaswara R Krishnan</div>
              <div style={{ fontSize: 13, color: PALETTE.muted, marginBottom: 16 }}>B.Tech Computer Science · NIT Calicut · 2026</div>
              <div style={{ fontSize: 13, color: PALETTE.text, lineHeight: 1.7 }}>
                TrustTrade 2.0 directly extends research from my final year project on decentralized multi-agent scheduling with NSGA-II — applying auction mechanisms and conflict resolution to real B2B procurement.
              </div>
            </div>

            <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: "24px", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: PALETTE.muted, letterSpacing: "0.06em", marginBottom: 16 }}>TECH STACK</div>
              {[
                { label: "ML Models", value: "Scikit-learn · Random Forest · Gradient Boosting", color: "#4A9EFF" },
                { label: "GenAI", value: "Google Gemini 1.5 Flash · LangGraph Architecture", color: PALETTE.gold },
                { label: "Blockchain", value: "Ethereum · Polygon PoS · Smart Contracts", color: PALETTE.teal },
                { label: "Agent Design", value: "9 Autonomous Agents · Master Orchestrator", color: "#A78BFA" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, color: PALETTE.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: PALETTE.text }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}`, borderRadius: 14, padding: "24px" }}>
              <div style={{ fontSize: 13, color: PALETTE.muted, letterSpacing: "0.06em", marginBottom: 16 }}>ROADMAP</div>
              {[
                { year: "2026", goal: "MVP — 1,000 SMEs · ₹10Cr transactions" },
                { year: "2027", goal: "ONDC integration · 100,000 businesses" },
                { year: "2028", goal: "Southeast Asia expansion" },
                { year: "2030", goal: "$500B transactions · 10M businesses · 8 countries" },
              ].map((item) => (
                <div key={item.year} style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: PALETTE.gold, minWidth: 36 }}>{item.year}</div>
                  <div style={{ fontSize: 13, color: PALETTE.text }}>{item.goal}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
