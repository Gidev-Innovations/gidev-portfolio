import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

// Lenis is started by ScrollToTop's effect, after hydration: it adds a class
// to <html>, which would otherwise mismatch the pre-rendered markup.
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
