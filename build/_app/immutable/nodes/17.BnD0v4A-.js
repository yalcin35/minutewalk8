import { c as comment, a as append, t as template } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { f as first_child, p as push, d as set, o as onMount, t as template_effect, b as pop, m as mutable_source, c as child, s as sibling, h as derived_safe_equal, r as reset, n as next, g as get } from "../chunks/BXHzHFYX.js";
import { e as event, s as set_text } from "../chunks/D8_nd-i4.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { I as Icon, s as slot, r as remove_input_defaults, b as set_value, d as set_attribute } from "../chunks/CQ5zajJZ.js";
import { t as transition, f as fly } from "../chunks/B1ns0h2F.js";
import { b as bind_value } from "../chunks/7QZrl-aJ.js";
import { l as legacy_rest_props, s as spread_props, a as setup_stores, b as store_get } from "../chunks/CnKbWtpd.js";
import { $ as $locale, a as $format } from "../chunks/HJ-2R3CP.js";
import { s as setLocale } from "../chunks/DIcdBaaF.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import { s as supabase, u as user, c as clearSupabaseAuth } from "../chunks/Bnago9pU.js";
import { S as Settings, L as Log_out } from "../chunks/lkfbQ4RA.js";
import { A as Arrow_left } from "../chunks/CLBcVVt3.js";
import { U as User } from "../chunks/DM20bSSB.js";
import { L as Lock, C as Circle_alert } from "../chunks/Cwcd99ig.js";
import { G as Globe } from "../chunks/nlyoQ1Mb.js";
import { B as Building_2 } from "../chunks/D2SreymE.js";
import { C as Check } from "../chunks/BigxzFP9.js";
import { S as Save } from "../chunks/Baani2JM.js";
function Upload($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    [
      "path",
      {
        "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      }
    ],
    ["polyline", { "points": "17 8 12 3 7 8" }],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "3",
        "y2": "15"
      }
    ]
  ];
  Icon($$anchor, spread_props({ name: "upload" }, () => $$sanitized_props, {
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
var root_1 = template(`<div class="flex justify-center py-12"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>`);
var root_6 = template(`<img alt="Company logo" class="w-full h-full object-cover">`);
var root_8 = template(`<div class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"><!> <span> </span></div>`);
var root_9 = template(`<div class="bg-green-50 text-green-600 p-4 rounded-lg"> </div>`);
var root_10 = template(`<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> <span> </span>`, 1);
var root_11 = template(`<!> <span> </span>`, 1);
var root_2 = template(`<div class="bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl p-6 space-y-6"><div class="space-y-4"><div class="flex items-center space-x-2 text-gray-700"><!> <h2 class="text-lg font-medium"> </h2></div> <div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1" for="fullName"> </label> <input id="fullName" type="text" class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your full name"></div> <div><label class="block text-sm font-medium text-gray-700 mb-1" for="username"> </label> <input id="username" type="text" class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Choose a username"></div> <div><label class="block text-sm font-medium text-gray-700 mb-1" for="email"> </label> <input id="email" type="email" disabled class="w-full px-4 py-2 rounded-xl bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"></div></div></div> <div class="space-y-4"><div class="flex items-center space-x-2 text-gray-700"><!> <h2 class="text-lg font-medium"> </h2></div> <div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1" for="currentPassword"> </label> <input id="currentPassword" type="password" class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter current password"></div> <div><label class="block text-sm font-medium text-gray-700 mb-1" for="newPassword"> </label> <input id="newPassword" type="password" class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter new password"></div> <div><label class="block text-sm font-medium text-gray-700 mb-1" for="confirmPassword"> </label> <input id="confirmPassword" type="password" class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Confirm new password"></div></div></div> <div class="space-y-4"><div class="flex items-center space-x-2 text-gray-700"><!> <h2 class="text-lg font-medium"> </h2></div> <div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-4"> </label> <div class="space-y-3"><div class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"><div class="flex items-center space-x-3"><div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><span class="text-blue-600 font-medium">EN</span></div> <span class="font-medium"> </span></div> <!></div> <div class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"><div class="flex items-center space-x-3"><div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><span class="text-blue-600 font-medium">DE</span></div> <span class="font-medium"> </span></div> <!></div> <div class="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"><div class="flex items-center space-x-3"><div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><span class="text-blue-600 font-medium">TR</span></div> <span class="font-medium"> </span></div> <!></div></div></div></div></div> <div class="space-y-4"><div class="flex items-center space-x-2 text-gray-700"><!> <h2 class="text-lg font-medium"> </h2></div> <div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1" for="company"> </label> <input id="company" type="text" disabled class="w-full px-4 py-2 rounded-xl bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"></div> <div><label class="block text-sm font-medium text-gray-700 mb-2"> </label> <div class="flex items-start space-x-4"><div class="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden"><!></div> <div class="flex-1"><label class="flex items-center justify-center w-full h-24 px-4 transition
                           bg-white border-2 border-gray-300 border-dashed rounded-lg
                           appearance-none cursor-pointer hover:border-blue-500 focus:outline-none"><div class="flex flex-col items-center space-y-2"><!> <span class="text-sm text-gray-500"> </span> <span class="text-xs text-gray-400"> </span></div> <input type="file" class="hidden" accept="image/*"></label></div></div></div></div></div> <!> <!> <div class="flex justify-end"><button class="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white 
                   rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-2 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"><!></button></div> <div class="flex justify-end mt-6"><button class="flex items-center space-x-2 px-6 py-2 text-red-600 
                   hover:bg-red-50 rounded-xl transition-colors"><!> <span> </span></button></div></div>`);
var root = template(`<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4"><div class="max-w-2xl mx-auto space-y-8"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><!></div> <div><h1 class="text-2xl font-light text-gray-900">Settings</h1> <p class="text-gray-500">Manage your account preferences</p></div></div> <button class="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg
               hover:bg-blue-600 transition-colors"><!> <span> </span></button></div> <!></div></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const [$$stores, $$cleanup] = setup_stores();
  const $user = () => store_get(user, "$user", $$stores);
  const $_ = () => store_get($format, "$_", $$stores);
  let loading = mutable_source(false);
  let saving = mutable_source(false);
  let error = mutable_source(null);
  let success = mutable_source(false);
  let currentLocale = mutable_source();
  let fullName = mutable_source("");
  let username = mutable_source("");
  let email = mutable_source("");
  let companyName = mutable_source("");
  let companyLogo = mutable_source(null);
  let currentPassword = mutable_source("");
  let newPassword = mutable_source("");
  let confirmPassword = mutable_source("");
  let logoFile = null;
  $locale.subscribe((value) => {
    set(currentLocale, value);
  });
  function changeLanguage(lang) {
    setLocale(lang);
  }
  onMount(async () => {
    var _a, _b, _c;
    set(loading, true);
    try {
      const { data: profile, error: profileError } = await supabase.from("profiles").select(`
          full_name,
          username,
          email,
          companies (
            name,
            logo_url
          )
        `).eq("id", (_a = $user()) == null ? void 0 : _a.id).single();
      if (profileError) throw profileError;
      if (profile) {
        set(fullName, profile.full_name || "");
        set(username, profile.username || "");
        set(email, profile.email);
        set(companyName, ((_b = profile.companies) == null ? void 0 : _b.name) || "");
        set(companyLogo, ((_c = profile.companies) == null ? void 0 : _c.logo_url) || null);
      }
    } catch (e) {
      console.error("Error loading profile:", e);
      set(error, "Failed to load profile data");
    } finally {
      set(loading, false);
    }
  });
  async function uploadLogo(file) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `company-logos/${fileName}`;
    const { error: uploadError, data } = await supabase.storage.from("public").upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data: { publicUrl } } = supabase.storage.from("public").getPublicUrl(filePath);
    return publicUrl;
  }
  async function handleLogoChange(event2) {
    var _a;
    const input = event2.target;
    const file = (_a = input.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      set(error, "Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      set(error, "File size must be less than 5MB");
      return;
    }
    logoFile = file;
  }
  async function handleSave() {
    var _a, _b, _c;
    set(saving, true);
    set(error, null);
    set(success, false);
    try {
      if (get(newPassword) || get(confirmPassword) || get(currentPassword)) {
        if (get(newPassword) !== get(confirmPassword)) {
          throw new Error("New passwords do not match");
        }
        if (!get(currentPassword)) {
          throw new Error("Current password is required to change password");
        }
        if (get(newPassword).length < 6) {
          throw new Error("New password must be at least 6 characters long");
        }
        const { error: passwordError } = await supabase.auth.updateUser({ password: get(newPassword) });
        if (passwordError) throw passwordError;
      }
      let logoUrl;
      if (logoFile) {
        logoUrl = await uploadLogo(logoFile);
      }
      const { error: profileError } = await supabase.from("profiles").update({
        full_name: get(fullName),
        username: get(username),
        updated_at: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", (_a = $user()) == null ? void 0 : _a.id);
      if (profileError) throw profileError;
      if (logoUrl) {
        const { error: companyError } = await supabase.from("companies").update({ logo_url: logoUrl }).eq("id", (_c = (await supabase.from("profiles").select("company_id").eq("id", (_b = $user()) == null ? void 0 : _b.id).single()).data) == null ? void 0 : _c.company_id);
        if (companyError) throw companyError;
        set(companyLogo, logoUrl);
      }
      set(currentPassword, "");
      set(newPassword, "");
      set(confirmPassword, "");
      logoFile = null;
      set(success, true);
    } catch (e) {
      console.error("Error updating profile:", e);
      set(error, e instanceof Error ? e.message : "Failed to update profile");
    } finally {
      set(saving, false);
    }
  }
  async function handleLogout() {
    try {
      const { error: error2 } = await supabase.auth.signOut();
      if (error2) throw error2;
      clearSupabaseAuth();
      goto("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
      set(error, "Failed to log out. Please try again.");
    }
  }
  init();
  var div = root();
  var div_1 = child(div);
  var div_2 = child(div_1);
  var div_3 = child(div_2);
  var div_4 = child(div_3);
  var node = child(div_4);
  Settings(node, { class: "w-5 h-5 text-blue-600" });
  reset(div_4);
  next(2);
  reset(div_3);
  var button = sibling(div_3, 2);
  var node_1 = child(button);
  Arrow_left(node_1, { class: "w-4 h-4" });
  var span = sibling(node_1, 2);
  var text = child(span, true);
  reset(span);
  reset(button);
  reset(div_2);
  var node_2 = sibling(div_2, 2);
  {
    var consequent = ($$anchor2) => {
      var div_5 = root_1();
      append($$anchor2, div_5);
    };
    var alternate = ($$anchor2) => {
      var div_6 = root_2();
      var div_7 = child(div_6);
      var div_8 = child(div_7);
      var node_3 = child(div_8);
      User(node_3, { class: "w-5 h-5" });
      var h2 = sibling(node_3, 2);
      var text_1 = child(h2, true);
      reset(h2);
      reset(div_8);
      var div_9 = sibling(div_8, 2);
      var div_10 = child(div_9);
      var label = child(div_10);
      var text_2 = child(label, true);
      reset(label);
      var input_1 = sibling(label, 2);
      remove_input_defaults(input_1);
      reset(div_10);
      var div_11 = sibling(div_10, 2);
      var label_1 = child(div_11);
      var text_3 = child(label_1, true);
      reset(label_1);
      var input_2 = sibling(label_1, 2);
      remove_input_defaults(input_2);
      reset(div_11);
      var div_12 = sibling(div_11, 2);
      var label_2 = child(div_12);
      var text_4 = child(label_2, true);
      reset(label_2);
      var input_3 = sibling(label_2, 2);
      remove_input_defaults(input_3);
      reset(div_12);
      reset(div_9);
      reset(div_7);
      var div_13 = sibling(div_7, 2);
      var div_14 = child(div_13);
      var node_4 = child(div_14);
      Lock(node_4, { class: "w-5 h-5" });
      var h2_1 = sibling(node_4, 2);
      var text_5 = child(h2_1, true);
      reset(h2_1);
      reset(div_14);
      var div_15 = sibling(div_14, 2);
      var div_16 = child(div_15);
      var label_3 = child(div_16);
      var text_6 = child(label_3, true);
      reset(label_3);
      var input_4 = sibling(label_3, 2);
      remove_input_defaults(input_4);
      reset(div_16);
      var div_17 = sibling(div_16, 2);
      var label_4 = child(div_17);
      var text_7 = child(label_4, true);
      reset(label_4);
      var input_5 = sibling(label_4, 2);
      remove_input_defaults(input_5);
      reset(div_17);
      var div_18 = sibling(div_17, 2);
      var label_5 = child(div_18);
      var text_8 = child(label_5, true);
      reset(label_5);
      var input_6 = sibling(label_5, 2);
      remove_input_defaults(input_6);
      reset(div_18);
      reset(div_15);
      reset(div_13);
      var div_19 = sibling(div_13, 2);
      var div_20 = child(div_19);
      var node_5 = child(div_20);
      Globe(node_5, { class: "w-5 h-5" });
      var h2_2 = sibling(node_5, 2);
      var text_9 = child(h2_2, true);
      reset(h2_2);
      reset(div_20);
      var div_21 = sibling(div_20, 2);
      var div_22 = child(div_21);
      var label_6 = child(div_22);
      var text_10 = child(label_6, true);
      reset(label_6);
      var div_23 = sibling(label_6, 2);
      var div_24 = child(div_23);
      var div_25 = child(div_24);
      var span_1 = sibling(child(div_25), 2);
      var text_11 = child(span_1, true);
      reset(span_1);
      reset(div_25);
      var node_6 = sibling(div_25, 2);
      {
        var consequent_1 = ($$anchor3) => {
          Check($$anchor3, { class: "w-5 h-5 text-blue-500" });
        };
        if_block(node_6, ($$render) => {
          if (get(currentLocale) === "en") $$render(consequent_1);
        });
      }
      reset(div_24);
      var div_26 = sibling(div_24, 2);
      var div_27 = child(div_26);
      var span_2 = sibling(child(div_27), 2);
      var text_12 = child(span_2, true);
      reset(span_2);
      reset(div_27);
      var node_7 = sibling(div_27, 2);
      {
        var consequent_2 = ($$anchor3) => {
          Check($$anchor3, { class: "w-5 h-5 text-blue-500" });
        };
        if_block(node_7, ($$render) => {
          if (get(currentLocale) === "de") $$render(consequent_2);
        });
      }
      reset(div_26);
      var div_28 = sibling(div_26, 2);
      var div_29 = child(div_28);
      var span_3 = sibling(child(div_29), 2);
      var text_13 = child(span_3, true);
      reset(span_3);
      reset(div_29);
      var node_8 = sibling(div_29, 2);
      {
        var consequent_3 = ($$anchor3) => {
          Check($$anchor3, { class: "w-5 h-5 text-blue-500" });
        };
        if_block(node_8, ($$render) => {
          if (get(currentLocale) === "tr") $$render(consequent_3);
        });
      }
      reset(div_28);
      reset(div_23);
      reset(div_22);
      reset(div_21);
      reset(div_19);
      var div_30 = sibling(div_19, 2);
      var div_31 = child(div_30);
      var node_9 = child(div_31);
      Building_2(node_9, { class: "w-5 h-5" });
      var h2_3 = sibling(node_9, 2);
      var text_14 = child(h2_3, true);
      reset(h2_3);
      reset(div_31);
      var div_32 = sibling(div_31, 2);
      var div_33 = child(div_32);
      var label_7 = child(div_33);
      var text_15 = child(label_7, true);
      reset(label_7);
      var input_7 = sibling(label_7, 2);
      remove_input_defaults(input_7);
      reset(div_33);
      var div_34 = sibling(div_33, 2);
      var label_8 = child(div_34);
      var text_16 = child(label_8, true);
      reset(label_8);
      var div_35 = sibling(label_8, 2);
      var div_36 = child(div_35);
      var node_10 = child(div_36);
      {
        var consequent_4 = ($$anchor3) => {
          var img = root_6();
          template_effect(() => set_attribute(img, "src", get(companyLogo)));
          append($$anchor3, img);
        };
        var alternate_1 = ($$anchor3) => {
          Building_2($$anchor3, { class: "w-8 h-8 text-gray-400" });
        };
        if_block(node_10, ($$render) => {
          if (get(companyLogo)) $$render(consequent_4);
          else $$render(alternate_1, false);
        });
      }
      reset(div_36);
      var div_37 = sibling(div_36, 2);
      var label_9 = child(div_37);
      var div_38 = child(label_9);
      var node_11 = child(div_38);
      Upload(node_11, { class: "w-6 h-6 text-gray-400" });
      var span_4 = sibling(node_11, 2);
      var text_17 = child(span_4, true);
      reset(span_4);
      var span_5 = sibling(span_4, 2);
      var text_18 = child(span_5, true);
      reset(span_5);
      reset(div_38);
      var input_8 = sibling(div_38, 2);
      reset(label_9);
      reset(div_37);
      reset(div_35);
      reset(div_34);
      reset(div_32);
      reset(div_30);
      var node_12 = sibling(div_30, 2);
      {
        var consequent_5 = ($$anchor3) => {
          var div_39 = root_8();
          var node_13 = child(div_39);
          Circle_alert(node_13, { class: "w-5 h-5 flex-shrink-0 mt-0.5" });
          var span_6 = sibling(node_13, 2);
          var text_19 = child(span_6, true);
          reset(span_6);
          reset(div_39);
          template_effect(() => set_text(text_19, get(error)));
          transition(3, div_39, () => fly, () => ({ y: 10, duration: 300 }));
          append($$anchor3, div_39);
        };
        if_block(node_12, ($$render) => {
          if (get(error)) $$render(consequent_5);
        });
      }
      var node_14 = sibling(node_12, 2);
      {
        var consequent_6 = ($$anchor3) => {
          var div_40 = root_9();
          var text_20 = child(div_40, true);
          reset(div_40);
          template_effect(($0) => set_text(text_20, $0), [() => $_()("settings.settingsUpdated")], derived_safe_equal);
          transition(3, div_40, () => fly, () => ({ y: 10, duration: 300 }));
          append($$anchor3, div_40);
        };
        if_block(node_14, ($$render) => {
          if (get(success)) $$render(consequent_6);
        });
      }
      var div_41 = sibling(node_14, 2);
      var button_1 = child(div_41);
      var node_15 = child(button_1);
      {
        var consequent_7 = ($$anchor3) => {
          var fragment_4 = root_10();
          var span_7 = sibling(first_child(fragment_4), 2);
          var text_21 = child(span_7, true);
          reset(span_7);
          template_effect(($0) => set_text(text_21, $0), [() => $_()("settings.saving")], derived_safe_equal);
          append($$anchor3, fragment_4);
        };
        var alternate_2 = ($$anchor3) => {
          var fragment_5 = root_11();
          var node_16 = first_child(fragment_5);
          Save(node_16, { class: "w-5 h-5" });
          var span_8 = sibling(node_16, 2);
          var text_22 = child(span_8, true);
          reset(span_8);
          template_effect(($0) => set_text(text_22, $0), [() => $_()("settings.saveChanges")], derived_safe_equal);
          append($$anchor3, fragment_5);
        };
        if_block(node_15, ($$render) => {
          if (get(saving)) $$render(consequent_7);
          else $$render(alternate_2, false);
        });
      }
      reset(button_1);
      reset(div_41);
      var div_42 = sibling(div_41, 2);
      var button_2 = child(div_42);
      var node_17 = child(button_2);
      Log_out(node_17, { class: "w-5 h-5" });
      var span_9 = sibling(node_17, 2);
      var text_23 = child(span_9, true);
      reset(span_9);
      reset(button_2);
      reset(div_42);
      reset(div_6);
      template_effect(
        ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) => {
          set_text(text_1, $0);
          set_text(text_2, $1);
          set_text(text_3, $2);
          set_text(text_4, $3);
          set_value(input_3, get(email));
          set_text(text_5, $4);
          set_text(text_6, $5);
          set_text(text_7, $6);
          set_text(text_8, $7);
          set_text(text_9, $8);
          set_text(text_10, $9);
          set_text(text_11, $10);
          set_text(text_12, $11);
          set_text(text_13, $12);
          set_text(text_14, $13);
          set_text(text_15, $14);
          set_value(input_7, get(companyName));
          set_text(text_16, $15);
          set_text(text_17, $16);
          set_text(text_18, $17);
          button_1.disabled = get(saving);
          set_text(text_23, $18);
        },
        [
          () => $_()("settings.personalInformation"),
          () => $_()("settings.fullName"),
          () => $_()("settings.username"),
          () => $_()("settings.email"),
          () => $_()("settings.changePassword"),
          () => $_()("settings.currentPassword"),
          () => $_()("settings.newPassword"),
          () => $_()("settings.confirmNewPassword"),
          () => $_()("settings.language"),
          () => $_()("settings.selectLanguage"),
          () => $_()("settings.english"),
          () => $_()("settings.german"),
          () => $_()("settings.turkish"),
          () => $_()("settings.companyInformation"),
          () => $_()("settings.companyName"),
          () => $_()("settings.companyLogo"),
          () => $_()("settings.uploadNewLogo"),
          () => $_()("settings.imageTypes"),
          () => $_()("common.logout")
        ],
        derived_safe_equal
      );
      bind_value(input_1, () => get(fullName), ($$value) => set(fullName, $$value));
      bind_value(input_2, () => get(username), ($$value) => set(username, $$value));
      bind_value(input_4, () => get(currentPassword), ($$value) => set(currentPassword, $$value));
      bind_value(input_5, () => get(newPassword), ($$value) => set(newPassword, $$value));
      bind_value(input_6, () => get(confirmPassword), ($$value) => set(confirmPassword, $$value));
      event("click", div_24, () => changeLanguage("en"));
      event("click", div_26, () => changeLanguage("de"));
      event("click", div_28, () => changeLanguage("tr"));
      event("change", input_8, handleLogoChange);
      event("click", button_1, handleSave);
      event("click", button_2, handleLogout);
      append($$anchor2, div_6);
    };
    if_block(node_2, ($$render) => {
      if (get(loading)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(div_1);
  reset(div);
  template_effect(($0) => set_text(text, $0), [() => $_()("settings.backToDashboard")], derived_safe_equal);
  event("click", button, () => goto("/dashboard"));
  append($$anchor, div);
  pop();
  $$cleanup();
}
export {
  _page as component
};
//# sourceMappingURL=17.BnD0v4A-.js.map
