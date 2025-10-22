import { _ as __vitePreload } from "./CQrtv1eE.js";
import { r as registerLocaleLoader, $ as $locale, i as init } from "./HJ-2R3CP.js";
import { ae as writable } from "./BXHzHFYX.js";
const BROWSER = true;
const browser = BROWSER;
registerLocaleLoader("en", () => __vitePreload(() => import("./kLYzNfKh.js"), true ? [] : void 0, import.meta.url));
registerLocaleLoader("de", () => __vitePreload(() => import("./BVjGjt8l.js"), true ? [] : void 0, import.meta.url));
registerLocaleLoader("tr", () => __vitePreload(() => import("./D4MC3YxD.js"), true ? [] : void 0, import.meta.url));
const isLandingPage = writable(false);
function initI18n() {
  try {
    init({
      fallbackLocale: "en",
      initialLocale: browser ? getInitialLocale() : "en"
    });
  } catch (error) {
    console.error("Failed to initialize i18n:", error);
    {
      $locale.set("en");
    }
  }
}
function getInitialLocale() {
  const isLanding = window.location.pathname === "/";
  isLandingPage.set(isLanding);
  if (isLanding) {
    return "en";
  }
  const savedLocale = localStorage.getItem("language");
  if (savedLocale) {
    return ["en", "de", "tr"].includes(savedLocale) ? savedLocale : "en";
  }
  const browserLocale = navigator.language.split("-")[0];
  return ["en", "de", "tr"].includes(browserLocale) ? browserLocale : "en";
}
function setLocale(newLocale) {
  {
    const isLanding = window.location.pathname === "/";
    isLandingPage.set(isLanding);
    if (isLanding) {
      return;
    }
    try {
      localStorage.setItem("language", newLocale);
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  }
  $locale.set(newLocale);
}
export {
  initI18n as a,
  browser as b,
  isLandingPage as i,
  setLocale as s
};
//# sourceMappingURL=DIcdBaaF.js.map
