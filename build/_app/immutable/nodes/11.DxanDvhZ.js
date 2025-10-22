import { t as template, a as append } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { p as push, o as onMount, l as legacy_pre_effect, a as legacy_pre_effect_reset, t as template_effect, b as pop, c as child, h as derived_safe_equal, s as sibling, d as set, m as mutable_source, g as get, r as reset, i as invalidate_inner_signals, n as next, f as first_child } from "../chunks/BXHzHFYX.js";
import { e as event, s as set_text } from "../chunks/D8_nd-i4.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { e as each, i as index } from "../chunks/CQ5zajJZ.js";
import { t as transition, f as fly } from "../chunks/B1ns0h2F.js";
import { b as bind_select_value } from "../chunks/BR-G7xfO.js";
import { p as preventDefault } from "../chunks/CGgk3ROl.js";
import { a as setup_stores, b as store_get } from "../chunks/CnKbWtpd.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import { a as $format } from "../chunks/HJ-2R3CP.js";
import { c as clearSupabaseAuth, s as supabase, u as user, i as isLoading } from "../chunks/Bnago9pU.js";
import { O as Orbit } from "../chunks/00S9Fma8.js";
import { A as Arrow_left } from "../chunks/CLBcVVt3.js";
import { M as Map } from "../chunks/IquHQOCh.js";
import { B as Building_2 } from "../chunks/D2SreymE.js";
import { C as Clipboard_check } from "../chunks/BC922t_S.js";
import { A as Arrow_right } from "../chunks/Dwi-sorD.js";
var root_1 = template(`<div class="flex justify-center py-12"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>`);
var root_3 = template(`<option> </option>`);
var root_4 = template(`<option> </option>`);
var root_5 = template(`<option> </option>`);
var root_6 = template(`<div class="bg-red-50 text-red-600 p-4 rounded-lg"> </div>`);
var root_7 = template(`<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> <span>Setting up...</span>`, 1);
var root_8 = template(`<span> </span> <!>`, 1);
var root_2 = template(`<div class="bg-white/70 backdrop-blur-sm shadow-lg rounded-2xl p-6 space-y-6"><form class="space-y-6"><div class="space-y-2"><label class="flex items-center space-x-2 text-sm font-medium text-gray-700"><!> <span> </span></label> <select class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option> </option><!></select></div> <div class="space-y-2"><label class="flex items-center space-x-2 text-sm font-medium text-gray-700"><!> <span> </span></label> <select class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed"><option> </option><!></select></div> <div class="space-y-2"><label class="flex items-center space-x-2 text-sm font-medium text-gray-700"><!> <span> </span></label> <select class="w-full px-4 py-2 rounded-xl bg-white/50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option> </option><!></select></div> <!> <button type="submit" class="w-full flex items-center justify-center space-x-2 py-3 px-4
                   bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:ring-offset-2 transition-colors disabled:opacity-50 
                   disabled:cursor-not-allowed"><!></button></form></div>`);
var root = template(`<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6"><div class="max-w-2xl mx-auto space-y-8"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="brand-logo"><!></div> <div><h1 class="text-2xl font-light text-gray-900"> </h1> <p class="text-gray-500"> </p></div></div> <button class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 
               bg-white/70 rounded-lg hover:bg-white/90 transition-colors
               focus:outline-none focus:ring-2 focus:ring-blue-500"><!> <span> </span></button></div> <!></div></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const [$$stores, $$cleanup] = setup_stores();
  const $user = () => store_get(user, "$user", $$stores);
  const $isLoading = () => store_get(isLoading, "$isLoading", $$stores);
  const $_ = () => store_get($format, "$_", $$stores);
  const filteredDepartments = mutable_source();
  let loading = mutable_source(true);
  let error = mutable_source(null);
  let saving = mutable_source(false);
  let selectedSite = mutable_source("");
  let selectedDepartment = mutable_source("");
  let selectedAuditType = mutable_source("");
  let sites = mutable_source([]);
  let departments = mutable_source([]);
  let userLevel = 5;
  const auditTypes = [
    { value: "5s", labelKey: "walks.5s" },
    { value: "hse", labelKey: "walks.hse" },
    { value: "mhe", labelKey: "walks.mhe" },
    { value: "gemba", labelKey: "walks.gemba" }
  ];
  onMount(async () => {
    if (!$user() && !$isLoading()) {
      clearSupabaseAuth();
      goto("/signin");
      return;
    }
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Not authenticated");
      const { data: levelData } = await supabase.from("user_levels").select("level").eq("user_id", userData.user.id).single();
      if (levelData) {
        userLevel = levelData.level;
      }
      const { data: profile } = await supabase.from("profiles").select("company_id").eq("id", userData.user.id).single();
      if (!(profile == null ? void 0 : profile.company_id)) throw new Error("Company not found");
      const { data: sitesData, error: sitesError } = await supabase.from("sites").select("*").eq("company_id", profile.company_id);
      if (sitesError) throw sitesError;
      set(sites, sitesData);
      const {
        data: departmentsData,
        error: departmentsError
      } = await supabase.from("departments").select("*").eq("company_id", profile.company_id);
      if (departmentsError) throw departmentsError;
      set(departments, departmentsData);
    } catch (e) {
      console.error("Error loading data:", e);
      set(error, e instanceof Error ? e.message : "Failed to load data");
    } finally {
      set(loading, false);
    }
  });
  async function handleSubmit() {
    if (!get(selectedSite) || !get(selectedDepartment) || !get(selectedAuditType)) {
      set(error, "Please fill in all fields");
      return;
    }
    set(saving, true);
    set(error, null);
    try {
      const { data: { user: user2 } } = await supabase.auth.getUser();
      if (!user2) throw new Error("Not authenticated");
      const { error: setupError } = await supabase.from("audit_setups").insert({
        user_id: user2.id,
        site_id: get(selectedSite),
        department_id: get(selectedDepartment),
        audit_type: get(selectedAuditType),
        start_time: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString()
        // Record the start time
      });
      if (setupError) throw setupError;
      if (get(selectedAuditType) === "hse") {
        goto("/audit/hse-questions");
      } else if (get(selectedAuditType) === "mhe") {
        goto("/audit/mhe-questions");
      } else if (get(selectedAuditType) === "gemba") {
        goto("/audit/gemba-questions");
      } else {
        goto("/audit/questions");
      }
    } catch (e) {
      console.error("Error saving audit setup:", e);
      set(error, e instanceof Error ? e.message : "Failed to save audit setup");
    } finally {
      set(saving, false);
    }
  }
  function handleBack() {
    goto("/dashboard");
  }
  legacy_pre_effect(
    () => (get(departments), get(selectedSite)),
    () => {
      set(filteredDepartments, get(departments).filter((dept) => dept.site_id === get(selectedSite)));
    }
  );
  legacy_pre_effect_reset();
  init();
  var div = root();
  var div_1 = child(div);
  var div_2 = child(div_1);
  var div_3 = child(div_2);
  var div_4 = child(div_3);
  var node = child(div_4);
  Orbit(node, { class: "w-6 h-6" });
  reset(div_4);
  var div_5 = sibling(div_4, 2);
  var h1 = child(div_5);
  var text = child(h1, true);
  reset(h1);
  var p = sibling(h1, 2);
  var text_1 = child(p, true);
  reset(p);
  reset(div_5);
  reset(div_3);
  var button = sibling(div_3, 2);
  var node_1 = child(button);
  Arrow_left(node_1, { class: "w-4 h-4" });
  var span = sibling(node_1, 2);
  var text_2 = child(span, true);
  reset(span);
  reset(button);
  reset(div_2);
  var node_2 = sibling(div_2, 2);
  {
    var consequent = ($$anchor2) => {
      var div_6 = root_1();
      append($$anchor2, div_6);
    };
    var alternate = ($$anchor2) => {
      var div_7 = root_2();
      var form = child(div_7);
      var div_8 = child(form);
      var label = child(div_8);
      var node_3 = child(label);
      Map(node_3, { class: "w-4 h-4" });
      var span_1 = sibling(node_3, 2);
      var text_3 = child(span_1, true);
      reset(span_1);
      reset(label);
      var select = sibling(label, 2);
      template_effect(() => {
        get(selectedSite);
        invalidate_inner_signals(() => {
          $_();
          get(sites);
        });
      });
      var option = child(select);
      option.value = null == (option.__value = "") ? "" : "";
      var text_4 = child(option, true);
      reset(option);
      var node_4 = sibling(option);
      each(node_4, 1, () => get(sites), index, ($$anchor3, site) => {
        var option_1 = root_3();
        var option_1_value = {};
        var text_5 = child(option_1, true);
        reset(option_1);
        template_effect(() => {
          if (option_1_value !== (option_1_value = get(site).id)) {
            option_1.value = null == (option_1.__value = get(site).id) ? "" : get(site).id;
          }
          set_text(text_5, get(site).name);
        });
        append($$anchor3, option_1);
      });
      reset(select);
      reset(div_8);
      var div_9 = sibling(div_8, 2);
      var label_1 = child(div_9);
      var node_5 = child(label_1);
      Building_2(node_5, { class: "w-4 h-4" });
      var span_2 = sibling(node_5, 2);
      var text_6 = child(span_2, true);
      reset(span_2);
      reset(label_1);
      var select_1 = sibling(label_1, 2);
      template_effect(() => {
        get(selectedDepartment);
        invalidate_inner_signals(() => {
          get(selectedSite);
          $_();
          get(filteredDepartments);
        });
      });
      var option_2 = child(select_1);
      option_2.value = null == (option_2.__value = "") ? "" : "";
      var text_7 = child(option_2, true);
      reset(option_2);
      var node_6 = sibling(option_2);
      each(node_6, 1, () => get(filteredDepartments), index, ($$anchor3, department) => {
        var option_3 = root_4();
        var option_3_value = {};
        var text_8 = child(option_3, true);
        reset(option_3);
        template_effect(() => {
          if (option_3_value !== (option_3_value = get(department).id)) {
            option_3.value = null == (option_3.__value = get(department).id) ? "" : get(department).id;
          }
          set_text(text_8, get(department).name);
        });
        append($$anchor3, option_3);
      });
      reset(select_1);
      reset(div_9);
      var div_10 = sibling(div_9, 2);
      var label_2 = child(div_10);
      var node_7 = child(label_2);
      Clipboard_check(node_7, { class: "w-4 h-4" });
      var span_3 = sibling(node_7, 2);
      var text_9 = child(span_3, true);
      reset(span_3);
      reset(label_2);
      var select_2 = sibling(label_2, 2);
      template_effect(() => {
        get(selectedAuditType);
        invalidate_inner_signals(() => {
          $_();
        });
      });
      var option_4 = child(select_2);
      option_4.value = null == (option_4.__value = "") ? "" : "";
      var text_10 = child(option_4, true);
      reset(option_4);
      var node_8 = sibling(option_4);
      each(node_8, 1, () => auditTypes, index, ($$anchor3, type) => {
        var option_5 = root_5();
        var option_5_value = {};
        var text_11 = child(option_5, true);
        reset(option_5);
        template_effect(
          ($0) => {
            if (option_5_value !== (option_5_value = get(type).value)) {
              option_5.value = null == (option_5.__value = get(type).value) ? "" : get(type).value;
            }
            set_text(text_11, $0);
          },
          [() => $_()(get(type).labelKey)],
          derived_safe_equal
        );
        append($$anchor3, option_5);
      });
      reset(select_2);
      reset(div_10);
      var node_9 = sibling(div_10, 2);
      {
        var consequent_1 = ($$anchor3) => {
          var div_11 = root_6();
          var text_12 = child(div_11, true);
          reset(div_11);
          template_effect(() => set_text(text_12, get(error)));
          transition(3, div_11, () => fly, () => ({ y: 10, duration: 300 }));
          append($$anchor3, div_11);
        };
        if_block(node_9, ($$render) => {
          if (get(error)) $$render(consequent_1);
        });
      }
      var button_1 = sibling(node_9, 2);
      var node_10 = child(button_1);
      {
        var consequent_2 = ($$anchor3) => {
          var fragment = root_7();
          next(2);
          append($$anchor3, fragment);
        };
        var alternate_1 = ($$anchor3) => {
          var fragment_1 = root_8();
          var span_4 = first_child(fragment_1);
          var text_13 = child(span_4, true);
          reset(span_4);
          var node_11 = sibling(span_4, 2);
          Arrow_right(node_11, { class: "w-5 h-5" });
          template_effect(($0) => set_text(text_13, $0), [() => $_()("walks.startWalk")], derived_safe_equal);
          append($$anchor3, fragment_1);
        };
        if_block(node_10, ($$render) => {
          if (get(saving)) $$render(consequent_2);
          else $$render(alternate_1, false);
        });
      }
      reset(button_1);
      reset(form);
      reset(div_7);
      template_effect(
        ($0, $1, $2, $3, $4, $5) => {
          set_text(text_3, $0);
          set_text(text_4, $1);
          set_text(text_6, $2);
          select_1.disabled = !get(selectedSite);
          set_text(text_7, $3);
          set_text(text_9, $4);
          set_text(text_10, $5);
          button_1.disabled = get(saving);
        },
        [
          () => $_()("checkin.site"),
          () => $_()("walks.selectSite"),
          () => $_()("checkin.department"),
          () => $_()("walks.selectDepartment"),
          () => $_()("walks.selectWalkType"),
          () => $_()("walks.selectWalkType")
        ],
        derived_safe_equal
      );
      bind_select_value(select, () => get(selectedSite), ($$value) => set(selectedSite, $$value));
      bind_select_value(select_1, () => get(selectedDepartment), ($$value) => set(selectedDepartment, $$value));
      bind_select_value(select_2, () => get(selectedAuditType), ($$value) => set(selectedAuditType, $$value));
      event("submit", form, preventDefault(handleSubmit));
      append($$anchor2, div_7);
    };
    if_block(node_2, ($$render) => {
      if (get(loading)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(div_1);
  reset(div);
  template_effect(
    ($0, $1, $2) => {
      set_text(text, $0);
      set_text(text_1, $1);
      set_text(text_2, $2);
    },
    [
      () => $_()("nav.newWalk"),
      () => $_()("walks.configureWalk"),
      () => $_()("settings.backToDashboard")
    ],
    derived_safe_equal
  );
  event("click", button, handleBack);
  append($$anchor, div);
  pop();
  $$cleanup();
}
export {
  _page as component
};
//# sourceMappingURL=11.DxanDvhZ.js.map
