import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteName } from "@/data/portfolio-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TEAL = "#5eead4";
const [firstName, ...lastName] = siteName.split(" ");

// A fixed constellation kept to the edges, so a centred square crop (WhatsApp,
// iMessage thumbnails) still shows the logo and name cleanly.
const NODES: [number, number][] = [
  [70, 90], [190, 40], [240, 170], [120, 260], [60, 420], [200, 380],
  [150, 560], [300, 520], [960, 70], [1080, 150], [1150, 60], [990, 250],
  [1130, 330], [1040, 450], [1160, 540], [930, 560], [890, 400],
];
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [2, 3], [3, 5], [4, 5], [4, 6], [5, 7], [6, 7],
  [8, 9], [9, 10], [9, 11], [11, 12], [12, 13], [13, 14], [13, 15], [15, 16],
  [11, 16],
];

const Image = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {EDGES.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
              stroke={TEAL}
              strokeOpacity={0.35}
              strokeWidth={1.5}
            />
          ))}
          {NODES.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill={TEAL} fillOpacity={0.8} />
          ))}
        </svg>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: TEAL,
            color: "#0a0a0a",
            fontSize: 38,
            letterSpacing: -2,
          }}
        >
          SL
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 28,
            fontSize: 104,
            lineHeight: 0.95,
            letterSpacing: -5,
          }}
        >
          <span>{firstName}</span>
          <span style={{ color: "#a1a1aa" }}>{lastName.join(" ")}</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: TEAL,
          }}
        >
          {t("role")}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 34,
            fontSize: 22,
            color: "#71717a",
          }}
        >
          slafleur.dev
        </div>
      </div>
    ),
    { ...size }
  );
};

export default Image;
