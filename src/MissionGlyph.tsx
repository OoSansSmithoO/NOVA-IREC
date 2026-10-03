import { useState } from "react";

const drawings: Record<string, [string, string]> = {
  SYS: ["M16 18h22v18H16zM60 18h22v18H60zM38 62h24v18H38zM27 36v14h44V36M50 50v12", "M20 27h14m30 0h14M43 71h14"],
  SAF: ["M50 12 78 24v26c0 18-16 29-28 37-12-8-28-19-28-37V24Z", "m34 49 11 11 23-28"],
  AER: ["M50 12c-12 14-17 27-17 45v17h34V57c0-18-5-31-17-45ZM33 55 18 78l15-7m34-16 15 23-15-7", "M50 23v49M28 42h44M27 83h46"],
  PRO: ["M34 18h32v40H34zM38 58l-9 12h42l-9-12", "M40 72q-10 12 3 17M50 72v19m10-19q10 12-3 17"],
  AVN: ["M28 28h44v44H28zM20 35h8m-8 15h8m-8 15h8m44-30h8m-8 15h8m-8 15h8M35 20v8m15-8v8m15-8v8m-30 44v8m15-8v8m15-8v8", "M38 38h24v24H38zM44 50h12"],
  RCV: ["M15 42a35 35 0 0 1 70 0ZM15 42l35 36 35-36M32 42l18 36 18-36M43 78h14v11H43z", "M32 42q0-35 18-35t18 35"],
  PAY: ["M25 31h50v50H25zM35 17h30v14M35 81v8m30-8v8", "M36 56h28m-14-14v28M40 46l20 20m0-20L40 66"],
  OPS: ["M20 24h60v49H20zM29 82h42M50 73v9", "M29 61h42M30 53l12-19 12 10 15-13"],
  COM: ["M27 14h35l13 13v60H27zM62 14v14h13", "M37 42h28m-28 12h28m-28 12h19M38 29h13"],
  DEV: ["M18 25h28v20H18zM56 25h28v20H56zM27 65h46v19H27zM32 45v10h38V45M50 55v10", "M24 32h16m22 0h16M35 73h30"],
  EDUCATE: ["M12 26q20-8 38 4 18-12 38-4v49q-20-8-38 4-18-12-38-4Z", "M50 30v49M23 40l17 4m-17 9 17 4m20-13 17-4m-17 17 17-4"],
  INSPIRE: ["M50 10a27 27 0 0 1 18 47l-6 10H38l-6-10A27 27 0 0 1 50 10ZM39 74h22m-20 7h18", "M50 21v25m-9-9 9 9 9-9M12 30H4m92 0h-8M18 65l-6 6m70-6 6 6"],
  CONNECT: ["M32 38H22a13 13 0 0 0 0 26h19a13 13 0 0 0 12-18m15 18h10a13 13 0 0 0 0-26H59a13 13 0 0 0-12 18", "M35 51h30"],
  GIVE: ["M19 38h62v16H19zM25 54h50v32H25zM50 38v48", "M50 38C20 36 23 10 38 21l12 17c30-2 27-28 12-17Z"],
  MATERIAL: ["M16 40 50 20l34 20-34 20ZM16 40v28l34 20 34-20V40M50 60v28", "M24 51l19 11m14 0 19-11"],
  FAB: ["M15 77h70M24 18h22v38H24zM46 29h33v12H46M65 41v19", "M59 61h12M33 57v20m26-7 6-9 6 9"],
  MENTOR: ["M35 19a12 12 0 1 1 0 24 12 12 0 0 1 0-24ZM15 74V61c0-18 40-18 40 0v13", "M73 33a9 9 0 1 1 0 18 9 9 0 0 1 0-18ZM61 74V63q12-12 24 0v11"],
  PROGRAM: ["M17 32h66v52H17zM34 32V20h32v12M17 48h66", "M39 61h22m-11-9v22"],
};

export default function MissionGlyph({ kind, label }: { kind: string; label: string }) {
  const [pulse, setPulse] = useState(0);
  const paths = drawings[kind] || drawings.SYS;
  return <button type="button" className={`mission-glyph glyph-${kind.toLowerCase()}`} aria-label={`Animate ${label} illustration`} onClick={() => setPulse((value) => value + 1)}><svg key={pulse} className={pulse ? "glyph-fired" : ""} viewBox="0 0 100 100" aria-hidden="true"><path className="glyph-frame" d={paths[0]}/><path className="glyph-action" d={paths[1]}/></svg><span aria-hidden="true">{kind}</span></button>;
}
