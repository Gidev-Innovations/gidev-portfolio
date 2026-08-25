import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { getLenis } from "./lib/lenis";

// Smooth scrolling is browser-only, so it is started here in the client entry
// rather than at module scope where pre-rendering would execute it.
getLenis();

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
