import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next.js 16 renamed Middleware to Proxy; next-intl's request handler is
// compatible. It adds locale-prefix routing plus browser-locale detection and
// a locale cookie on first visit.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything with a file extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
