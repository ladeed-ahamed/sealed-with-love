export function CornerOrnament({
  className = "",
  flipX = false,
  flipY = false,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const transform = `${flipX ? "scaleX(-1) " : ""}${flipY ? "scaleY(-1)" : ""}`;
  return (
    <svg viewBox="0 0 120 120" className={className} style={{ transform }} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M5 5 C 45 10, 70 35, 75 75" />
        <path d="M5 5 C 25 25, 45 35, 65 45" opacity="0.6" />
        <circle cx="78" cy="78" r="3" fill="currentColor" />
        <path d="M60 30 q 8 -10 20 -6 q -4 12 -14 14 q -10 -2 -6 -8 z" />
        <path d="M40 60 q -10 4 -10 16 q 12 0 16 -10 q -2 -8 -6 -6 z" opacity="0.85" />
        <path d="M70 55 q 10 2 14 10 q -10 4 -16 -2 q -2 -6 2 -8 z" opacity="0.7" />
        <path d="M25 25 l 0 10 M20 30 l 10 0" opacity="0.5" />
      </g>
    </svg>
  );
}
