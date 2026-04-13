"use client";
import { useState, useEffect } from "react";

const C = {
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  text: "#101820",
  muted: "#575858",
  hint: "#636363",
  faint: "rgba(16,24,32,0.06)",
  green: { dot: "#00BE4C", text: "#008C38", bg: "rgba(0,190,76,0.06)", border: "rgba(0,190,76,0.2)", accent: "#00BE4C" },
  teal: { dot: "#12C2D3", text: "#0C818E", bg: "rgba(18,194,211,0.06)", border: "rgba(18,194,211,0.2)", accent: "#12C2D3" },
  blue: { dot: "#438AFF", text: "#2A6AD4", bg: "rgba(67,138,255,0.06)", border: "rgba(67,138,255,0.2)", accent: "#438AFF" },
  amber: "#FEDD00",
  red: "#f26522",
  brand: "#00BE4C",
};
const zoneMap = { marketing: C.green, qualification: C.teal, sales: C.blue };

function Section({ id, children, dark }) {
  return (
    <section id={id} style={{
      padding: "clamp(60px, 10vw, 120px) 24px",
      background: dark ? "#101820" : "transparent",
      color: dark ? "rgba(255,255,255,0.9)" : C.text,
      position: "relative",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function SectionLabel({ children, dark }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,0.3)" : C.hint, marginBottom: 16,
    }}>{children}</div>
  );
}

function SectionTitle({ children, dark }) {
  return (
    <h2 style={{
      fontSize: "clamp(26px, 4.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.03em",
      lineHeight: 1.12, margin: "0 0 20px",
      color: dark ? "rgba(255,255,255,0.95)" : C.text,
    }}>{children}</h2>
  );
}

function Body({ children, dark, style = {} }) {
  return (
    <p style={{
      fontSize: 15, lineHeight: 1.7,
      color: dark ? "rgba(255,255,255,0.55)" : C.muted,
      margin: "0 0 16px", maxWidth: 600, ...style,
    }}>{children}</p>
  );
}

function Pill({ children, color = C.hint }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 10, fontWeight: 600, padding: "2px 10px",
      borderRadius: 20, background: color, color: "#fff", letterSpacing: "0.04em",
      textTransform: "uppercase", marginRight: 6,
    }}>{children}</span>
  );
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { href: "#diagnostic", label: "Diagnostic" },
    { href: "#process", label: "Process" },
    { href: "#approach", label: "Approach" },
    { href: "#timeline", label: "Timeline" },
    { href: "#team", label: "Team" },
    { href: "#why-pwc", label: "Why PwC" },
  ];
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 24px", height: 56,
        background: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ maxWidth: 800, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "-0.01em" }}>
            <span style={{ color: "#D04A02" }}>PwC</span>
            <span style={{ color: C.hint }}> &middot; </span>
            <span style={{ color: C.brand }}>Infoblox</span>
            <span style={{ color: C.hint }}> &middot; </span>
            <span style={{ color: C.brand }}>Jazz Program</span>
          </a>
          <div className="nav-links" style={{ display: "flex", gap: 24 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} style={{
                fontSize: 12, fontWeight: 500, color: C.muted, textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = C.text}
              onMouseLeave={e => e.target.style.color = C.muted}
              >{l.label}</a>
            ))}
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "none", border: "none", cursor: "pointer",
              padding: 8, color: C.text, fontSize: 20,
            }}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{
          position: "fixed", top: 56, left: 0, right: 0, bottom: 0,
          zIndex: 99, background: "rgba(250,250,248,0.98)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 32,
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              fontSize: 18, fontWeight: 600, color: C.text, textDecoration: "none",
              letterSpacing: "-0.01em",
            }}>{l.label}</a>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section style={{
      minHeight: "85vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "120px 24px 80px",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto", width: "100%" }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
          color: C.brand, marginBottom: 24,
        }}>PwC &middot; Infoblox &middot; Jazz Program</div>
        <h1 style={{
          fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em",
          lineHeight: 1.05, margin: "0 0 24px", color: C.text,
        }}>
          Lead-to-Opportunity<br />Transformation
        </h1>
        <p style={{
          fontSize: "clamp(16px, 2.5vw, 20px)", lineHeight: 1.6,
          color: C.muted, maxWidth: 540, margin: "0 0 48px",
        }}>
          A proposal to simplify the revenue lifecycle across Salesforce and Marketo,
          moving from Vista BOSS-era architecture to a modern operating model built for
          how Infoblox sells today.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href="#approach" style={{
            display: "inline-block", padding: "12px 28px", borderRadius: 8,
            background: C.brand, color: "#fff", fontSize: 14, fontWeight: 600,
            textDecoration: "none", letterSpacing: "-0.01em",
          }}>View our approach</a>
          <a href="#diagnostic" style={{
            display: "inline-block", padding: "12px 28px", borderRadius: 8,
            background: "transparent", color: C.text, fontSize: 14, fontWeight: 600,
            textDecoration: "none", letterSpacing: "-0.01em",
            border: `1px solid ${C.faint}`,
          }}>Read the diagnostic</a>
        </div>
      </div>
    </section>
  );
}

/* ─── DIAGNOSTIC ─── */
function Diagnostic() {
  const findings = [
    { label: "Structural", title: "Leads managed as Opportunities", body: "The qualification funnel was built inside the Opportunity object rather than the Lead object. MQLs are defined as Opportunities created by BDRs, collapsing qualification and conversion into a single premature step." },
    { label: "Operational", title: "Dual-object complexity", body: "BDRs toggle between Lead and Contact views. No robust cross-object deduplication. Account matching fails for new and small accounts. Opportunity Roles and Teams are underutilized." },
    { label: "Downstream", title: "Reporting and attribution breakdown", body: "Tableau stitches Leads + Contacts into a person table. Any model change requires query and data structure updates. Bizible/Marketo Measure attribution is unreliable across the split objects." },
    { label: "Governance", title: "No source of truth", body: "Lack of governance across data sources, field definitions, and usage. Unified reporting and attribution are impossible because of the separate lead and contact objects." },
  ];
  return (
    <Section id="diagnostic">
      <SectionLabel>Diagnostic</SectionLabel>
      <SectionTitle>What we see in the current architecture</SectionTitle>
      <Body>
        Your current lead-to-opportunity structure was implemented as part of Vista BOSS standardization,
        designed for a perpetual/hardware motion. The company has transformed. The CRM and marketing
        automation architecture has not. Everything below flows from one structural distortion: the
        qualification funnel lives inside the Opportunity object.
      </Body>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginTop: 32 }}>
        {findings.map((f, i) => (
          <div key={i} style={{
            padding: "20px 22px", borderRadius: 12,
            border: `1px solid ${C.faint}`, background: C.surface,
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.brand, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{f.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8, letterSpacing: "-0.01em" }}>{f.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>{f.body}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── PROCESS FLOW ─── */
const STAGES_CURRENT = [
  { zone: "marketing", label: "Marketing stage", sublabel: "Marketo-owned", stages: [
    { name: "MAL", title: "New lead", system: ["Marketo", "SFDC Lead"], description: "Lead created in Salesforce in Open status. Marketing nurtures until qualification.", problems: [] },
    { name: "MEL", title: "Engaged", system: ["Marketo scoring"], description: "Behavioral scoring tracks engagement. Lead remains in Marketo nurture.", problems: [] },
  ]},
  { zone: "qualification", label: "Qualification stage", sublabel: "BDR-owned", stages: [
    { name: "AQL", title: "Auto qualified", system: ["SFDC Lead", "LeanData"], description: "Lead routed to BDR. Scoring threshold met.", problems: [] },
    { name: "TAL", title: "Worked", system: ["SFDC Lead"], description: "BDR works the Lead. Working or Contacted status.", problems: ["BDRs toggling between Lead and Contact views"] },
    { name: "MQL", title: "Opp created", system: ["SFDC Opportunity", "Marketo"], description: "BDR converts Lead to Opportunity. AQL date set, BDR flag checked, default $ value added.", problems: ["MQL = Opportunity creation. Leads managed as Opps from this point.", "No cross-object dedup. Account matching fails."] },
  ]},
  { zone: "sales", label: "Sales stage", sublabel: "AE-owned", stages: [
    { name: "SAL", title: "Opp accepted", system: ["SFDC Opportunity"], description: "Opp transferred to AE. Qualify stage. SAL date set.", problems: ["Unclear ownership boundary between BDR and AE"] },
    { name: "SQL", title: "Opp qualified", system: ["SFDC Opportunity", "Tableau", "Bizible"], description: "Build & Validate stage. SQL date set. Qualified Pipeline.", problems: ["Tableau stitches Leads + Contacts. Attribution broken."] },
  ]},
];

const STAGES_FUTURE = [
  { zone: "marketing", label: "Marketing owned", sublabel: "Marketo-governed \u00b7 SFDC Lead object", stages: [
    { name: "New", title: "Lead", system: ["Marketo", "SFDC Lead", "ZoomInfo"], description: "Lead created via Marketo sync, form fill, import, or enrichment. Full database sync.", changes: ["Clean field mapping at sync. Enrichment on ingest."] },
    { name: "Engaged", title: "", system: ["Marketo scoring", "6Sense"], description: "Dual scoring: Behavior (engagement) + Fit (firmographic via 6Sense + ZoomInfo).", changes: ["Scoring model recalibrated for SaaS/subscription motion."] },
    { name: "MQL", title: "Qualified", system: ["Marketo lifecycle", "SFDC Lead", "LeanData"], description: "Score threshold met. Lead Status updated to MQL. Alert to BDR. No Opportunity created.", changes: ["MQL restored to standard definition: 'marketing qualified' not 'opp created.'"], isKeyChange: true },
  ]},
  { zone: "qualification", label: "BDR owned", sublabel: "SFDC Lead object \u2192 conversion gate", stages: [
    { name: "SAL", title: "Accepted", system: ["SFDC Lead", "Marketo"], description: "BDR accepts within SLA (48 hr). Lead Status updated, syncs to Marketo.", changes: ["Single-object workflow. SLA with auto-escalation."] },
    { name: "SQL", title: "Qualified", system: ["SFDC Lead Conversion", "LeanData", "Bizible"], description: "BDR qualifies via MEDDPICC. SFDC Lead Conversion fires.", changes: ["Lead \u2192 Contact + Account + Opportunity in one governed event.", "LeanData matching/dedup at conversion. Attribution preserved."], isConversionGate: true },
  ]},
  { zone: "sales", label: "Sales owned", sublabel: "SFDC Opportunity + Contact", stages: [
    { name: "Prospect", title: "Stage", system: ["SFDC Opportunity", "Contact Role"], description: "AE accepts Opportunity. Contact Role assigned. Territory validated.", changes: [] },
    { name: "Qualify", title: "", system: ["SFDC Opportunity", "Outreach"], description: "MEDDPICC qualification continues. Opp Team populated.", changes: ["Opp Roles and Teams actively used."] },
    { name: "Build & Validate", title: "", system: ["SFDC Opportunity", "Clari", "Tableau"], description: "Qualified Pipeline. Clean reporting without Lead+Contact stitching.", changes: ["Single path: Contact \u2192 Opp \u2192 Campaign Influence."] },
  ]},
];

const KEY_CHANGES = [
  { category: "Object model", items: [
    { title: "MQL redefined", description: "From 'Opportunity created by BDR' to 'Lead that hit scoring threshold.'" },
    { title: "Lead Conversion gate moved to SQL", description: "SFDC Lead Conversion fires at SQL, creating Contact + Account + Opportunity in one governed event." },
    { title: "BDR single-object workflow", description: "BDRs work exclusively on the Lead object until conversion." },
    { title: "Opp Roles and Teams activated", description: "Contact Roles and Opportunity Teams for multi-threading and attribution." },
  ]},
  { category: "Scoring and routing", items: [
    { title: "Scoring model recalibration", description: "Rebuild for SaaS buying signals, incorporating 6Sense intent data alongside Marketo behavioral scoring." },
    { title: "LeanData reconfigured", description: "Rebuild matching rules, add cross-object dedup, lead-to-account matching at conversion." },
  ]},
  { category: "Reporting and attribution", items: [
    { title: "Tableau dependency unwound", description: "Single Contact object post-conversion replaces the Lead+Contact person table stitching." },
    { title: "Attribution restored", description: "Clean flow through Lead \u2192 Contact \u2192 Opp \u2192 Campaign Influence." },
  ]},
  { category: "Governance", items: [
    { title: "SLAs with enforcement", description: "48-hr BDR acceptance with auto-escalation. Measured weekly." },
    { title: "Field governance", description: "Source of truth per field. Custom field audit. Definitions aligned across all systems." },
  ]},
];

function StageCard({ stage, zone }) {
  const [open, setOpen] = useState(false);
  const c = zoneMap[zone];
  return (
    <div onClick={() => setOpen(!open)} style={{
      position: "relative", padding: "16px 20px", borderRadius: 10, cursor: "pointer",
      background: open ? c.bg : "rgba(255,255,255,0.5)",
      border: `1px solid ${open ? c.border : C.faint}`,
      transition: "all 0.25s ease",
    }}>
      {stage.isConversionGate && <Pill color={C.amber}>Conversion gate</Pill>}
      {stage.isKeyChange && <Pill color={c.accent}>Key change</Pill>}
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, marginTop: (stage.isConversionGate || stage.isKeyChange) ? 6 : 0 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: c.text, letterSpacing: "-0.02em" }}>{stage.name}</span>
        {stage.title && <span style={{ fontSize: 13, color: C.hint, fontWeight: 500 }}>{stage.title}</span>}
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.55, color: C.muted, margin: 0 }}>{stage.description}</p>
      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
          {stage.problems?.length > 0 && <div style={{ marginBottom: 10 }}>{stage.problems.map((p, i) => <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: 12, lineHeight: 1.5, color: C.red }}><span style={{ flexShrink: 0 }}>{"\u26A0"}</span><span>{p}</span></div>)}</div>}
          {stage.changes?.length > 0 && <div style={{ marginBottom: 10 }}>{stage.changes.map((ch, i) => <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: 12, lineHeight: 1.5, color: C.green.text }}><span style={{ flexShrink: 0 }}>{"\u2713"}</span><span>{ch}</span></div>)}</div>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{stage.system.map((s, i) => <span key={i} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "rgba(0,0,0,0.04)", color: C.hint, fontWeight: 500 }}>{s}</span>)}</div>
        </div>
      )}
    </div>
  );
}

function ProcessFlow() {
  const [tab, setTab] = useState("current");
  const tabs = [{ id: "current", label: "Current state" }, { id: "future", label: "Proposed future" }, { id: "delta", label: "Key changes" }];
  const data = tab === "current" ? STAGES_CURRENT : STAGES_FUTURE;

  return (
    <Section id="process">
      <SectionLabel>Process architecture</SectionLabel>
      <SectionTitle>From / To lifecycle design</SectionTitle>
      <Body>Click any stage to expand system details, diagnostic findings, or proposed changes.</Body>

      <div style={{ display: "flex", gap: 4, marginBottom: 32, padding: 4, background: "rgba(0,0,0,0.03)", borderRadius: 12 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "10px 12px", border: "none", cursor: "pointer", borderRadius: 9,
            fontSize: 13, fontWeight: tab === t.id ? 600 : 500, fontFamily: "inherit",
            color: tab === t.id ? C.text : C.hint,
            background: tab === t.id ? "#fff" : "transparent",
            boxShadow: tab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      {tab !== "delta" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {data.map((zone, zi) => {
            const c = zoneMap[zone.zone];
            return (
              <div key={zi}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: c.text, textTransform: "uppercase", letterSpacing: "0.06em" }}>{zone.label}</div>
                    <div style={{ fontSize: 11, color: C.hint, marginTop: 1 }}>{zone.sublabel}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 18, borderLeft: `2px solid ${c.border}` }}>
                  {zone.stages.map((s, si) => <StageCard key={si} stage={s} zone={zone.zone} />)}
                </div>
              </div>
            );
          })}
          <div style={{ padding: "14px 18px", borderRadius: 10, border: "1px dashed rgba(0,0,0,0.12)", background: "rgba(0,0,0,0.015)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.hint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Recycle / Disqualify</div>
            {tab === "future" ? (
              <div style={{ fontSize: 12, lineHeight: 1.6, color: C.muted }}>
                <strong style={{ color: C.text }}>Pre-conversion:</strong> Recycled to segment-specific nurture. <strong style={{ color: C.text }}>Post-conversion:</strong> Contact re-engagement program. <strong style={{ color: C.text }}>DQ:</strong> Reason code, excluded from sends, quarterly review.
              </div>
            ) : (
              <div style={{ fontSize: 12, lineHeight: 1.6, color: C.muted }}>Leads recycle back to Marketing nurture. <span style={{ color: C.red }}>Logic is fragile and inconsistently applied.</span></div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {KEY_CHANGES.map((cat, ci) => (
            <div key={ci}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.hint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.faint}` }}>{cat.category}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {cat.items.map((item, ii) => (
                  <div key={ii} style={{ padding: "14px 18px", borderRadius: 10, border: `1px solid ${C.faint}`, background: C.surface }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/* ─── APPROACH ─── */
function Approach() {
  const phases = [
    {
      num: "01",
      name: "Discover & diagnose",
      weeks: "Weeks 1\u20133",
      deliverables: [
        "Current-state documentation: end-to-end lead-to-opp flow, data model map, automation inventory (Apex triggers, flows, Marketo smart campaigns)",
        "Stakeholder interviews across Sales Ops, Marketing Ops, IT, BDR leadership, and Sales leadership",
        "Pain point validation and quantification: conversion rates by stage, time-in-stage, lead leakage, SLA adherence",
        "Cost-of-doing-nothing baseline with projected operational and opportunity costs over 12 months",
      ],
      outcomes: "Validated problem statement, quantified baseline, and shared understanding across all stakeholders of what is actually happening in the systems today.",
    },
    {
      num: "02",
      name: "Design & recommend",
      weeks: "Weeks 4\u20136",
      deliverables: [
        "Option 1/2/3 evaluation with detailed cost, risk, effort, and timeline comparison",
        "Recommended architecture: target-state data model, lifecycle stage definitions, conversion rules, scoring model framework, SLA structure",
        "Impact assessment for downstream systems: Tableau, Clari, Bizible, LeanData, partner routing",
        "Workshop series (3 sessions): Architecture review, Process design, Roadmap prioritization",
      ],
      outcomes: "Steerco-ready recommendation with a clear path forward. Decision gate: Infoblox selects the option and approves the implementation roadmap.",
    },
    {
      num: "03",
      name: "Roadmap & plan",
      weeks: "Weeks 7\u20138",
      deliverables: [
        "Phased implementation roadmap with workstream definitions, dependencies, and sequencing",
        "Change management plan: impacted teams, training needs, communication cadence, go-live criteria",
        "Governance framework: field ownership, SLA enforcement, scoring model review cadence, data quality KPIs",
        "Implementation SOW for Phase 2 execution (if PwC is selected to continue)",
      ],
      outcomes: "Actionable roadmap that Infoblox can execute with confidence, whether with PwC or independently. No vendor lock-in, no black boxes.",
    },
  ];

  return (
    <Section id="approach" dark>
      <SectionLabel dark>Engagement approach</SectionLabel>
      <SectionTitle dark>How we would deliver this</SectionTitle>
      <Body dark>
        This first phase is an 8-week diagnostic-to-roadmap engagement. The goal is not just to tell
        you what is wrong. You already know that. The goal is to give you a clear, quantified basis for
        decision-making and a future-state architecture you can act on.
      </Body>
      <Body dark style={{ marginBottom: 40 }}>
        Three phases, each with defined deliverables and a decision gate before proceeding.
      </Body>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {phases.map((p, i) => (
          <div key={i} style={{
            padding: "28px 28px 24px", borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: "rgba(255,255,255,0.08)", letterSpacing: "-0.04em" }}>{p.num}</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>{p.name}</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.brand, marginBottom: 16 }}>{p.weeks}</div>
            <div style={{ marginBottom: 16 }}>
              {p.deliverables.map((d, di) => (
                <div key={di} style={{
                  display: "flex", gap: 8, marginBottom: 8,
                  fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.55)",
                }}>
                  <span style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>{"\u2022"}</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
            <div style={{
              padding: "12px 16px", borderRadius: 8,
              background: "rgba(255,255,255,0.04)", borderLeft: `3px solid ${C.brand}`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Outcome</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.65)" }}>{p.outcomes}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── TIMELINE ─── */
function Timeline() {
  const weeks = [
    { w: "1", activities: ["Kickoff", "System access", "Stakeholder scheduling"] },
    { w: "2", activities: ["Interviews: Sales Ops, Mktg Ops, IT", "Automation inventory begins"] },
    { w: "3", activities: ["Data model mapping", "Conversion flow tracing", "Pain point quantification"] },
    { w: "4", activities: ["Options analysis", "Target-state architecture draft"] },
    { w: "5", activities: ["Workshop 1: Architecture review", "Workshop 2: Process design"] },
    { w: "6", activities: ["Impact assessment", "Workshop 3: Roadmap prioritization"] },
    { w: "7", activities: ["Roadmap build", "Change management plan"] },
    { w: "8", activities: ["Governance framework", "Final readout to Steerco", "Implementation SOW"] },
  ];
  const phaseBreaks = [3, 6];

  return (
    <Section id="timeline">
      <SectionLabel>Timeline</SectionLabel>
      <SectionTitle>8-week delivery plan</SectionTitle>
      <Body>Week-by-week view of activities across all three phases.</Body>
      <div style={{ marginTop: 32 }}>
        {weeks.map((wk, i) => (
          <div key={i}>
            {phaseBreaks.includes(i) && (
              <div style={{
                padding: "6px 0", marginBottom: 4,
                fontSize: 10, fontWeight: 700, color: C.brand,
                textTransform: "uppercase", letterSpacing: "0.1em",
                borderTop: `1px solid ${C.faint}`,
              }}>
                {i === 3 ? "Phase 2: Design & recommend" : "Phase 3: Roadmap & plan"}
              </div>
            )}
            {i === 0 && (
              <div style={{
                padding: "6px 0", marginBottom: 4,
                fontSize: 10, fontWeight: 700, color: C.brand,
                textTransform: "uppercase", letterSpacing: "0.1em",
              }}>Phase 1: Discover & diagnose</div>
            )}
            <div style={{
              display: "flex", gap: 16, padding: "10px 0",
              borderBottom: `1px solid ${C.faint}`,
            }}>
              <div style={{
                width: 36, flexShrink: 0, fontSize: 13, fontWeight: 700,
                color: C.hint, textAlign: "right",
              }}>W{wk.w}</div>
              <div style={{ flex: 1 }}>
                {wk.activities.map((a, ai) => (
                  <div key={ai} style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>{a}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── TEAM ─── */
function Team() {
  const roles = [
    { role: "Engagement Partner", focus: "Executive relationship, steerco alignment, quality assurance, option recommendation framing" },
    { role: "Engagement Manager", focus: "Day-to-day delivery, workstream coordination, workshop facilitation, stakeholder management" },
    { role: "Salesforce Architect", focus: "SFDC data model analysis, Apex/Flow inventory, conversion logic design, downstream impact assessment" },
    { role: "Marketo/Marketing Ops Lead", focus: "Lifecycle program audit, scoring model analysis, sync configuration review, campaign attribution mapping" },
    { role: "Change Management Lead", focus: "Stakeholder impact analysis, training plan, communication strategy, adoption readiness" },
  ];

  return (
    <Section id="team">
      <SectionLabel>Team</SectionLabel>
      <SectionTitle>Who would be on this engagement</SectionTitle>
      <Body>
        Five roles, each with specific accountability. We would staff practitioners who have
        done this specific kind of work before, not generalists learning on your dime.
      </Body>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 32 }}>
        {roles.map((r, i) => (
          <div key={i} style={{
            display: "flex", gap: 20, padding: "16px 20px", borderRadius: 10,
            border: `1px solid ${C.faint}`, background: C.surface,
            flexWrap: "wrap",
          }}>
            <div style={{ minWidth: 200, flex: "0 0 auto" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>{r.role}</div>
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>{r.focus}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── WHY PWC ─── */
function WhyPwC() {
  const points = [
    { title: "We think in operating models, not tools", body: "This is not a Salesforce configuration project. It is a revenue operations redesign that touches how Sales, Marketing, BDR, Channel, and Analytics teams work together. We bring the business strategy lens alongside the technical depth." },
    { title: "Deep Marketo + Salesforce interlock expertise", body: "We understand how these two systems should work together at the data model level: sync architecture, lifecycle program design, scoring frameworks, attribution plumbing, and the conversion mechanics that connect them." },
    { title: "Configuration, not customization", body: "Aligned with your guiding principles. We bias toward OOB Salesforce and Marketo capabilities, industry-standard patterns, and scalable architecture. The goal is a system that works as intended and can be maintained without specialized tribal knowledge." },
    { title: "Built for where you are going", body: "Whether public company readiness, AI-enabled pipeline operations, or scale through channel. The architecture we recommend will account for your end-state, not just your current pain." },
  ];

  return (
    <Section id="why-pwc" dark>
      <SectionLabel dark>Why PwC</SectionLabel>
      <SectionTitle dark>What we bring to this</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
        {points.map((p, i) => (
          <div key={i} style={{
            padding: "24px 24px", borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 8, letterSpacing: "-0.01em" }}>{p.title}</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>{p.body}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer style={{
      padding: "40px 24px", borderTop: `1px solid ${C.faint}`,
      display: "flex", justifyContent: "center",
    }}>
      <div style={{
        maxWidth: 800, width: "100%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8,
        fontSize: 11, color: C.hint,
      }}>
        <span>PwC US &middot; Confidential &middot; April 2026</span>
        <span>Prepared for Infoblox Jazz Program</span>
      </div>
    </footer>
  );
}

/* ─── MAIN ─── */
export default function App() {
  return (
    <div style={{ background: C.bg }}>
      <style>{`
        @media (max-width: 600px) {
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <Diagnostic />
      <ProcessFlow />
      <Approach />
      <Timeline />
      <Team />
      <WhyPwC />
      <Footer />
    </div>
  );
}
