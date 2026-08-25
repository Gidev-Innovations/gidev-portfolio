import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../lib/lenis";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
