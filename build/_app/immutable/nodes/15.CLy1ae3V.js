import { c as comment, a as append, t as template } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { f as first_child, p as push, o as onMount, l as legacy_pre_effect, a as legacy_pre_effect_reset, t as template_effect, c as child, s as sibling, g as get, b as pop, d as set, m as mutable_source, r as reset, n as next, i as invalidate_inner_signals, h as derived_safe_equal } from "../chunks/BXHzHFYX.js";
import { e as event, s as set_text } from "../chunks/D8_nd-i4.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { I as Icon, s as slot, r as remove_input_defaults, c as set_class, e as each, i as index } from "../chunks/CQ5zajJZ.js";
import { c as component } from "../chunks/Yy-EATei.js";
import { t as transition, s as slide, a as fade } from "../chunks/B1ns0h2F.js";
import { b as bind_value } from "../chunks/7QZrl-aJ.js";
import { b as bind_select_value } from "../chunks/BR-G7xfO.js";
import { s as supabase } from "../chunks/Bnago9pU.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import { H as History, P as Plus } from "../chunks/Cur7I4rm.js";
import { A as Arrow_right } from "../chunks/Dwi-sorD.js";
import { C as Clipboard_check } from "../chunks/BC922t_S.js";
import { l as legacy_rest_props, s as spread_props } from "../chunks/CnKbWtpd.js";
import { C as Chevron_up, a as Chevron_down } from "../chunks/BUNlCGfg.js";
import { M as Map } from "../chunks/IquHQOCh.js";
import { B as Building_2 } from "../chunks/D2SreymE.js";
import { S as Star } from "../chunks/CB6mNksc.js";
import { L as Leaf, D as Dollar_sign, B as Badge_check } from "../chunks/9QYRPvAh.js";
import { U as Users } from "../chunks/DKDK7n9-.js";
import { T as Truck } from "../chunks/BiG2Bac4.js";
import { S as Shield } from "../chunks/CaYN_JBr.js";
function File($$anchor, $$props) {
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
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
      }
    ],
    ["path", { "d": "M14 2v4a2 2 0 0 0 2 2h4" }]
  ];
  Icon($$anchor, spread_props({ name: "file" }, () => $$sanitized_props, {
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
function Filter($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    [
      "polygon",
      {
        "points": "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
      }
    ]
  ];
  Icon($$anchor, spread_props({ name: "filter" }, () => $$sanitized_props, {
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
function Search($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    [
      "circle",
      { "cx": "11", "cy": "11", "r": "8" }
    ],
    ["path", { "d": "m21 21-4.3-4.3" }]
  ];
  Icon($$anchor, spread_props({ name: "search" }, () => $$sanitized_props, {
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
var root_2 = template(`<option> </option>`);
var root_3 = template(`<option> </option>`);
var root_1 = template(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-2"><label class="flex items-center space-x-2 text-sm font-medium text-gray-700"><!> <span>Site</span></label> <select class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"><option>All Sites</option><!></select></div> <div class="space-y-2"><label class="flex items-center space-x-2 text-sm font-medium text-gray-700"><!> <span>Department</span></label> <select class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     disabled:opacity-50 disabled:cursor-not-allowed"><option>All Departments</option><!></select></div></div>`);
var root_4 = template(`<div class="flex justify-center py-12"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div></div>`);
var root_6 = template(`<div class="bg-red-50 text-red-600 rounded-xl p-4"> </div>`);
var root_8 = template(`<div class="bg-white rounded-xl shadow-lg p-8 text-center"><div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4"><!></div> <h3 class="text-lg font-medium text-gray-900 mb-2"> </h3> <p class="text-gray-500">Try adjusting your filters or search criteria</p></div>`);
var root_13 = template(`<div class="flex items-center space-x-1"><!> <span> </span></div>`);
var root_15 = template(`<div class="flex items-center space-x-2"><!> <span> </span></div>`);
var root_14 = template(`<div class="border-t border-gray-100 pt-4 space-y-2"><div class="grid grid-cols-2 gap-2"></div></div>`);
var root_17 = template(`<p class="text-sm text-gray-600"><span class="font-medium">Audit Type:</span> </p> <p class="text-sm text-gray-600"><span class="font-medium">Created By:</span> </p> <p class="text-sm text-gray-600"><span class="font-medium">Critical Issues:</span> </p>`, 1);
var root_19 = template(`<p class="text-sm text-gray-600"><span class="font-medium">Notes:</span> </p>`);
var root_21 = template(`<div class="bg-gray-50 p-2 rounded-lg"><p class="text-sm text-gray-600"> </p> <div class="flex items-center space-x-2 mt-1"><span class="text-xs font-medium text-gray-500"> </span> <span class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800"> </span></div></div>`);
var root_20 = template(`<div class="mt-4"><h5 class="text-sm font-medium text-gray-700 mb-2">Action Items</h5> <div class="space-y-2"></div></div>`);
var root_18 = template(`<!> <!>`, 1);
var root_16 = template(`<div class="mt-4 pt-4 border-t border-gray-100 space-y-3"><h4 class="font-medium text-gray-800">Details</h4> <div class="space-y-2"><!></div></div>`);
var root_22 = template(`<button class="flex items-center space-x-1 px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors text-sm"><span>View Full Details</span> <!></button>`);
var root_10 = template(`<div class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"><div class="p-6 border-b border-gray-100"><div class="flex items-start justify-between"><div class="flex items-start space-x-3"><div class="p-2 rounded-lg bg-blue-100 flex-shrink-0"><!></div> <div><h3 class="font-medium text-gray-900 line-clamp-1"> </h3> <p class="text-sm text-gray-500"> </p></div></div> <div class="px-2 py-1 rounded-full text-xs font-medium 
                         bg-green-100 text-green-800"> </div></div></div> <div class="p-6 space-y-4"><div class="flex items-center justify-between"><div class="flex items-center space-x-2 text-sm text-gray-500"><!> <span> </span></div> <!></div> <div class="text-sm text-gray-500"><div class="flex items-center space-x-2"><!> <span> </span></div></div> <!> <!> <div class="flex justify-between pt-2"><button class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center space-x-1"><!> <span> </span></button> <!></div></div></div>`);
var root_9 = template(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>`);
var root = template(`<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6"><div class="max-w-6xl mx-auto space-y-8"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white"><!></div> <div><h1 class="text-2xl font-light text-gray-900">Activity History</h1> <p class="text-gray-500">View past audits and meetings</p></div></div> <a href="/dashboard" class="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 
               transition-colors flex items-center space-x-2 text-gray-700"><span>Back to Dashboard</span> <!></a></div> <div class="flex space-x-4 mb-6"><button><div class="flex items-center space-x-2"><!> <span>Audits</span></div></button> <button><div class="flex items-center space-x-2"><!> <span>SQCDPE+</span></div></button></div> <div class="bg-white rounded-xl p-6 shadow-lg space-y-6"><div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"><div class="flex-1 relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><!></div> <input type="text" class="block w-full pl-10 px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Search history..."></div> <div><select class="w-full md:w-40 px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"><option>All Time</option><option>Today</option><option>Last 7 Days</option><option>Last 30 Days</option></select></div> <button class="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-600 
                 rounded-lg hover:bg-indigo-200 transition-colors"><!> <span>More Filters</span> <!></button></div> <!></div> <!></div></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const filteredDepartments = mutable_source();
  const filteredItems = mutable_source();
  let loading = mutable_source(true);
  let error = mutable_source(null);
  let searchQuery = mutable_source("");
  let selectedTimeframe = mutable_source("all");
  let selectedSite = mutable_source("");
  let selectedDepartment = mutable_source("");
  let selectedType = mutable_source("audit");
  let showFilters = mutable_source(false);
  let expandedCardId = mutable_source(null);
  let sites = mutable_source([]);
  let departments = mutable_source([]);
  let audits = mutable_source([]);
  let checkins = mutable_source([]);
  onMount(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data: profile } = await supabase.from("profiles").select("company_id").eq("id", user.id).single();
      if (!(profile == null ? void 0 : profile.company_id)) throw new Error("Company not found");
      const [
        { data: sitesData },
        { data: deptsData },
        { data: checkinsData }
      ] = await Promise.all([
        supabase.from("sites").select("*").eq("company_id", profile.company_id),
        supabase.from("departments").select("*").eq("company_id", profile.company_id),
        supabase.from("daily_checkins").select(`
            id,
            site_id,
            department_id,
            shift_date,
            shift_type,
            notes,
            created_at,
            created_by,
            sites (name),
            departments (name),
            checkin_categories (
              category,
              status,
              notes
            ),
            checkin_actions (
              category,
              description,
              priority,
              status
            )
          `).eq("company_id", profile.company_id).order("created_at", { ascending: false })
      ]);
      if (sitesData) set(sites, sitesData);
      if (deptsData) set(departments, deptsData);
      if (checkinsData) set(checkins, checkinsData);
      const { data: auditData, error: auditError } = await supabase.from("audit_history").select(`
          audit_id,
          company_id,
          created_at,
          data,
          full_name,
          email,
          site_id,
          department_id,
          audit_type,
          site_name,
          department_name
        `).eq("company_id", profile.company_id).order("created_at", { ascending: false });
      if (auditError) throw auditError;
      set(audits, (auditData || []).map((audit) => ({
        id: audit.audit_id,
        title: `${audit.audit_type.toUpperCase()} Audit`,
        date: audit.created_at,
        site_name: audit.site_name || "Unknown Site",
        department_name: audit.department_name || "Unknown Department",
        score: audit.data.score || 0,
        status: "completed",
        details: { ...audit, type: "audit" }
      })));
    } catch (e) {
      console.error("Error loading history:", e);
      set(error, e instanceof Error ? e.message : "Failed to load history");
    } finally {
      set(loading, false);
    }
  });
  function formatDate(dateString) {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  function toggleCardDetails(id) {
    set(expandedCardId, get(expandedCardId) === id ? null : id);
  }
  function getScoreColor(score) {
    if (score >= 4) return "text-green-500";
    if (score >= 3) return "text-yellow-500";
    return "text-red-500";
  }
  function getStatusColor(status) {
    switch (status) {
      case "green":
        return "bg-green-100 text-green-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "red":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
  function getCategoryIcon(category) {
    switch (category) {
      case "safety":
        return Shield;
      case "quality":
        return Badge_check;
      case "cost":
        return Dollar_sign;
      case "delivery":
        return Truck;
      case "people":
        return Users;
      case "environment":
        return Leaf;
      case "plus":
        return Plus;
      default:
        return Clipboard_check;
    }
  }
  function handleViewDetails(item) {
    if (get(selectedType) === "audit") {
      localStorage.setItem("currentAuditData", JSON.stringify(item));
      goto("/audit/detail");
    }
  }
  legacy_pre_effect(
    () => (get(departments), get(selectedSite)),
    () => {
      set(filteredDepartments, get(departments).filter((dept) => !get(selectedSite) || dept.site_id === get(selectedSite)));
    }
  );
  legacy_pre_effect(
    () => (get(selectedType), get(audits), get(checkins), get(searchQuery), get(selectedTimeframe), get(selectedSite), get(selectedDepartment)),
    () => {
      set(filteredItems, (get(selectedType) === "audit" ? get(audits) : get(checkins)).filter((item) => {
        if (get(searchQuery)) {
          const query = get(searchQuery).toLowerCase();
          return item.title.toLowerCase().includes(query) || item.site_name.toLowerCase().includes(query) || item.department_name.toLowerCase().includes(query);
        }
        return true;
      }).filter((item) => {
        const itemDate = new Date(item.date);
        const now = /* @__PURE__ */ new Date();
        if (get(selectedTimeframe) === "today") {
          return itemDate.toDateString() === now.toDateString();
        } else if (get(selectedTimeframe) === "week") {
          const oneWeekAgo = /* @__PURE__ */ new Date();
          oneWeekAgo.setDate(now.getDate() - 7);
          return itemDate >= oneWeekAgo;
        } else if (get(selectedTimeframe) === "month") {
          const oneMonthAgo = /* @__PURE__ */ new Date();
          oneMonthAgo.setMonth(now.getMonth() - 1);
          return itemDate >= oneMonthAgo;
        }
        return true;
      }).filter((item) => {
        if (get(selectedSite)) {
          return item.details.site_id === get(selectedSite);
        }
        return true;
      }).filter((item) => {
        if (get(selectedDepartment)) {
          return item.details.department_id === get(selectedDepartment);
        }
        return true;
      }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
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
  History(node, { class: "w-6 h-6" });
  reset(div_4);
  next(2);
  reset(div_3);
  var a_1 = sibling(div_3, 2);
  var node_1 = sibling(child(a_1), 2);
  Arrow_right(node_1, { class: "w-4 h-4 transform rotate-180" });
  reset(a_1);
  reset(div_2);
  var div_5 = sibling(div_2, 2);
  var button = child(div_5);
  var div_6 = child(button);
  var node_2 = child(div_6);
  Clipboard_check(node_2, { class: "w-5 h-5" });
  next(2);
  reset(div_6);
  reset(button);
  var button_1 = sibling(button, 2);
  var div_7 = child(button_1);
  var node_3 = child(div_7);
  Plus(node_3, { class: "w-5 h-5" });
  next(2);
  reset(div_7);
  reset(button_1);
  reset(div_5);
  var div_8 = sibling(div_5, 2);
  var div_9 = child(div_8);
  var div_10 = child(div_9);
  var div_11 = child(div_10);
  var node_4 = child(div_11);
  Search(node_4, { class: "h-5 w-5 text-gray-400" });
  reset(div_11);
  var input = sibling(div_11, 2);
  remove_input_defaults(input);
  reset(div_10);
  var div_12 = sibling(div_10, 2);
  var select = child(div_12);
  template_effect(() => {
    get(selectedTimeframe);
    invalidate_inner_signals(() => {
    });
  });
  var option = child(select);
  option.value = null == (option.__value = "all") ? "" : "all";
  var option_1 = sibling(option);
  option_1.value = null == (option_1.__value = "today") ? "" : "today";
  var option_2 = sibling(option_1);
  option_2.value = null == (option_2.__value = "week") ? "" : "week";
  var option_3 = sibling(option_2);
  option_3.value = null == (option_3.__value = "month") ? "" : "month";
  reset(select);
  reset(div_12);
  var button_2 = sibling(div_12, 2);
  var node_5 = child(button_2);
  Filter(node_5, { class: "w-5 h-5" });
  var node_6 = sibling(node_5, 4);
  component(node_6, () => get(showFilters) ? Chevron_up : Chevron_down, ($$anchor2, $$component) => {
    $$component($$anchor2, { class: "w-4 h-4" });
  });
  reset(button_2);
  reset(div_9);
  var node_7 = sibling(div_9, 2);
  {
    var consequent = ($$anchor2) => {
      var div_13 = root_1();
      var div_14 = child(div_13);
      var label = child(div_14);
      var node_8 = child(label);
      Map(node_8, { class: "w-4 h-4" });
      next(2);
      reset(label);
      var select_1 = sibling(label, 2);
      template_effect(() => {
        get(selectedSite);
        invalidate_inner_signals(() => {
          get(sites);
        });
      });
      var option_4 = child(select_1);
      option_4.value = null == (option_4.__value = "") ? "" : "";
      var node_9 = sibling(option_4);
      each(node_9, 1, () => get(sites), index, ($$anchor3, site) => {
        var option_5 = root_2();
        var option_5_value = {};
        var text = child(option_5, true);
        reset(option_5);
        template_effect(() => {
          if (option_5_value !== (option_5_value = get(site).id)) {
            option_5.value = null == (option_5.__value = get(site).id) ? "" : get(site).id;
          }
          set_text(text, get(site).name);
        });
        append($$anchor3, option_5);
      });
      reset(select_1);
      reset(div_14);
      var div_15 = sibling(div_14, 2);
      var label_1 = child(div_15);
      var node_10 = child(label_1);
      Building_2(node_10, { class: "w-4 h-4" });
      next(2);
      reset(label_1);
      var select_2 = sibling(label_1, 2);
      template_effect(() => {
        get(selectedDepartment);
        invalidate_inner_signals(() => {
          get(selectedSite);
          get(filteredDepartments);
        });
      });
      var option_6 = child(select_2);
      option_6.value = null == (option_6.__value = "") ? "" : "";
      var node_11 = sibling(option_6);
      each(node_11, 1, () => get(filteredDepartments), index, ($$anchor3, department) => {
        var option_7 = root_3();
        var option_7_value = {};
        var text_1 = child(option_7, true);
        reset(option_7);
        template_effect(() => {
          if (option_7_value !== (option_7_value = get(department).id)) {
            option_7.value = null == (option_7.__value = get(department).id) ? "" : get(department).id;
          }
          set_text(text_1, get(department).name);
        });
        append($$anchor3, option_7);
      });
      reset(select_2);
      reset(div_15);
      reset(div_13);
      template_effect(() => select_2.disabled = !get(selectedSite));
      bind_select_value(select_1, () => get(selectedSite), ($$value) => set(selectedSite, $$value));
      bind_select_value(select_2, () => get(selectedDepartment), ($$value) => set(selectedDepartment, $$value));
      transition(3, div_13, () => slide, () => ({ duration: 200 }));
      append($$anchor2, div_13);
    };
    if_block(node_7, ($$render) => {
      if (get(showFilters)) $$render(consequent);
    });
  }
  reset(div_8);
  var node_12 = sibling(div_8, 2);
  {
    var consequent_1 = ($$anchor2) => {
      var div_16 = root_4();
      append($$anchor2, div_16);
    };
    var alternate = ($$anchor2, $$elseif) => {
      {
        var consequent_2 = ($$anchor3) => {
          var div_17 = root_6();
          var text_2 = child(div_17, true);
          reset(div_17);
          template_effect(() => set_text(text_2, get(error)));
          append($$anchor3, div_17);
        };
        var alternate_1 = ($$anchor3, $$elseif2) => {
          {
            var consequent_3 = ($$anchor4) => {
              var div_18 = root_8();
              var div_19 = child(div_18);
              var node_13 = child(div_19);
              File(node_13, { class: "w-8 h-8 text-gray-400" });
              reset(div_19);
              var h3 = sibling(div_19, 2);
              var text_3 = child(h3);
              reset(h3);
              next(2);
              reset(div_18);
              template_effect(() => set_text(text_3, `No ${(get(selectedType) === "audit" ? "audit" : "SQCDPE+") ?? ""} history found`));
              append($$anchor4, div_18);
            };
            var alternate_2 = ($$anchor4) => {
              var div_20 = root_9();
              each(div_20, 5, () => get(filteredItems), (item) => item.id, ($$anchor5, item) => {
                var div_21 = root_10();
                var div_22 = child(div_21);
                var div_23 = child(div_22);
                var div_24 = child(div_23);
                var div_25 = child(div_24);
                var node_14 = child(div_25);
                {
                  var consequent_4 = ($$anchor6) => {
                    Clipboard_check($$anchor6, { class: "w-5 h-5 text-blue-600" });
                  };
                  var alternate_3 = ($$anchor6) => {
                    Plus($$anchor6, { class: "w-5 h-5 text-blue-600" });
                  };
                  if_block(node_14, ($$render) => {
                    if (get(selectedType) === "audit") $$render(consequent_4);
                    else $$render(alternate_3, false);
                  });
                }
                reset(div_25);
                var div_26 = sibling(div_25, 2);
                var h3_1 = child(div_26);
                var text_4 = child(h3_1, true);
                reset(h3_1);
                var p = sibling(h3_1, 2);
                var text_5 = child(p, true);
                reset(p);
                reset(div_26);
                reset(div_24);
                var div_27 = sibling(div_24, 2);
                var text_6 = child(div_27, true);
                reset(div_27);
                reset(div_23);
                reset(div_22);
                var div_28 = sibling(div_22, 2);
                var div_29 = child(div_28);
                var div_30 = child(div_29);
                var node_15 = child(div_30);
                Map(node_15, { class: "w-4 h-4" });
                var span = sibling(node_15, 2);
                var text_7 = child(span, true);
                reset(span);
                reset(div_30);
                var node_16 = sibling(div_30, 2);
                {
                  var consequent_5 = ($$anchor6) => {
                    var div_31 = root_13();
                    var node_17 = child(div_31);
                    const expression = derived_safe_equal(() => `w-4 h-4 ${getScoreColor(get(item).score || 0)}`);
                    Star(node_17, {
                      get class() {
                        return get(expression);
                      }
                    });
                    var span_1 = sibling(node_17, 2);
                    var text_8 = child(span_1, true);
                    reset(span_1);
                    reset(div_31);
                    template_effect(
                      ($0, $1) => {
                        set_class(span_1, 1, $0);
                        set_text(text_8, $1);
                      },
                      [
                        () => `text-lg ${getScoreColor(get(item).score || 0)}`,
                        () => get(item).score ? get(item).score.toFixed(1) : "N/A"
                      ],
                      derived_safe_equal
                    );
                    append($$anchor6, div_31);
                  };
                  if_block(node_16, ($$render) => {
                    if (get(selectedType) === "audit") $$render(consequent_5);
                  });
                }
                reset(div_29);
                var div_32 = sibling(div_29, 2);
                var div_33 = child(div_32);
                var node_18 = child(div_33);
                Building_2(node_18, { class: "w-4 h-4" });
                var span_2 = sibling(node_18, 2);
                var text_9 = child(span_2, true);
                reset(span_2);
                reset(div_33);
                reset(div_32);
                var node_19 = sibling(div_32, 2);
                {
                  var consequent_6 = ($$anchor6) => {
                    var div_34 = root_14();
                    var div_35 = child(div_34);
                    each(div_35, 5, () => get(item).checkin_categories, index, ($$anchor7, category) => {
                      var div_36 = root_15();
                      var node_20 = child(div_36);
                      component(node_20, () => getCategoryIcon(get(category).category), ($$anchor8, $$component) => {
                        $$component($$anchor8, { class: "w-4 h-4 text-gray-600" });
                      });
                      var span_3 = sibling(node_20, 2);
                      var text_10 = child(span_3, true);
                      reset(span_3);
                      reset(div_36);
                      template_effect(
                        ($0) => {
                          set_class(span_3, 1, $0);
                          set_text(text_10, get(category).status);
                        },
                        [
                          () => `px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(get(category).status)}`
                        ],
                        derived_safe_equal
                      );
                      append($$anchor7, div_36);
                    });
                    reset(div_35);
                    reset(div_34);
                    append($$anchor6, div_34);
                  };
                  if_block(node_19, ($$render) => {
                    if (get(selectedType) === "checkin" && get(item).checkin_categories) $$render(consequent_6);
                  });
                }
                var node_21 = sibling(node_19, 2);
                {
                  var consequent_10 = ($$anchor6) => {
                    var div_37 = root_16();
                    var div_38 = sibling(child(div_37), 2);
                    var node_22 = child(div_38);
                    {
                      var consequent_7 = ($$anchor7) => {
                        var fragment_2 = root_17();
                        var p_1 = first_child(fragment_2);
                        var text_11 = sibling(child(p_1));
                        reset(p_1);
                        var p_2 = sibling(p_1, 2);
                        var text_12 = sibling(child(p_2));
                        reset(p_2);
                        var p_3 = sibling(p_2, 2);
                        var text_13 = sibling(child(p_3));
                        reset(p_3);
                        template_effect(() => {
                          set_text(text_11, ` ${get(item).details.audit_type ?? ""}`);
                          set_text(text_12, ` ${(get(item).details.full_name || get(item).details.email) ?? ""}`);
                          set_text(text_13, ` ${get(item).details.data.critical_issues || 0}`);
                        });
                        append($$anchor7, fragment_2);
                      };
                      var alternate_4 = ($$anchor7) => {
                        var fragment_3 = root_18();
                        var node_23 = first_child(fragment_3);
                        {
                          var consequent_8 = ($$anchor8) => {
                            var p_4 = root_19();
                            var text_14 = sibling(child(p_4));
                            reset(p_4);
                            template_effect(() => set_text(text_14, ` ${get(item).notes ?? ""}`));
                            append($$anchor8, p_4);
                          };
                          if_block(node_23, ($$render) => {
                            if (get(item).notes) $$render(consequent_8);
                          });
                        }
                        var node_24 = sibling(node_23, 2);
                        {
                          var consequent_9 = ($$anchor8) => {
                            var div_39 = root_20();
                            var div_40 = sibling(child(div_39), 2);
                            each(div_40, 5, () => get(item).checkin_actions, index, ($$anchor9, action) => {
                              var div_41 = root_21();
                              var p_5 = child(div_41);
                              var text_15 = child(p_5, true);
                              reset(p_5);
                              var div_42 = sibling(p_5, 2);
                              var span_4 = child(div_42);
                              var text_16 = child(span_4, true);
                              reset(span_4);
                              var span_5 = sibling(span_4, 2);
                              var text_17 = child(span_5, true);
                              reset(span_5);
                              reset(div_42);
                              reset(div_41);
                              template_effect(() => {
                                set_text(text_15, get(action).description);
                                set_text(text_16, get(action).category);
                                set_text(text_17, get(action).status);
                              });
                              append($$anchor9, div_41);
                            });
                            reset(div_40);
                            reset(div_39);
                            append($$anchor8, div_39);
                          };
                          if_block(node_24, ($$render) => {
                            var _a;
                            if ((_a = get(item).checkin_actions) == null ? void 0 : _a.length) $$render(consequent_9);
                          });
                        }
                        append($$anchor7, fragment_3);
                      };
                      if_block(node_22, ($$render) => {
                        if (get(selectedType) === "audit") $$render(consequent_7);
                        else $$render(alternate_4, false);
                      });
                    }
                    reset(div_38);
                    reset(div_37);
                    transition(3, div_37, () => slide, () => ({ duration: 200 }));
                    append($$anchor6, div_37);
                  };
                  if_block(node_21, ($$render) => {
                    if (get(expandedCardId) === get(item).id) $$render(consequent_10);
                  });
                }
                var div_43 = sibling(node_21, 2);
                var button_3 = child(div_43);
                var node_25 = child(button_3);
                component(node_25, () => get(expandedCardId) === get(item).id ? Chevron_up : Chevron_down, ($$anchor6, $$component) => {
                  $$component($$anchor6, { class: "w-4 h-4" });
                });
                var span_6 = sibling(node_25, 2);
                var text_18 = child(span_6, true);
                reset(span_6);
                reset(button_3);
                var node_26 = sibling(button_3, 2);
                {
                  var consequent_11 = ($$anchor6) => {
                    var button_4 = root_22();
                    var node_27 = sibling(child(button_4), 2);
                    Arrow_right(node_27, { class: "w-4 h-4" });
                    reset(button_4);
                    event("click", button_4, () => handleViewDetails(get(item).details));
                    append($$anchor6, button_4);
                  };
                  if_block(node_26, ($$render) => {
                    if (get(selectedType) === "audit") $$render(consequent_11);
                  });
                }
                reset(div_43);
                reset(div_28);
                reset(div_21);
                template_effect(
                  ($0) => {
                    set_text(text_4, get(selectedType) === "audit" ? get(item).title : `${get(item).shift_type} Shift Check-in`);
                    set_text(text_5, $0);
                    set_text(text_6, get(selectedType) === "audit" ? get(item).status : get(item).shift_type);
                    set_text(text_7, get(selectedType) === "audit" ? get(item).site_name : get(item).sites.name);
                    set_text(text_9, get(selectedType) === "audit" ? get(item).department_name : get(item).departments.name);
                    set_text(text_18, get(expandedCardId) === get(item).id ? "Less Details" : "More Details");
                  },
                  [
                    () => formatDate(get(selectedType) === "audit" ? get(item).date : get(item).created_at)
                  ],
                  derived_safe_equal
                );
                event("click", button_3, () => toggleCardDetails(get(item).id));
                transition(3, div_21, () => fade, () => ({ duration: 200 }));
                append($$anchor5, div_21);
              });
              reset(div_20);
              append($$anchor4, div_20);
            };
            if_block(
              $$anchor3,
              ($$render) => {
                if (get(filteredItems).length === 0) $$render(consequent_3);
                else $$render(alternate_2, false);
              },
              $$elseif2
            );
          }
        };
        if_block(
          $$anchor2,
          ($$render) => {
            if (get(error)) $$render(consequent_2);
            else $$render(alternate_1, false);
          },
          $$elseif
        );
      }
    };
    if_block(node_12, ($$render) => {
      if (get(loading)) $$render(consequent_1);
      else $$render(alternate, false);
    });
  }
  reset(div_1);
  reset(div);
  template_effect(() => {
    set_class(button, 1, `px-4 py-2 rounded-lg transition-colors ${(get(selectedType) === "audit" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200") ?? ""}`);
    set_class(button_1, 1, `px-4 py-2 rounded-lg transition-colors ${(get(selectedType) === "checkin" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200") ?? ""}`);
  });
  event("click", button, () => set(selectedType, "audit"));
  event("click", button_1, () => set(selectedType, "checkin"));
  bind_value(input, () => get(searchQuery), ($$value) => set(searchQuery, $$value));
  bind_select_value(select, () => get(selectedTimeframe), ($$value) => set(selectedTimeframe, $$value));
  event("click", button_2, () => set(showFilters, !get(showFilters)));
  append($$anchor, div);
  pop();
}
export {
  _page as component
};
//# sourceMappingURL=15.CLy1ae3V.js.map
