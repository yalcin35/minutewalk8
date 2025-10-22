import { t as template, a as append } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { p as push, o as onMount, l as legacy_pre_effect, a as legacy_pre_effect_reset, t as template_effect, b as pop, c as child, h as derived_safe_equal, g as get, d as set, m as mutable_source, e as mutate, s as sibling, r as reset, i as invalidate_inner_signals, f as first_child } from "../chunks/BXHzHFYX.js";
import { s as set_text, r as remove_textarea_child, e as event } from "../chunks/D8_nd-i4.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { c as set_class, e as each, i as index, r as remove_input_defaults, d as set_attribute } from "../chunks/CQ5zajJZ.js";
import { c as component } from "../chunks/Yy-EATei.js";
import { t as transition, f as fly } from "../chunks/B1ns0h2F.js";
import { b as bind_value, a as bind_group } from "../chunks/7QZrl-aJ.js";
import { b as bind_select_value } from "../chunks/BR-G7xfO.js";
import { a as setup_stores, b as store_get } from "../chunks/CnKbWtpd.js";
import { a as $format } from "../chunks/HJ-2R3CP.js";
import { s as supabase, u as user } from "../chunks/Bnago9pU.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import { S as Sidebar } from "../chunks/nSvjLpae.js";
import { C as Calendar } from "../chunks/C54mA3lC.js";
import { C as Clock } from "../chunks/B0rWwkV4.js";
import { S as Shield } from "../chunks/CaYN_JBr.js";
import { B as Badge_check, D as Dollar_sign, L as Leaf } from "../chunks/9QYRPvAh.js";
import { T as Truck } from "../chunks/BiG2Bac4.js";
import { U as Users } from "../chunks/DKDK7n9-.js";
import { P as Plus } from "../chunks/Cur7I4rm.js";
import { B as Brain } from "../chunks/DqLQEwYL.js";
import { T as Triangle_alert } from "../chunks/BYbTu6aK.js";
import { S as Save } from "../chunks/Baani2JM.js";
var root_1 = template(`<div class="flex justify-center py-12"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>`);
var root_3 = template(`<option> </option>`);
var root_4 = template(`<option> </option>`);
var root_5 = template(`<div class="bg-gray-50 rounded-lg p-4 space-y-4"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div><!></div> <span class="font-medium"> </span></div> <div class="flex items-center space-x-2"><button><span class="sr-only"> </span></button> <button><span class="sr-only"> </span></button> <button><span class="sr-only"> </span></button></div></div> <div class="space-y-2"><textarea class="w-full px-4 py-2 rounded-lg bg-white border-gray-200
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           resize-none" rows="2"></textarea></div></div>`);
var root_8 = template(`<li> </li>`);
var root_7 = template(`<h4 class="text-sm font-medium mt-4">Recommendations:</h4> <ul class="list-disc pl-4 space-y-2"></ul>`, 1);
var root_6 = template(`<div class="bg-purple-50 rounded-lg p-4 space-y-4"><h3 class="font-medium text-purple-900"> </h3> <div class="prose prose-sm text-purple-800"><p> </p> <!></div></div>`);
var root_9 = template(`<div class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"><!> <span> </span></div>`);
var root_10 = template(`<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> <span> </span>`, 1);
var root_11 = template(`<!> <span> </span>`, 1);
var root_2 = template(`<div class="bg-white rounded-xl shadow-lg p-6 space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> </label> <select class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option>Select a site</option><!></select></div> <div><label class="block text-sm font-medium text-gray-700 mb-2"> </label> <select class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed"><option>Select a department</option><!></select></div></div> <div><label class="block text-sm font-medium text-gray-700 mb-2"> </label> <div class="flex space-x-4"><label class="inline-flex items-center"><input type="radio" class="form-radio text-blue-500"> <span class="ml-2"> </span></label> <label class="inline-flex items-center"><input type="radio" class="form-radio text-blue-500"> <span class="ml-2"> </span></label> <label class="inline-flex items-center"><input type="radio" class="form-radio text-blue-500"> <span class="ml-2"> </span></label></div></div> <div class="space-y-4"><h2 class="text-lg font-medium text-gray-900"> </h2> <!></div> <div class="space-y-2"><label class="block text-sm font-medium text-gray-700"> </label> <textarea class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     resize-none" rows="4"></textarea></div> <div class="space-y-4"><button class="flex items-center space-x-2 px-4 py-2 bg-purple-100 
                     text-purple-600 rounded-lg hover:bg-purple-200 
                     transition-colors disabled:opacity-50"><!> <span> </span></button> <!></div> <!> <div class="flex justify-end pt-4"><button class="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white 
                     rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"><!></button></div></div>`);
var root = template(`<div class="flex"><!> <div style="transition: padding-left 0.3s"><div class="max-w-4xl mx-auto space-y-8"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-light text-gray-900"> </h1> <p class="text-gray-500"> </p></div> <div class="flex items-center space-x-4"><div class="text-sm text-gray-500"><!> </div> <div class="text-sm text-gray-500"><!> </div></div></div> <!></div></div></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const [$$stores, $$cleanup] = setup_stores();
  const $localUser = () => store_get(localUser, "$localUser", $$stores);
  const $_ = () => store_get($format, "$_", $$stores);
  const filteredDepartments = mutable_source();
  const binding_group = [];
  let localUser = user;
  let isSidebarOpen = mutable_source(true);
  const categories = [
    {
      id: "safety",
      label: "Safety",
      icon: Shield,
      color: "red"
    },
    {
      id: "quality",
      label: "Quality",
      icon: Badge_check,
      color: "blue"
    },
    {
      id: "cost",
      label: "Cost",
      icon: Dollar_sign,
      color: "yellow"
    },
    {
      id: "delivery",
      label: "Delivery",
      icon: Truck,
      color: "green"
    },
    {
      id: "people",
      label: "People",
      icon: Users,
      color: "purple"
    },
    {
      id: "environment",
      label: "Environment",
      icon: Leaf,
      color: "emerald"
    },
    {
      id: "plus",
      label: "Plus (+)",
      icon: Plus,
      color: "gray"
    }
  ];
  let selectedSite = mutable_source("");
  let selectedDepartment = mutable_source("");
  let shiftType = mutable_source("morning");
  let sites = mutable_source([]);
  let departments = mutable_source([]);
  let categoryStatus = mutable_source({});
  let categoryNotes = mutable_source({});
  let generalNotes = mutable_source("");
  let loading = mutable_source(true);
  let saving = mutable_source(false);
  let error = mutable_source(null);
  let aiLoading = mutable_source(false);
  let aiInsight = mutable_source(null);
  onMount(async () => {
    try {
      if (!$localUser()) {
        goto("/signin");
        return;
      }
      const { data: { user: user2 } } = await supabase.auth.getUser();
      if (!user2) throw new Error("Not authenticated");
      const { data: profile } = await supabase.from("profiles").select("company_id").eq("id", user2.id).single();
      if (!(profile == null ? void 0 : profile.company_id)) throw new Error("Company not found");
      const [{ data: sitesData }, { data: deptsData }] = await Promise.all([
        supabase.from("sites").select("*").eq("company_id", profile.company_id),
        supabase.from("departments").select("*").eq("company_id", profile.company_id)
      ]);
      if (sitesData) set(sites, sitesData);
      if (deptsData) set(departments, deptsData);
      categories.forEach((cat) => {
        mutate(categoryStatus, get(categoryStatus)[cat.id] = "green");
        mutate(categoryNotes, get(categoryNotes)[cat.id] = "");
      });
    } catch (e) {
      console.error("Error loading data:", e);
      set(error, e instanceof Error ? e.message : "Failed to load data");
    } finally {
      set(loading, false);
    }
  });
  async function handleStatusChange(category, status) {
    mutate(categoryStatus, get(categoryStatus)[category] = status);
  }
  async function requestAIInsights() {
    if (get(aiLoading)) return;
    set(aiLoading, true);
    try {
      const response = await fetch("/checkin/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categories: Object.entries(get(categoryStatus)).map(([id, status]) => ({
            id,
            status,
            notes: get(categoryNotes)[id]
          })),
          generalNotes: get(generalNotes)
        })
      });
      if (!response.ok) throw new Error("Failed to get AI insights");
      set(aiInsight, await response.json());
    } catch (e) {
      console.error("Error getting AI insights:", e);
    } finally {
      set(aiLoading, false);
    }
  }
  async function handleSubmit() {
    if (!get(selectedSite) || !get(selectedDepartment)) {
      set(error, "Please select site and department");
      return;
    }
    set(saving, true);
    set(error, null);
    try {
      const { data: { user: user2 } } = await supabase.auth.getUser();
      if (!user2) throw new Error("Not authenticated");
      const { data: profile } = await supabase.from("profiles").select("company_id").eq("id", user2.id).single();
      if (!(profile == null ? void 0 : profile.company_id)) throw new Error("Company not found");
      const { data: checkin, error: checkinError } = await supabase.from("daily_checkins").insert({
        company_id: profile.company_id,
        site_id: get(selectedSite),
        department_id: get(selectedDepartment),
        created_by: user2.id,
        shift_type: get(shiftType),
        notes: get(generalNotes)
      }).select().single();
      if (checkinError) throw checkinError;
      const categoryPromises = Object.entries(get(categoryStatus)).map(([category, status]) => supabase.from("checkin_categories").insert({
        checkin_id: checkin.id,
        category,
        status,
        notes: get(categoryNotes)[category]
      }));
      await Promise.all(categoryPromises);
      goto("/dashboard");
    } catch (e) {
      console.error("Error saving checkin:", e);
      set(error, e instanceof Error ? e.message : "Failed to save checkin");
    } finally {
      set(saving, false);
    }
  }
  legacy_pre_effect(
    () => (get(departments), get(selectedSite)),
    () => {
      set(filteredDepartments, get(departments).filter((dept) => !get(selectedSite) || dept.site_id === get(selectedSite)));
    }
  );
  legacy_pre_effect_reset();
  init();
  var div = root();
  var node = child(div);
  Sidebar(node, {
    get isOpen() {
      return get(isSidebarOpen);
    },
    set isOpen($$value) {
      set(isSidebarOpen, $$value);
    },
    $$legacy: true
  });
  var div_1 = sibling(node, 2);
  let classes;
  var div_2 = child(div_1);
  var div_3 = child(div_2);
  var div_4 = child(div_3);
  var h1 = child(div_4);
  var text = child(h1, true);
  reset(h1);
  var p = sibling(h1, 2);
  var text_1 = child(p, true);
  reset(p);
  reset(div_4);
  var div_5 = sibling(div_4, 2);
  var div_6 = child(div_5);
  var node_1 = child(div_6);
  Calendar(node_1, { class: "w-4 h-4 inline-block mr-1" });
  var text_2 = sibling(node_1);
  reset(div_6);
  var div_7 = sibling(div_6, 2);
  var node_2 = child(div_7);
  Clock(node_2, { class: "w-4 h-4 inline-block mr-1" });
  var text_3 = sibling(node_2);
  reset(div_7);
  reset(div_5);
  reset(div_3);
  var node_3 = sibling(div_3, 2);
  {
    var consequent = ($$anchor2) => {
      var div_8 = root_1();
      append($$anchor2, div_8);
    };
    var alternate = ($$anchor2) => {
      var div_9 = root_2();
      var div_10 = child(div_9);
      var div_11 = child(div_10);
      var label = child(div_11);
      var text_4 = child(label, true);
      reset(label);
      var select = sibling(label, 2);
      template_effect(() => {
        get(selectedSite);
        invalidate_inner_signals(() => {
          get(sites);
        });
      });
      var option = child(select);
      option.value = null == (option.__value = "") ? "" : "";
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
      reset(div_11);
      var div_12 = sibling(div_11, 2);
      var label_1 = child(div_12);
      var text_6 = child(label_1, true);
      reset(label_1);
      var select_1 = sibling(label_1, 2);
      template_effect(() => {
        get(selectedDepartment);
        invalidate_inner_signals(() => {
          get(selectedSite);
          get(filteredDepartments);
        });
      });
      var option_2 = child(select_1);
      option_2.value = null == (option_2.__value = "") ? "" : "";
      var node_5 = sibling(option_2);
      each(node_5, 1, () => get(filteredDepartments), index, ($$anchor3, department) => {
        var option_3 = root_4();
        var option_3_value = {};
        var text_7 = child(option_3, true);
        reset(option_3);
        template_effect(() => {
          if (option_3_value !== (option_3_value = get(department).id)) {
            option_3.value = null == (option_3.__value = get(department).id) ? "" : get(department).id;
          }
          set_text(text_7, get(department).name);
        });
        append($$anchor3, option_3);
      });
      reset(select_1);
      reset(div_12);
      reset(div_10);
      var div_13 = sibling(div_10, 2);
      var label_2 = child(div_13);
      var text_8 = child(label_2, true);
      reset(label_2);
      var div_14 = sibling(label_2, 2);
      var label_3 = child(div_14);
      var input = child(label_3);
      remove_input_defaults(input);
      input.value = null == (input.__value = "morning") ? "" : "morning";
      var span = sibling(input, 2);
      var text_9 = child(span, true);
      reset(span);
      reset(label_3);
      var label_4 = sibling(label_3, 2);
      var input_1 = child(label_4);
      remove_input_defaults(input_1);
      input_1.value = null == (input_1.__value = "afternoon") ? "" : "afternoon";
      var span_1 = sibling(input_1, 2);
      var text_10 = child(span_1, true);
      reset(span_1);
      reset(label_4);
      var label_5 = sibling(label_4, 2);
      var input_2 = child(label_5);
      remove_input_defaults(input_2);
      input_2.value = null == (input_2.__value = "night") ? "" : "night";
      var span_2 = sibling(input_2, 2);
      var text_11 = child(span_2, true);
      reset(span_2);
      reset(label_5);
      reset(div_14);
      reset(div_13);
      var div_15 = sibling(div_13, 2);
      var h2 = child(div_15);
      var text_12 = child(h2, true);
      reset(h2);
      var node_6 = sibling(h2, 2);
      each(node_6, 1, () => categories, index, ($$anchor3, category) => {
        var div_16 = root_5();
        var div_17 = child(div_16);
        var div_18 = child(div_17);
        var div_19 = child(div_18);
        var node_7 = child(div_19);
        component(node_7, () => get(category).icon, ($$anchor4, $$component) => {
          $$component($$anchor4, {
            get class() {
              return `w-5 h-5 text-${get(category).color ?? ""}-600`;
            }
          });
        });
        reset(div_19);
        var span_3 = sibling(div_19, 2);
        var text_13 = child(span_3, true);
        reset(span_3);
        reset(div_18);
        var div_20 = sibling(div_18, 2);
        var button = child(div_20);
        var span_4 = child(button);
        var text_14 = child(span_4, true);
        reset(span_4);
        reset(button);
        var button_1 = sibling(button, 2);
        var span_5 = child(button_1);
        var text_15 = child(span_5, true);
        reset(span_5);
        reset(button_1);
        var button_2 = sibling(button_1, 2);
        var span_6 = child(button_2);
        var text_16 = child(span_6, true);
        reset(span_6);
        reset(button_2);
        reset(div_20);
        reset(div_17);
        var div_21 = sibling(div_17, 2);
        var textarea = child(div_21);
        remove_textarea_child(textarea);
        reset(div_21);
        reset(div_16);
        template_effect(
          ($0, $1, $2, $3, $4) => {
            set_class(div_19, 1, `p-2 rounded-lg bg-${get(category).color ?? ""}-100`);
            set_text(text_13, $0);
            set_class(button, 1, `w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 
                             transition-colors ${(get(categoryStatus)[get(category).id] === "green" ? "ring-2 ring-green-500" : "") ?? ""}`);
            set_text(text_14, $1);
            set_class(button_1, 1, `w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200 
                             transition-colors ${(get(categoryStatus)[get(category).id] === "yellow" ? "ring-2 ring-yellow-500" : "") ?? ""}`);
            set_text(text_15, $2);
            set_class(button_2, 1, `w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 
                             transition-colors ${(get(categoryStatus)[get(category).id] === "red" ? "ring-2 ring-red-500" : "") ?? ""}`);
            set_text(text_16, $3);
            set_attribute(textarea, "placeholder", $4);
          },
          [
            () => $_()(`sqcdpe.${get(category).id}`),
            () => $_()("sqcdpe.green"),
            () => $_()("sqcdpe.yellow"),
            () => $_()("sqcdpe.red"),
            () => `${$_()("checkin.addGeneralNotes")} ${$_()(`sqcdpe.${get(category).id}`)}...`
          ],
          derived_safe_equal
        );
        event("click", button, () => handleStatusChange(get(category).id, "green"));
        event("click", button_1, () => handleStatusChange(get(category).id, "yellow"));
        event("click", button_2, () => handleStatusChange(get(category).id, "red"));
        bind_value(textarea, () => get(categoryNotes)[get(category).id], ($$value) => mutate(categoryNotes, get(categoryNotes)[get(category).id] = $$value));
        append($$anchor3, div_16);
      });
      reset(div_15);
      var div_22 = sibling(div_15, 2);
      var label_6 = child(div_22);
      var text_17 = child(label_6, true);
      reset(label_6);
      var textarea_1 = sibling(label_6, 2);
      remove_textarea_child(textarea_1);
      reset(div_22);
      var div_23 = sibling(div_22, 2);
      var button_3 = child(div_23);
      var node_8 = child(button_3);
      Brain(node_8, { class: "w-5 h-5" });
      var span_7 = sibling(node_8, 2);
      var text_18 = child(span_7, true);
      reset(span_7);
      reset(button_3);
      var node_9 = sibling(button_3, 2);
      {
        var consequent_2 = ($$anchor3) => {
          var div_24 = root_6();
          var h3 = child(div_24);
          var text_19 = child(h3, true);
          reset(h3);
          var div_25 = sibling(h3, 2);
          var p_1 = child(div_25);
          var text_20 = child(p_1, true);
          reset(p_1);
          var node_10 = sibling(p_1, 2);
          {
            var consequent_1 = ($$anchor4) => {
              var fragment = root_7();
              var ul = sibling(first_child(fragment), 2);
              each(ul, 5, () => get(aiInsight).recommendations, index, ($$anchor5, rec) => {
                var li = root_8();
                var text_21 = child(li, true);
                reset(li);
                template_effect(() => set_text(text_21, get(rec)));
                append($$anchor5, li);
              });
              reset(ul);
              append($$anchor4, fragment);
            };
            if_block(node_10, ($$render) => {
              var _a;
              if ((_a = get(aiInsight).recommendations) == null ? void 0 : _a.length) $$render(consequent_1);
            });
          }
          reset(div_25);
          reset(div_24);
          template_effect(
            ($0) => {
              set_text(text_19, $0);
              set_text(text_20, get(aiInsight).summary);
            },
            [() => $_()("checkin.aiAnalysis")],
            derived_safe_equal
          );
          append($$anchor3, div_24);
        };
        if_block(node_9, ($$render) => {
          if (get(aiInsight)) $$render(consequent_2);
        });
      }
      reset(div_23);
      var node_11 = sibling(div_23, 2);
      {
        var consequent_3 = ($$anchor3) => {
          var div_26 = root_9();
          var node_12 = child(div_26);
          Triangle_alert(node_12, { class: "w-5 h-5 flex-shrink-0 mt-0.5" });
          var span_8 = sibling(node_12, 2);
          var text_22 = child(span_8, true);
          reset(span_8);
          reset(div_26);
          template_effect(() => set_text(text_22, get(error)));
          transition(3, div_26, () => fly, () => ({ y: 10, duration: 300 }));
          append($$anchor3, div_26);
        };
        if_block(node_11, ($$render) => {
          if (get(error)) $$render(consequent_3);
        });
      }
      var div_27 = sibling(node_11, 2);
      var button_4 = child(div_27);
      var node_13 = child(button_4);
      {
        var consequent_4 = ($$anchor3) => {
          var fragment_1 = root_10();
          var span_9 = sibling(first_child(fragment_1), 2);
          var text_23 = child(span_9, true);
          reset(span_9);
          template_effect(($0) => set_text(text_23, $0), [() => $_()("common.saving")], derived_safe_equal);
          append($$anchor3, fragment_1);
        };
        var alternate_1 = ($$anchor3) => {
          var fragment_2 = root_11();
          var node_14 = first_child(fragment_2);
          Save(node_14, { class: "w-5 h-5" });
          var span_10 = sibling(node_14, 2);
          var text_24 = child(span_10, true);
          reset(span_10);
          template_effect(($0) => set_text(text_24, $0), [() => $_()("checkin.submitCheckin")], derived_safe_equal);
          append($$anchor3, fragment_2);
        };
        if_block(node_13, ($$render) => {
          if (get(saving)) $$render(consequent_4);
          else $$render(alternate_1, false);
        });
      }
      reset(button_4);
      reset(div_27);
      reset(div_9);
      template_effect(
        ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) => {
          set_text(text_4, $0);
          set_text(text_6, $1);
          select_1.disabled = !get(selectedSite);
          set_text(text_8, $2);
          set_text(text_9, $3);
          set_text(text_10, $4);
          set_text(text_11, $5);
          set_text(text_12, $6);
          set_text(text_17, $7);
          set_attribute(textarea_1, "placeholder", $8);
          button_3.disabled = get(aiLoading);
          set_text(text_18, $9);
          button_4.disabled = get(saving);
        },
        [
          () => $_()("checkin.site"),
          () => $_()("checkin.department"),
          () => $_()("checkin.shift"),
          () => $_()("checkin.morning"),
          () => $_()("checkin.afternoon"),
          () => $_()("checkin.night"),
          () => $_()("checkin.categoryStatus"),
          () => $_()("checkin.generalNotes"),
          () => $_()("checkin.addGeneralNotes"),
          () => get(aiLoading) ? $_()("checkin.analyzing") : $_()("checkin.getAIInsights")
        ],
        derived_safe_equal
      );
      bind_select_value(select, () => get(selectedSite), ($$value) => set(selectedSite, $$value));
      bind_select_value(select_1, () => get(selectedDepartment), ($$value) => set(selectedDepartment, $$value));
      bind_group(binding_group, [], input, () => get(shiftType), ($$value) => set(shiftType, $$value));
      bind_group(binding_group, [], input_1, () => get(shiftType), ($$value) => set(shiftType, $$value));
      bind_group(binding_group, [], input_2, () => get(shiftType), ($$value) => set(shiftType, $$value));
      bind_value(textarea_1, () => get(generalNotes), ($$value) => set(generalNotes, $$value));
      event("click", button_3, requestAIInsights);
      event("click", button_4, handleSubmit);
      append($$anchor2, div_9);
    };
    if_block(node_3, ($$render) => {
      if (get(loading)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(div_2);
  reset(div_1);
  reset(div);
  template_effect(
    ($0, $1, $2, $3, $4) => {
      classes = set_class(div_1, 1, "min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6 flex-grow", null, classes, $0);
      set_text(text, $1);
      set_text(text_1, $2);
      set_text(text_2, ` ${$3 ?? ""}`);
      set_text(text_3, ` ${$4 ?? ""}`);
    },
    [
      () => ({
        "pl-64": get(isSidebarOpen),
        "pl-20": !get(isSidebarOpen)
      }),
      () => $_()("checkin.dailyCheckin"),
      () => $_()("checkin.preShiftMeeting"),
      () => (/* @__PURE__ */ new Date()).toLocaleDateString(),
      () => (/* @__PURE__ */ new Date()).toLocaleTimeString()
    ],
    derived_safe_equal
  );
  append($$anchor, div);
  pop();
  $$cleanup();
}
export {
  _page as component
};
//# sourceMappingURL=12.Csg99zgt.js.map
