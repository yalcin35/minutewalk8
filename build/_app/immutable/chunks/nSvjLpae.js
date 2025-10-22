import { c as comment, a as append, t as template } from "./DkiQ5dRj.js";
import { i as init } from "./CgZxdHNJ.js";
import { f as first_child, p as push, o as onMount, t as template_effect, b as pop, c as child, d as set, m as mutable_source, r as reset, s as sibling, g as get, h as derived_safe_equal } from "./BXHzHFYX.js";
import { e as event, s as set_text } from "./D8_nd-i4.js";
import { i as if_block } from "./CqHl9XhN.js";
import { I as Icon, s as slot, e as each, c as set_class, i as index, d as set_attribute } from "./CQ5zajJZ.js";
import { c as component } from "./Yy-EATei.js";
import { t as transition, a as fade } from "./B1ns0h2F.js";
import { l as legacy_rest_props, s as spread_props, p as prop, a as setup_stores, b as store_get } from "./CnKbWtpd.js";
import { s as stores, g as goto } from "./CKn-8tHH.js";
import { a as $format } from "./HJ-2R3CP.js";
import { s as supabase, c as clearSupabaseAuth } from "./Bnago9pU.js";
import { L as Log_out, S as Settings } from "./lkfbQ4RA.js";
import { C as Clipboard_check } from "./BC922t_S.js";
import { P as Plus, H as History } from "./Cur7I4rm.js";
import { O as Orbit } from "./00S9Fma8.js";
const getStores = () => {
  const stores$1 = stores;
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Chevrons_left($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    ["path", { "d": "m11 17-5-5 5-5" }],
    ["path", { "d": "m18 17-5-5 5-5" }]
  ];
  Icon($$anchor, spread_props({ name: "chevrons-left" }, () => $$sanitized_props, {
    iconNode,
    children: ($$anchor2, $$slotProps) => {
      var fragment_1 = comment();
      var node = first_child(fragment_1);
      slot(node, $$props, "default", {});
      append($$anchor2, fragment_1);
    },
    $$slots: { default: true }
  }));
}
function Chevrons_right($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    ["path", { "d": "m6 17 5-5-5-5" }],
    ["path", { "d": "m13 17 5-5-5-5" }]
  ];
  Icon($$anchor, spread_props({ name: "chevrons-right" }, () => $$sanitized_props, {
    iconNode,
    children: ($$anchor2, $$slotProps) => {
      var fragment_1 = comment();
      var node = first_child(fragment_1);
      slot(node, $$props, "default", {});
      append($$anchor2, fragment_1);
    },
    $$slots: { default: true }
  }));
}
function Layout_dashboard($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    [
      "rect",
      {
        "width": "7",
        "height": "9",
        "x": "3",
        "y": "3",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "width": "7",
        "height": "5",
        "x": "14",
        "y": "3",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "width": "7",
        "height": "9",
        "x": "14",
        "y": "12",
        "rx": "1"
      }
    ],
    [
      "rect",
      {
        "width": "7",
        "height": "5",
        "x": "3",
        "y": "16",
        "rx": "1"
      }
    ]
  ];
  Icon($$anchor, spread_props({ name: "layout-dashboard" }, () => $$sanitized_props, {
    iconNode,
    children: ($$anchor2, $$slotProps) => {
      var fragment_1 = comment();
      var node = first_child(fragment_1);
      slot(node, $$props, "default", {});
      append($$anchor2, fragment_1);
    },
    $$slots: { default: true }
  }));
}
var root_1 = template(`<img alt="Company logo" class="w-full h-full object-cover">`);
var root_3 = template(`<h1 class="text-xl font-bold text-gray-900">MinuteWalk</h1>`);
var root_6 = template(`<div class="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1"><div class="w-2 h-2 rounded-full bg-red-500" title="Critical"></div> <div class="w-2 h-2 rounded-full bg-yellow-500" title="Needs Attention"></div> <div class="w-2 h-2 rounded-full bg-green-500" title="Good"></div></div>`);
var root_5 = template(`<span> </span> <!>`, 1);
var root_4 = template(`<li class="relative"><a><!> <!></a></li>`);
var root_7 = template(`<span> </span>`);
var root_8 = template(`<div class="lg:hidden fixed inset-0 bg-black/20 z-30"></div>`);
var root = template(
  `<div><button class="absolute -right-3 top-20 w-6 h-12 bg-white rounded-r-lg shadow-md
           flex items-center justify-center"><!></button> <div class="px-6 py-8 flex items-center space-x-3"><div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 overflow-hidden"><!></div> <!></div> <nav class="px-4 py-4"><ul class="space-y-2"></ul></nav> <div class="absolute bottom-8 left-0 right-0 px-4"><button><!> <!></button></div></div> <!>`,
  1
);
function Sidebar($$anchor, $$props) {
  push($$props, false);
  const [$$stores, $$cleanup] = setup_stores();
  const $page = () => store_get(page, "$page", $$stores);
  const $_ = () => store_get($format, "$_", $$stores);
  let isOpen = prop($$props, "isOpen", 12, true);
  let companyLogo = mutable_source(null);
  const menuItems = [
    {
      href: "/dashboard",
      labelKey: "nav.dashboard",
      icon: Layout_dashboard
    },
    {
      href: "/audit/setup",
      labelKey: "nav.newWalk",
      icon: Clipboard_check
    },
    {
      href: "/checkin",
      labelKey: "nav.sqcdpe",
      icon: Plus
    },
    {
      href: "/history",
      labelKey: "nav.viewHistory",
      icon: History
    },
    {
      href: "/settings",
      labelKey: "nav.settings",
      icon: Settings
    }
  ];
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }
    clearSupabaseAuth();
    goto("/signin");
  }
  function toggleSidebar() {
    isOpen(!isOpen());
  }
  function isActive(href) {
    return $page().url.pathname === href || $page().url.pathname.startsWith(href) && href !== "/";
  }
  onMount(async () => {
    var _a, _b;
    try {
      const { data: profile } = await supabase.from("profiles").select("companies (logo_url)").eq("id", (_a = (await supabase.auth.getUser()).data.user) == null ? void 0 : _a.id).single();
      if ((_b = profile == null ? void 0 : profile.companies) == null ? void 0 : _b.logo_url) {
        set(companyLogo, profile.companies.logo_url);
      }
    } catch (error) {
      console.error("Error loading company logo:", error);
    }
  });
  init();
  var fragment = root();
  var div = first_child(fragment);
  var button = child(div);
  var node = child(button);
  component(node, () => isOpen() ? Chevrons_left : Chevrons_right, ($$anchor2, $$component) => {
    $$component($$anchor2, { class: "w-4 h-4 text-gray-500" });
  });
  reset(button);
  var div_1 = sibling(button, 2);
  var div_2 = child(div_1);
  var node_1 = child(div_2);
  {
    var consequent = ($$anchor2) => {
      var img = root_1();
      template_effect(() => set_attribute(img, "src", get(companyLogo)));
      append($$anchor2, img);
    };
    var alternate = ($$anchor2) => {
      Orbit($$anchor2, { class: "w-6 h-6" });
    };
    if_block(node_1, ($$render) => {
      if (get(companyLogo)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(div_2);
  var node_2 = sibling(div_2, 2);
  {
    var consequent_1 = ($$anchor2) => {
      var h1 = root_3();
      append($$anchor2, h1);
    };
    if_block(node_2, ($$render) => {
      if (isOpen()) $$render(consequent_1);
    });
  }
  reset(div_1);
  var nav = sibling(div_1, 2);
  var ul = child(nav);
  each(ul, 5, () => menuItems, index, ($$anchor2, item) => {
    var li = root_4();
    var a = child(li);
    var node_3 = child(a);
    component(node_3, () => get(item).icon, ($$anchor3, $$component) => {
      $$component($$anchor3, { class: "w-5 h-5" });
    });
    var node_4 = sibling(node_3, 2);
    {
      var consequent_3 = ($$anchor3) => {
        var fragment_2 = root_5();
        var span = first_child(fragment_2);
        var text = child(span, true);
        reset(span);
        var node_5 = sibling(span, 2);
        {
          var consequent_2 = ($$anchor4) => {
            var div_3 = root_6();
            append($$anchor4, div_3);
          };
          if_block(node_5, ($$render) => {
            if (get(item).labelKey === "nav.sqcdpe") $$render(consequent_2);
          });
        }
        template_effect(($0) => set_text(text, $0), [() => $_()(get(item).labelKey)], derived_safe_equal);
        append($$anchor3, fragment_2);
      };
      if_block(node_4, ($$render) => {
        if (isOpen()) $$render(consequent_3);
      });
    }
    reset(a);
    reset(li);
    template_effect(
      ($0) => {
        set_attribute(a, "href", get(item).href);
        set_class(a, 1, $0);
      },
      [
        () => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors
                   ${isActive(get(item).href) ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`
      ],
      derived_safe_equal
    );
    append($$anchor2, li);
  });
  reset(ul);
  reset(nav);
  var div_4 = sibling(nav, 2);
  var button_1 = child(div_4);
  set_class(button_1, 1, `w-full flex items-center space-x-3 px-4 py-3 rounded-xl
             text-red-600 hover:bg-red-50 transition-colors`);
  var node_6 = child(button_1);
  Log_out(node_6, { class: "w-5 h-5" });
  var node_7 = sibling(node_6, 2);
  {
    var consequent_4 = ($$anchor2) => {
      var span_1 = root_7();
      var text_1 = child(span_1, true);
      reset(span_1);
      template_effect(($0) => set_text(text_1, $0), [() => $_()("common.logout")], derived_safe_equal);
      append($$anchor2, span_1);
    };
    if_block(node_7, ($$render) => {
      if (isOpen()) $$render(consequent_4);
    });
  }
  reset(button_1);
  reset(div_4);
  reset(div);
  var node_8 = sibling(div, 2);
  {
    var consequent_5 = ($$anchor2) => {
      var div_5 = root_8();
      event("click", div_5, toggleSidebar);
      transition(3, div_5, () => fade, () => ({ duration: 200 }));
      append($$anchor2, div_5);
    };
    if_block(node_8, ($$render) => {
      if (isOpen()) $$render(consequent_5);
    });
  }
  template_effect(() => set_class(div, 1, `h-screen fixed top-0 left-0 bg-white shadow-xl transition-all duration-300 z-40
           ${isOpen() ? "w-64" : "w-20"}`));
  event("click", button, toggleSidebar);
  event("click", button_1, handleLogout);
  append($$anchor, fragment);
  pop();
  $$cleanup();
}
export {
  Sidebar as S,
  page as p
};
//# sourceMappingURL=nSvjLpae.js.map
