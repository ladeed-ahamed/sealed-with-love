interface WeddingRingsLogoProps {
  className?: string;
}

export function WeddingRingsLogo({ className = "w-12 h-12 text-gold" }: WeddingRingsLogoProps) {
  return (
    <svg
      viewBox="0 0 64 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Two Interlocking Wedding Rings Logo"
    >
      {/* Left Ring Body */}
      <circle cx="23" cy="25" r="13" stroke="currentColor" strokeWidth="3" />
      {/* Left Ring Gem/Sparkle */}
      <path d="M23 6 M23 5 L26 9.5 L23 14 L20 9.5 Z" fill="currentColor" />

      {/* Right Ring Body */}
      <circle cx="41" cy="25" r="13" stroke="currentColor" strokeWidth="3" />
      {/* Right Ring Gem/Sparkle */}
      <path d="M41 6 M41 5 L44 9.5 L41 14 L38 9.5 Z" fill="currentColor" />

      {/* Interlocking Overlap Arc */}
      <path
        d="M31.5 15.5 A13 13 0 0 1 35 34.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
