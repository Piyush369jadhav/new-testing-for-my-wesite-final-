import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Infinity } from "lucide-react";
import { SignalGrowthChart } from "./components/SignalGrowthChart";
import { BiotechPhaseBarChart } from "./components/BiotechPhaseBarChart";

export default function App() {
  // Use Hash Routing for seamless hosting
  const getHashPath = (): string => {
    const hash = window.location.hash;
    if (hash === "#/memo" || hash === "#/research/routing-private-dealflow") {
      return hash;
    }
    return "#/";
  };

  const [currentPath, setCurrentPath] = useState<string>(getHashPath());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getHashPath());
    };

    window.addEventListener("hashchange", handleHashChange);
    // Set custom default hash on initial load if empty
    if (!window.location.hash) {
      window.location.hash = "#/";
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Internal routing navigation handler
  const navigate = (path: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hashPath = path === "/" ? "#/" : `#${path}`;
    window.location.hash = hashPath;
    setCurrentPath(hashPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Rendering of each of our 3 sub-views
  const renderView = () => {
    switch (currentPath) {
      case "#/about":
        return <AboutView key="about" navigate={navigate} />;
      case "#/memo":
        return <MemoView key="memo" navigate={navigate} />;
      case "#/research/routing-private-dealflow":
        return <ResearchView key="research" navigate={navigate} />;
      default:
        return <HomeView key="home" navigate={navigate} />;
    }
  };

  return (
    <div id="root" className="min-h-screen selection:bg-[rgba(15,118,89,0.14)] selection:text-[var(--ink)]">
      <AnimatePresence mode="wait">
        {renderView()}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// VIEW 1: HOME PANEL (Piyush Jadhav Index)
// -------------------------------------------------------------
interface ViewProps {
  key?: string;
  navigate: (path: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
}

type TabType = "signals" | "beginner" | "model" | "biotech-recruitment";

function HomeView({ navigate }: ViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("signals");

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof (window as any).Cal !== "undefined" && (window as any).Cal.ns?.["intro-call-icp-capacity-check"]) {
      (window as any).Cal.ns["intro-call-icp-capacity-check"]("openModal", {
        calLink: "automationgo.in/intro-call-icp-capacity-check",
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true"
        }
      });
    } else {
      window.open("https://cal.com/automationgo.in/intro-call-icp-capacity-check", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="brandbar" id="top-header">
        <div className="brandbar-inner flex items-center gap-4">
          <a href="#/" onClick={(e) => navigate("/", e)} className="wordmark flex items-center gap-3" id="lnk-wordmark">
            <Infinity className="w-8 h-8 text-black" />
            <span className="text-3xl font-bold tracking-tight text-gray-950">Automationgo</span>
          </a>
          <span className="brandbar-tag border-l border-gray-200 pl-4 text-sm text-gray-600" id="tag-brand">
            Piyush Jadhav — High-Trust Connections &amp; Automation
            <a href="#/about" onClick={(e) => navigate("/about", e)} className="ml-4 underline text-gray-500 hover:text-gray-900">About</a>
          </span>
        </div>
      </header>

      <main id="home-main">
        <section className="hero" id="sec-hero">
          <p className="tagline" id="txt-pipeline-tagline">
            Automating Outbound &amp; Operational Scaling Systems · 2023–2026
          </p>
          
          <div className="hero-grid" id="grid-asymmetric-hero">
            <div className="hero-text" id="panel-hero-statement">
              <h1 id="hd-hero-statement" className="!mb-6">
                Piyush Jadhav moves before the market names it. You get invited — or you don't.
              </h1>
              <p className="subline" id="txt-selective-subline">
                We design custom connector networks, programmatic matchmaking corridors, and high-trust strategic access links to bridge elite B2B partners seamlessly.
              </p>
            </div>

            <div className="hero-status-card animate-fade-in" id="card-status-telemetry">
              <div className="status-header">
                <span className="status-title">Ecosystem Status</span>
                <span className="status-indicator">
                  <span className="status-pip pulse bg-[#0f7659]"></span> ACTIVE CONNECTOR
                </span>
              </div>
              <div className="status-metric-row">
                <span className="status-metric-label">Alliances Mapped</span>
                <span className="status-metric-val">Verified &amp; Direct</span>
              </div>
              <div className="status-metric-row">
                <span className="status-metric-label">Match Clarity</span>
                <span className="status-metric-val">99.4% Fit Score</span>
              </div>
              <div className="status-metric-row">
                <span className="status-metric-label">Network Capacity</span>
                <span className="status-metric-val">High-Trust B2B Only</span>
              </div>
            </div>
          </div>

          <p className="proof-strip text-center" id="txt-proof-sectors">
            Special Access · Invite Only · API Integration · Outbound Scaling · Lead Pipes · Partnership Connection · Direct Introductions · Strategic Alignment
          </p>
          
          <p className="memo-link mt-6 flex items-center gap-4" id="paragraph-memo-actions">
            <motion.a 
              href="#/memo" 
              onClick={(e) => navigate("/memo", e)} 
              id="lnk-read-memo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read the memorandum →
            </motion.a>
            <span className="memo-link-sep" id="sep-memo-links">·</span>
            <motion.a
              href="https://cal.com/automationgo.in/intro-call-icp-capacity-check"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0f7659] !text-white px-6 py-2 rounded-md font-semibold text-sm hover:opacity-90 inline-block text-center shadow-sm cursor-pointer select-none"
              id="lnk-book-consult-hero"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book capacity check →
            </motion.a>
          </p>
        </section>

        <section className="metrics" id="sec-metrics">
          <div className="metric" id="card-metric-pipeline">
            <div className="metric-value">100+</div>
            <div className="metric-label">strategic matches successfully routed</div>
          </div>
          <div className="metric" id="card-metric-leads">
            <div className="metric-value">
              100s<span className="metric-qualifier">live</span>
            </div>
            <div className="metric-label">signals caught &amp; mapped daily across channels</div>
          </div>
          
          {/* Enhanced highlight for "currently open to selective 12 clients only" */}
          <div className="metric border-l-4 border-l-[#0f7659] bg-[rgba(15,118,89,0.04)] shadow-sm relative overflow-hidden" id="card-metric-mandates">
            <div className="absolute top-0 right-0 bg-[#0f7659] text-[var(--bg)] font-mono text-[9px] uppercase px-2 py-0.5 tracking-wider rounded-bl-lg">Exclusive Capacity</div>
            <div className="metric-value flex items-baseline gap-1 text-[#0f7659]">
              12 <span className="metric-qualifier text-[#0f7659] font-semibold italic text-sm">selective</span>
            </div>
            <div className="metric-label text-[var(--ink)] font-normal">currently open to selective 12 clients only</div>
          </div>
        </section>

        {/* Tabbed Interactive Section */}
        <div className="workspace-tabs" id="pnl-workspace-tabs">
          <div className="tabs-navigation">
            <button
              onClick={() => setActiveTab("signals")}
              className={`tab-btn ${activeTab === "signals" ? "active" : ""}`}
              id="btn-tab-signals"
            >
              Live Signal Vectors
            </button>
            <button
              onClick={() => setActiveTab("beginner")}
              className={`tab-btn ${activeTab === "beginner" ? "active" : ""}`}
              id="btn-tab-beginner"
            >
              What is a Connector?
            </button>
            <button
              onClick={() => setActiveTab("model")}
              className={`tab-btn ${activeTab === "model" ? "active" : ""}`}
              id="btn-tab-model"
            >
              Core Operational Focus
            </button>
            <button
              onClick={() => setActiveTab("biotech-recruitment")}
              className={`tab-btn ${activeTab === "biotech-recruitment" ? "active" : ""}`}
              id="btn-tab-biotech-recruitment"
            >
              Recruitment &amp; Biotech Signals
            </button>
          </div>

          <div className="tab-pane-content" id="pane-tab-content">
            <AnimatePresence mode="wait">
              {activeTab === "signals" && (
                <motion.div
                  key="signals-pane"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm text-[var(--sub)] font-serif italic mb-6">
                    Our system continually monitors real-time market intent to capture live signals that standard databases miss:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="list-signals">
                    <div className="p-4 border border-[var(--rule-soft)] bg-[var(--bg-soft)] rounded-lg flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-orange-700 text-white rounded">CLINICAL</span>
                        <span className="font-semibold text-sm text-[var(--ink)]">CRO &amp; Phase Testing Activity, 2026</span>
                      </div>
                      <p className="text-xs text-[var(--sub)]">New CRO engagements and Phase I to III progressions signal a biotech nearing its next milestone. CRO market forecast: ~$93B in 2026.</p>
                    </div>

                    <div className="p-4 border border-[var(--rule-soft)] bg-[var(--bg-soft)] rounded-lg flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-[#0f7659] text-white rounded">HIRING</span>
                        <span className="font-semibold text-sm text-[var(--ink)]">US Tech Hiring Surges, 2026</span>
                      </div>
                      <p className="text-xs text-[var(--sub)]">Engineering, data, and infrastructure teams scaling fast, revealing capacity gaps before roles go public.</p>
                    </div>

                    <div className="p-4 border border-[var(--rule-soft)] bg-[var(--bg-soft)] rounded-lg flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-sky-700 text-white rounded">FUNDING</span>
                        <span className="font-semibold text-sm text-[var(--ink)]">Capital Deployments</span>
                      </div>
                      <p className="text-xs text-[var(--sub)]">Fresh capital triggers showing budget readiness to bring in premium solutions and specialized architectures.</p>
                    </div>

                    <div className="p-4 border border-[var(--rule-soft)] bg-[var(--bg-soft)] rounded-lg flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-indigo-700 text-white rounded">LEADERSHIP</span>
                        <span className="font-semibold text-sm text-[var(--ink)]">Executive Relocations</span>
                      </div>
                      <p className="text-xs text-[var(--sub)]">New decision-makers entering corporate seats, actively bringing in strategic initiatives and tools.</p>
                    </div>
                  </div>

                  <BiotechPhaseBarChart />

                  <p className="signals-source !mt-6 text-xs" id="txt-signals-source">
                    Sourced from direct CRM connections, verified B2B growth trackers, and proprietary alliance network feeds.
                  </p>
                  <p className="signals-foot text-xs" id="para-signals-footer">
                    Updated today ·{" "}
                    <a href="mailto:piyush@automationgo.in" id="lnk-mail-anchor" className="underline">
                      piyush@automationgo.in
                    </a>{" "}
                    · Reach out if you fit any active vectors.
                  </p>
                </motion.div>
              )}

              {activeTab === "beginner" && (
                <motion.div
                  key="beginner-pane"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm text-[var(--sub)] font-serif italic mb-6">
                    A connector is a bridge — matching two select parties who deeply need each other but haven't successfully crossed paths yet.
                  </p>
                  <div className="beginner-grid">
                    <div className="beginner-card">
                      <span className="beginner-card-num">Point 01</span>
                      <span className="beginner-card-title">Value Introductions</span>
                      <span className="beginner-card-desc">
                        Instead of commoditized sales pitches, we act as a non-biased advisory shield, translating needs and aligning capabilities accurately.
                      </span>
                    </div>
                    <div className="beginner-card">
                      <span className="beginner-card-num">Point 02</span>
                      <span className="beginner-card-title">Recommendation Shield</span>
                      <span className="beginner-card-desc">
                        Decision-makers naturally trust premium peer introductions more than self-promotional cold pitches, bypassing resistance automatically.
                      </span>
                    </div>
                    <div className="beginner-card">
                      <span className="beginner-card-num">Point 03</span>
                      <span className="beginner-card-title">Borrowed Authority</span>
                      <span className="beginner-card-desc">
                        We borrow credibility from both ends of the relationship, pre-vetting expectations so both sides connect with instant clarity.
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "model" && (
                <motion.div
                  key="model-pane"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-4 font-serif text-[17px] leading-relaxed text-[var(--ink-soft)]">
                    <p>
                      Our operational network routes high-yield digital pipelines on a cap-restricted partnership basis. We construct, monitor, and scale automated sending systems so you can focus completely on conversation alignment and commercial execution.
                    </p>
                    <p>
                      We programmatically match supply and demand through custom web crawlers, scoring fit and timing variables. This allows B2B founders to bypass generic noise and establish robust connections on a safe outcome-focused mandate.
                    </p>
                    <div className="pt-4 border-t border-[var(--rule-soft)] font-mono text-xs text-[var(--accent)] flex items-center gap-2">
                      <span>• CURRENT ACTIVE PARTNERSHIP ALIGNMENTS OPEN: 2</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "biotech-recruitment" && (
                <motion.div
                  key="biotech-recruitment-pane"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm text-[var(--sub)] font-serif italic mb-6">
                    Real-time market intent captured across specialist Biotech and Executive Recruitment corridors:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="list-biotech-recruitment">
                    <div className="p-4 border border-[var(--rule-soft)] bg-[var(--bg-soft)] rounded-lg flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-purple-700 text-white rounded">BIOTECH</span>
                        <span className="font-semibold text-sm text-[var(--ink)]">Clinical Trial &amp; R&amp;D Scaling</span>
                      </div>
                      <p className="text-xs text-[var(--sub)]">Phase II/III trial expansions triggering urgent requirements for specialized CRO matching and wet-lab infrastructure.</p>
                    </div>

                    <div className="p-4 border border-[var(--rule-soft)] bg-[var(--bg-soft)] rounded-lg flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-blue-700 text-white rounded">RECRUITMENT</span>
                        <span className="font-semibold text-sm text-[var(--ink)]">Executive Search Acceleration</span>
                      </div>
                      <p className="text-xs text-[var(--sub)]">High-growth enterprises scaling executive recruiting and fractional leadership placement corridors.</p>
                    </div>

                    <div className="p-4 border border-[var(--rule-soft)] bg-[var(--bg-soft)] rounded-lg flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-teal-700 text-white rounded">BIOTECH</span>
                        <span className="font-semibold text-sm text-[var(--ink)]">Leadership &amp; Lab Relocations</span>
                      </div>
                      <p className="text-xs text-[var(--sub)]">Chief Medical Officers and VP R&amp;D transitions opening immediate windows for high-trust strategic alliances.</p>
                    </div>

                    <div className="p-4 border border-[var(--rule-soft)] bg-[var(--bg-soft)] rounded-lg flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 font-mono text-[10px] bg-amber-700 text-white rounded">RECRUITMENT</span>
                        <span className="font-semibold text-sm text-[var(--ink)]">Engineering Headcount Surges</span>
                      </div>
                      <p className="text-xs text-[var(--sub)]">Sudden engineering and AI staffing spikes requiring specialized talent pipelines and remote hubs.</p>
                    </div>
                  </div>

                  <p className="signals-source !mt-6 text-xs" id="txt-biotech-recruitment-source">
                    Live sector telemetry updated daily via proprietary B2B matching algorithms.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <hr className="divider" id="div-research" />

        <section className="section" id="sec-research">
          <h2>Research Briefings</h2>
          <a
            href="#/research/routing-private-dealflow"
            onClick={(e) => navigate("/research/routing-private-dealflow", e)}
            className="research-row"
            id="row-research-link-1"
          >
            <span className="num">Briefing 01</span>
            <span className="title">Live Signals 2026: CRO Activity and US Tech Hiring Ahead of the Market</span>
            <span className="date">Sep 2026</span>
          </a>
          <a
            href="#/research/routing-private-dealflow"
            onClick={(e) => navigate("/research/routing-private-dealflow", e)}
            className="research-row"
            id="row-research-link-2"
          >
            <span className="num">Briefing 02</span>
            <span className="title">Why Curated Introductions Beat Bulk Outreach</span>
            <span className="date">Aug 2026</span>
          </a>
          <p className="research-coming-label" id="lbl-coming-research">
            Coming
          </p>
          <div className="research-row coming" id="row-research-coming-1">
            <span className="num">Briefing 03</span>
            <span className="title">The Quiet Intermediary: How Private Introductions Beat Public Requisitions</span>
            <span className="date">soon</span>
          </div>
        </section>

        <hr className="divider" id="div-contact" />

        <section className="section" id="sec-contact">
          <p className="engagement" id="txt-engagement-availability">
            Currently open to accepting 2 selective alliance matches this term.
          </p>
          <p className="engagement-cta" id="para-engagement-button">
            <a
              href="https://cal.com/automationgo.in/intro-call-icp-capacity-check"
              target="_blank"
              rel="noopener noreferrer"
              id="lnk-book-consult-footer"
              className="bg-[#0f7659] !text-white px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 inline-block text-center shadow-sm cursor-pointer select-none"
            >
              Book capacity check →
            </a>
          </p>
          <div className="contact mt-8" id="box-contact-links">
            <a href="mailto:piyush@automationgo.in" id="lnk-contact-email">
              piyush@automationgo.in
            </a>
            <a
              href="https://www.linkedin.com/in/piyush--jadhav"
              target="_blank"
              rel="noreferrer noopener"
              id="lnk-contact-linkedin"
            >
              linkedin.com/in/piyush--jadhav
            </a>
          </div>
        </section>

        <footer className="foot" id="foot-general">
          <span>Automationgo</span>
          <span className="geo">Remote</span>
          <span className="right">© 2023–2026</span>
        </footer>

        <p className="proof-quiet" id="txt-quiet-proof">
          Automating Outbound &amp; Operational Scaling Systems · 2023–2026
        </p>
      </main>
    </motion.div>
  );
}

// -------------------------------------------------------------
// VIEW 2: MEMO VIEW ("On Private Alliances and Closed-Loop Systems")
// -------------------------------------------------------------
function MemoView({ navigate }: ViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="brandbar" id="memo-header">
        <div className="brandbar-inner flex items-center gap-4">
          <a href="#/" onClick={(e) => navigate("/", e)} className="wordmark flex items-center gap-3" id="lnk-memo-home">
            <Infinity className="w-8 h-8 text-black" />
            <span className="text-3xl font-bold tracking-tight text-gray-950">Automationgo</span>
          </a>
          <span className="brandbar-tag border-l border-gray-200 pl-4 text-sm text-gray-600" id="tag-memo-nav">Memorandum · 01
            <a href="#/about" onClick={(e) => navigate("/about", e)} className="ml-4 underline text-gray-500 hover:text-gray-900">About</a>
          </span>
        </div>
      </header>

      <article id="memo-article">
        <div className="masthead" id="memo-masthead">
          <div className="row" id="row-masthead-from">
            <span className="label">From</span>
            <span className="val">Piyush Jadhav</span>
          </div>
          <div className="row" id="row-masthead-subject">
            <span className="label">Subject</span>
            <span className="val">The Connection Paradigm</span>
          </div>
          <div className="row" id="row-masthead-filed">
            <span className="label">Filed</span>
            <span className="val">May 2026 · Remote</span>
          </div>
        </div>

        <h1 className="memo-title" id="hd-memo-main-title">On Private Alliances and Closed-Loop Systems</h1>
        <p className="memo-subtitle" id="sub-memo-subtitle">
          A perspective on programmatic B2B scalability — and the leverage of building bulletproof digital connection channels.
        </p>

        <hr className="border-[var(--rule)] my-8" />

        <div className="body" id="box-memo-body">
          <p className="lead">
            There are very few levers in B2B growth that can scale a pipeline as cleanly as private, custom-mapped alliances.
          </p>

          <p>
            When scaling relationships, most organizations default to force. They purchase wide, untargeted databases, hire masses of sales personnel, and spray cold communications at arbitrary lists. They assume high friction is a substitute for deliberate structure.
          </p>

          <p>Sovereign connector systems are the actual lever.</p>

          <p>
            Right now, somewhere in your market, an elite corporate operator has an acute operational gap. They need a custom database integration, a specialized workflows audit, or niche technology scaling. They are actively searching for trusted partners. Simultaneously, outstanding providers are exhausting energy, struggling to bypass noise, and failing to secure attention.
          </p>

          <p>
            The failure isn't lack of interest or capability. It is a failure of structural piping. Most teams simply lack the programmatic signaling to automatically match market intent to exclusive routes.
          </p>

          <p>
            When built correctly, a custom-programmed connection layer can detect these specific cues automatically, enrich them with technical parameters, and map private pathways to introduce corporate sponsors in safe environments before conventional players even notice the signal.
          </p>

          <p>This is what it means to be a true B2B Connector.</p>

          <h3 className="text-lg font-semibold text-[var(--ink)] mt-6 mb-2">The Psychology of Connection</h3>
          <p>
            People naturally trust recommendations from a third party significantly more than direct sales pitches. When positioned as a clear connector:
          </p>
          <ul className="list-disc pl-5 my-4 space-y-2 text-sm text-[var(--ink-soft)]">
            <li><strong>The Recommendation Shield:</strong> Introductions feel like collaborative, structural advice rather than sales pitches, bypassing institutional resistance.</li>
            <li><strong>Reduced Perceived Risk:</strong> By pre-vetting metrics and languages on both ends of the bridge, we establish rapid reciprocal credibility.</li>
            <li><strong>Aligned Incentives:</strong> We avoid commoditized, low-value direct competition. We build value directly on successful high-ticket alignment.</li>
          </ul>

          <p className="beat">Relationship isolation is friction. Matching systems are equity.</p>

          <p>
            Through our system, we index live intent triggers such as hiring, capital funding, executive transitions, and early growth indicators. We evaluate every demand-supply pairing across precise fit and timing variables.
          </p>

          <p>
            By designing private connection engines for active operators, we bypass traditional cold blockages entirely. We watch quiet scaling teams establish multi-year alliances because they deploy sophisticated intent routes, while larger competitors waste capital on obsolete campaigns.
          </p>

          <p>Sustainable growth is never created through raw market noise. It is created through elegant alliances.</p>

          <p>
            Automationgo exists to engineer that leverage. We build the matching pathways, compile direct operator databases, and coordinate programmatic connections so you can focus completely on deal synergy and building the future.
          </p>

          <p className="closer">In most businesses, partnerships are built on chance. In ours, they are the machine designed to power the whole enterprise.</p>
        </div>

        <div className="signoff" id="box-memo-signoff">
          <div className="name">Piyush Jadhav</div>
          <div>Automationgo · Private Alliances &amp; Systems</div>
          <div>
            <a href="mailto:piyush@automationgo.in" id="lnk-memo-signoff-email">
              piyush@automationgo.in
            </a>
          </div>
        </div>

        <p className="back" id="para-memo-back-desks">
          <a href="#/" onClick={(e) => navigate("/", e)} id="lnk-memo-return-desk">
            ← Return to desk
          </a>
        </p>
      </article>
    </motion.div>
  );
}

// -------------------------------------------------------------
// VIEW 3: RESEARCH VIEW ("Routing Private Dealflow")
// -------------------------------------------------------------
function ResearchView({ navigate }: ViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="brandbar" id="research-header">
        <div className="brandbar-inner flex items-center gap-4">
          <span className="wordmark flex items-center gap-3">
            <Infinity className="w-8 h-8 text-black" />
            <a href="#/" onClick={(e) => navigate("/", e)} id="lnk-research-home" className="text-3xl font-bold tracking-tight text-gray-950">
              Automationgo
            </a>
          </span>
          <span className="brandbar-tag border-l border-gray-200 pl-4 text-sm text-gray-600" id="tag-research-nav">Research Briefing · 01
            <a href="#/about" onClick={(e) => navigate("/about", e)} className="ml-4 underline text-gray-500 hover:text-gray-900">About</a>
          </span>
        </div>
      </header>

      <article id="research-article">
        <h1 id="hd-research-title">Live Signals 2026: CRO Activity and US Tech Hiring Ahead of the Market</h1>
        <p className="subtitle" id="txt-research-subtitle">
          How leading operators spot demand in biotech and US tech before roles and partnerships reach the open market.
        </p>
        <p className="byline" id="para-research-byline">
          BY PIYUSH JADHAV ·{" "}
          <a href="#/" onClick={(e) => navigate("/", e)} id="lnk-byline-myoprocess">
            AUTOMATIONGO
          </a>{" "}
          · SEPTEMBER 2026
        </p>

        <div className="tldr" id="box-research-tldr">
          <h2>TL;DR</h2>
          <ul>
            <li>
              <strong>Clinical progress is the earliest signal in biotech:</strong> New CRO engagements and phase progressions reveal what a company will need next, often months before it says so publicly.
            </li>
            <li>
              <strong>The market behind it is large and growing:</strong> The global CRO services market is forecast at roughly $93B in 2026, growing about 8.6% a year.
            </li>
            <li>
              <strong>Funding is back, but unevenly:</strong> Emerging biopharma raised about $35B in Q2 2026, more than double the prior year, yet CRO bookings have moved unevenly across sponsor size and focus area.
            </li>
            <li>
              <strong>US tech hiring surges expose capacity gaps first:</strong> When engineering, data, and infrastructure teams scale fast, urgent needs appear before requisitions go public.
            </li>
          </ul>
        </div>

        <h2>1. Why Signals Beat Lists</h2>
        <p>
          Static contact lists tell you who exists. Live signals tell you who needs something now. Timing is the difference between an unwelcome pitch and a relevant introduction.
        </p>
        <p>
          We track two signals that we see moving right now: clinical activity in biotech, and hiring surges in US tech.
        </p>

        <h2>2. Signal One: CRO and Phase Testing Activity</h2>
        <p>
          A biotech that signs a new CRO or advances a trial phase is committing capital, people, and time. Each move creates predictable needs.
        </p>

        <div className="overflow-x-auto w-full my-6">
          <table id="tbl-costs-benchmark">
            <thead>
              <tr>
                <th>Milestone</th>
                <th>What It Signals</th>
                <th>Typical Needs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Phase I</strong></td>
                <td>First-in-human testing begins</td>
                <td>CRO selection, clinical operations, regulatory support</td>
              </tr>
              <tr>
                <td><strong>Phase II</strong></td>
                <td>Proof-of-concept stage</td>
                <td>Biostatistics, data management, site expansion, early partner conversations</td>
              </tr>
              <tr>
                <td><strong>Phase III</strong></td>
                <td>Pivotal trial at scale</td>
                <td>Manufacturing readiness, commercial planning, pharma and hospital-network partnerships</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Scale matters here. Roughly 10,500 Phase I to III trials started in 2024, up 5.5% year over year. Oncology remains the largest therapeutic area, and North America accounts for about half of CRO demand.
        </p>

        <BiotechPhaseBarChart />

        <SignalGrowthChart />

        <h2>3. Signal Two: US Tech Hiring Surges</h2>
        <p>
          Hiring is the most honest public signal a company sends. When a team adds engineers, data specialists, or infrastructure leads in a short window, it usually means a launch, a funding event, or a new strategic direction.
        </p>
        <p>
          Specialist roles are the hardest to fill and the slowest to close. Companies that surface early can be matched with niche recruiter networks before a public requisition draws a crowded field.
        </p>

        <h2>4. Illustrative Scenario</h2>
        <div className="scenario" id="box-worked-scenario">
          <p>
            <strong>The objective:</strong> a Phase II biotech needs a senior clinical data lead and a strategic partner within one quarter.
          </p>
          <p className="mt-3">
            <strong>Traditional approach:</strong> Post the role publicly, wait for volume applicants, and send broad outreach to pharma contacts.
          </p>
          <p className="mt-3">
            <strong>Signal-led approach:</strong> Detect the phase progression and related hiring, route the role privately to specialist recruiters, and introduce the founder to a partner whose pipeline fits the timing.
          </p>
          <p className="mt-3 font-medium text-[var(--ink)]">
            The difference is timing and trust: a relevant introduction at the right moment, delivered warmly.
          </p>
        </div>

        <h2>Practical Recommendations</h2>
        <ol className="list-decimal pl-5 my-4 space-y-2 text-sm text-[var(--ink-soft)]">
          <li>
            <strong>Track clinical milestones, not just funding rounds.</strong> Phase progressions and CRO engagements show intent earlier.
          </li>
          <li>
            <strong>Watch hiring bursts, not single postings.</strong> Clusters of specialist roles point to real capacity gaps.
          </li>
          <li>
            <strong>Act before the public listing.</strong> Private, well-timed introductions outperform crowded channels.
          </li>
          <li>
            <strong>Lead with relevance.</strong> Introduce partners because of fit and timing, never volume.
          </li>
        </ol>

        <div className="sources" id="box-research-sources">
          <p>
            <strong>Resources Referenced</strong>
            <br />
            MarketsandMarkets CRO Services Market Forecast (2026); Citeline Annual Clinical Trials Roundup; BioWorld emerging biopharma funding data via IQVIA (Q2 2026); Automationgo signal telemetry.
          </p>
        </div>

        <p className="back mt-8" id="para-research-back-desk">
          <a href="#/" onClick={(e) => navigate("/", e)} id="lnk-research-return-desk">
            ← Return to desk
          </a>
        </p>
      </article>

      <footer id="research-footer">
        <div className="foot-inner">
          <div className="foot-block">
            <strong>About Automationgo</strong>
            We build custom connector protocols, programmed strategic partner systems, intention-driven databases, and high-trust B2B connector routes for scaling founders.
          </div>
          <div className="foot-block">
            <strong>Ecosystem Deployed</strong>
            100+ Strategic matches successfully matched.
            <br />
            Monitored over 10,000+ elite business operators daily.
            <br />
            Designed custom automated intent matching systems.
          </div>
          <div className="foot-block">
            <strong>Get in touch</strong>
            <a href="mailto:piyush@automationgo.in" id="lnk-res-foot-mail">piyush@automationgo.in</a>
            <br />
            <a href="#/" onClick={(e) => navigate("/", e)} id="lnk-res-foot-home">automationgo.in</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

function AboutView({ navigate }: ViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto p-8"
    >
      <a href="#/" onClick={(e) => navigate("/", e)} className="text-gray-500 mb-8 inline-block">← Back</a>
      <h1 className="text-4xl font-bold mb-8">About</h1>
      <div className="prose text-lg leading-relaxed text-gray-800 space-y-6">
        <p>Most people wait until demand is loud.</p>
        <p>I moved when it was still a whisper.</p>
        <p>There's a window that exists before a deal becomes public, before the deck gets circulated, before the room fills up. Most operators miss it — not because they're slow, but because they're looking in the wrong direction.<br/>I built myoProcess inside that window.</p>
        <p>It's not a platform. It's not a network in the way people use that word. It's a private-access business built on one repeatable edge — identifying where capital and opportunity are quietly converging before the market has a name for it. No listings. No public funnel. No open applications. The deals that move through here don't get announced. They get placed.</p>
        <p>The model is simple, but it took years to earn. When you can see demand forming early, you don't chase deal flow — you become the infrastructure for it. Founders reach out because someone they trust said to. Capital moves because the fit was already vetted before the call. That's not luck. That's what happens when you build trust before you need it.</p>
        <p>myoProcess runs on private access by design. Not as a positioning move — but because the edge only exists if the room stays small. The operators inside it understand that. The ones who don't aren't inside it.</p>
        <p>This isn't about being early for the sake of it.</p>
        <p>It's about building something that only works because most people aren't paying attention yet.</p>
        <p>That gap is the business.</p>
      </div>
    </motion.div>
  );
}
