import { c as comment, a as append, t as template, b as text } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { f as first_child, p as push, o as onMount, t as template_effect, b as pop, c as child, s as sibling, h as derived_safe_equal, d as set, m as mutable_source, r as reset, n as next, g as get } from "../chunks/BXHzHFYX.js";
import { e as event, s as set_text } from "../chunks/D8_nd-i4.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { I as Icon, s as slot, r as remove_input_defaults, d as set_attribute } from "../chunks/CQ5zajJZ.js";
import { t as transition, f as fly, a as fade } from "../chunks/B1ns0h2F.js";
import { b as bind_value, c as bind_checked } from "../chunks/7QZrl-aJ.js";
import { p as preventDefault } from "../chunks/CGgk3ROl.js";
import { l as legacy_rest_props, s as spread_props, a as setup_stores, b as store_get } from "../chunks/CnKbWtpd.js";
import { c as clearSupabaseAuth, s as supabase } from "../chunks/Bnago9pU.js";
import { a as $format } from "../chunks/HJ-2R3CP.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import { A as Arrow_left } from "../chunks/CLBcVVt3.js";
import { O as Orbit } from "../chunks/00S9Fma8.js";
import { M as Mail } from "../chunks/DjeQ6hMt.js";
import { L as Lock, C as Circle_alert } from "../chunks/Cwcd99ig.js";
function Loader($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "2",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "18",
        "y2": "22"
      }
    ],
    [
      "line",
      {
        "x1": "4.93",
        "x2": "7.76",
        "y1": "4.93",
        "y2": "7.76"
      }
    ],
    [
      "line",
      {
        "x1": "16.24",
        "x2": "19.07",
        "y1": "16.24",
        "y2": "19.07"
      }
    ],
    [
      "line",
      {
        "x1": "2",
        "x2": "6",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "18",
        "x2": "22",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4.93",
        "x2": "7.76",
        "y1": "19.07",
        "y2": "16.24"
      }
    ],
    [
      "line",
      {
        "x1": "16.24",
        "x2": "19.07",
        "y1": "7.76",
        "y2": "4.93"
      }
    ]
  ];
  Icon($$anchor, spread_props({ name: "loader" }, () => $$sanitized_props, {
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
var root_2 = template(`<div class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"><!> <span> </span></div>`);
var root_3 = template(`<div class="bg-green-50 text-green-600 p-4 rounded-lg"><p> </p></div>`);
var root_4 = template(`<span class="flex items-center justify-center space-x-2"><!> <span>Installing...</span></span>`);
var root_1 = template(`<div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1" for="resetEmail"> </label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><!></div> <input id="resetEmail" type="email" class="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required></div></div> <!> <!> <div class="flex flex-col space-y-4"><button class="w-full py-3 px-4 bg-blue-500 text-white rounded-xl
                     hover:bg-blue-600 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"><!></button> <button class="text-gray-600 hover:text-gray-900 transition-colors text-sm"> </button></div></div>`);
var root_7 = template(`<div class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"><!> <span> </span></div>`);
var root_8 = template(`<span class="flex items-center justify-center space-x-2"><!> <span>Signing in...</span></span>`);
var root_6 = template(
  `<form class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-1" for="company"> </label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><!></div> <input id="company" type="text" class="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required></div></div> <div><label class="block text-sm font-medium text-gray-700 mb-1" for="email"> </label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><!></div> <input id="email" type="email" class="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required></div></div> <div><label class="block text-sm font-medium text-gray-700 mb-1" for="password"> </label> <div class="relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><!></div> <input id="password" type="password" class="block w-full pl-10 px-4 py-3 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required></div></div> <!> <div class="flex items-center"><input id="rememberMe" type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded"> <label for="rememberMe" class="ml-2 text-sm text-gray-700"> </label></div> <button type="submit" class="w-full py-3 px-4 bg-blue-500 text-white rounded-xl
                   hover:bg-blue-600 focus:outline-none focus:ring-2
                   focus:ring-blue-500 focus:ring-offset-2 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"><!></button></form> <!>`,
  1
);
var root = template(`<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6"><button class="fixed top-6 left-6 flex items-center space-x-2 px-4 py-2 text-gray-600 
           hover:text-gray-900 transition-colors"><!> <span> </span></button> <div class="w-full max-w-md"><div class="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 space-y-6"><div class="flex items-center justify-center space-x-3 mb-8"><div class="brand-logo"><!></div> <span class="text-2xl font-medium text-gray-900">MinuteWalk</span></div> <div class="text-center"><h1 class="text-2xl font-light text-gray-900"> </h1> <p class="text-gray-500 mt-2"> </p></div> <!></div></div></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const [$$stores, $$cleanup] = setup_stores();
  const $_ = () => store_get($format, "$_", $$stores);
  let email = mutable_source("");
  let password = mutable_source("");
  let companyName = mutable_source("");
  let loading = mutable_source(false);
  let error = mutable_source(null);
  let rememberMe = mutable_source(false);
  let showResetForm = mutable_source(false);
  let resetEmail = mutable_source("");
  let resetLoading = mutable_source(false);
  let resetSuccess = mutable_source(false);
  let resetError = mutable_source(null);
  onMount(() => {
    clearSupabaseAuth();
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      set(email, storedEmail);
      set(rememberMe, true);
    }
  });
  async function handleSignIn() {
    if (!get(email) || !get(password) || !get(companyName)) {
      set(error, "Please fill in all fields");
      return;
    }
    set(loading, true);
    set(error, null);
    try {
      const { data: companies, error: companyError } = await supabase.from("companies").select("id, name").ilike("name", get(companyName).trim()).maybeSingle();
      if (companyError) {
        console.error("Company lookup error:", companyError);
        throw new Error("Failed to verify company");
      }
      if (!companies) {
        set(error, "Company not found. Please check the company name and try again.");
        set(loading, false);
        return;
      }
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: get(email).trim(),
        password: get(password)
      });
      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          set(error, "Invalid email or password");
        } else {
          set(error, "Failed to sign in. Please try again.");
        }
        return;
      }
      if (data == null ? void 0 : data.user) {
        const { error: profileError } = await supabase.from("profiles").update({ company_id: companies.id }).eq("id", data.user.id).is("company_id", null);
        if (profileError) {
          console.error("Failed to update company association:", profileError);
        }
        if (get(rememberMe)) {
          localStorage.setItem("email", get(email));
        } else {
          localStorage.removeItem("email");
        }
        goto("/dashboard");
      }
    } catch (e) {
      console.error("Sign in error:", e);
      set(error, e instanceof Error ? e.message : "An unexpected error occurred");
    } finally {
      set(loading, false);
    }
  }
  async function handleResetPassword() {
    if (!get(resetEmail)) {
      set(resetError, "Please enter your email address");
      return;
    }
    set(resetLoading, true);
    set(resetError, null);
    try {
      const { error: error2 } = await supabase.auth.resetPasswordForEmail(get(resetEmail), {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error2) throw error2;
      set(resetSuccess, true);
    } catch (e) {
      console.error("Password reset error:", e);
      set(resetError, e instanceof Error ? e.message : "Failed to send reset email");
    } finally {
      set(resetLoading, false);
    }
  }
  init();
  var div = root();
  var button = child(div);
  var node = child(button);
  Arrow_left(node, { class: "w-5 h-5" });
  var span = sibling(node, 2);
  var text$1 = child(span, true);
  reset(span);
  reset(button);
  var div_1 = sibling(button, 2);
  var div_2 = child(div_1);
  var div_3 = child(div_2);
  var div_4 = child(div_3);
  var node_1 = child(div_4);
  Orbit(node_1, { class: "w-6 h-6" });
  reset(div_4);
  next(2);
  reset(div_3);
  var div_5 = sibling(div_3, 2);
  var h1 = child(div_5);
  var text_1 = child(h1, true);
  reset(h1);
  var p = sibling(h1, 2);
  var text_2 = child(p, true);
  reset(p);
  reset(div_5);
  var node_2 = sibling(div_5, 2);
  {
    var consequent_3 = ($$anchor2) => {
      var div_6 = root_1();
      var div_7 = child(div_6);
      var label = child(div_7);
      var text_3 = child(label, true);
      reset(label);
      var div_8 = sibling(label, 2);
      var div_9 = child(div_8);
      var node_3 = child(div_9);
      Mail(node_3, { class: "h-5 w-5 text-gray-400" });
      reset(div_9);
      var input = sibling(div_9, 2);
      remove_input_defaults(input);
      reset(div_8);
      reset(div_7);
      var node_4 = sibling(div_7, 2);
      {
        var consequent = ($$anchor3) => {
          var div_10 = root_2();
          var node_5 = child(div_10);
          Circle_alert(node_5, { class: "w-5 h-5 flex-shrink-0 mt-0.5" });
          var span_1 = sibling(node_5, 2);
          var text_4 = child(span_1, true);
          reset(span_1);
          reset(div_10);
          template_effect(() => set_text(text_4, get(resetError)));
          transition(3, div_10, () => fly, () => ({ y: 10, duration: 300 }));
          append($$anchor3, div_10);
        };
        if_block(node_4, ($$render) => {
          if (get(resetError)) $$render(consequent);
        });
      }
      var node_6 = sibling(node_4, 2);
      {
        var consequent_1 = ($$anchor3) => {
          var div_11 = root_3();
          var p_1 = child(div_11);
          var text_5 = child(p_1, true);
          reset(p_1);
          reset(div_11);
          template_effect(($0) => set_text(text_5, $0), [() => $_()("auth.passwordResetSent")], derived_safe_equal);
          transition(3, div_11, () => fly, () => ({ y: 10, duration: 300 }));
          append($$anchor3, div_11);
        };
        if_block(node_6, ($$render) => {
          if (get(resetSuccess)) $$render(consequent_1);
        });
      }
      var div_12 = sibling(node_6, 2);
      var button_1 = child(div_12);
      var node_7 = child(button_1);
      {
        var consequent_2 = ($$anchor3) => {
          var span_2 = root_4();
          var node_8 = child(span_2);
          Loader(node_8, { class: "w-5 h-5 animate-spin" });
          next(2);
          reset(span_2);
          append($$anchor3, span_2);
        };
        var alternate = ($$anchor3) => {
          var text_6 = text();
          template_effect(
            ($0) => set_text(text_6, $0),
            [
              () => $_()("auth.sendResetInstructions")
            ],
            derived_safe_equal
          );
          append($$anchor3, text_6);
        };
        if_block(node_7, ($$render) => {
          if (get(resetLoading)) $$render(consequent_2);
          else $$render(alternate, false);
        });
      }
      reset(button_1);
      var button_2 = sibling(button_1, 2);
      var text_7 = child(button_2, true);
      reset(button_2);
      reset(div_12);
      reset(div_6);
      template_effect(
        ($0, $1, $2) => {
          set_text(text_3, $0);
          set_attribute(input, "placeholder", $1);
          button_1.disabled = get(resetLoading);
          set_text(text_7, $2);
        },
        [
          () => $_()("auth.email"),
          () => $_()("auth.enterEmail"),
          () => $_()("auth.backToSignIn")
        ],
        derived_safe_equal
      );
      bind_value(input, () => get(resetEmail), ($$value) => set(resetEmail, $$value));
      event("click", button_1, handleResetPassword);
      event("click", button_2, () => set(showResetForm, false));
      transition(3, div_6, () => fly, () => ({ y: 10, duration: 300 }));
      append($$anchor2, div_6);
    };
    var alternate_1 = ($$anchor2) => {
      var fragment_1 = root_6();
      var form = first_child(fragment_1);
      var div_13 = child(form);
      var label_1 = child(div_13);
      var text_8 = child(label_1, true);
      reset(label_1);
      var div_14 = sibling(label_1, 2);
      var div_15 = child(div_14);
      var node_9 = child(div_15);
      Orbit(node_9, { class: "h-5 w-5 text-gray-400" });
      reset(div_15);
      var input_1 = sibling(div_15, 2);
      remove_input_defaults(input_1);
      reset(div_14);
      reset(div_13);
      var div_16 = sibling(div_13, 2);
      var label_2 = child(div_16);
      var text_9 = child(label_2, true);
      reset(label_2);
      var div_17 = sibling(label_2, 2);
      var div_18 = child(div_17);
      var node_10 = child(div_18);
      Mail(node_10, { class: "h-5 w-5 text-gray-400" });
      reset(div_18);
      var input_2 = sibling(div_18, 2);
      remove_input_defaults(input_2);
      reset(div_17);
      reset(div_16);
      var div_19 = sibling(div_16, 2);
      var label_3 = child(div_19);
      var text_10 = child(label_3, true);
      reset(label_3);
      var div_20 = sibling(label_3, 2);
      var div_21 = child(div_20);
      var node_11 = child(div_21);
      Lock(node_11, { class: "h-5 w-5 text-gray-400" });
      reset(div_21);
      var input_3 = sibling(div_21, 2);
      remove_input_defaults(input_3);
      reset(div_20);
      reset(div_19);
      var node_12 = sibling(div_19, 2);
      {
        var consequent_4 = ($$anchor3) => {
          var div_22 = root_7();
          var node_13 = child(div_22);
          Circle_alert(node_13, { class: "w-5 h-5 flex-shrink-0 mt-0.5" });
          var span_3 = sibling(node_13, 2);
          var text_11 = child(span_3, true);
          reset(span_3);
          reset(div_22);
          template_effect(() => set_text(text_11, get(error)));
          transition(3, div_22, () => fly, () => ({ y: 10, duration: 300 }));
          append($$anchor3, div_22);
        };
        if_block(node_12, ($$render) => {
          if (get(error)) $$render(consequent_4);
        });
      }
      var div_23 = sibling(node_12, 2);
      var input_4 = child(div_23);
      remove_input_defaults(input_4);
      var label_4 = sibling(input_4, 2);
      var text_12 = child(label_4, true);
      reset(label_4);
      reset(div_23);
      var button_3 = sibling(div_23, 2);
      var node_14 = child(button_3);
      {
        var consequent_5 = ($$anchor3) => {
          var span_4 = root_8();
          var node_15 = child(span_4);
          Loader(node_15, { class: "w-5 h-5 animate-spin" });
          next(2);
          reset(span_4);
          append($$anchor3, span_4);
        };
        var alternate_2 = ($$anchor3) => {
          var text_13 = text();
          template_effect(($0) => set_text(text_13, $0), [() => $_()("auth.signIn")], derived_safe_equal);
          append($$anchor3, text_13);
        };
        if_block(node_14, ($$render) => {
          if (get(loading)) $$render(consequent_5);
          else $$render(alternate_2, false);
        });
      }
      reset(button_3);
      reset(form);
      var node_16 = sibling(form, 2);
      {
        if_block(node_16, ($$render) => {
        });
      }
      template_effect(
        ($0, $1, $2, $3, $4, $5, $6) => {
          set_text(text_8, $0);
          set_attribute(input_1, "placeholder", $1);
          set_text(text_9, $2);
          set_attribute(input_2, "placeholder", $3);
          set_text(text_10, $4);
          set_attribute(input_3, "placeholder", $5);
          set_text(text_12, $6);
          button_3.disabled = get(loading);
        },
        [
          () => $_()("auth.companyName"),
          () => $_()("auth.companyName"),
          () => $_()("auth.email"),
          () => $_()("auth.email"),
          () => $_()("auth.password"),
          () => $_()("auth.password"),
          () => $_()("auth.rememberMe")
        ],
        derived_safe_equal
      );
      bind_value(input_1, () => get(companyName), ($$value) => set(companyName, $$value));
      bind_value(input_2, () => get(email), ($$value) => set(email, $$value));
      bind_value(input_3, () => get(password), ($$value) => set(password, $$value));
      bind_checked(input_4, () => get(rememberMe), ($$value) => set(rememberMe, $$value));
      event("submit", form, preventDefault(handleSignIn));
      append($$anchor2, fragment_1);
    };
    if_block(node_2, ($$render) => {
      if (get(showResetForm)) $$render(consequent_3);
      else $$render(alternate_1, false);
    });
  }
  reset(div_2);
  reset(div_1);
  reset(div);
  template_effect(
    ($0, $1, $2) => {
      set_text(text$1, $0);
      set_text(text_1, $1);
      set_text(text_2, $2);
    },
    [
      () => $_()("common.back"),
      () => $_()("auth.welcomeBack"),
      () => $_()("auth.signInToContinue")
    ],
    derived_safe_equal
  );
  event("click", button, () => goto("/"));
  transition(1, div_1, () => fly, () => ({ y: 20, duration: 600 }));
  transition(2, div_1, () => fade);
  append($$anchor, div);
  pop();
  $$cleanup();
}
export {
  _page as component
};
//# sourceMappingURL=18.CvLe8xq8.js.map
