
export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      className="rounded-full border-2 border-transparent animate-spin"
      style={{
        width: size,
        height: size,
        borderTopColor: "currentColor",
        animationDuration: "0.8s",
      }}
    />
  );
}

export function Dots({ size = 7 }: { size?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="rounded-full bg-current"
          style={{
            width: size,
            height: size,
            display: "block",
            animation: "dots-bounce 1s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes dots-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(-${size}px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}


export function DualRing({ size = 36 }: { size?: number }) {
  const inner = size * 0.6;
  const offset = (size - inner) / 2;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
        style={{ borderTopColor: "currentColor", animationDuration: "0.9s" }}
      />
      <div
        className="absolute rounded-full border-2 border-transparent animate-spin"
        style={{
          top: offset,
          left: offset,
          width: inner,
          height: inner,
          borderBottomColor: "currentColor",
          opacity: 0.5,
          animationDuration: "0.65s",
          animationDirection: "reverse",
        }}
      />
    </div>
  );
}

export default function LoaderShowcase() {
  const items = [
    { label: "spinner", node: <Spinner /> },
    { label: "dots", node: <Dots /> },
    { label: "dual ring", node: <DualRing /> },
  ];

  return (
    <div className="flex flex-wrap gap-10 p-8">
      {items.map(({ label, node }) => (
        <div key={label} className="flex flex-col items-center gap-3">
          <div className="text-foreground">{node}</div>
          <span className="text-xs text-muted-foreground tracking-widest">{label}</span>
        </div>
      ))}
    </div>
  );
}