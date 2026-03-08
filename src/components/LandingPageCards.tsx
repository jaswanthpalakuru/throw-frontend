import type { Props } from "../utils/types";

function LandingPageCards({ data }: Props) {
  return (
    <>
      {data.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#16161D",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 24,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Icon + Title on one line */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: card.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {card.icon}
            </div>
            <div
              style={{
                fontFamily: "var(--font-head)",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: -0.3,
              }}
            >
              {card.title}
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 13,
              color: "rgba(244,244,248,0.55)",
              lineHeight: 1.55,
            }}
          >
            {card.desc}
          </div>
        </div>
      ))}
    </>
  );
}

export default LandingPageCards;
