/**
 * Analytics events. Sends to whichever provider is loaded (GA4 gtag or
 * Plausible); a no-op when none is, so callers never need to check.
 *
 * TODO(human): no analytics script is installed yet. Add GA4 or Plausible in
 * root.tsx and these events start flowing without further code changes.
 */
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Props) => void;
    plausible?: (name: string, options?: { props?: Props }) => void;
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, props);
  window.plausible?.(event, { props });
}
