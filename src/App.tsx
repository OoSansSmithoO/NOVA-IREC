import { useEffect, useMemo, useState } from "react";

const nav = [["PROGRAM", "#program"], ["VEHICLE", "#vehicle"], ["PAYLOADS", "#payloads"], ["TEAMS", "#team"], ["OUTREACH", "#outreach"], ["SUPPORT", "#support"]] as const;

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

const teams = [
  { code: "SYS", title: "Program & Systems", copy: "Own mission requirements, interfaces, schedule, configuration, review readiness, and the evidence connecting every subsystem." },
  { code: "SAF", title: "Safety & Reliability", copy: "Maintain hazard analyses, risk controls, checklists, verification records, and operational discipline across the campaign." },
  { code: "AER", title: "Airframe & Aerodynamics", copy: "Design structures, fins, couplers, retention, mass properties, stability, and the flight-ready mechanical stack." },
  { code: "PRO", title: "Propulsion", copy: "Integrate the selected motor system, thermal boundaries, retention hardware, performance models, and safe handling procedures." },
  { code: "AVN", title: "Avionics & Telemetry", copy: "Develop flight computers, power, sensing, data acquisition, communications, tracking, and ground-station interfaces." },
  { code: "RCV", title: "Recovery", copy: "Engineer deployment events, energetic-device controls, parachute sizing, descent performance, and vehicle recoverability." },
  { code: "PAY", title: "Payload Science", copy: "Turn a meaningful scientific or technical objective into a qualified experiment with measurable, recoverable results." },
  { code: "OPS", title: "Test & Flight Operations", copy: "Plan integration, rehearsals, test campaigns, launch-day procedures, post-flight inspection, and data closeout." },
  { code: "COM", title: "Reports & Presentation", copy: "Build the technical report, progress evidence, design-review material, poster, presentation, photography, and mission record." },
  { code: "DEV", title: "Outreach & Development", copy: "Grow membership, coordinate community STEM events, steward partners, fundraise, and communicate the team’s impact." },
];

const deliverables = [
  ["01", "Requirements baseline", "Competition rules, mission objectives, category constraints, and interfaces become controlled engineering requirements."],
  ["02", "Reviews & reports", "Progress reporting, design reviews, technical writing, drawings, analyses, and test evidence make the design auditable."],
  ["03", "Risk & flight safety", "Hazards, failure modes, mitigations, procedures, inspections, and launch authorization stay visible from concept to range."],
  ["04", "Payload evidence", "The payload carries a defined objective, survives the mission environment, operates reliably, and returns interpretable results."],
  ["05", "Professional operations", "Configuration control, checklists, range conduct, recovery, and post-flight reporting demonstrate a flight-ready organization."],
  ["06", "Student ownership", "Students lead the research, design, manufacturing, testing, documentation, presentation, and lessons learned."],
];

function Mark({ small = false }: { small?: boolean }) {
  return <span className={`mark ${small ? "small" : ""}`} aria-label="superNOVA"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 7 62 31 88 36 69 55 73 82 50 69 27 82 31 55 12 36 38 31Z"/><path className="mark-core" d="M50 21 57 39 76 42 62 56 65 72 50 63 35 72 38 56 24 42 43 39Z"/></svg></span>;
}

function Intro({ onComplete }: { onComplete: () => void }) {
  const [launched, setLaunched] = useState(false);
  const go = () => { if (launched) return; setLaunched(true); window.setTimeout(onComplete, 2400); };
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === "Enter" || event.key === " ") go(); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); });
  return <div className={`intro ${launched ? "launched" : ""}`} onClick={go}>
    <div className="stars"/><div className="telemetry-grid"/>
    <div className="intro-copy"><p>superNOVA · FLIGHT SYSTEMS</p><Mark/><h1>PAYLOAD TO APOGEE</h1><span>NVCC STUDENT ENGINEERING · SOUNDING ROCKET SCIENCE · IREC</span><button onClick={(event) => { event.stopPropagation(); go(); }}>INITIATE COUNTDOWN</button><small>CLICK ANYWHERE · ENTER LAUNCH SEQUENCE</small></div>
    <div className="launch-rocket" aria-hidden="true"><i/><b/></div><div className="countline">T–03&nbsp;&nbsp; T–02&nbsp;&nbsp; T–01&nbsp;&nbsp; LIFTOFF</div>
  </div>;
}

function Header({ progress, day, toggleDay }: { progress: number; day: boolean; toggleDay: () => void }) {
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="nav-wrap"><a className="brand" href="#top"><Mark small/><span>superNOVA</span></a><nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<button onClick={toggleDay}>{day ? "NIGHT OPS" : "DAY OPS"}</button></nav><button className="menu-button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "CLOSE" : "MISSION MENU"}</button></div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}<button onClick={toggleDay}>{day ? "NIGHT OPS" : "DAY OPS"}</button></nav>}<div className="progress"><i style={{ width: `${progress}%` }}/></div></header>;
}

export default function App() {
  const [intro, setIntro] = useState(() => { try { return localStorage.getItem("nova.intro") !== "seen"; } catch { return true; } });
  const [day, setDay] = useState(() => { try { return localStorage.getItem("nova.theme") === "day"; } catch { return false; } });
  const [progress, setProgress] = useState(0);
  const [top, setTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const update = () => { const range = document.documentElement.scrollHeight - innerHeight; setProgress(range ? scrollY / range * 100 : 0); setTop(scrollY > innerHeight); };
    update(); addEventListener("scroll", update, { passive: true });
    const sections = document.querySelectorAll("main section"); sections.forEach((section) => section.classList.add("reveal"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .08 }); sections.forEach((section) => observer.observe(section));
    return () => { removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  const finishIntro = () => { try { localStorage.setItem("nova.intro", "seen"); } catch { /* optional */ } setIntro(false); };
  const toggleDay = () => setDay((value) => { const next = !value; try { localStorage.setItem("nova.theme", next ? "day" : "night"); } catch { /* optional */ } return next; });
  const copyPage = async () => { try { await navigator.clipboard.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); } };

  return <div id="top" className={`site ${day ? "day" : "night"}`}>
    <a className="skip" href="#content">SKIP TO MISSION CONTENT</a><Header progress={progress} day={day} toggleDay={toggleDay}/>
    <main id="content">
      <section className="hero"><div className="hero-orbit"/><div className="hero-grid"/><div className="hero-copy"><div className="eyebrow">superNOVA · NVCC COLLEGIATE ROCKETRY</div><h1>ENGINEER THE PAYLOAD.<br/><em>PROVE IT IN FLIGHT.</em></h1><p>A Northern Virginia Community College student team designing, qualifying, and flying sounding-rocket payloads for the International Rocket Engineering Competition.</p><div className="actions"><a className="primary" href="#payloads">EXPLORE THE PAYLOADS</a><a className="secondary" href="#contact">JOIN THE MISSION</a></div></div><div className="hero-vehicle" aria-label="Technical illustration of superNOVA sounding rocket"><img src={`${import.meta.env.BASE_URL}rocket.svg`} alt="superNOVA IREC sounding rocket technical illustration"/></div><div className="trust"><span>NVCC STUDENT BUILT</span><span>FLIGHT TESTED</span><span>SCIENCE DRIVEN</span><span>IREC READY</span></div></section>

      <section id="program" className="program-intro"><div className="program-lead"><div className="eyebrow">WELCOME TO STUDENT ROCKETRY</div><h2>A classroom with a countdown.</h2><p className="lead">Student rocketry is systems engineering made tangible: a multidisciplinary team accepts a mission, manages risk, builds hardware, proves it through testing, and stands behind the result on launch day.</p><p>superNOVA brings NVCC students together around one demanding flight program—uniting engineering, science, operations, communication, and community leadership in a shared campaign from concept to recovery.</p><div className="actions"><a className="primary" href="#team">MEET THE SUBSYSTEMS</a><a className="secondary" href="#support">SUPPORT THE CAMPAIGN</a></div></div><div className="program-pillars"><article><span>01</span><h3>DESIGN</h3><p>Translate mission goals into requirements, interfaces, analyses, drawings, and controlled hardware.</p></article><article><span>02</span><h3>BUILD</h3><p>Manufacture, wire, integrate, document, and inspect a complete flight system.</p></article><article><span>03</span><h3>PROVE</h3><p>Test assumptions, qualify subsystems, rehearse operations, and close risk with evidence.</p></article><article><span>04</span><h3>FLY</h3><p>Operate professionally, recover safely, analyze data, and return lessons to the next design.</p></article></div></section>

      <section id="mission" className="split"><div><div className="eyebrow">THE MISSION</div><h2>One launch. Thousands of engineering decisions.</h2></div><div className="panel"><b>COMPETITION OBJECTIVE</b><p>superNOVA develops a competition-ready sounding rocket and payload architecture that turns classroom theory into traceable requirements, tested hardware, and recoverable flight data.</p><p>The website is structured like the program: mission first, vehicle second, experiments at the center, evidence at the finish.</p></div></section>

      <section id="vehicle" className="vehicle-section"><div className="section-head"><div><div className="eyebrow">FLIGHT VEHICLE · BASELINE</div><h2>superNOVA-1 sounding rocket</h2></div><p>A configurable student platform for payload demonstration. Final dimensions and competition class remain editable as the team closes its design.</p></div><div className="vehicle-grid"><img src={`${import.meta.env.BASE_URL}rocket-horizontal.svg`} alt="superNOVA-1 sounding rocket side-profile diagram"/><dl><div><dt>TARGET APOGEE</dt><dd>10,000 ft</dd></div><div><dt>PAYLOAD BAY</dt><dd>MODULAR</dd></div><div><dt>RECOVERY</dt><dd>DUAL EVENT</dd></div><div><dt>STATUS</dt><dd>DESIGN BASELINE</dd></div></dl></div></section>

      <section id="payloads" className="payload-section"><div className="eyebrow">PAYLOAD MANIFEST</div><h2>Experiments built to return evidence.</h2><div className="cards">{payloads.map((payload) => <article key={payload.code}><div className="card-top"><span>{payload.code}</span><i>{payload.status}</i></div><div className="payload-icon"><img src={`${import.meta.env.BASE_URL}payload.svg`} alt=""/></div><h3>{payload.title}</h3><p>{payload.copy}</p><div className="metric"><strong>{payload.metric}</strong><small>{payload.label}</small></div></article>)}</div></section>

      <section className="flight-data"><div><div className="eyebrow">LIVE DEMONSTRATION · SIMULATED TELEMETRY</div><h2>Follow the flight profile.</h2><p>This baseline display gives the team a future home for real launch data, sensor plots, and recovered experiment results.</p></div><div className="plot" aria-label="Simulated altitude profile"><div className="plot-labels"><span>APOGEE</span><span>DEPLOY</span><span>RECOVERY</span></div><svg viewBox="0 0 800 260" role="img" aria-label="Illustrative rocket altitude curve"><path className="gridlines" d="M0 50H800M0 100H800M0 150H800M0 200H800M160 0V260M320 0V260M480 0V260M640 0V260"/><path className="curve" d="M0 235 C100 230 120 150 240 85 S390 18 450 28 S520 95 590 150 S700 215 800 230"/><circle cx="450" cy="28" r="6"/></svg><div className="plot-stats"><span><b>10,024</b> ft</span><span><b>0.94</b> Mach</span><span><b>16.2</b> s to apogee</span></div></div></section>

      <section className="process"><div className="eyebrow">ENGINEERING CADENCE</div><h2>Requirements to recovery.</h2><ol>{phases.map(([n, title, copy]) => <li key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>

      <section className="requirements"><div className="section-head"><div><div className="eyebrow">COMPETITION READINESS</div><h2>The work behind flight status.</h2></div><p>This operating model reflects the public IREC judging and readiness themes. Final compliance always follows the current ESRA rules, schedules, design guidance, and range procedures.</p></div><div className="requirement-grid">{deliverables.map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><a className="text-link" href="https://www.esrarocket.org/documents-and-forms/">VIEW OFFICIAL ESRA DOCUMENTS ↗</a></section>

      <section id="team" className="team-breakout"><div className="section-head"><div><div className="eyebrow">TEAM BREAKOUTS</div><h2>One mission. Ten accountable teams.</h2></div><p>Roles are organized around the technical evidence, safety discipline, flight operations, and communication a serious student launch campaign demands.</p></div><div className="team-cards">{teams.map((team) => <article key={team.code}><span>{team.code}</span><h3>{team.title}</h3><p>{team.copy}</p></article>)}</div><div className="team-callout"><div><b>NO ROCKET EXPERIENCE REQUIRED</b><p>Curiosity, follow-through, and a willingness to learn are the entry requirements. Students from engineering, science, technology, business, media, and design can contribute.</p></div><a className="primary" href="mailto:superNOVA@nvcc.edu?subject=Join%20the%20superNOVA%20Rocketry%20Team">JOIN superNOVA</a></div></section>

      <section id="outreach" className="outreach"><div className="outreach-copy"><div className="eyebrow">OUTREACH · EDUCATE · INSPIRE</div><h2>Launch curiosity before rockets.</h2><p>Student rocketry becomes more valuable when the learning travels. superNOVA can turn its design process into demonstrations, school visits, technical talks, mentoring, and hands-on STEM experiences for Northern Virginia.</p><ul><li>K–12 classroom and community demonstrations</li><li>Campus engineering showcases and recruitment</li><li>Build-season updates and technical explainers</li><li>Mentor, alumni, and industry knowledge exchange</li><li>Post-flight results shared with supporters</li></ul><a className="secondary" href="mailto:superNOVA@nvcc.edu?subject=superNOVA%20STEM%20Outreach">INVITE superNOVA</a></div><div className="impact-board"><div><strong>EDUCATE</strong><span>Make aerospace concepts visible and approachable.</span></div><div><strong>INSPIRE</strong><span>Show students a path from curiosity to engineering practice.</span></div><div><strong>CONNECT</strong><span>Build relationships across campus, community, and industry.</span></div><div><strong>GIVE BACK</strong><span>Return the team’s experience to the next generation.</span></div></div></section>

      <section id="support" className="support"><div className="support-heading"><div className="eyebrow">SUPPORT THE MISSION</div><h2>Put student engineering on the launch rail.</h2><p>Partners help transform design work into qualified hardware, safe operations, competition travel, and lasting access to aerospace education.</p></div><div className="support-grid"><article><span>01</span><h3>Materials & components</h3><p>Composites, metals, fasteners, electronics, sensors, recovery hardware, batteries, tooling, and consumables.</p></article><article><span>02</span><h3>Fabrication & test access</h3><p>Machining, additive manufacturing, environmental testing, instrumentation, ranges, and technical facilities.</p></article><article><span>03</span><h3>Mentorship</h3><p>Engineering reviews, high-power rocketry experience, manufacturing guidance, program management, and career insight.</p></article><article><span>04</span><h3>Program support</h3><p>Competition fees, transportation, lodging, shipping, outreach materials, team development, and direct mission funding.</p></article></div><div className="sponsor-cta"><div><span>PARTNER WITH superNOVA</span><h3>Every contribution should create a student learning outcome.</h3></div><div className="actions"><a className="primary" href="mailto:superNOVA@nvcc.edu?subject=Support%20the%20superNOVA%20IREC%20Mission">START A PARTNERSHIP</a><a className="secondary" href="https://www.linkedin.com/company/supernova-rocketry-club/">FOLLOW THE BUILD</a></div></div></section>

      <section id="faq" className="faq"><div className="eyebrow">MISSION QUESTIONS</div><h2>Before you join the launch campaign.</h2>{[["What is IREC?", "The International Rocket Engineering Competition brings collegiate teams together to design, build, document, present, and fly student-developed rockets and payloads under formal technical and safety review."], ["Who can join superNOVA?", "The program needs technical and nontechnical contributors. Students interested in engineering, science, software, operations, business, media, design, education, and leadership all have meaningful work to own."], ["Is the displayed vehicle final?", "No. Vehicle specifications and payload concepts shown here are a design baseline until the team publishes verified, approved mission data."], ["What can a payload demonstrate?", "Sensor systems, deployable mechanisms, imaging, communications, atmospheric science, materials, and other experiments that satisfy the current competition and safety requirements."], ["How can sponsors help?", "Materials, machining, electronics, test access, travel, mentorship, outreach support, and direct program funding all convert into student flight experience."], ["Where are the governing competition rules?", "ESRA publishes the current Rules & Requirements, Design Test & Evaluation Guide, schedules, templates, risk guidance, and range procedures on its official Documents and Forms page."]].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

      <section id="contact" className="contact"><div><div className="eyebrow">OPEN A CHANNEL · MANASSAS, VIRGINIA</div><h2>Help superNOVA reach apogee.</h2><p>Students, faculty, technical mentors, and sponsors can connect with the team as the competition campaign takes shape.</p></div><div className="actions"><a className="primary" href="mailto:superNOVA@nvcc.edu?subject=superNOVA%20IREC%20Inquiry">CONTACT THE TEAM</a><a className="secondary" href="https://www.linkedin.com/company/supernova-rocketry-club/">LINKEDIN</a><button className="secondary" onClick={copyPage}>{copied ? "LINK COPIED" : "COPY SITE LINK"}</button></div></section>
    </main>
    <footer><div className="footer-brand"><Mark small/><div><b>superNOVA</b><span>NVCC STUDENT ROCKETRY · PAYLOAD SCIENCE</span></div></div><div><a href="mailto:superNOVA@nvcc.edu">superNOVA@nvcc.edu</a><span>MANASSAS, VIRGINIA</span><a href="https://www.linkedin.com/company/supernova-rocketry-club/">LINKEDIN · superNOVA ROCKETRY CLUB</a></div><div className="footer-bottom"><span>ENGINEERED BY STUDENTS · {year}</span><span className="builder-credit"><i className="usa-flag" aria-label="United States flag"/> BUILT BY SANCHEZ &amp; SCHMITT</span><nav aria-label="Legal"><a href="privacy.html">PRIVACY</a><a href="terms.html">TERMS</a></nav></div></footer>
    {top && <button className="top-button" onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>RETURN TO PAD</button>}
    {intro && <Intro onComplete={finishIntro}/>} 
  </div>;
}
