import { useEffect, useMemo, useRef, useState } from "react";
import BuildCrew from "./BuildCrew";
import PadMusic from "./PadMusic";
import MissionGlyph from "./MissionGlyph";
import ContactPanel from "./ContactPanel";
import RocketGame from "./RocketGame";
import SponsorCountdown from "./SponsorCountdown";
const requestedPage = new URLSearchParams(location.search).get("page") || "home";
const page = ["home", "flight", "vehicle", "payloads", "engineering", "support"].includes(requestedPage) ? requestedPage : "home";
const pageLink = (name: string, anchor = "") => `${import.meta.env.BASE_URL}?page=${name}${anchor}`;

const nav = [["HOME", pageLink("home")], ["FLIGHT", pageLink("flight")], ["VEHICLE", pageLink("vehicle")], ["PAYLOADS", pageLink("payloads")], ["ENGINEERING", pageLink("engineering")], ["SUPPORT", "#support"]] as const;

const payloads = [
  { code: "PL-01", title: "Atmospheric sensing", status: "FLIGHT ARTICLE", copy: "A modular sensor bay recording pressure, temperature, humidity, acceleration, and attitude through ascent and recovery.", metric: "100 Hz", label: "SAMPLE RATE" },
  { code: "PL-02", title: "Deployable experiment", status: "QUALIFICATION", copy: "A protected mechanism demonstrates timed deployment, independent telemetry, and post-flight data recovery.", metric: "3×", label: "REDUNDANT ARMING" },
  { code: "PL-03", title: "Imaging & telemetry", status: "BENCH TEST", copy: "Onboard imaging and redundant radio links connect the payload story to measurable flight evidence.", metric: "2.4 GHz", label: "DOWNLINK" },
];

const phases = [
  ["01", "Requirements", "Competition rules become interfaces, mass limits, evidence, and pass/fail tests."],
  ["02", "Design", "Mechanical, electrical, software, and science teams close the payload architecture together."],
  ["03", "Qualification", "Bench tests, vibration checks, deployment trials, and rehearsals retire risk before launch."],
  ["04", "Integration", "Payload, avionics, recovery, and vehicle teams verify the complete flight stack."],
  ["05", "Flight", "The sounding rocket carries the experiment through ascent, apogee, descent, and recovery."],
  ["06", "Evidence", "Recovered data becomes the engineering result, the competition report, and next year’s baseline."],
];

const missionChapters = [
  ["01", "Define", "Mission objectives become controlled requirements, interfaces, constraints, and measurable success criteria."],
  ["02", "Design", "Students close the vehicle, payload, recovery, avionics, and operations architecture as one flight system."],
  ["03", "Manufacture", "Drawings become inspected hardware, wired assemblies, calibrated sensors, and documented configurations."],
  ["04", "Verify", "Bench, deployment, integration, and rehearsal evidence retires risk before the vehicle reaches the rail."],
  ["05", "Launch", "Flight operations execute the approved procedure while telemetry records the mission from ignition to apogee."],
  ["06", "Recover", "The team retrieves the vehicle, preserves payload data, assesses performance, and returns lessons to the next campaign."],
];

const missionMilestones = [
  ["T−180 D", "SYSTEM REQUIREMENTS REVIEW", "BASELINED"],
  ["T−120 D", "PRELIMINARY DESIGN REVIEW", "PLANNED"],
  ["T−75 D", "CRITICAL DESIGN REVIEW", "PLANNED"],
  ["T−30 D", "PAYLOAD QUALIFICATION", "PLANNED"],
  ["T−07 D", "FLIGHT READINESS REVIEW", "PLANNED"],
  ["T+00", "LAUNCH · RECOVERY · DATA", "MISSION"],
];

const flightSteps = [
  { number: "00", title: "Ignition", detail: "Motor ignition establishes stable thrust before the vehicle commits to the rail.", x: 45, y: 350 },
  { number: "01", title: "Rail departure", detail: "The vehicle clears the guide at flightworthy velocity and begins free ascent.", x: 230, y: 230 },
  { number: "02", title: "Max-Q", detail: "Airframe and avionics pass through the point of greatest aerodynamic loading.", x: 430, y: 69 },
  { number: "03", title: "Apogee", detail: "Vertical velocity approaches zero and the recovery sequence transitions to descent.", x: 650, y: 57 },
  { number: "04", title: "Drogue", detail: "The first recovery event stabilizes the vehicle for controlled high-altitude descent.", x: 795, y: 151 },
  { number: "05", title: "Main deploy", detail: "The primary canopy reduces descent rate for a recoverable touchdown.", x: 930, y: 285 },
  { number: "06", title: "Recovery", detail: "The team secures the vehicle, payload, flight computer, and experiment evidence.", x: 1160, y: 350 },
];

const teams = [
  { code: "SYS", title: "Program & Systems", copy: "Set the mission. Connect the teams. Keep every milestone in sight." },
  { code: "SAF", title: "Safety & Reliability", copy: "Spot the risk. Check the controls. Bring everyone home." },
  { code: "AER", title: "Airframe & Aerodynamics", copy: "Shape the airframe. Hold the loads. Keep the flight steady." },
  { code: "PRO", title: "Propulsion", copy: "Deliver the thrust. Verify the fit. Respect the ignition checklist." },
  { code: "AVN", title: "Avionics & Telemetry", copy: "Power up. Track the flight. Bring the signal home." },
  { code: "RCV", title: "Recovery", copy: "Deploy on cue. Slow the descent. Recover the hardware." },
  { code: "PAY", title: "Payload Science", copy: "Ask a bold question. Fly the experiment. Return with answers." },
  { code: "OPS", title: "Test & Flight Operations", copy: "Rehearse the count. Check the stack. Run the launch." },
  { code: "COM", title: "Reports & Presentation", copy: "Show the work. Tell the flight story. Make every result count." },
  { code: "DEV", title: "Outreach & Development", copy: "Rally the crew. Open doors. Put the next generation on the pad." },
];

const deliverables = [
  ["01", "Requirements baseline", "Competition rules, mission objectives, category constraints, and interfaces become controlled engineering requirements."],
  ["02", "Reviews & reports", "Progress reporting, design reviews, technical writing, drawings, analyses, and test evidence make the design auditable."],
  ["03", "Risk & flight safety", "Hazards, failure modes, mitigations, procedures, inspections, and launch authorization stay visible from concept to range."],
  ["04", "Payload evidence", "The payload carries a defined objective, survives the mission environment, operates reliably, and returns interpretable results."],
  ["05", "Professional operations", "Configuration control, checklists, range conduct, recovery, and post-flight reporting demonstrate a flight-ready organization."],
  ["06", "Student ownership", "Students lead the research, design, manufacturing, testing, documentation, presentation, and lessons learned."],
];

const sponsorTiers = [
  { name: "Community", amount: 250, copy: "Open the door to STEM outreach and student access." },
  { name: "Engineering", amount: 1000, copy: "Back the materials, electronics, and testing behind flight." },
  { name: "Mission", amount: 5000, copy: "Advance a complete subsystem or competition milestone." },
  { name: "Launch Partner", amount: 25000, copy: "Build a sustained partnership across the flight campaign." },
];

const inKindOptions = ["Materials & fabrication", "Electronics & test equipment", "Travel & logistics", "Mentorship & outreach"];

function Mark({ small = false }: { small?: boolean }) {
  return <span className={`mark ${small ? "small" : ""}`}><img className="intro-nighthawk" src={`${import.meta.env.BASE_URL}nova-nighthawks.png`} alt="NOVA Nighthawks college logo"/></span>;
}

function PayloadSpecimens({ code }: { code: string }) {
  const labels = code === "PL-01" ? ["BAROMETRIC CELL", "9-AXIS IMU"] : code === "PL-02" ? ["DEPLOYMENT CAM", "ARMING LOGIC"] : ["OPTICAL ARRAY", "RF TRANSCEIVER"];
  return <div className={`payload-specimens ${code.toLowerCase()}`} aria-label={`${labels[0]} and ${labels[1]} line-art concepts`}>
    <figure><svg viewBox="0 0 120 90" aria-hidden="true">{code === "PL-01" ? <><circle cx="60" cy="45" r="29"/><circle cx="60" cy="45" r="16"/><path d="M60 8v14m0 46v14M23 45h14m46 0h14M35 20l10 12m40-12L75 32M35 70l10-12m40 12L75 58"/></> : code === "PL-02" ? <><circle cx="52" cy="45" r="27"/><path d="M52 18v27l23 13M15 70h90M82 26h20v38H82"/><circle cx="52" cy="45" r="6"/></> : <><rect x="18" y="17" width="84" height="56" rx="7"/><circle cx="60" cy="45" r="22"/><circle cx="60" cy="45" r="9"/><path d="M28 8v9m16-9v9m32-9v9m16-9v9"/></>}</svg><figcaption>{labels[0]}</figcaption></figure>
    <figure><svg viewBox="0 0 120 90" aria-hidden="true">{code === "PL-01" ? <><rect x="27" y="13" width="66" height="64" rx="5"/><path d="M39 28h42M39 43h19m8 0h15M39 58h42M17 25h10m-10 16h10m-10 16h10m66-32h10m-10 16h10m-10 16h10"/><circle cx="60" cy="43" r="8"/></> : code === "PL-02" ? <><rect x="18" y="17" width="84" height="56" rx="4"/><path d="M30 30h22v18H30zm38 0h22v18H68zM30 59h60M41 48v11m38-11v11"/><circle cx="60" cy="59" r="5"/></> : <><path d="M18 61h84M30 61V34m60 27V34M30 34c18-22 42-22 60 0"/><path d="M43 47c10-10 24-10 34 0M54 57c4-4 8-4 12 0"/><circle cx="60" cy="66" r="7"/></>}</svg><figcaption>{labels[1]}</figcaption></figure>
  </div>;
}

function Intro({ onComplete, cssOnly = false }: { onComplete: () => void; cssOnly?: boolean }) {
  const introDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const previous = document.activeElement as HTMLElement | null; const element = introDialog.current; element?.showModal(); return () => { element?.close(); previous?.focus(); }; }, []);
  const [opening, setOpening] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const open = () => { if (!opening) setOpening(true); };
  useEffect(() => {
    const warmup = window.setTimeout(() => setOpening(true), cssOnly ? 900 : 1800);
    const finish = cssOnly ? window.setTimeout(() => setFinishing(true), 3600) : undefined;
    const complete = cssOnly ? window.setTimeout(onComplete, 6500) : undefined;
    const key = (event: KeyboardEvent) => { if (event.key === "Enter" || event.key === " ") setOpening(true); if (event.key === "Escape") onComplete(); };
    window.addEventListener("keydown", key);
    return () => { window.clearTimeout(warmup); if (finish) window.clearTimeout(finish); if (complete) window.clearTimeout(complete); window.removeEventListener("keydown", key); };
  }, [cssOnly, onComplete]);
  return <dialog ref={introDialog} aria-label={cssOnly ? "Flight control dashboard reboot" : "superNOVA introduction"} onCancel={onComplete} className={`intro-door ${cssOnly ? "reboot-mode" : ""} ${opening ? "opening" : ""} ${finishing ? "finishing" : ""}`}>
    <div className="intro-film">{cssOnly ? <div className="reboot-console"><div className="reboot-scan"/><Mark/><p>SYSTEM BUS · superNOVA FLIGHT OPERATIONS</p><h2>DASHBOARD REBOOT</h2><div className="reboot-status"><span>GUIDANCE <b>ONLINE</b></span><span>TELEMETRY <b>SYNCED</b></span><span>PAYLOAD <b>READY</b></span><span>MISSION UI <b>RESTORED</b></span></div><small>RETURNING TO FLIGHT CONTROL</small></div> : opening && <video aria-label="Decorative superNOVA launch introduction; skip to read the full mission information" autoPlay muted playsInline poster={`${import.meta.env.BASE_URL}social-preview.png`} onTimeUpdate={(event) => { const video = event.currentTarget; if (video.duration - video.currentTime <= 3) setFinishing(true); }} onEnded={onComplete}><source src={`${import.meta.env.BASE_URL}supernova-intro.mp4`} type="video/mp4"/></video>}</div>
    <div className="door door-left"/><div className="door door-right"/>
    <div className="vacuum-rail rail-left"><i/><i/><i/></div><div className="vacuum-rail rail-right"><i/><i/><i/></div>
    <div className="door-seal"><Mark/><p>superNOVA · FLIGHT SYSTEMS</p><h1>{cssOnly ? "RESTARTING FLIGHT CONTROL" : "THE HANGAR IS WARMING"}</h1><span>170+ STUDENTS · ONE MISSION · IREC</span>{!cssOnly && <button onClick={open}>OPEN FLIGHT OPERATIONS NOW</button>}<small>{cssOnly ? "CSS SYSTEM SEQUENCE · NO MEDIA PLAYBACK" : "AUTOMATIC FIRST-VISIT SEQUENCE · ESC TO SKIP"}</small></div>
    <button autoFocus className="skip-intro" onClick={onComplete}>{cssOnly ? "SKIP REBOOT" : "SKIP INTRO"}</button>
  </dialog>;
}

function SponsorPlanner({ contact }: { contact: (brief: string) => void }) {
  const [mode, setMode] = useState<"financial" | "in-kind">("financial");
  const [position, setPosition] = useState(17);
  const [selectedInKind, setSelectedInKind] = useState<string[]>([inKindOptions[0]]);
  const rawAmount = 250 * Math.pow(4000, position / 100);
  const amount = position === 100 ? 1_000_000 : rawAmount < 1_000 ? Math.round(rawAmount / 10) * 10 : rawAmount < 10_000 ? Math.round(rawAmount / 100) * 100 : rawAmount < 100_000 ? Math.round(rawAmount / 1_000) * 1_000 : Math.round(rawAmount / 10_000) * 10_000;
  const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  const setTier = (tierAmount: number) => setPosition(Math.round(Math.log(tierAmount / 250) / Math.log(4000) * 100));
  const tierName = amount >= 1_000_000 ? "Hyper-Donor" : amount >= 25_000 ? "Launch partnership" : amount >= 5_000 ? "Mission partnership" : amount >= 1_000 ? "Engineering partnership" : "Community partnership";
  const allocations = [["Hardware & materials", .4], ["Testing & verification", .25], ["Launch & logistics", .2], ["STEM outreach", .15]] as const;
  const toggleInKind = (item: string) => setSelectedInKind((selected) => selected.includes(item) ? selected.filter((value) => value !== item) : [...selected, item]);
  const briefSubject = mode === "financial" ? `superNOVA sponsor brief  ·  ${money(amount)} proposed` : "superNOVA in-kind partnership brief";
  return <section className="sponsor-planner" aria-labelledby="sponsor-planner-title"><div className="planner-heading"><div><div className="eyebrow">PARTNERSHIP PLANNER · NO PAYMENT TAKEN</div><h2 id="sponsor-planner-title">Fuel the next launch.</h2></div><p>Choose your support. See its potential. Brief the team. We will confirm the plan and recognition together.</p></div><div className="planner-layout"><div className="planner-controls"><div className="planner-tabs" role="group" aria-label="Support type"><button aria-pressed={mode === "financial"} className={mode === "financial" ? "active" : ""} onClick={() => setMode("financial")}>FINANCIAL SUPPORT</button><button aria-pressed={mode === "in-kind"} className={mode === "in-kind" ? "active" : ""} onClick={() => setMode("in-kind")}>IN-KIND SUPPORT</button></div>{mode === "financial" ? <><p className="control-label">PROPOSED SPONSOR PACKAGES</p><div className="tier-list">{sponsorTiers.map((tier) => <button aria-pressed={Math.abs(amount - tier.amount) < tier.amount * .12} key={tier.name} className={Math.abs(amount - tier.amount) < tier.amount * .12 ? "selected" : ""} onClick={() => setTier(tier.amount)}><i/><span><b>{tier.name}</b><small>{tier.copy}</small></span><strong>{money(tier.amount)}<small>starting point</small></strong></button>)}</div><label className="donation-slider"><span>EXPLORE A CONTRIBUTION <b>{money(amount)}</b></span><input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Proposed contribution amount" aria-valuetext={`${money(amount)} US dollars`}/><small><i>$250</i><i>$1,000,000</i></small></label></> : <><p className="control-label">WHAT COULD YOU BRING TO THE MISSION?</p><div className="inkind-list">{inKindOptions.map((item) => <label key={item}><input type="checkbox" checked={selectedInKind.includes(item)} onChange={() => toggleInKind(item)}/><span>{item}</span></label>)}</div><p className="planner-note">Equipment, services, test access, and mentoring can be as valuable as funding. Scope, value, timing, and recognition are agreed directly with the club.</p></>}</div><div className="impact-card"><div className="impact-kicker">YOUR POTENTIAL IMPACT <span>✦</span></div>{mode === "financial" ? <><strong className="impact-amount">{money(amount)}</strong><p>{tierName} · proposed</p><div className="allocation-bar">{allocations.map(([label, share]) => <i key={label} style={{ width: `${share * 100}%` }}/>)}</div><ul className="allocation-list">{allocations.map(([label, share]) => <li key={label}><span>{label}</span><b>{money(Math.round(amount * share))}</b></li>)}</ul>{position === 100 && <div className="hyper-donor" role="status"><span>HYPER-DONOR</span><h3>Mission-scale access unlocked.</h3><p>Explore executive engineering briefings, named program initiatives, multi-year workforce pathways, advanced test partnerships, and tailored impact reporting.</p></div>}</> : <><h3 className="inkind-impact">Expertise.<br/>Equipment.<br/>Opportunity.</h3><p>{selectedInKind.length} support {selectedInKind.length === 1 ? "area" : "areas"} selected</p><ul className="selected-support">{selectedInKind.map((item) => <li key={item}>✓ {item}</li>)}</ul></>}<div className="brief-list"><b>START A CONVERSATION ABOUT</b><span>✓ Student engineering outcomes</span><span>✓ Proposed project progress briefings</span><span>✓ Recognition and outreach collaboration</span></div><button className="impact-button" onClick={() => contact(mode === "financial" ? briefSubject : `${briefSubject}: ${selectedInKind.join(", ")}`)}>CONTACT US · BUILD A SPONSOR BRIEF</button></div></div></section>;
}

function Header({ progress, day, toggleDay, beginSponsorJourney }: { progress: number; day: boolean; toggleDay: () => void; beginSponsorJourney: () => void }) {
  const [open, setOpen] = useState(false);
  const links = (mobile = false) => nav.map(([label, href]) => href === "#support" ? <button className="sponsor-nav" key={href} onClick={() => { setOpen(false); beginSponsorJourney(); }}>SPONSOR US</button> : <a key={href} href={href} onClick={() => mobile && setOpen(false)}>{label}</a>);
  return <header className="header"><div className="nav-wrap"><div className="college-identity"><a className="brand header-brand" href={pageLink("home")} aria-label="superNOVA home"><img src={`${import.meta.env.BASE_URL}supernova-header-logo.jpg`} alt="superNOVA rocket and orbital logo"/></a><a className="college-affiliation" href="https://www.nvcc.edu/" aria-label="NOVA Nighthawks: Northern Virginia Community College"><img src={`${import.meta.env.BASE_URL}nova-nighthawks.png`} alt="NOVA Nighthawks college affiliation"/></a></div><nav className="desktop-nav" aria-label="Primary navigation">{links()}<button aria-label={day ? "Switch to dark mode: Night Ops" : "Switch to light mode: Day Ops"} onClick={toggleDay}>{day ? "NIGHT OPS" : "DAY OPS"}</button></nav><button className="menu-button" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "CLOSE" : "MISSION MENU"}</button></div><nav hidden={!open} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links(true)}<button aria-label={day ? "Switch to dark mode: Night Ops" : "Switch to light mode: Day Ops"} onClick={toggleDay}>{day ? "NIGHT OPS" : "DAY OPS"}</button></nav><div className="progress" aria-hidden="true"><i style={{ width: `${progress}%` }}/></div></header>;
}

export default function App() {
  useEffect(() => {
    const descriptions: Record<string, string> = {
      home: "Meet superNOVA: 170+ NVCC students building sounding rockets, scientific payloads, and the next generation of aerospace engineers in Manassas, Virginia.",
      flight: "Explore superNOVA's notional rocket flight sequence, mission milestones, recovery events, and simulated payload telemetry for IREC.",
      vehicle: "Explore the superNOVA student sounding rocket design baseline, airframe cutaways, avionics, propulsion, and recovery interfaces.",
      payloads: "Explore superNOVA's scientific rocket payload concepts: atmospheric sensing, deployable experiments, imaging, and telemetry.",
      engineering: "Discover superNOVA's student engineering teams, requirements, qualification, safety evidence, and IREC competition preparation.",
      support: "Support 170+ superNOVA student engineers through proposed sponsorship, materials, fabrication, mentorship, and STEM outreach partnerships.",
    };
    const title = `${page.charAt(0).toUpperCase() + page.slice(1)} | superNOVA IREC`;
    const url = `https://oosanssmithoo.github.io/NOVA-IREC/${page === "home" ? "" : `?page=${page}`}`;
    document.title = title;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    for (const [selector, value] of [
      ['meta[name="description"]', descriptions[page]],
      ['meta[property="og:description"]', descriptions[page]],
      ['meta[name="twitter:description"]', descriptions[page]],
      ['meta[property="og:title"]', title],
      ['meta[name="twitter:title"]', title],
      ['meta[property="og:url"]', url],
    ]) document.querySelector(selector)?.setAttribute("content", value);
  }, []);
  const [intro, setIntro] = useState(() => { try { return page === "home" && localStorage.getItem("nova.intro") !== "seen"; } catch { return true; } });
  const [day, setDay] = useState(() => { try { return localStorage.getItem("nova.theme") === "day"; } catch { return false; } });
  const [progress, setProgress] = useState(0);
  const [top, setTop] = useState(false);
  const [padReturning, setPadReturning] = useState(false);
  const [padArrived, setPadArrived] = useState(false);
  const [copied, setCopied] = useState(false);
  const [replayIntro, setReplayIntro] = useState(false);
  const [contactBrief, setContactBrief] = useState<string | null>(null);
  const [sponsorPressed, setSponsorPressed] = useState(false);
  const sponsorSound = useRef<HTMLAudioElement | null>(null);
  const [activeFlightStep, setActiveFlightStep] = useState(0);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const update = () => { const range = document.documentElement.scrollHeight - innerHeight; setProgress(range ? scrollY / range * 100 : 0); setTop(scrollY > innerHeight); };
    update(); addEventListener("scroll", update, { passive: true });
    document.title = `superNOVA | ${page === "home" ? "Student Rocketry" : page.charAt(0).toUpperCase() + page.slice(1)}`;
    const sections = document.querySelectorAll("main section"); sections.forEach((section) => section.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .08 }); sections.forEach((section) => observer.observe(section));
    return () => { removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  const finishIntro = () => { try { localStorage.setItem("nova.intro", "seen"); } catch { /* optional */ } setIntro(false); };
  const toggleDay = () => setDay((value) => { const next = !value; try { localStorage.setItem("nova.theme", next ? "day" : "night"); } catch { /* optional */ } return next; });
  const copyPage = async () => { try { await navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); } };
  const finishReplay = () => { setReplayIntro(false); scrollTo({ top: 0, behavior: "smooth" }); };
  useEffect(() => {
    if (!padReturning) return;
    let arrivalTimer: number | undefined;
    let settled = false;
    const checkArrival = () => {
      if (scrollY > 4 || settled) return;
      settled = true;
      setPadArrived(true);
      arrivalTimer = window.setTimeout(() => { setPadArrived(false); setPadReturning(false); }, 1400);
    };
    addEventListener("scroll", checkArrival, { passive: true });
    const initialCheck = window.setTimeout(checkArrival, 50);
    const fallback = window.setTimeout(() => setPadReturning(false), 7000);
    return () => { removeEventListener("scroll", checkArrival); window.clearTimeout(initialCheck); window.clearTimeout(arrivalTimer); window.clearTimeout(fallback); };
  }, [padReturning]);
  useEffect(() => {
    if (!sponsorPressed) return;
    const started = performance.now();
    let frame = 0;
    const fade = (now: number) => {
      const elapsed = now - started;
      if (sponsorSound.current) sponsorSound.current.volume = .5 * Math.max(0, Math.min(1, elapsed / 120, (2250 - elapsed) / 400));
      if (elapsed < 2250) frame = requestAnimationFrame(fade);
    };
    frame = requestAnimationFrame(fade);
    const timer = window.setTimeout(() => {
      sponsorSound.current?.pause();
      if (page === "support") {
        document.querySelector(".sponsor-planner")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        setSponsorPressed(false);
      } else location.href = pageLink("support");
    }, 2250);
    return () => { window.clearTimeout(timer); cancelAnimationFrame(frame); sponsorSound.current?.pause(); sponsorSound.current = null; };
  }, [sponsorPressed]);

  const returnToPad = () => { setPadReturning(true); scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); };
  const beginSponsorJourney = () => {
    if (sponsorPressed || sponsorSound.current) return;
    const audio = new Audio(`${import.meta.env.BASE_URL}sponsor-submerge.mp3`);
    audio.volume = 0;
    sponsorSound.current = audio;
    void audio.play().catch(() => { /* Navigation remains available when playback is blocked. */ });
    setSponsorPressed(true);
  };

  return <div id="top" className={`site ${day ? "day" : "night"} ${sponsorPressed ? "sponsor-pressed" : ""} ${page === "support" ? "support-entry" : ""}`}>
    {sponsorPressed && <div className="sponsor-ignition" role="status"><img className="sponsor-nighthawk" src={`${import.meta.env.BASE_URL}nova-nighthawks.png`} alt="NOVA Nighthawks"/><span>OPENING MISSION SUPPORT</span></div>}
    <a className="skip" href="#content">SKIP TO MISSION CONTENT</a><Header progress={progress} day={day} toggleDay={toggleDay} beginSponsorJourney={beginSponsorJourney}/>
    <main id="content" tabIndex={-1}>
      {page === "support" && !location.hash && <SponsorCountdown/>}
      {page !== "home" && <h1 className="page-title">{({ flight: "Flight operations", vehicle: "Flight vehicle", payloads: "Payload manifest", engineering: "Engineering cadence", support: "Support the mission" } as Record<string, string>)[page]}</h1>}
      {page === "home" && <><section className="hero"><div className="hero-orbit"/><div className="hero-grid"/><div className="hero-copy"><div className="eyebrow">superNOVA · NVCC COLLEGIATE ROCKETRY</div><h1>ENGINEER THE PAYLOAD.<br/><em>PROVE IT IN FLIGHT.</em></h1><p>A 170+ student Northern Virginia Community College team designing, qualifying, and flying sounding-rocket payloads for the International Rocket Engineering Competition.</p><div className="actions"><button className="primary" onClick={beginSponsorJourney}>SPONSOR THE MISSION</button><a className="secondary" href={pageLink("payloads")}>EXPLORE THE PAYLOADS</a></div></div><div className="hero-vehicle hero-blueprint" aria-label="Cutaway technical illustration of the superNOVA sounding rocket"><img src={`${import.meta.env.BASE_URL}rocket-cutaway.svg`} alt="Detailed superNOVA IREC sounding rocket cutaway showing nosecone, payload, avionics, recovery, motor, and fins"/></div><div className="trust"><span>170+ STUDENTS</span><span>FLIGHT TESTED</span><span>SCIENCE DRIVEN</span><span>IREC READY</span></div></section>

      <section id="program" className="program-intro"><div className="program-lead"><div className="eyebrow">WELCOME TO STUDENT ROCKETRY</div><h2>Brief. Build. Launch.</h2><p className="lead">Take the mission. Build the hardware. Prove it on the ground. Fly it with purpose.</p><p>170+ NVCC students. One launch crew. Engineers, scientists, makers, and storytellers building the future of rocketry together.</p><div className="actions"><a className="primary" href={pageLink("home", "#team")}>MEET THE SUBSYSTEMS</a><a className="secondary" href={pageLink("support", "#support")}>SUPPORT THE CAMPAIGN</a></div></div><div className="program-pillars"><article><span>01</span><h3>DESIGN</h3><p>Set the mission. Draw the plan. Check the interfaces.</p></article><article><span>02</span><h3>BUILD</h3><p>Make the parts. Wire the stack. Inspect every connection.</p></article><article><span>03</span><h3>PROVE</h3><p>Test the claim. Find the fault. Prove the fix.</p></article><article><span>04</span><h3>FLY</h3><p>Run the count. Recover safely. Make the next flight better.</p></article></div></section>

      </>}
      {page === "flight" && <section id="mission-profile" className="mission-profile" aria-labelledby="mission-profile-title">
        <div className="mission-hero">
          <div className="mission-stars" aria-hidden="true"/><div className="mission-horizon" aria-hidden="true"/>
          <div className="mission-hero-copy"><div className="eyebrow">2026 IREC CAMPAIGN · MANASSAS, VIRGINIA</div><h2 id="mission-profile-title">MISSION<br/><em>NOVA</em></h2><p>Build as one crew. Test every system. Launch the science. Bring the evidence home.</p><div className="actions"><a className="primary" href={pageLink("flight", "#mission-sequence")}>VIEW THE FLIGHT PLAN</a><button className="secondary" onClick={beginSponsorJourney}>SPONSOR THE MISSION</button></div></div>
          <div className="mission-hero-status"><span>CAMPAIGN</span><b>ACTIVE</b><i/><span>TEAM</span><b>170+ STUDENTS</b><i/><span>OBJECTIVE</span><b>IREC FLIGHT</b></div>
        </div>

        <div id="mission-sequence" className="flight-sequence">
          <div className="section-head"><div><div className="eyebrow">FLIGHT SEQUENCE · NOTIONAL PROFILE</div><h2>From rail departure to recovered data.</h2></div><p>Follow the count from ignition to recovery. This is the practice profile. Final timing follows verified flight data.</p></div>
          <div className="trajectory" role="group" aria-label="Notional mission profile showing ignition, rail departure, maximum dynamic pressure, apogee, drogue deployment, main parachute deployment, and recovery">
            <svg viewBox="0 0 1200 420" aria-hidden="true"><defs><linearGradient id="flightGlow" x1="0" x2="1"><stop stopColor="#f0b323"/><stop offset=".72" stopColor="#ffd166"/><stop offset="1" stopColor="#6fa687"/></linearGradient></defs><path className="trajectory-grid" d="M0 350H1200M0 270H1200M0 190H1200M0 110H1200M150 20V390M350 20V390M550 20V390M750 20V390M950 20V390"/><path className="trajectory-line" d="M45 350 C170 345 205 205 365 98 S620 35 705 72 C790 108 835 220 930 285 S1080 350 1160 350"/><g className="trajectory-nodes">{flightSteps.map((step, index) => <circle className={index === activeFlightStep ? "active" : ""} key={step.number} cx={step.x} cy={step.y} r={index === activeFlightStep ? 11 : 7}/>)}</g></svg>
            <div className="trajectory-readout" aria-live="polite"><span>EVENT {flightSteps[activeFlightStep].number}</span><b>{flightSteps[activeFlightStep].title}</b><p>{flightSteps[activeFlightStep].detail}</p></div>
            <ol>{flightSteps.map((step, index) => <li className={index === activeFlightStep ? "active" : ""} key={step.number}><button aria-pressed={index === activeFlightStep} onClick={() => setActiveFlightStep(index)} onMouseEnter={() => setActiveFlightStep(index)} onFocus={() => setActiveFlightStep(index)}><span>{step.number}</span><b>{step.title}</b></button></li>)}</ol>
          </div>
        </div>

        <div className="mission-chapters"><div className="eyebrow">CAMPAIGN CHAPTERS</div><h2>Six gates. One accountable mission.</h2><div className="chapter-grid">{missionChapters.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>

        <div className="mission-ops">
          <div className="milestone-ledger"><div className="eyebrow">MISSION MILESTONES · WORKING BASELINE</div><h2>Review gates to launch day.</h2><div className="ledger-head"><span>COUNT</span><span>EVENT</span><span>STATUS</span></div>{missionMilestones.map(([time, event, status]) => <div className="ledger-row" key={event}><time>{time}</time><b>{event}</b><span className={status === "BASELINED" ? "complete" : ""}>{status}</span></div>)}</div>
          <aside className="payload-dashboard" aria-label="Payload performance dashboard"><img className="dashboard-nighthawk" src={`${import.meta.env.BASE_URL}nova-nighthawks.png`} alt="NOVA Nighthawks college logo"/><div className="dashboard-top"><span>PAYLOAD CHANNEL · PL-01</span><i>SIMULATED</i></div><h3>SCIENCE BAY</h3><div className="dashboard-orbit"><span/><b>LINK<br/>NOMINAL</b></div><dl><div><dt>SAMPLE RATE</dt><dd>100 Hz</dd></div><div><dt>DOWNLINK</dt><dd>2.4 GHz</dd></div><div><dt>ARMING</dt><dd>3× REDUNDANT</dd></div><div><dt>DATA STATE</dt><dd>RECORDING</dd></div></dl><div className="signal-strip"><i/><i/><i/><i/><i/><i/></div><small>DEMONSTRATION DATA · REPLACE WITH VERIFIED FLIGHT VALUES</small></aside>
        </div>

        <div className="mission-sponsor"><div><span>THE NEXT MILESTONE NEEDS A MISSION PARTNER</span><h2>Put hardware on the rail. Bring discovery home.</h2></div><button className="primary" onClick={beginSponsorJourney}>SPONSOR MISSION NOVA</button></div>
      </section>}

      {page === "vehicle" && <><section id="mission" className="split"><div><div className="eyebrow">THE MISSION</div><h2>One launch. Thousands of engineering decisions.</h2></div><div className="panel"><b>COMPETITION OBJECTIVE</b><p>Classroom ideas. Student hardware. Flight evidence. superNOVA builds toward IREC, one verified milestone at a time.</p><p>Mission first. Science aboard. Evidence home.</p></div></section>

      <section id="vehicle" className="vehicle-section"><div className="section-head"><div><div className="eyebrow">FLIGHT VEHICLE · BASELINE</div><h2>superNOVA-1 sounding rocket</h2></div><p>A student platform for the next experiment. Dimensions and competition class remain at design baseline.</p></div><div className="vehicle-grid vehicle-blueprint"><img src={`${import.meta.env.BASE_URL}rocket-system.svg`} alt="superNOVA-1 vehicle cutaway and subsystem schematic"/><dl><div><dt>TARGET APOGEE</dt><dd>10,000 ft</dd></div><div><dt>PAYLOAD BAY</dt><dd>MODULAR</dd></div><div><dt>RECOVERY</dt><dd>DUAL EVENT</dd></div><div><dt>STATUS</dt><dd>DESIGN BASELINE</dd></div></dl></div><div className="schematic-gallery"><article><div><img src={`${import.meta.env.BASE_URL}rocket-cutaway.svg`} alt="Vertical rocket cutaway drawing"/></div><span>PLATE 01 · VEHICLE</span><h3>Inside NOVA-1</h3><p>A transparent view of the complete stack connects external form to payload, avionics, recovery, propulsion, and structural interfaces.</p><a href={pageLink("flight", "#mission-sequence")}>TRACE THE FLIGHT PROFILE →</a></article><article><div><img src={`${import.meta.env.BASE_URL}rocket-system.svg`} alt="Rocket subsystem architecture drawing"/></div><span>PLATE 02 · SYSTEMS</span><h3>Interfaces that must close</h3><p>Every bulkhead, harness, retention point, sensor, and deployment path belongs to a shared architecture · not an isolated subsystem.</p><a href={pageLink("home", "#team")}>MEET THE SUBSYSTEM TEAMS →</a></article><article><div><img src={`${import.meta.env.BASE_URL}payload.svg`} alt="Payload electronics module drawing"/></div><span>PLATE 03 · PAYLOAD</span><h3>Evidence rides here</h3><p>The science bay protects instrumentation, records the ascent environment, and returns interpretable data after recovery.</p><a href={pageLink("payloads", "#payloads")}>OPEN THE PAYLOAD MANIFEST →</a></article></div></section>

      </>}
      {page === "payloads" && <section id="payloads" className="payload-section"><div className="eyebrow">PAYLOAD MANIFEST</div><h2>Launch questions. Recover answers.</h2><div className="cards">{payloads.map((payload) => <article key={payload.code}><div className="card-top"><span>{payload.code}</span><i>{payload.status}</i></div><PayloadSpecimens code={payload.code}/><h3>{payload.title}</h3><p>{payload.copy}</p><div className="metric"><strong>{payload.metric}</strong><small>{payload.label}</small></div></article>)}</div></section>

      }
      {page === "flight" && <section className="flight-data"><div><div className="eyebrow">LIVE DEMONSTRATION · SIMULATED TELEMETRY</div><h2>Follow the flight profile.</h2><p>Practice telemetry today. A home for verified flight results tomorrow.</p></div><div className="plot" aria-label="Simulated altitude profile"><div className="plot-labels"><span>APOGEE</span><span>DEPLOY</span><span>RECOVERY</span></div><svg viewBox="0 0 800 260" role="img" aria-label="Illustrative rocket altitude curve"><path className="gridlines" d="M0 50H800M0 100H800M0 150H800M0 200H800M160 0V260M320 0V260M480 0V260M640 0V260"/><path className="curve" d="M0 235 C100 230 120 150 240 85 S390 18 450 28 S520 95 590 150 S700 215 800 230"/><circle cx="450" cy="28" r="6"/></svg><div className="plot-stats"><span><b>10,024</b> ft</span><span><b>0.94</b> Mach</span><span><b>16.2</b> s to apogee</span></div></div></section>

      }
      {page === "engineering" && <><section className="process"><div className="eyebrow">ENGINEERING CADENCE</div><h2>Brief it. Build it. Prove it. Fly it.</h2><ol>{phases.map(([n, title, copy]) => <li key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>

      <section className="requirements"><div className="section-head"><div><div className="eyebrow">COMPETITION READINESS</div><h2>The work behind flight status.</h2></div><p>Earn flight readiness. Review the rules. Close the evidence. Follow current ESRA requirements and range procedures.</p></div><div className="requirement-grid">{deliverables.map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><a className="text-link" href="https://www.esrarocket.org/documents-and-forms/">VIEW OFFICIAL ESRA DOCUMENTS ↗</a></section>

      </>}
      {page === "home" && <><section id="team" className="team-breakout"><div className="section-head"><div><div className="eyebrow">TEAM BREAKOUTS</div><h2>Ten teams. One launch count.</h2></div><p>Find your station. Learn your craft. Make the next flight possible.</p></div><div className="team-cards">{teams.map((team) => <article key={team.code}><span>{team.code}</span><MissionGlyph kind={team.code} label={team.title}/><h3>{team.title}</h3><p>{team.copy}</p></article>)}</div><div className="team-callout"><div><b>NO ROCKET EXPERIENCE REQUIRED</b><p>Bring curiosity. Bring commitment. Learn with the crew. Engineering, science, business, media, and design all have a place here.</p></div><a className="primary" href="mailto:jschmitt@schmittsanchezdefense.com?subject=Join%20the%20superNOVA%20Rocketry%20Team">JOIN superNOVA</a></div></section>

      <section id="outreach" className="outreach"><div className="outreach-copy"><div className="eyebrow">OUTREACH · EDUCATE · INSPIRE</div><h2>Spark curiosity. Launch possibility.</h2><p>Take the launch spirit beyond campus. Show a classroom the hardware. Give a young maker their first mission. Bring Northern Virginia into the flight story.</p><ul><li>K to 12 classroom and community demonstrations</li><li>Campus engineering showcases and recruitment</li><li>Build-season updates and technical explainers</li><li>Mentor, alumni, and industry knowledge exchange</li><li>Post-flight results shared with supporters</li></ul><a className="secondary" href="mailto:jschmitt@schmittsanchezdefense.com?subject=superNOVA%20STEM%20Outreach">INVITE superNOVA</a></div><div className="impact-board"><div><MissionGlyph kind="EDUCATE" label="EDUCATE"/><strong>EDUCATE</strong><span>Show the science. Put discovery within reach.</span></div><div><MissionGlyph kind="INSPIRE" label="INSPIRE"/><strong>INSPIRE</strong><span>Light the spark. Give tomorrow a launch point.</span></div><div><MissionGlyph kind="CONNECT" label="CONNECT"/><strong>CONNECT</strong><span>Link the crews. Share the tools. Go further together.</span></div><div><MissionGlyph kind="GIVE" label="GIVE BACK"/><strong>GIVE BACK</strong><span>Pass the knowledge. Lift the next crew.</span></div></div></section>

      </>}
      {(page === "home" || page === "support") && <><section id="support" className="support"><div className="support-heading"><div className="eyebrow">SUPPORT THE MISSION</div><h2>Put 170+ student engineers on the launch rail.</h2><p>Back the builders. Equip the tests. Get the crew to the range. Your support gives the next generation room to fly.</p></div><BuildCrew/><div className="support-grid"><article><span>01</span><MissionGlyph kind="MATERIAL" label="Materials"/><h3>Materials & components</h3><p>Supply the build. Materials, sensors, electronics, recovery hardware, and tools.</p></article><article><span>02</span><MissionGlyph kind="FAB" label="Fabrication"/><h3>Fabrication & test access</h3><p>Open the workshop. Machine the parts. Give the tests a place to run.</p></article><article><span>03</span><MissionGlyph kind="MENTOR" label="Mentorship"/><h3>Mentorship</h3><p>Share your experience. Review the design. Help the next crew grow.</p></article><article><span>04</span><MissionGlyph kind="PROGRAM" label="Program support"/><h3>Program support</h3><p>Get the crew to the range. Back travel, fees, outreach, and the flight campaign.</p></article></div></section>

      {page === "support" ? <SponsorPlanner contact={setContactBrief}/> : <div className="home-donor"><h2>Fuel the next launch.</h2><p>Explore financial and in-kind support in one place.</p><button className="primary" onClick={beginSponsorJourney}>OPEN THE DONOR PAGE →</button></div>}
      </>}

      <section id="faq" className="faq"><div className="eyebrow">MISSION QUESTIONS</div><h2>Preflight brief.</h2>{[["What is IREC?", "The International Rocket Engineering Competition brings collegiate teams together to design, build, document, present, and fly student-developed rockets and payloads under formal technical and safety review."], ["Who can join superNOVA?", "The program needs technical and nontechnical contributors. Students interested in engineering, science, software, operations, business, media, design, education, and leadership all have meaningful work to own."], ["Is the displayed vehicle final?", "No. Vehicle specifications and payload concepts shown here are a design baseline until the team publishes verified, approved mission data."], ["What can a payload demonstrate?", "Sensor systems, deployable mechanisms, imaging, communications, atmospheric science, materials, and other experiments that satisfy the current competition and safety requirements."], ["How can sponsors help?", "Materials, machining, electronics, test access, travel, mentorship, outreach support, and direct program funding all convert into student flight experience."], ["Where are the governing competition rules?", "ESRA publishes the current Rules & Requirements, Design Test & Evaluation Guide, schedules, templates, risk guidance, and range procedures on its official Documents and Forms page."]].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

      <section id="contact" className="contact"><div><div className="eyebrow">OPEN A CHANNEL · MANASSAS, VIRGINIA</div><h2>Join the count. Shape what flies next.</h2><p>Student. Mentor. Partner. There is a station for you on this crew.</p></div><div className="actions"><button className="primary" onClick={() => setContactBrief("")}>CONTACT THE TEAM</button><a className="secondary" href="https://www.linkedin.com/company/supernova-rocketry-club/">LINKEDIN</a><button className="secondary" aria-live="polite" onClick={copyPage}>{copied ? "LINK COPIED" : "COPY SITE LINK"}</button></div></section>
      {page === "home" && <section className="launch-locations"><div className="eyebrow">REGIONAL ROCKETRY · THE PLAINS, VIRGINIA</div><h2>Great Meadow. A local launch horizon.</h2><p>Great Meadow at 5089 Old Tavern Road, The Plains, Virginia, hosts NOVAAR rocketry activities and has hosted the American Rocketry Challenge National Finals. Check organizer schedules for upcoming events and access.</p><div className="actions"><a className="secondary" href="https://novaar.org/drupal10/meadowsmap">LOCAL LAUNCH DIRECTIONS ↗</a><a className="secondary" href="https://www.rocketrychallenge.org/result/2025-national-finals-location/">STUDENT COMPETITION AT GREAT MEADOW ↗</a></div><p>IREC is a separate collegiate competition: the 2026 event was based in Midland and West Texas. superNOVA participation or bookings at Great Meadow are not announced here.</p><a className="text-link" href="https://www.esrarocket.org/2026irec">IREC EVENT INFORMATION ↗</a></section>}
      <RocketGame/>
    </main>
    <footer><div className="footer-brand"><img className="footer-team-logo" src={`${import.meta.env.BASE_URL}supernova-header-logo.jpg`} alt="superNOVA rocket and orbital logo"/><div><b>superNOVA</b><span>NVCC STUDENT ROCKETRY · PAYLOAD SCIENCE</span><button className="replay-intro" onClick={() => setReplayIntro(true)}>↻ REPLAY INTRODUCTION</button></div></div><div className="footer-contact"><button className="footer-sponsor" onClick={beginSponsorJourney}>SPONSOR US</button><a href="mailto:jschmitt@schmittsanchezdefense.com">jschmitt@schmittsanchezdefense.com</a><span>MANASSAS, VIRGINIA</span><a href="https://www.linkedin.com/company/supernova-rocketry-club/">LINKEDIN · superNOVA ROCKETRY CLUB</a></div><div className="footer-bottom"><span>ENGINEERED BY STUDENTS · {year}</span><span className="builder-credit"><i className="usa-flag" role="img" aria-label="United States flag"/><img src={`${import.meta.env.BASE_URL}built-by-signature.svg`} alt="Built by Sanchez and Schmitt"/></span><nav aria-label="Legal"><a href="privacy.html">PRIVACY</a><a href="terms.html">TERMS</a></nav></div></footer>
    {contactBrief !== null && <ContactPanel brief={contactBrief} close={() => setContactBrief(null)}/>}
    {(top || padReturning) && <aside className={`pad-control ${padArrived ? "pad-arrived" : ""}`} aria-label="Launchpad navigation control"><img className="pad-nighthawk" src={`${import.meta.env.BASE_URL}nova-nighthawks.png`} alt="NOVA Nighthawks college logo"/><div className="pad-control-label"><i/> RANGE CONTROL <span>01</span></div><div className="pad-control-status" role="status">{padArrived ? "ON PAD · STANDBY" : padReturning ? "RETURN IN PROGRESS" : "NAVIGATION READY"}</div><div className="pad-switch-guard"><button disabled={padReturning} onClick={() => { setPadReturning(true); scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }}><span className="pad-switch-light"/>{padArrived ? "PAD REACHED" : "RETURN TO PAD"}<span aria-hidden="true">↑</span></button></div><PadMusic returnToPad={returnToPad}/><small>superNOVA · LAUNCH DAY</small><span className="box-screw screw-tl"/><span className="box-screw screw-tr"/><span className="box-screw screw-bl"/><span className="box-screw screw-br"/></aside>}
    {intro && <Intro onComplete={finishIntro}/>}
    {replayIntro && <Intro cssOnly onComplete={finishReplay}/>}
  </div>;
}
