import { useState } from "react";
import { motion } from "framer-motion";
import logoImg from "../assets/logo.png";

type Props = { className?: string };

const quadrants = [
  { id: "creation", text: "CREATION", hint: "Books & Videos", x: 60, y: 70 },
  { id: "build", text: "BUILD", hint: "Projects & Ideas", x: 390, y: 70 },
  { id: "chess", text: "CHESS", hint: "Aiming for IM", x: 60, y: 470 },
  { id: "tech", text: "TECH", hint: "Minecraft & Systems", x: 390, y: 470 },
];

const dots = [
  { x: 120, y: 220, delay: 0 },
  { x: 460, y: 220, delay: 0.4 },
  { x: 160, y: 380, delay: 0.8 },
  { x: 430, y: 370, delay: 1.2 },
  { x: 290, y: 130, delay: 0.6 },
  { x: 290, y: 460, delay: 1.0 },
];

export default function InterestsDiagram({ className = "" }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={`relative select-none ${className}`}>
      {/* Subtle radial background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/10 blur-3xl" />

      <svg
        viewBox="0 0 600 600"
        className="w-full h-auto drop-shadow-sm transition-all duration-300"
      >
        <defs>
          <clipPath id="center-logo-clip">
            <rect x={238} y={238} width={124} height={124} rx={24} />
          </clipPath>
        </defs>

        {/* outer dashed boundary */}
        <rect
          x={10}
          y={10}
          width={580}
          height={580}
          rx={36}
          fill="none"
          stroke="#f0ebe3"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.2"
        />

        {/* concentric radar rings */}
        <motion.circle
          cx={300}
          cy={300}
          r={240}
          fill="none"
          stroke="#f0ebe3"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          opacity="0.25"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ originX: "300px", originY: "300px" }}
        />
        <circle
          cx={300}
          cy={300}
          r={170}
          fill="none"
          stroke="#f0ebe3"
          strokeWidth="1.2"
          opacity="0.22"
        />
        <circle
          cx={300}
          cy={300}
          r={100}
          fill="none"
          stroke="#f0ebe3"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          opacity="0.3"
        />

        {/* crosshair center axes */}
        <line x1={300} y1={20} x2={300} y2={580} stroke="#f0ebe3" strokeWidth="1.5" opacity="0.25" />
        <line x1={20} y1={300} x2={580} y2={300} stroke="#f0ebe3" strokeWidth="1.5" opacity="0.25" />

        {/* diagonal axes */}
        <line x1={20} y1={20} x2={580} y2={580} stroke="#f0ebe3" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.18" />
        <line x1={20} y1={580} x2={580} y2={20} stroke="#f0ebe3" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.18" />

        {/* animated scattered accent squares */}
        {dots.map((d) => (
          <motion.rect
            key={`${d.x}-${d.y}`}
            x={d.x}
            y={d.y}
            width={14}
            height={14}
            fill="#C6A15B"
            stroke="#130f0c"
            strokeWidth="1.5"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: d.delay,
              ease: "easeInOut",
            }}
            style={{ originX: `${d.x + 7}px`, originY: `${d.y + 7}px` }}
          />
        ))}

        {/* center piece — LG Logo badge with gold accent border (still & fixed) */}
        <g>
          {/* Background card */}
          <rect
            x={238}
            y={238}
            width={124}
            height={124}
            rx={24}
            fill="#130f0c"
            stroke="#C6A15B"
            strokeWidth="2.5"
            style={{ filter: "drop-shadow(0 8px 24px rgba(198, 161, 91, 0.28))" }}
          />
          {/* Custom LG Logo Image */}
          <image
            href={logoImg}
            x={244}
            y={244}
            width={112}
            height={112}
            clipPath="url(#center-logo-clip)"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* interactive quadrant badges */}
        {quadrants.map((l) => {
          const isHovered = hovered === l.id;
          return (
            <g
              key={l.id}
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer transition-all duration-200"
            >
              <rect
                x={l.x}
                y={l.y}
                width={150}
                height={52}
                rx={12}
                fill={isHovered ? "#C6A15B" : "#18130f"}
                stroke={isHovered ? "#C6A15B" : "#332820"}
                strokeWidth={isHovered ? "2.5" : "1.5"}
                className="transition-all duration-200"
                style={{
                  filter: isHovered
                    ? "drop-shadow(0 6px 16px rgba(198,161,91,0.4))"
                    : "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
                }}
              />
              <text
                x={l.x + 75}
                y={l.y + (isHovered ? 28 : 33)}
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                letterSpacing="1.5"
                fill={isHovered ? "#000000" : "#f0ebe3"}
                fontFamily="'Space Grotesk', 'Inter', sans-serif"
                className="transition-all duration-200"
              >
                {l.text}
              </text>
              {isHovered && (
                <text
                  x={l.x + 75}
                  y={l.y + 44}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="#000000"
                  letterSpacing="0.5"
                  fontFamily="'Inter', sans-serif"
                >
                  {l.hint}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
