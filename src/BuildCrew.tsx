import { useState } from "react";

const carriers = [
  { role: "Airframe Lead", task: "ASSEMBLE THE AIRFRAME", color: "#ffd166", kind: "airframe" },
  { role: "Test Lead", task: "CHECK THE TEST BENCH", color: "#8cdbc2", kind: "test" },
  { role: "Systems Lead", task: "CONNECT THE SYSTEMS", color: "#8bbcff", kind: "systems" },
  { role: "Program Lead", task: "STAGE THE FLIGHT CARGO", color: "#ffad82", kind: "program" },
];

function Carrier({ role, task, color, kind }: typeof carriers[number]) {
  const [replay, setReplay] = useState(0);
  return <button type="button" className={`crew-task task-${kind}`} style={{ color }} aria-label={`Replay ${role}: walking and ${task.toLowerCase()}`} onClick={() => setReplay((value) => value + 1)}>
    <span className="carrier-label">{role}</span>
    <svg key={replay} className="crew-scene" viewBox="0 0 180 112" aria-hidden="true">
      <path className="crew-floor" d="M5 101h170"/>
      <g className="crew-worker"><g className="crew-skeleton">
        <g className="bone-arm arm-far" transform="translate(35 51)"><g className="bone-shoulder"><path d="M0 0v13"/><g transform="translate(0 13)"><g className="bone-elbow"><path d="M0 0v12"/><circle cx="0" cy="13" r="2"/></g></g></g></g>
        <g className="crew-torso"><circle cx="36" cy="36" r="8"/><path d="M26 32q10-12 20 0M33 44v5M30 49h12l3 23H27ZM28 72h16"/></g>
        <g className="bone-leg leg-far" transform="translate(34 72)"><g className="bone-hip"><path d="M0 0v14"/><g transform="translate(0 14)"><g className="bone-knee"><path d="M0 0v13"/><g transform="translate(0 13)"><g className="bone-ankle"><path d="M-2 1h8"/></g></g></g></g></g></g>
        <g className="bone-leg leg-near" transform="translate(38 72)"><g className="bone-hip"><path d="M0 0v14"/><g transform="translate(0 14)"><g className="bone-knee"><path d="M0 0v13"/><g transform="translate(0 13)"><g className="bone-ankle"><path d="M-2 1h8"/></g></g></g></g></g></g>
        <g className="bone-arm arm-near" transform="translate(39 51)"><g className="bone-shoulder"><path d="M0 0v13"/><g transform="translate(0 13)"><g className="bone-elbow"><path d="M0 0v12"/><circle cx="0" cy="13" r="2"/></g></g></g></g>
      </g></g>
      {kind === "airframe" && <g><path d="M105 96V30l13-15 13 15v66M105 74l-9 20h44l-9-20"/><path className="crew-airframe-panel" d="M108 42h20v24h-20Z"/><path className="crew-tool" d="m88 63 13-9m-15 5 6 8"/></g>}
      {kind === "test" && <g><path d="M88 79h73M96 79v22m57-22v22"/><rect x="100" y="37" width="45" height="33" rx="4"/><path className="crew-test-trace" d="M106 54h7l4-9 5 18 5-12h12"/><circle className="crew-test-led" cx="149" cy="75" r="3"/><path className="crew-tool" d="M88 65h14m-7-5v10"/></g>}
      {kind === "systems" && <g><rect x="97" y="32" width="49" height="58" rx="4"/><path d="M104 42h35m-35 16h35m-35 16h35M111 90v11m23-11v11"/><path className="crew-system-cable" d="M81 62h12v-12h17m-17 12v20h28"/><circle className="crew-system-led" cx="134" cy="50" r="3"/><path className="crew-tool" d="M79 57v10"/></g>}
      {kind === "program" && <g><path d="M89 94h68m-6-30v30M103 94v-9"/><circle cx="101" cy="99" r="5"/><circle cx="146" cy="99" r="5"/><g className="crew-cargo-box"><rect x="105" y="61" width="35" height="27" rx="2"/><path d="M122 61v27m-17-15h35"/></g><path className="crew-tool" d="M86 49h15v21H86zm4 6h7m-7 6h7"/></g>}
    </svg><small>{task}</small>
  </button>;
}

export default function BuildCrew() {
  return <div className="build-crew" role="group" aria-label="Student crew leadership roles and mission tasks"><div className="crew-caption">STUDENT BUILD CREW · SELECT A ROLE TO REPLAY ITS TASK</div><div className="crew-lanes">{carriers.map((carrier) => <div className={`crew-lane crew-${carrier.kind}`} key={carrier.role}><Carrier {...carrier}/></div>)}</div></div>;
}
