import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";

type Limiter = { limit(options: { key: string }): Promise<{ success: boolean }> };

/**
 * Whether this visitor may submit `form` right now — 5 per minute per IP per
 * form, set in wrangler.jsonc (FORM_LIMITER). Fails open: if the binding is
 * missing (local dev) or the limiter errors, the message still goes through.
 * Losing a real lead is worse than letting one extra message past.
 */
export async function formAllowed(form: string): Promise<boolean> {
  try {
    const limiter = (getCloudflareContext().env as unknown as { FORM_LIMITER?: Limiter }).FORM_LIMITER;
    if (!limiter) return true;
    const ip = (await headers()).get("cf-connecting-ip") ?? "unknown";
    const { success } = await limiter.limit({ key: `${form}:${ip}` });
    return success;
  } catch {
    return true;
  }
}
