type Props = { className?: string };

const labels = [
  { text: "CREATION", x: 430, y: 100 },
  { text: "CODING", x: 20, y: 100 },
  { text: "CHESS", x: 20, y: 460 },
  { text: "TECH", x: 430, y: 460 },
];

const dots = [
  { x: 120, y: 200 },
  { x: 452, y: 250 },
  { x: 300, y: 90 },
  { x: 90, y: 400 },
  { x: 452, y: 430 },
  { x: 210, y: 470 },
];

// extended grid — tighter spacing, reaching every edge
const grid = Array.from({ length: 15 }, (_, i) => i * 40);

export default function InterestsDiagram({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 600 600" className={`h-auto w-full ${className}`} aria-hidden="true">
      {/* extended background grid */}
      {grid.map((g) => (
        <line key={`v${g}`} x1={g} y1={0} x2={g} y2={600} stroke="#ece8e0" strokeWidth="1" />
      ))}
      {grid.map((g) => (
        <line key={`h${g}`} x1={0} y1={g} x2={600} y2={g} stroke="#ece8e0" strokeWidth="1" />
      ))}

      {/* extended concentric rings */}
      {[150, 240, 330].map((r) => (
        <circle
          key={r}
          cx={300}
          cy={300}
          r={r}
          fill="none"
          stroke="#d8cdb8"
          strokeWidth="1.5"
        />
      ))}
      {[195, 285].map((r) => (
        <circle
          key={r}
          cx={300}
          cy={300}
          r={r}
          fill="none"
          stroke="#e8e0d0"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      ))}

      {/* diagonal axes — corner to corner */}
      <line x1={20} y1={20} x2={580} y2={580} stroke="#d8cdb8" strokeWidth="1.5" />
      <line x1={20} y1={580} x2={580} y2={20} stroke="#d8cdb8" strokeWidth="1.5" />

      {/* scattered accent squares */}
      {dots.map((d) => (
        <rect
          key={`${d.x}-${d.y}`}
          x={d.x}
          y={d.y}
          width={14}
          height={14}
          fill="#9ae634"
          stroke="#141414"
          strokeWidth="1.5"
        />
      ))}

      {/* center piece — chess knight */}
      <rect
        x={238}
        y={238}
        width={124}
        height={124}
        rx={16}
        fill="#9ae634"
        stroke="#141414"
        strokeWidth="3"
      />
      <text
        x={300}
        y={332}
        textAnchor="middle"
        fontSize="74"
        fill="#141414"
        fontFamily="Georgia, serif"
      >
        ♞
      </text>

      {/* quadrant labels */}
      {labels.map((l) => (
        <g key={l.text}>
          <rect
            x={l.x}
            y={l.y}
            width={150}
            height={52}
            rx={7}
            fill="#ffffff"
            stroke="#141414"
            strokeWidth="2"
          />
          <text
            x={l.x + 75}
            y={l.y + 34}
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            letterSpacing="2"
            fill="#6d4a2f"
            fontFamily="'Space Grotesk', 'Inter', sans-serif"
          >
            {l.text}
          </text>
        </g>
      ))}
    </svg>
  );
}
