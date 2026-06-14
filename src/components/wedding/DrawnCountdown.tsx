import { Countdown } from "./Countdown";

export function DrawnCountdown({ targetDateIso }: { targetDateIso: string }) {
  return <Countdown iso={targetDateIso} />;
}
