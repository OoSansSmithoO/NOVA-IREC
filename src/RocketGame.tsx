import { useEffect, useRef, useState } from "react";

export default function RocketGame() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const flight = useRef({ y: 160, velocity: 0, gates: [{ x: 640, gap: 160, passed: false }], score: 0 });
  const [mode, setMode] = useState<"ready" | "flying" | "ended" | "paused">("ready");
  const [score, setScore] = useState(0);
  const thrust = () => { if (mode === "ready" || mode === "ended") { flight.current = { y: 160, velocity: -130, gates: [{ x: 640, gap: 160, passed: false }], score: 0 }; setScore(0); setMode("flying"); } else if (mode === "flying") flight.current.velocity = -190; };
  useEffect(() => {
    const context = canvas.current?.getContext("2d"); if (!context) return;
    const nighthawk = new Image();
    nighthawk.src = `${import.meta.env.BASE_URL}nova-nighthawks.png`;
    let frame = 0; let previous = 0;
    const draw = (now: number) => {
      const dt = Math.min((now - (previous || now)) / 1000, .035); previous = now;
      const state = flight.current;
      if (mode === "flying") {
        state.velocity += 470 * dt; state.y += state.velocity * dt;
        state.gates.forEach((gate) => { gate.x -= 150 * dt; if (!gate.passed && gate.x + 46 < 80) { gate.passed = true; state.score++; setScore(state.score); } if (gate.x < 120 && gate.x + 46 > 80 && (state.y - 20 < gate.gap - 67 || state.y + 20 > gate.gap + 67)) setMode("ended"); });
        if (state.gates[state.gates.length - 1].x < 410) state.gates.push({ x: 640, gap: 95 + Math.random() * 130, passed: false });
        state.gates = state.gates.filter((gate) => gate.x > -60);
        if (state.y < 20 || state.y > 300) setMode("ended");
      }
      context.fillStyle = "#06150f"; context.fillRect(0, 0, 640, 320);
      context.strokeStyle = "#244738"; for (let x = 0; x < 640; x += 40) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, 320); context.stroke(); }
      state.gates.forEach((gate) => { context.fillStyle = "#315b49"; context.fillRect(gate.x, 0, 46, gate.gap - 67); context.fillRect(gate.x, gate.gap + 67, 46, 320); context.strokeStyle = "#f0b323"; context.strokeRect(gate.x, 0, 46, gate.gap - 67); context.strokeRect(gate.x, gate.gap + 67, 46, 320); });
      context.save(); context.translate(100, Math.max(20, Math.min(300, state.y)));
      context.shadowColor = "#ffd166"; context.shadowBlur = 9;
      if (nighthawk.complete && nighthawk.naturalWidth) context.drawImage(nighthawk, -20, -20, 40, 40);
      else { context.fillStyle = "#ffd166"; context.fillRect(-20, -20, 40, 40); context.shadowBlur = 0; context.fillStyle = "#06150f"; context.font = "bold 12px monospace"; context.fillText("NOVA", -15, 4); }
      context.restore();
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    const visibility = () => { if (document.hidden && mode === "flying") setMode("paused"); };
    document.addEventListener("visibilitychange", visibility);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("visibilitychange", visibility); };
  }, [mode]);
  return <section className="rocket-arcade"><div className="eyebrow">FLIGHT BREAK · ROCKET RUNNER</div><h2>Thread the launch corridor.</h2><p id="game-instructions">This optional visual reflex game is not required to access any site content. Tap or press Space / ↑ to thrust. Clear the gates and stay inside the flight window.</p><div className="game-controls"><b role="status">SCORE {score}</b><span aria-live="polite">{mode === "ended" ? "Flight ended — try again." : mode === "paused" ? "Flight paused." : mode === "ready" ? "Ready on the pad." : "Flight in progress."}</span>{mode === "flying" || mode === "paused" ? <button className="secondary" onClick={() => setMode(mode === "paused" ? "flying" : "paused")}>{mode === "paused" ? "RESUME" : "PAUSE"}</button> : <button className="primary" onClick={thrust}>{mode === "ended" ? "FLY AGAIN" : "START FLIGHT"}</button>}</div><canvas ref={canvas} width={640} height={320} tabIndex={0} role="img" aria-describedby="game-instructions" aria-label="NOVA Nighthawk flying through the Rocket Runner gates. Space or up arrow to thrust; Escape to pause." onPointerDown={thrust} onKeyDown={(event) => { if (event.code === "Escape") { event.preventDefault(); setMode("paused"); } if (event.code === "Space" || event.code === "ArrowUp") { event.preventDefault(); if (!event.repeat) thrust(); } }}>Rocket flight game requires canvas support.</canvas></section>;
}
