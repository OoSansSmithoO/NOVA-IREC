import { useEffect, useRef, useState } from "react";

export default function PadMusic({ returnToPad }: { returnToPad: () => void }) {
  const sound = useRef<HTMLAudioElement | null>(null);
  const frame = useRef(0);
  const [playing, setPlaying] = useState(false);
  const stop = () => {
    cancelAnimationFrame(frame.current);
    const audio = sound.current;
    sound.current = null;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    setPlaying(false);
  };
  useEffect(() => () => {
    cancelAnimationFrame(frame.current);
    sound.current?.pause();
    sound.current = null;
  }, []);

  const play = () => {
    if (sound.current) { stop(); return; }
    const audio = new Audio(`${import.meta.env.BASE_URL}pad-rise.mp3`);
    audio.volume = 0;
    sound.current = audio;
    setPlaying(true);
    audio.onended = () => { if (sound.current === audio) stop(); };
    audio.onerror = () => { if (sound.current === audio) stop(); };
    void audio.play().catch(() => { if (sound.current === audio) stop(); });
    returnToPad();
    const started = performance.now();
    let fadeStarted: number | null = null;
    let fadeVolume = 0;
    const tick = (now: number) => {
      if (sound.current !== audio) return;
      if (fadeStarted === null && (scrollY <= 4 || now - started > 7000 || document.hidden)) {
        fadeStarted = now;
        fadeVolume = audio.volume;
      }
      if (fadeStarted !== null) {
        const remaining = Math.max(0, 1 - (now - fadeStarted) / 700);
        audio.volume = fadeVolume * remaining;
        if (!remaining) { stop(); return; }
      } else audio.volume = Math.min(.3, .3 * (now - started) / 500);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };
  return <button className="pad-music" type="button" onClick={play} aria-label={playing ? "Stop return sound" : "Return to pad with rising horn sound"} aria-pressed={playing}>{playing ? "♫ STOP" : "♫ SOUND RIDE"}</button>;
}
