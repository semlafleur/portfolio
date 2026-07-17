import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteName } from "@/data/portfolio-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#5eead4",
            color: "#0a0a0a",
            fontSize: 30,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          SL
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>
          {siteName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#a1a1aa",
            marginTop: 20,
          }}
        >
          {t("role")}
        </div>
      </div>
    ),
    { ...size }
  );
};

export default Image;
