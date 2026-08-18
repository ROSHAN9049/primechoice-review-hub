import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;
const GOOGLE_VERIFICATION_TAG = '<meta name="google-site-verification" content="wm4AeiXbmH4mS1J17pPHJES1n7vmmF0Csq0hY-mKUqE" />';

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function ensureGoogleVerificationMeta(response: Response): Promise<Response> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const html = await response.text();
  if (html.includes('name="google-site-verification"')) return new Response(html, response);

  const headMarker = /<head(?:\s[^>]*)?>/i;
  if (!headMarker.test(html)) return new Response(html, response);

  const updatedHtml = html.replace(headMarker, (head) => `${head}\n    ${GOOGLE_VERIFICATION_TAG}`);
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(updatedHtml, { status: response.status, statusText: response.statusText, headers });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return await ensureGoogleVerificationMeta(normalized);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
