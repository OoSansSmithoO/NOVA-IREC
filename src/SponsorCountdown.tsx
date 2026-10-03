import { useEffect, useState } from "react";

export default function SponsorCountdown() {
  const [seconds, setSeconds] = useState(5);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    if (dismissed) return;
    let frame = 0;
    let stopped = false;
    const cancel = () => { stopped = true; clearTimeout(timer); clearInterval(tick); cancelAnimationFrame(frame); setDismissed(true); };
    const tick = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    const timer = window.setTimeout(() => {
      clearInterval(tick);
      setSeconds(0);
      const planner = document.querySelector<HTMLElement>(".sponsor-planner");
      if (!planner) { cancel(); return; }
      const start = scrollY;
      const target = Math.max(0, Math.min(start + planner.getBoundingClientRect().top - 95, document.documentElement.scrollHeight - innerHeight));
      // Do not pull visitors upward if they already reached the planner.
      if (target <= start + 4) { cancel(); return; }
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { scrollTo({ top: target, behavior: "instant" }); cancel(); return; }
      const began = performance.now();
      const advance = (now: number) => {
        if (stopped) return;
        const progress = Math.min(1, (now - began) / 2200);
        const eased = progress * progress * (3 - 2 * progress);
        scrollTo({ top: start + (target - start) * eased, behavior: "instant" });
        if (progress < 1) frame = requestAnimationFrame(advance);
        else cancel();
      };
      frame = requestAnimationFrame(advance);
    }, 5000);
    const key = (event: KeyboardEvent) => { if (["Tab", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Escape"].includes(event.key)) cancel(); };
    addEventListener("wheel", cancel, { passive: true });
    addEventListener("touchstart", cancel, { passive: true });
    addEventListener("pointerdown", cancel);
    addEventListener("keydown", key);
    return () => { stopped = true; clearTimeout(timer); clearInterval(tick); cancelAnimationFrame(frame); removeEventListener("wheel", cancel); removeEventListener("touchstart", cancel); removeEventListener("pointerdown", cancel); removeEventListener("keydown", key); };
  }, [dismissed]);
  if (dismissed) return null;
  return <aside className="sponsor-countdown" aria-label="Donation planner navigation countdown"><div><p role="status">{seconds ? "Donation planner opens in 5 seconds. Interact with the page to stay here." : "Moving gently to the donation planner."}</p><span aria-hidden="true">{seconds ? `${seconds} SECONDS` : "APPROACHING PLANNER"}</span></div><button type="button" onClick={() => setDismissed(true)}>STAY HERE</button><div className="countdown-track" aria-hidden="true"><i/></div></aside>;
}
