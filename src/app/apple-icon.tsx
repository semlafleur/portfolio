import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Full-bleed square: iOS applies its own rounded mask to home-screen icons.
const AppleIcon = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5eead4",
          color: "#0a0a0a",
          fontSize: 84,
          letterSpacing: -4,
        }}
      >
        SL
      </div>
    ),
    { ...size }
  );

export default AppleIcon;
