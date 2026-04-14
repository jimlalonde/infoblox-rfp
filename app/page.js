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
      margin: "0 0 16px", maxWidth: 800, ...style,
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
    { href: "#diagnostic", label: "Initial Thoughts" },
    { href: "#process", label: "What\u2019s Possible" },
    { href: "#approach", label: "Approach" },
    { href: "#team", label: "Team" },
    { href: "#commercials", label: "Commercials" },
  ];

  const sectionToNav = {
    diagnostic: "#diagnostic",
    process: "#process", "process-flow": "#process", agentic: "#process", reporting: "#process",
    approach: "#approach", timeline: "#approach",
    team: "#team",
    commercials: "#commercials", "why-pwc": "#commercials",
  };

  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const ids = Object.keys(sectionToNav);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveHref(sectionToNav[visible[0].target.id] || "");
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

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
            <span style={{ color: C.muted }}>Infoblox</span>
            <span style={{ color: C.hint }}> &middot; </span>
            <span style={{ color: C.muted }}>Jazz Program</span>
          </a>
          <div className="nav-links" style={{ display: "flex", gap: 24 }}>
            {links.map(l => {
              const isActive = activeHref === l.href;
              return (
                <a key={l.href} href={l.href} style={{
                  fontSize: 12, fontWeight: isActive ? 700 : 500,
                  color: isActive ? C.brand : C.muted,
                  textDecoration: "none", transition: "color 0.2s, font-weight 0.2s",
                }}
                onMouseEnter={e => { if (!isActive) e.target.style.color = C.text; }}
                onMouseLeave={e => { if (!isActive) e.target.style.color = C.muted; }}
                >{l.label}</a>
              );
            })}
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
          <a href="#process" style={{
            display: "inline-block", padding: "12px 28px", borderRadius: 8,
            background: "transparent", color: C.text, fontSize: 14, fontWeight: 600,
            textDecoration: "none", letterSpacing: "-0.01em",
            border: `1px solid ${C.faint}`,
          }}>See what&rsquo;s possible</a>
        </div>
      </div>
    </section>
  );
}

/* ─── DIAGNOSTIC ─── */
function Diagnostic() {
  const findings = [
    { label: "Structural", title: "Leads managed as Opportunities", body: "The qualification funnel was built inside the Opportunity object rather than the Lead object. MQLs are defined as Opportunities created by BDRs, collapsing qualification and conversion into a single premature step." },
    { label: "Operational", title: "Dual-object complexity", body: "BDRs toggle between Lead and Contact views. No robust cross-object deduplication. Account matching fails for new and small accounts, which cascades into unreliable lead routing to partner and channel teams. Opportunity Roles and Teams are underutilized." },
    { label: "Downstream", title: "Reporting and attribution breakdown", body: "Tableau stitches Leads + Contacts into a person table. Any model change requires query and data structure updates. Bizible/Marketo Measure attribution is unreliable across the split objects." },
    { label: "Governance", title: "No source of truth", body: "Lack of governance across data sources, field definitions, and usage. Unified reporting and attribution are impossible because of the separate lead and contact objects." },
    { label: "Account complexity", title: "Account structures not built for current GTM", body: "Multi-layered account model (end-user, partner, MSSP, parent/child hierarchies) with 8% of RCNs spanning multiple geographies and reps. Territory assignment, enrichment data flow, and lead-to-account matching all compound the structural issues upstream." },
    { label: "Stack sprawl", title: "Overlapping capabilities across a broad tool landscape", body: "Across the marketing and sales tech stacks, multiple platforms serve overlapping functions within the lead-to-opportunity workflow. Outreach duplicates native Marketo Sales Insight Actions. Reactful overlaps Marketo web personalization. Data flows across multiple enrichment providers without a unified strategy. The result is integration fragility, fragmented engagement data, and higher total cost of ownership." },
  ];
  return (
    <Section id="diagnostic">
      <SectionLabel>Initial thoughts</SectionLabel>
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
  { category: "Lifecycle architecture", items: [
    { title: "MQL redefined", description: "From 'Opportunity created by BDR' to 'Lead that hit scoring threshold.'" },
    { title: "Lead Conversion gate moved to SQL", description: "SFDC Lead Conversion fires at SQL, creating Contact + Account + Opportunity in one governed event." },
    { title: "BDR single-object workflow", description: "BDRs work exclusively on the Lead object until conversion." },
    { title: "Opp Roles and Teams activated", description: "Contact Roles and Opportunity Teams for multi-threading and attribution." },
    { title: "Marketplace opportunity integration", description: "Assess marketplace-originated opportunity workflows and align them with the redesigned lifecycle stages, ensuring consistent attribution and pipeline reporting regardless of origination channel." },
    { title: "Partner and channel routing assessment", description: "Map the current lead routing logic for partner and channel flows. Assess how the redesigned lifecycle and conversion gate impact partner lead distribution, and flag implementation considerations for future phases." },
  ]},
  { category: "Marketo and marketing automation", items: [
    { title: "Lifecycle program redesign", description: "Rebuild Marketo lifecycle programs to align with the new stage definitions. MQL triggers alerts, not Opportunity creation." },
    { title: "Scoring model recalibration", description: "Rebuild for SaaS buying signals, incorporating 6Sense intent data alongside Marketo behavioral scoring." },
    { title: "Sync architecture cleanup", description: "Rationalize Marketo\u2013Salesforce field mapping, sync filters, and program channel configuration to eliminate orphaned data and reduce processing overhead." },
    { title: "Nurture stream segmentation", description: "Segment-specific nurture programs for pre-conversion leads, with re-engagement tracks for recycled and dormant records." },
  ]},
  { category: "SDR operations and AI", items: [
    { title: "SDR Agentforce acceleration", description: "Deploy AI-driven SDR agents to expand coverage into territories without dedicated headcount and surface untapped qualified leads \u2014 proven at Trimble, where Agentforce SDR agents uncovered net-new pipeline in previously unworked segments." },
    { title: "LeanData reconfigured", description: "Rebuild matching rules, add cross-object dedup, lead-to-account matching at conversion." },
  ]},
  { category: "Reporting and attribution", items: [
    { title: "Tableau dependency unwound", description: "Single Contact object post-conversion replaces the Lead+Contact person table stitching." },
    { title: "Attribution restored", description: "Clean flow through Lead \u2192 Contact \u2192 Opp \u2192 Campaign Influence." },
  ]},
  { category: "Governance and data quality", items: [
    { title: "SLAs with enforcement", description: "48-hr BDR acceptance with auto-escalation. Measured weekly." },
    { title: "Field governance", description: "Source of truth per field. Custom field audit. Definitions aligned across all systems." },
    { title: "Duplicate management", description: "Activate native Salesforce duplicate rules and matching rules across Leads, Accounts, and Contacts. Establish merge protocols and ongoing monitoring to prevent data degradation." },
    { title: "Contact management and enrichment strategy", description: "Define the contact data model post-conversion: enrichment sources (ZoomInfo, Dun & Bradstreet), field standardization, lifecycle management for contacts that don\u2019t convert to opportunities, and ongoing data quality maintenance." },
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

/* ─── WHAT'S POSSIBLE INTRO ─── */
function WhatsPossibleIntro() {
  return (
    <section id="process" style={{ padding: "clamp(60px, 10vw, 100px) 24px 0" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionLabel>What&rsquo;s possible</SectionLabel>
        <SectionTitle>A better architecture, and everything it enables</SectionTitle>
        <Body>
          The observations above point to a common root cause: an architecture that has drifted from
          how Infoblox operates today. The three sections that follow lay out what a redesigned
          lifecycle could look like, how AI and platform consolidation build on that foundation, and
          what it all means for the reporting and analytics that drive executive decision-making.
        </Body>
      </div>
    </section>
  );
}

function ProcessFlow() {
  const [tab, setTab] = useState("current");
  const tabs = [{ id: "current", label: "Current state" }, { id: "future", label: "Possible future" }, { id: "delta", label: "Key changes" }];
  const data = tab === "current" ? STAGES_CURRENT : STAGES_FUTURE;

  return (
    <Section id="process-flow">
      <SectionLabel>Lifecycle design</SectionLabel>
      <SectionTitle>From / To lifecycle design</SectionTitle>
      <Body>
        The current-state map below reflects what we have observed across your Salesforce and Marketo
        configuration: how leads move through the funnel, where objects are created, and where ownership
        transfers between teams. The possible future state represents one architecture pattern that
        resolves the structural issues we identified in the diagnostic &mdash; restoring standard lifecycle
        definitions, consolidating the BDR workflow to a single object, and creating a governed conversion
        gate between qualification and sales. We present it as a starting point for discussion, not a
        final answer. The right design will emerge from collaborative workshops with your stakeholders.
      </Body>
      <Body>
        Importantly, this architecture also lays the foundation for what comes next. Clean lifecycle
        stages, reliable scoring, and a governed data model are exactly what enable the agentic
        capabilities we explore in the next section &mdash; where AI-driven qualification and intelligent
        routing can dramatically accelerate pipeline velocity.
      </Body>
      <Body>Click any stage to expand system details, diagnostic findings, or possible changes.</Body>

      <div style={{ display: "flex", gap: 4, marginBottom: 32, padding: 4, background: "rgba(0,0,0,0.03)", borderRadius: 12 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "10px 12px", border: "none", cursor: "pointer", borderRadius: 9,
            fontSize: 13, fontWeight: tab === t.id ? 600 : 500, fontFamily: "inherit",
            color: tab === t.id ? "#fff" : C.hint,
            background: tab === t.id ? C.brand : "transparent",
            boxShadow: tab === t.id ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
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

/* ─── DESIGNED FOR WHAT'S NEXT ─── */
function AgenticVision() {
  const horizons = [
    {
      num: "H1",
      title: "Build the foundation",
      subtitle: "Implementation, informed by the diagnostic",
      description: "Using the architecture and roadmap delivered by the 8-week diagnostic, restore object model integrity, align lifecycle stages, recalibrate scoring, and create a governed conversion gate. This work immediately improves pipeline visibility and conversion accuracy \u2014 and it creates the clean data layer that makes everything in Horizons 2 and 3 possible. A stack rationalization workstream runs in parallel to identify consolidation opportunities.",
      color: C.green.accent,
    },
    {
      num: "H2",
      title: "Activate the agentic layer",
      subtitle: "Building on the clean foundation",
      description: "With clean lifecycle data in place, introduce Agentforce SDR for AI-driven early qualification. Consolidate overlapping tools to simplify the integration landscape. Design human/agent hybrid workflows with clear escalation paths \u2014 so agents handle the volume and your team handles the judgment calls.",
      color: C.teal.accent,
    },
    {
      num: "H3",
      title: "Extend intelligence across the lifecycle",
      subtitle: "Ongoing optimization",
      description: "Expand agentic capabilities beyond qualification into post-conversion: re-engaging stalled opportunities, automating proposal follow-up, and surfacing upsell signals. Add Sales Coach for meeting prep. Build feedback loops where agent performance continuously refines the scoring model.",
      color: C.blue.accent,
    },
  ];

  const consolidation = [
    { tool: "Outreach", action: "Consolidate", target: "Marketo Sales Insight Actions", rationale: "MSI Actions provides native multi-step sales sequences, templated emails, dialer, and activity tracking \u2014 all synced bidirectionally with Marketo and Salesforce. Critical for Agentforce: the agent needs to see the full engagement picture in one place, not across a separate platform." },
    { tool: "Reactful", action: "Consolidate", target: "Marketo Web Personalization", rationale: "Marketo\u2019s native real-time personalization handles website engagement, content recommendations, and behavioral targeting." },
    { tool: "PathFactory", action: "Assess", target: "Marketo Engagement Programs", rationale: "If used primarily for content tracks in nurture, Marketo can absorb. If used for buyer-initiated content journeys with session-level analytics, it may warrant keeping." },
    { tool: "Integrate", action: "Assess", target: "Marketo + LeanData", rationale: "Demand orchestration may overlap with Marketo program management and LeanData routing. Depends on third-party demand gen partner workflows." },
    { tool: "6Sense", action: "Keep", target: "\u2014", rationale: "Account-level intent data and buying stage signals that neither Marketo nor Salesforce replicate. The intelligence layer that makes the agentic model work." },
    { tool: "LeanData", action: "Keep", target: "\u2014", rationale: "Lead-to-account matching and routing at Infoblox\u2019s complexity level (partner/MSSP/end-user structures, multi-geo accounts). Salesforce native matching isn\u2019t sufficient yet." },
    { tool: "Bizible / Marketo Measure", action: "Keep", target: "\u2014", rationale: "Adobe\u2019s own attribution product. Consolidating to it is directionally correct." },
    { tool: "Highspot", action: "Keep", target: "\u2014", rationale: "Sales enablement content management at the level a sales org needs. Not a Marketo or Salesforce native capability." },
  ];

  const lifecycle = [
    {
      stage: "Pre-MQL",
      mode: "Fully automated",
      actors: "Marketo + 6Sense",
      description: "Marketo handles nurture, scoring, and engagement tracking. 6Sense provides account-level intent signals feeding the scoring model. When a lead crosses the MQL threshold (behavior + fit + intent tier), two things happen simultaneously: the lead status updates and Agentforce SDR picks it up.",
    },
    {
      stage: "MQL \u2192 SAL",
      mode: "Agent-led, human-supervised",
      actors: "Agentforce SDR + Data Cloud + SF Sales Engagement",
      description: "The agent pulls context from Data Cloud (Marketo history, 6Sense intent, ZoomInfo firmographics, SFDC activity). It crafts personalized outreach via Salesforce\u2019s native Sales Engagement (not Outreach), handles response classification, answers initial product questions from Highspot content, manages objections, and drives toward scheduling a meeting. All activity logged natively in SFDC and synced to Marketo.",
    },
    {
      stage: "SAL \u2192 SQL",
      mode: "Human-led, agent-assisted",
      actors: "Senior BDR or AE + Sales Coach",
      description: "The human conducts the qualification meeting with full context from the agent: conversation transcript, qualification notes, objections raised, content consumed. Sales Coach agent provides pre-meeting prep (account research, competitor intel, suggested talk tracks). If qualified, the human triggers SFDC Lead Conversion \u2014 the governed conversion gate.",
    },
    {
      stage: "Post-conversion",
      mode: "Mixed",
      actors: "AE + Agentforce",
      description: "Agents assist AEs with nurturing stalled opportunities, automating follow-up on pending proposals, and re-engaging contacts who\u2019ve gone dark. Operates on the Opportunity and Contact objects post-conversion.",
    },
  ];

  const [activeTab, setActiveTab] = useState("lifecycle");
  const tabs = [
    { id: "lifecycle", label: "Agent-augmented lifecycle" },
    { id: "stack", label: "Stack consolidation" },
    { id: "horizons", label: "Three horizons" },
  ];

  return (
    <Section id="agentic">
      <SectionLabel>The agentic layer</SectionLabel>
      <SectionTitle>Designed for what&rsquo;s next</SectionTitle>
      <Body>
        The lifecycle architecture we outlined in the previous section does more than resolve today&rsquo;s
        structural issues. It creates the clean foundation &mdash; standardized stages, reliable scoring,
        governed data &mdash; that unlocks an entirely new operating model: one where AI agents handle
        high-volume qualification and humans focus on the conversations that actually move deals forward.
      </Body>
      <Body>
        Infoblox has already signaled this ambition with &ldquo;AI Ready&rdquo; as a design principle.
        The tools are largely in place: Agentforce in Salesforce, AI capabilities expanding in Marketo,
        and 6Sense providing the intent intelligence layer. What&rsquo;s been missing is the architectural
        foundation to connect them. That is what the lifecycle work enables.
      </Body>
      <Body style={{ marginBottom: 32 }}>
        The vision below shows what becomes possible once that foundation is in place &mdash; a
        progressively more intelligent pipeline that expands coverage, compresses cycle times,
        and lets your team operate at a scale that would be impossible with headcount alone.
      </Body>

      <div style={{ display: "flex", gap: 4, marginBottom: 32, padding: 4, background: "rgba(0,0,0,0.03)", borderRadius: 12 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, padding: "10px 12px", border: "none", cursor: "pointer", borderRadius: 9,
            fontSize: 13, fontWeight: activeTab === t.id ? 600 : 500, fontFamily: "inherit",
            color: activeTab === t.id ? "#fff" : C.hint,
            background: activeTab === t.id ? C.brand : "transparent",
            boxShadow: activeTab === t.id ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
            transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      {activeTab === "lifecycle" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Body style={{ marginBottom: 8 }}>
            Infoblox sells network infrastructure and security to enterprise IT teams &mdash; buyers who
            research first and engage digitally. That means firmographic fit (6Sense, ZoomInfo), behavioral
            signals (Marketo), and early outreach sequences are all well-suited for AI-driven engagement.
            The opportunity is to let agents handle the volume and velocity of early qualification, freeing
            your team to focus where human judgment matters most: complex account dynamics, competitive
            displacement, and relationship building.
          </Body>
          {lifecycle.map((l, i) => (
            <div key={i} style={{
              padding: "20px 22px", borderRadius: 12,
              border: `1px solid ${C.faint}`, background: C.surface,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>{l.stage}</span>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: "2px 10px", borderRadius: 20,
                  background: C.green.bg, color: C.green.text, textTransform: "uppercase", letterSpacing: "0.04em",
                }}>{l.mode}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.hint, marginBottom: 8 }}>{l.actors}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>{l.description}</div>
            </div>
          ))}
          <div style={{
            padding: "18px 22px", borderRadius: 12,
            border: `1px dashed ${C.teal.border}`, background: C.teal.bg,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.teal.text, marginBottom: 6 }}>What this means for the BDR team</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>
              This is about elevating the role, not eliminating it. Agents absorb the high-volume,
              repetitive work &mdash; outreach cadences, scheduling, initial screening &mdash; so your
              team can focus on what they do best: reading complex accounts, building relationships,
              navigating competitive situations, and running the meetings that close deals. Pipeline
              coverage expands. Cost per qualified meeting drops. And the time from MQL to SAL
              compresses from days to minutes, creating a faster, more responsive experience for
              your buyers.
            </div>
          </div>
        </div>
      )}

      {activeTab === "stack" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Body style={{ marginBottom: 8 }}>
            Agents perform best when they can see the full picture in one place. Consolidating around
            Marketo and Salesforce &mdash; the platforms you have already invested in &mdash; means fewer
            integration seams, richer context for AI, and a simpler stack to operate. The approach:
            lean into what those platforms do natively, keep what is genuinely differentiated, and
            assess the rest through discovery.
          </Body>
          {consolidation.map((c, i) => {
            const actionColor = c.action === "Consolidate" ? C.green : c.action === "Assess" ? C.teal : C.blue;
            return (
              <div key={i} style={{
                padding: "16px 20px", borderRadius: 10,
                border: `1px solid ${C.faint}`, background: C.surface,
              }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{c.tool}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: "2px 10px", borderRadius: 20,
                    background: actionColor.bg, color: actionColor.text,
                    textTransform: "uppercase", letterSpacing: "0.04em",
                  }}>{c.action}</span>
                  {c.target !== "\u2014" && (
                    <span style={{ fontSize: 12, color: C.hint }}>&rarr; {c.target}</span>
                  )}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>{c.rationale}</div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "horizons" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Body style={{ marginBottom: 8 }}>
            The 8-week diagnostic produces the architecture blueprint, validated recommendations, and
            implementation roadmap. These three horizons represent the execution path that follows &mdash;
            each building on the one before it, each delivering standalone value. All native to the Adobe
            and Salesforce ecosystem you have already committed to.
          </Body>
          {horizons.map((h, i) => (
            <div key={i} style={{
              padding: "24px 24px", borderRadius: 14,
              border: `1px solid ${C.faint}`, background: C.surface,
              borderLeft: `4px solid ${h.color}`,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: h.color, letterSpacing: "-0.03em" }}>{h.num}</span>
                <span style={{ fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>{h.title}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.hint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{h.subtitle}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: C.muted }}>{h.description}</div>
            </div>
          ))}
          <div style={{
            padding: "18px 22px", borderRadius: 12,
            border: `1px dashed ${C.green.border}`, background: C.green.bg,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.green.text, marginBottom: 6 }}>How the diagnostic shapes these horizons</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: C.muted }}>
              The 8-week diagnostic does more than assess the current state &mdash; it produces the
              architecture blueprint and implementation roadmap that Horizon 1 executes against. It also
              surfaces the data needed to scope Horizon 2: outreach channel mix, BDR activity patterns,
              and qualification conversion rates. The engagement options evaluated in the diagnostic
              (unwind vs. reimplementation vs. status quo) directly determine the speed and shape of
              each horizon.
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

/* ─── REPORTING ─── */
function Reporting() {
  const layers = [
    {
      icon: "\u2460",
      title: "A single source of truth for the funnel",
      subtitle: "Architecture-driven",
      description: "Today, reporting the lead-to-opportunity funnel requires reconciling data across two objects with misaligned lifecycle definitions. Once the architecture is clean \u2014 standardized stages on the Lead object, a governed conversion gate, and consistent field definitions \u2014 funnel reporting becomes a query, not a project. Stage counts, conversion rates, and time-in-stage metrics pull directly from the system of record without manual transformation.",
      color: C.green,
    },
    {
      icon: "\u2461",
      title: "Attribution and velocity you can trust",
      subtitle: "Scoring & lifecycle-driven",
      description: "With a recalibrated scoring model and clear MQL/SAL/SQL definitions, marketing and sales share a common language for what each stage means and when transitions happen. Attribution (Bizible/Marketo Measure) connects to clean lifecycle timestamps, giving you accurate first-touch, multi-touch, and pipeline velocity reporting out of the box. No more manual date reconciliation or stage-mapping workarounds.",
      color: C.teal,
    },
    {
      icon: "\u2462",
      title: "Real-time pipeline intelligence",
      subtitle: "Agentic layer-driven",
      description: "As the agentic capabilities come online, the data gets richer and more timely. Every agent interaction \u2014 outreach sent, response classified, meeting booked, escalation routed \u2014 is logged natively in Salesforce. This creates a continuous stream of pipeline activity data that can power live dashboards, automated executive summaries, and early-warning signals for stalled deals or qualification bottlenecks.",
      color: C.blue,
    },
  ];

  const outcomes = [
    { metric: "Funnel reports", before: "Manual reconciliation across objects and tools", after: "Single-query from standardized lifecycle stages" },
    { metric: "Executive readouts", before: "Ops team assembles data over days", after: "Self-service dashboards with live pipeline data" },
    { metric: "Attribution accuracy", before: "Stage definitions vary, timestamps unreliable", after: "Clean lifecycle events feed Bizible directly" },
    { metric: "Forecast confidence", before: "BDR activity split across Lead and Opportunity", after: "Unified activity history on governed objects" },
    { metric: "Agent performance", before: "N/A", after: "Qualification rates, response times, escalation patterns \u2014 all instrumented" },
  ];

  return (
    <Section id="reporting">
      <SectionLabel>Reporting impact</SectionLabel>
      <SectionTitle>From manual assembly to live intelligence</SectionTitle>
      <Body>
        One of the most immediate benefits of cleaning up the lifecycle architecture is what it does
        for reporting. When lifecycle stages are standardized, conversion gates are governed, and
        activity data lives in the right objects, the manual work of assembling executive readouts
        largely disappears. The data is already in the shape you need it.
      </Body>
      <Body style={{ marginBottom: 32 }}>
        Each layer of the transformation unlocks a new level of reporting capability &mdash; from
        accurate funnel metrics to real-time pipeline intelligence.
      </Body>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
        {layers.map((l, i) => (
          <div key={i} style={{
            padding: "24px 24px", borderRadius: 14,
            border: `1px solid ${C.faint}`, background: C.surface,
            borderLeft: `4px solid ${l.color.accent}`,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: l.color.accent }}>{l.icon}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>{l.title}</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.hint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{l.subtitle}</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: C.muted }}>{l.description}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, color: C.hint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14, paddingBottom: 8, borderBottom: `1px solid ${C.faint}` }}>Before &amp; after</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {outcomes.map((o, i) => (
          <div key={i} style={{
            padding: "16px 20px", borderRadius: 10,
            border: `1px solid ${C.faint}`, background: C.surface,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>{o.metric}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.red, background: "rgba(242,101,34,0.08)", padding: "2px 8px", borderRadius: 4, flexShrink: 0, marginTop: 2 }}>TODAY</span>
                <span style={{ fontSize: 13, lineHeight: 1.5, color: C.muted }}>{o.before}</span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.green.text, background: C.green.bg, padding: "2px 8px", borderRadius: 4, flexShrink: 0, marginTop: 2 }}>FUTURE</span>
                <span style={{ fontSize: 13, lineHeight: 1.5, color: C.muted }}>{o.after}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
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
        "Current-state documentation: end-to-end lead-to-opp flow, data model map, marketplace opportunity flows, contact data quality and enrichment coverage, automation inventory (Apex triggers, flows, Marketo smart campaigns)",
        "Account structure analysis: territory model (ETM), hierarchy and parent/child relationships, RCN multi-geo ownership patterns, partner/MSSP/end-user segmentation, and enrichment data flow",
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
        "Recommended architecture: target-state data model, account structure recommendations, lifecycle stage definitions, conversion rules, scoring model framework, SLA structure",
        "Impact assessment for downstream systems and channel workflows: Tableau, Clari, Bizible, LeanData, partner/channel lead routing, and marketplace opportunity flows",
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

/* ─── COMMERCIALS ─── */
function Commercials() {
  const fees = [
    { label: "Lead-to-Opportunity Assessment", amount: "$xxx,xxx" },
    { label: "Less PwC Investment", amount: "($xx,xxx)" },
    { label: "Proposed Fees", amount: "$xxx,xxx", bold: true },
    { label: "Expenses (Capped at 8%)", amount: "$xx,xxx" },
    { label: "Grand Total", amount: "$xxx,xxx", bold: true, border: true },
  ];

  const assumptions = [
    "Infoblox will designate subject matter experts across Sales Ops, Marketing Ops, IT, and BDR leadership, available for interviews, workshops, and information gathering",
    "SOW does not include any implementation services \u2014 this engagement delivers the diagnostic, architecture, and roadmap",
    "Grand total is inclusive of expenses, which will be billed at cost and capped at 8%",
  ];

  return (
    <Section id="commercials">
      <SectionLabel>Commercials</SectionLabel>
      <SectionTitle>Proposed investment</SectionTitle>
      <div style={{ display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px", minWidth: 280 }}>
          <Body>
            We are energized by the opportunity to partner with Infoblox at this pivotal moment. Our
            proposed fees reflect a deliberate investment of senior leadership, deep Salesforce and
            Marketo expertise, and AI-forward capabilities to ensure this assessment delivers clear,
            practical value.
          </Body>
          <Body>
            We approach this engagement not as a standalone project, but as the foundation for a
            long-term partnership committed to dedicating the time, focus, and resources required
            to support your success.
          </Body>
          <Body>
            We welcome the opportunity to right-size this work to meet your objectives.
          </Body>
        </div>

        <div style={{ flex: "1 1 360px", minWidth: 320 }}>
          <div style={{
            borderRadius: 14, border: `1px solid ${C.faint}`, background: C.surface,
            overflow: "hidden",
          }}>
            <div style={{
              padding: "14px 24px", borderBottom: `1px solid ${C.faint}`,
              display: "flex", justifyContent: "flex-end",
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.brand, textTransform: "uppercase", letterSpacing: "0.06em" }}>Estimated fee</span>
            </div>
            {fees.map((f, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 24px",
                borderTop: f.border ? `2px solid ${C.text}` : i > 0 ? `1px solid ${C.faint}` : "none",
                background: f.bold ? "rgba(0,190,76,0.03)" : "transparent",
              }}>
                <span style={{
                  fontSize: 14, color: C.text,
                  fontWeight: f.bold ? 700 : 500,
                }}>{f.label}</span>
                <span style={{
                  fontSize: 14, color: C.text,
                  fontWeight: f.bold ? 700 : 500,
                  fontVariantNumeric: "tabular-nums",
                }}>{f.amount}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{
              fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12,
            }}>Assumptions</div>
            {assumptions.map((a, i) => (
              <div key={i} style={{
                display: "flex", gap: 8, marginBottom: 8,
                fontSize: 13, lineHeight: 1.6, color: C.muted,
              }}>
                <span style={{ color: C.hint, flexShrink: 0 }}>{"\u2022"}</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── WHY PWC ─── */
function WhyPwC() {
  const points = [
    { title: "We think in operating models, not tools", body: "This is not a Salesforce configuration project. It is a revenue operations redesign that touches how Sales, Marketing, BDR, Channel, and Analytics teams work together. We bring the business strategy lens alongside the technical depth." },
    { title: "Configuration, not customization", body: "Aligned with your guiding principles. We bias toward OOB Salesforce and Marketo capabilities, industry-standard patterns, and scalable architecture. The goal is a system that works as intended and can be maintained without specialized tribal knowledge." },
    { title: "Built for where you are going", body: "Whether public company readiness, AI-enabled pipeline operations, or scale through channel. The architecture we recommend will account for your end-state, not just your current pain." },
    { title: "Deep Marketo + Salesforce interlock expertise", body: "We understand how these two systems should work together at the data model level: sync architecture, lifecycle program design, scoring frameworks, attribution plumbing, and the conversion mechanics that connect them." },
  ];

  const sfStats = [
    { value: "#1", label: "Quality Rating", detail: "Zero red accounts from PwC implementations at top Fortune 500 organizations" },
    { value: "46", label: "Salesforce Awards", detail: "Recognized as a leader in innovation and industry expertise since 2013" },
    { value: "Leader", label: "Analyst Recognized", detail: "Named a Leader by IDC and a Market Maker by capioIT \u2014 recognized for business model reinvention and end-to-end transformation delivery enabled by Salesforce" },
    { value: "20K+", label: "Certifications", detail: "Held by our global team, averaging 3.8 certifications per consultant" },
    { value: "5,550+", label: "Professionals Globally", detail: "Across core Consulting Solution platforms delivering value in the Salesforce ecosystem" },
    { value: "20", label: "Certified Technical Architects", detail: "The most CTAs of any SI in AMER and EMEA" },
  ];

  const adobeStats = [
    { value: "Platinum", label: "Solution Partner", detail: "Adobe Platinum Solution Partner with GenStudio Ready designation" },
    { value: "2025", label: "Partner of the Year", detail: "Adobe Solution Partner of the Year for Digital Experience (United Kingdom, Ireland)" },
    { value: "Leader", label: "Gartner 2025", detail: "Emerging Leader for Generative AI Consulting and Implementation Services" },
    { value: "4", label: "Specializations", detail: "RT-CDP, Marketo Engage, and AEM across Americas and EMEA" },
    { value: "1,500+", label: "CX & Marketing Pros", detail: "Professionals with global customer experience and marketing expertise" },
    { value: "320+", label: "Adobe Certifications", detail: "Adobe certifications and accreditations across the practice" },
    { value: "6", label: "Rapid Deploy Solutions", detail: "Accredited and rapid deployment solutions for accelerated time-to-value" },
    { value: "15+", label: "Active Territories", detail: "Global delivery capability with local market expertise" },
  ];


  return (
    <Section id="why-pwc" dark>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
        color: "#D04A02", marginBottom: 16,
      }}>Why PwC</div>
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

      {/* Salesforce Practice Credentials */}
      <div style={{ marginTop: 56 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#D04A02", marginBottom: 16,
        }}>PwC Salesforce Practice</div>
        <h3 style={{
          fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 800, letterSpacing: "-0.03em",
          lineHeight: 1.15, margin: "0 0 12px", color: "rgba(255,255,255,0.95)",
        }}>From conversion to cash &mdash; Salesforce expertise that drives revenue</h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: "0 0 8px" }}>
          Lead-to-Cash &middot; AI-Driven Qualifying and Selling &middot; Customer 360 &middot; Managed Services
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: "0 0 32px" }}>
          Proven delivery across the full Lead-to-Cash journey &mdash; from SDR operations and lead routing to pipeline acceleration and revenue growth.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {sfStats.map((s, i) => (
            <div key={i} style={{
              padding: "20px 20px", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#D04A02", letterSpacing: "-0.03em", marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</div>
              <div style={{ fontSize: 12, lineHeight: 1.5, color: "rgba(255,255,255,0.4)" }}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Adobe / Marketo Practice Credentials */}
      <div style={{ marginTop: 56 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#D04A02", marginBottom: 16,
        }}>PwC Adobe Alliance</div>
        <h3 style={{
          fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 800, letterSpacing: "-0.03em",
          lineHeight: 1.15, margin: "0 0 12px", color: "rgba(255,255,255,0.95)",
        }}>Powering AI-enabled experience transformation at scale</h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: "0 0 12px" }}>
          Core focus areas: Generative and Agentic AI &middot; Content and Digital Experience &middot;
          Customer Journeys &middot; Data and Insights &middot; Value Realization &middot; Personalization at Scale
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: "0 0 32px" }}>
          Directly relevant to this engagement: our Marketo Engage specialization covers lifecycle
          program design, scoring frameworks, lead management architecture, and the Salesforce
          sync configuration at the center of Infoblox&rsquo;s transformation.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {adobeStats.map((s, i) => (
            <div key={i} style={{
              padding: "20px 20px", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#D04A02", letterSpacing: "-0.03em", marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</div>
              <div style={{ fontSize: 12, lineHeight: 1.5, color: "rgba(255,255,255,0.4)" }}>{s.detail}</div>
            </div>
          ))}
        </div>

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
      <WhatsPossibleIntro />
      <ProcessFlow />
      <AgenticVision />
      <Reporting />
      <Approach />
      <Timeline />
      <Team />
      <Commercials />
      <WhyPwC />
      <Footer />
    </div>
  );
}
