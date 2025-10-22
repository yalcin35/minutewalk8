import { a as initI18n } from "../chunks/DIcdBaaF.js";
import { t as template, a as append } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { p as push, o as onMount, ad as onDestroy, l as legacy_pre_effect, a as legacy_pre_effect_reset, b as pop, d as set, m as mutable_source, g as get, P as get$1, c as child, r as reset, f as first_child, s as sibling, t as template_effect } from "../chunks/BXHzHFYX.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { s as slot, c as set_class } from "../chunks/CQ5zajJZ.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import { p as page, S as Sidebar } from "../chunks/nSvjLpae.js";
import { u as user, i as isLoading } from "../chunks/Bnago9pU.js";
const load = async () => {
  {
    initI18n();
  }
  return {};
};
const _layout$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  load
}, Symbol.toStringTag, { value: "Module" }));
var root_1 = template(`<div class="flex items-center justify-center h-screen"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>`);
var root_3 = template(`<!> <div><main class="flex-1"><!></main></div>`, 1);
var root_4 = template(`<main class="flex-1"><!></main>`);
var root = template(`<div class="min-h-screen flex flex-col"><!></div>`);
function _layout($$anchor, $$props) {
  push($$props, false);
  const isPublicRoute = mutable_source();
  const publicRoutes = [
    "/",
    "/signin",
    "/pricing",
    "/privacy",
    "/contact"
  ];
  let isSidebarOpen = mutable_source(true);
  let currentPath = mutable_source("");
  let unsubscribeUser;
  let initialized = mutable_source(false);
  onMount(() => {
    try {
      const savedState = localStorage.getItem("sidebarOpen");
      set(isSidebarOpen, savedState ? JSON.parse(savedState) : true);
    } catch (e) {
      console.error("LocalStorage error:", e);
    }
    unsubscribeUser = user.subscribe(($user) => {
      var _a;
      if (!get(initialized) || get$1(isLoading)) return;
      try {
        const $pageValue = get$1(page);
        const path = (((_a = $pageValue == null ? void 0 : $pageValue.url) == null ? void 0 : _a.pathname) || "/").split("?")[0];
        const isPublicRoute2 = publicRoutes.includes(path);
        if (!$user && !isPublicRoute2) {
          goto("/signin");
        } else if ($user && path === "/signin") {
          goto("/dashboard");
        }
      } catch (error) {
        console.error("Auth state change error:", error);
      }
    });
    setTimeout(() => set(initialized, true), 100);
  });
  onDestroy(() => {
    if (unsubscribeUser) unsubscribeUser();
  });
  legacy_pre_effect(() => get(isSidebarOpen), () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebarOpen", JSON.stringify(get(isSidebarOpen)));
      }
    } catch (e) {
      console.error("LocalStorage error:", e);
    }
  });
  legacy_pre_effect(() => page, () => {
    var _a, _b;
    try {
      set(currentPath, (((_b = (_a = get$1(page)) == null ? void 0 : _a.url) == null ? void 0 : _b.pathname) || "").split("?")[0]);
    } catch (e) {
      set(currentPath, "");
      console.error("Page store error:", e);
    }
  });
  legacy_pre_effect(() => get(currentPath), () => {
    set(isPublicRoute, publicRoutes.includes(get(currentPath)));
  });
  legacy_pre_effect_reset();
  init();
  var div = root();
  var node = child(div);
  {
    var consequent = ($$anchor2) => {
      var div_1 = root_1();
      append($$anchor2, div_1);
    };
    var alternate = ($$anchor2, $$elseif) => {
      {
        var consequent_1 = ($$anchor3) => {
          var fragment = root_3();
          var node_1 = first_child(fragment);
          Sidebar(node_1, {
            get isOpen() {
              return get(isSidebarOpen);
            },
            set isOpen($$value) {
              set(isSidebarOpen, $$value);
            },
            $$legacy: true
          });
          var div_2 = sibling(node_1, 2);
          var main = child(div_2);
          var node_2 = child(main);
          slot(node_2, $$props, "default", {});
          reset(main);
          reset(div_2);
          template_effect(() => set_class(div_2, 1, `transition-all duration-300 ${get(isSidebarOpen) ? "ml-64" : "ml-20"}`));
          append($$anchor3, fragment);
        };
        var alternate_1 = ($$anchor3) => {
          var main_1 = root_4();
          var node_3 = child(main_1);
          slot(node_3, $$props, "default", {});
          reset(main_1);
          append($$anchor3, main_1);
        };
        if_block(
          $$anchor2,
          ($$render) => {
            if (get$1(user) && !get(isPublicRoute)) $$render(consequent_1);
            else $$render(alternate_1, false);
          },
          $$elseif
        );
      }
    };
    if_block(node, ($$render) => {
      if (!get(initialized) || get$1(isLoading)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(div);
  append($$anchor, div);
  pop();
}
export {
  _layout as component,
  _layout$1 as universal
};
//# sourceMappingURL=0.BzF1ZWsF.js.map
