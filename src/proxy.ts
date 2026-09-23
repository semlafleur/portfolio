import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next.js 16 renamed Middleware to Proxy; next-intl's request handler is
// compatible. It adds locale-prefix routing plus browser-locale detection and
// a locale cookie on first visit.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, the extensionless generated apple-icon
  // (it would otherwise be redirected to /en/apple-icon and 404), and anything
  // with a file extension.
  matcher: ["/((?!api|_next|_vercel|apple-icon|.*\\..*).*)"],
};
