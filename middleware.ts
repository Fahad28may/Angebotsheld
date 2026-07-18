import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // 'unsafe-eval' is only needed by webpack's dev-mode Fast Refresh runtime
  // (eval-based module wrapping); it is never included in production builds.
  const devEval = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

  // Plausible (cookie-free analytics, see components/Analytics.tsx) is only
  // allowlisted when it's actually configured, so the CSP stays maximally
  // strict when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is unset.
  const plausibleEnabled = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
  const plausibleScript = plausibleEnabled ? " https://plausible.io" : "";
  const plausibleConnect = plausibleEnabled ? " https://plausible.io" : "";

  const csp = [
    "default-src 'self'",
    // 'wasm-unsafe-eval' is required by @react-pdf/renderer's WASM-based font
    // engine (WebAssembly.instantiate) — it permits WASM compilation only,
    // not arbitrary JS eval().
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'wasm-unsafe-eval'${devEval}${plausibleScript}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    // 'data:' here allows @react-pdf/renderer to fetch its own embedded
    // WASM binary (shipped as a data: URI in its bundle) — not third-party.
    `connect-src 'self' data:${plausibleConnect}`,
    "frame-src 'self' blob:",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
