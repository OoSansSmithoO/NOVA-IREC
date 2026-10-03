# superNOVA IREC

Public engineering, outreach, and sponsorship baseline for the Northern Virginia Community College **superNOVA** collegiate sounding-rocket team in Manassas, Virginia.

The site presents a notional 2026 IREC campaign, vehicle architecture, payload concepts, student-team structure, mission milestones, and partnership planner. Values marked simulated, conceptual, proposed, baseline, or notional are demonstration content until replaced by approved team data.

## Live site and local development

- Live site: <https://oosanssmithoo.github.io/NOVA-IREC/>
- Local site: <http://localhost:8090/>
- Team contact: <jschmitt@schmittsanchezdefense.com>
- LinkedIn: <https://www.linkedin.com/company/supernova-rocketry-club/>

```bash
npm ci
npm run dev
```

The development server binds to `0.0.0.0:8090`. Use `npm run verify` before every release.

## Governing competition documents

This README is an internal working checklist, **not a replacement for competition rules or flight-safety direction**. Requirements must be traced to the current official issue of each applicable document.

Review these sources at the start of the campaign, at every formal review, and immediately before submission or launch:

1. [ESRA Documents, Forms and Branding](https://www.esrarocket.org/documents-and-forms/)
2. Current IREC Rules & Requirements
3. Current IREC Integrated Master Schedule
4. Current IREC Design, Test & Evaluation Guide (DTEG)
5. Current IREC Range Standard Operating Procedures
6. Current frequency/band plan and radio requirements
7. Current payload challenge rules, when entering a payload challenge
8. Current progress-report, technical-report, presentation, roster, waiver, and participation-letter templates
9. Current shipping, hazardous-material, drone, media, and launch-site policies

ESRA describes these as living documents. Record the filename, revision, effective date, download date, owner, and resulting project changes in the requirements baseline.

## Engineering review baseline

### 1. Mission and requirements

- [ ] Define mission objective, success criteria, competition category, target apogee, payload objective, and recovery concept.
- [ ] Convert governing rules into uniquely identified, verifiable requirements.
- [ ] Record source document, paragraph, revision, rationale, verification method, owner, and status for every requirement.
- [ ] Identify assumptions, constraints, waivers, interpretations, and unresolved questions.
- [ ] Maintain a compliance matrix linking requirements to design evidence, tests, and reports.
- [ ] Define the concept of operations from transport and assembly through post-flight closeout.
- [ ] Establish mass, center-of-gravity, stability, power, data, radio, thermal, schedule, and cost budgets.

### 2. Systems engineering and configuration control

- [ ] Maintain the system architecture and subsystem interface-control documents.
- [ ] Assign ownership for airframe, propulsion, avionics, recovery, payload, ground systems, safety, operations, documentation, and outreach.
- [ ] Baseline drawings, bills of material, software versions, wiring, procedures, and analysis inputs.
- [ ] Use revision control and an engineering-change process for flight-affecting changes.
- [ ] Record review actions with an owner, due date, closure evidence, and approving authority.
- [ ] Preserve as-built and as-flown configurations independently from design-intent records.

### 3. Safety, reliability, and risk

- [ ] Create a mission-phase hazard analysis and risk matrix.
- [ ] Document failure modes, causes, effects, likelihood, severity, detection, mitigation, and residual risk.
- [ ] Address energetics, propulsion, batteries, pressure vessels, sharp edges, lifting, RF, heat, chemicals, transportation, weather, and recovery hazards as applicable.
- [ ] Define inhibits, arming controls, safe-state behavior, separation controls, and positive verification steps.
- [ ] Establish stop-work authority, emergency response, incident reporting, and medical/fire contacts.
- [ ] Conduct independent safety reviews and close all launch-critical findings.
- [ ] Never present a simulated or unverified value as flight-approved evidence.

### 4. Airframe and aerodynamics

- [ ] Verify geometry, material properties, load paths, joints, couplers, fasteners, fins, rail guides, and retention systems.
- [ ] Analyze stability over the expected flight envelope with conservative mass properties and atmospheric conditions.
- [ ] Evaluate structural margins for thrust, acceleration, aerodynamic loading, landing, handling, and recovery events.
- [ ] Control manufacturing tolerances, workmanship criteria, inspection points, and nonconformance disposition.
- [ ] Confirm final mass, center of gravity, center of pressure, and external dimensions on the flight article.

### 5. Propulsion

- [ ] Confirm motor/category eligibility and authoritative performance data.
- [ ] Verify motor retention, thrust transfer, thermal isolation, ignition interfaces, and prohibited operations.
- [ ] Define trained personnel, storage, transport, handling, inspection, installation, arming, and misfire procedures.
- [ ] Reconcile simulation inputs with the exact intended or installed propulsion configuration.
- [ ] Record motor identifiers and the as-flown installation without exposing restricted or sensitive information publicly.

### 6. Avionics, electrical power, and software

- [ ] Document power architecture, capacity, expected load, margin, protection, connectors, grounding, and isolation.
- [ ] Maintain schematics, harness drawings, pin assignments, firmware/software revisions, and calibration records.
- [ ] Verify flight-state logic, sensor plausibility, event detection, data logging, watchdogs, reset behavior, and safe failure modes.
- [ ] Bench-test nominal, off-nominal, brownout, disconnect, noise, and power-cycle behavior.
- [ ] Confirm independent or redundant functions where required by rules or hazard analysis.
- [ ] Protect credentials and secrets; do not place tokens, private keys, passwords, or privileged endpoints in frontend code or public artifacts.

### 7. Telemetry, tracking, and radio

- [ ] Confirm applicable frequency authorization, band-plan compliance, operator responsibilities, and event restrictions.
- [ ] Define antenna placement, link budget, expected range, packet/data format, ground station, and loss-of-link behavior.
- [ ] Verify tracking independence and recovery-location capability.
- [ ] Rehearse channel coordination and interference response.
- [ ] Label simulated website telemetry clearly until replaced with reviewed flight data.

### 8. Recovery

- [ ] Define recovery architecture, deployment sequence, descent-rate targets, and landing-energy limits.
- [ ] Verify parachute sizing, attachment strength, harness routing, protection, packing, retention, and deployment volume.
- [ ] Test deployment mechanisms and energetic circuits with representative geometry and environmental conditions.
- [ ] Document continuity checks, inhibits, arming order, personnel positions, and recovery-team procedures.
- [ ] Inspect and record the complete as-packed flight configuration.

### 9. Payload and experiment evidence

- [ ] State the scientific or engineering question, hypothesis, measurable outputs, and success criteria.
- [ ] Define payload mass, envelope, center of gravity, power, data, thermal, RF, structural, and access interfaces.
- [ ] Calibrate sensors and record traceability, range, resolution, uncertainty, and sampling rate.
- [ ] Verify containment, retention, deployment, independent arming, data storage, and recovery behavior.
- [ ] Establish data-quality checks, time synchronization, metadata, backup, analysis, and publication controls.
- [ ] Confirm payload safety and competition eligibility before integration.

### 10. Modeling and simulation

- [ ] Record software/tool version, inputs, atmosphere, winds, launch conditions, motor data, mass model, and uncertainty assumptions.
- [ ] Run nominal and dispersed cases for apogee, velocity, acceleration, stability, drift, and descent.
- [ ] Compare predictions with component tests, ground tests, prior flights, and post-flight data when available.
- [ ] Keep website performance values labeled conceptual until approved against the controlled analysis.

### 11. Verification and test

- [ ] Maintain a verification matrix identifying analysis, inspection, demonstration, or test for each requirement.
- [ ] Use approved procedures with prerequisites, instrumentation, acceptance criteria, safety controls, data sheets, and signatures.
- [ ] Test components before subsystems and subsystems before integrated vehicle tests.
- [ ] Include electrical, deployment, fit, functional, communications, vibration/handling, environmental, and end-to-end rehearsals as applicable.
- [ ] Record anomalies, root cause, corrective action, regression testing, and closure evidence.
- [ ] Preserve raw data and configuration metadata; do not retain only plots or screenshots.

### 12. Flight and range operations

- [ ] Prepare assembly, inspection, arming, pad, launch, recovery, misfire, abort, and post-flight checklists.
- [ ] Define command roles, communications, go/no-go criteria, hold points, weather limits, and accountability.
- [ ] Rehearse the complete operation with flight-like hardware and staffing.
- [ ] Complete required range inspections, flight-safety review, flight card, and approval process.
- [ ] Follow range authority direction; team documentation never supersedes range control.
- [ ] Record launch conditions, configuration, event timeline, recovery location, damage, anomalies, and post-flight disposition.

### 13. Technical reviews and deliverables

- [ ] System Requirements Review: mission, rules, requirements, interfaces, risks, budgets, and plan.
- [ ] Preliminary Design Review: credible architecture, trades, analyses, prototypes, and risk-reduction plan.
- [ ] Critical Design Review: complete design, margins, drawings, verification plan, procedures, and procurement readiness.
- [ ] Test Readiness Review: controlled article, procedure, instrumentation, hazards, acceptance criteria, and staffing.
- [ ] Flight Readiness Review: closed launch-critical actions, verified as-built configuration, trained team, and approved operations package.
- [ ] Post-Flight Review: actual timeline, recovered evidence, anomalies, lessons learned, and requirement closure.
- [ ] Submit official progress reports, technical report, extended abstract, presentation, forms, and waivers using the current templates and schedule.

### 14. Team, institution, and program administration

- [ ] Maintain approved roster, student eligibility, faculty/advisor involvement, participation letter, waivers, and training records.
- [ ] Track schedule, budget, purchasing, sponsorship restrictions, travel, lodging, shipping, and inventory.
- [ ] Define safeguarding and conduct expectations for outreach involving minors.
- [ ] Secure approval for public claims, sponsor marks, imagery, competition branding, and technical disclosures.
- [ ] Maintain succession material so the next team inherits requirements, evidence, tooling, and lessons learned.

## Public website and release requirements

### Content approval

- [ ] Replace demonstration values with approved information or retain explicit notional/simulated labels.
- [ ] Confirm public permission for every photograph, video, logo, sponsor mark, name, and quoted statement.
- [ ] Review claims for accuracy, security, export-control sensitivity, contractual restrictions, and student privacy.
- [ ] Keep contact addresses, sponsor tiers, legal pages, dates, and team statistics current.

### Security and privacy

- [ ] Store no credentials or secrets in source, build artifacts, Git history, analytics configuration, or client-side code.
- [ ] Collect the minimum form/analytics data required and document retention and use.
- [ ] Validate and sanitize any future server-side form inputs and apply rate limiting/spam protection.
- [ ] Keep dependencies reviewed and patched; commit lockfile changes intentionally.
- [ ] Serve the public site over HTTPS and avoid mixed content.

### Accessibility and quality

- [ ] Maintain semantic landmarks, heading order, keyboard navigation, visible focus, skip link, descriptive alternatives, and form labels.
- [ ] Meet readable contrast targets in day and night modes.
- [ ] Respect `prefers-reduced-motion` and avoid animation-dependent meaning.
- [ ] Test desktop, tablet, and mobile layouts plus current major browsers.
- [ ] Compress images/video, reserve media dimensions, and monitor page weight and loading performance.
- [ ] Verify canonical URL, metadata, social preview, favicon, sitemap, robots file, manifest, privacy page, terms page, and custom 404 page.
- [ ] Check internal/external links and mail links before release.

## Repository structure

## Site navigation and contact

The home page introduces the team and links directly to sponsorship. Dedicated views use GitHub Pages compatible query URLs: `?page=flight`, `?page=vehicle`, `?page=payloads`, `?page=engineering`, and `?page=support`. Each URL can be bookmarked or refreshed without server rewrite rules.

The support planner opens an accessible contact dialog with the selected financial or in-kind proposal prefilled. Name, email, subject, and message are required; organization and phone are optional. Submitting prepares a draft in the visitor's email application. There is no website mail service or automatic submission, and drafts are held in memory only while the panel is open.

Rocket Runner is an optional canvas game at the bottom. Use tap, Space, or Up Arrow to thrust. Pause/resume is available, and the game pauses when the browser tab becomes hidden.

Regional activities are listed for Great Meadow in The Plains, Virginia. This is distinct from the IREC venue in Texas; team attendance and local event dates require separate confirmation.

## Source layout

```text
public/                  Static media, legal pages, SEO files, and 404 page
scripts/                 Release/link verification utilities
src/App.tsx              Site content and interactive behavior
src/styles.css           Responsive design, animation, and print styles
.github/workflows/       GitHub Pages deployment
vite.config.ts           Vite and repository base-path configuration
```

## Verification and release procedure

```bash
npm ci
npm run verify
git status --short
```

`npm run verify` performs linting, TypeScript checks, a production build, and local-link validation. Before publishing:

1. Review the working-tree diff.
2. Confirm all public assets and claims are approved.
3. Confirm the repository base path, canonical URL, sitemap, and 404 return URL.
4. Commit with a descriptive message.
5. Push `main` to GitHub.
6. Confirm the GitHub Pages workflow succeeds.
7. Inspect the deployed site, social preview, navigation, legal pages, and 404 behavior.

## Current demonstration notices

- Vehicle dimensions, apogee, timing, and telemetry shown on the site are a design baseline or simulation.
- Payload hardware and performance values are conceptual until the team publishes verified data.
- Sponsorship packages are conversation starters; the site does not collect payment or create a pledge.
- Final flight eligibility and operations are controlled by current ESRA/IREC documents and the authorized range officials.

## License and public use

No general-purpose software, media, trademark, or content license is granted by this README. Contact the team before reusing team identity, photographs, video, engineering content, or sponsor material.
