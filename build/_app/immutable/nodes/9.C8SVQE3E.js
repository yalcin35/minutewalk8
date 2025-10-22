import { t as template, a as append } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { p as push, d as set, o as onMount, l as legacy_pre_effect, a as legacy_pre_effect_reset, t as template_effect, b as pop, m as mutable_source, c as child, g as get, s as sibling, h as derived_safe_equal, e as mutate, r as reset, n as next, u as update, f as first_child } from "../chunks/BXHzHFYX.js";
import { e as event, s as set_text, r as remove_textarea_child } from "../chunks/D8_nd-i4.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { e as each, a as set_style, b as set_value, d as set_attribute, i as index, c as set_class } from "../chunks/CQ5zajJZ.js";
import { t as transition, f as fly, a as fade } from "../chunks/B1ns0h2F.js";
import { b as bind_this } from "../chunks/BSpSymUc.js";
import { s as stopPropagation } from "../chunks/CGgk3ROl.js";
import { s as spring, P as PhotoUpload, a as PhotoDisplay, A as AIInsights, C as Chevron_left, b as Chevron_right, c as bubble_event, g as getAIInsights } from "../chunks/hmB93t6v.js";
import { a as setup_stores, b as store_get } from "../chunks/CnKbWtpd.js";
import { m as mheQuestions } from "../chunks/C1LpbmO6.js";
import { C as Circle, A as AuditTimer, Q as QuestionHistory } from "../chunks/D5suuuKE.js";
import { s as supabase } from "../chunks/Bnago9pU.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import { b as browser } from "../chunks/DIcdBaaF.js";
import { $ as $locale, a as $format } from "../chunks/HJ-2R3CP.js";
import { T as Truck } from "../chunks/BiG2Bac4.js";
import { B as Brain } from "../chunks/DqLQEwYL.js";
import { R as Refresh_cw } from "../chunks/4bm3SFb5.js";
import { S as Save } from "../chunks/Baani2JM.js";
var root_3 = template(`<div class="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"></div>`);
var root_2 = template(`<button><span class="text-lg font-medium"></span> <!></button>`);
var root_4 = template(`<button class="flex items-center space-x-2 px-4 py-2 bg-purple-50 
                     text-purple-600 rounded-lg hover:bg-purple-100 
                     transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed"><!> <span>Get AI Review</span></button>`);
var root_5 = template(`<button class="flex items-center space-x-2 px-4 py-2 bg-purple-50 
                     text-purple-600 rounded-lg hover:bg-purple-100 
                     transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed"><!> <span>Refresh AI Review</span></button>`);
var root_7 = template(`<div class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"><span> </span></div>`);
var root_8 = template(`<button class="w-12 h-12 rounded-xl bg-white text-orange-500 shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-orange-500
               focus:ring-offset-2"><!></button>`);
var root_10 = template(`<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> <span>Saving...</span>`, 1);
var root_11 = template(`<!> <span>Save Audit</span>`, 1);
var root_9 = template(`<button class="px-6 h-12 rounded-xl bg-green-500 text-white shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-green-500
               focus:ring-offset-2 space-x-2 disabled:opacity-50
               disabled:cursor-not-allowed disabled:hover:scale-100"><!></button>`);
var root_12 = template(`<button class="w-12 h-12 rounded-xl bg-orange-500 text-white shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-orange-500
               focus:ring-offset-2"><!></button>`);
var root_13 = template(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]"><div class="bg-white rounded-xl p-6 max-w-md w-full space-y-4"><h3 class="text-lg font-medium text-gray-900">Are you sure you want to exit the audit?</h3> <p class="text-red-600 font-medium">WARNING: Any unsaved progress will be lost and cannot be recovered.</p> <div class="flex justify-end space-x-4"><button class="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">Cancel</button> <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                   transition-colors">Exit</button></div></div></div>`);
var root = template(`<div class="min-h-screen bg-gradient-to-br from-orange-50 to-white"><div class="fixed top-0 left-0 w-full h-1 bg-gray-100"><div class="h-full bg-orange-500 transition-all duration-300 ease-out"></div></div> <button class="fixed top-4 right-4 flex items-center space-x-2 px-4 py-2 bg-red-50 
           text-red-600 rounded-lg hover:bg-red-100 transition-colors z-50"><!> <span>Exit</span></button> <div class="bg-white shadow-sm"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center"><div class="flex-1"><h1 class="text-sm font-medium text-orange-600"> </h1> <p class="text-gray-500 text-sm mt-1"> </p></div> <div class="flex-1 flex justify-center"><div class="flex items-center space-x-2 bg-orange-50 px-3 py-1.5 rounded-lg"><!></div></div> <div class="flex-1"></div></div></div> <div class="max-w-4xl mx-auto p-6 space-y-8"><div class="space-y-8"><div class="bg-white rounded-2xl shadow-lg p-6 space-y-6"><div class="flex items-start space-x-4"><div class="bg-orange-100 p-2 rounded-full flex-shrink-0 mt-1"><!></div> <h2 class="text-xl font-light text-gray-900"> </h2></div> <!> <div class="flex justify-between items-center py-4"></div> <div class="space-y-2"><label class="text-sm font-medium text-gray-700">Evidence Photos</label> <!> <!></div> <div class="space-y-2"><label class="text-sm font-medium text-gray-700"> </label> <textarea class="w-full p-4 h-24 rounded-xl bg-gray-50
                   border-none text-gray-700 placeholder-gray-400
                   focus:ring-2 focus:ring-orange-500 focus:outline-none
                   resize-none"></textarea></div> <div class="flex space-x-4"><!></div></div> <!> <!></div></div> <div class="fixed bottom-8 right-8 flex space-x-4"><!> <!></div> <!></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const [$$stores, $$cleanup] = setup_stores();
  const $progress = () => store_get(progress, "$progress", $$stores);
  const $_ = () => store_get($format, "$_", $$stores);
  const currentQuestion = mutable_source();
  const currentAnswer = mutable_source();
  const MAX_POINTS_PER_QUESTION = 5;
  let currentQuestionIndex = mutable_source(0);
  let progress = spring(0);
  let answers = mutable_source({});
  let previousAnswers = mutable_source({});
  let aiLoading = mutable_source(false);
  let aiError = mutable_source(null);
  let saving = mutable_source(false);
  let saveError = mutable_source(null);
  let showExitModal = mutable_source(false);
  let auditSetupId = null;
  let currentSetup = mutable_source(null);
  let loadingPrevious = mutable_source(true);
  let timerRef = mutable_source({ stopTimer: () => 0 });
  let currentLocale = mutable_source();
  $locale.subscribe((value) => {
    set(currentLocale, value);
  });
  onMount(async () => {
    try {
      const { data: setupData, error: setupError } = await supabase.from("audit_setups").select(`
          id,
          site_id,
          department_id,
          audit_type,
          start_time
        `).eq("audit_type", "mhe").order("created_at", { ascending: false }).limit(1).single();
      if (setupError) throw setupError;
      if (!setupData) {
        goto("/audit/setup");
        return;
      }
      auditSetupId = setupData.id;
      set(currentSetup, {
        site_id: setupData.site_id,
        department_id: setupData.department_id,
        audit_type: setupData.audit_type,
        start_time: setupData.start_time
      });
      await loadPreviousAudits();
      if (browser) {
        window.addEventListener("popstate", handlePopState);
        const state = {
          questionIndex: get(currentQuestionIndex),
          answers: get(answers)
        };
        history.replaceState(state, "", window.location.href);
      }
    } catch (e) {
      console.error("Error loading audit setup:", e);
      e instanceof Error ? e.message : "Failed to load data";
    } finally {
      set(loadingPrevious, false);
    }
    return () => {
      {
        window.removeEventListener("popstate", handlePopState);
      }
    };
  });
  async function loadPreviousAudits() {
    if (!get(currentSetup)) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data: profile } = await supabase.from("profiles").select("company_id").eq("id", user.id).single();
      if (!(profile == null ? void 0 : profile.company_id)) throw new Error("Company not found");
      const { data: audits, error: fetchError } = await supabase.from("audit_history").select("*").eq("site_id", get(currentSetup).site_id).eq("department_id", get(currentSetup).department_id).eq("audit_type", get(currentSetup).audit_type).order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      set(previousAnswers, {});
      audits == null ? void 0 : audits.forEach((audit) => {
        const answers2 = audit.data.answers || [];
        answers2.forEach((answer) => {
          if (!get(previousAnswers)[answer.questionId]) {
            mutate(previousAnswers, get(previousAnswers)[answer.questionId] = []);
          }
          get(previousAnswers)[answer.questionId].push({
            rating: answer.rating,
            photos: answer.photos || [],
            notes: answer.notes,
            aiInsight: answer.aiInsight,
            created_at: audit.created_at,
            user: {
              full_name: audit.full_name || audit.email.split("@")[0],
              email: audit.email
            }
          });
        });
      });
    } catch (e) {
      console.error("Error loading previous audits:", e);
      throw e;
    }
  }
  function handlePopState(event2) {
    if (event2.state) {
      set(currentQuestionIndex, event2.state.questionIndex);
      set(answers, event2.state.answers);
    }
  }
  function updateHistory() {
    {
      const state = {
        questionIndex: get(currentQuestionIndex),
        answers: get(answers)
      };
      history.pushState(state, "", window.location.href);
    }
  }
  function handleTimerTick(seconds) {
  }
  async function requestAIInsights() {
    if (get(currentAnswer).rating === 0 || !get(currentAnswer).notes) {
      set(aiError, "Please provide a rating and notes before requesting AI insights");
      return;
    }
    set(aiLoading, true);
    set(aiError, null);
    try {
      const insight = await getAIInsights(get(currentQuestion).text, get(currentAnswer).rating, get(currentAnswer).notes, get(currentAnswer).photos.map((p) => p.file), "mhe");
      mutate(answers, get(answers)[get(currentQuestion).id] = {
        ...get(currentAnswer),
        aiInsight: insight
      });
      updateHistory();
    } catch (error) {
      set(aiError, "Failed to get AI insights. Please try again.");
    } finally {
      set(aiLoading, false);
    }
  }
  function handleRating(value) {
    mutate(answers, get(answers)[get(currentQuestion).id] = { ...get(currentAnswer), rating: value });
    if ("vibrate" in navigator) navigator.vibrate(15);
    updateHistory();
  }
  function handlePhotos(event2) {
    mutate(answers, get(answers)[get(currentQuestion).id] = {
      ...get(currentAnswer),
      photos: event2.detail.photos
    });
    updateHistory();
  }
  function handlePhotoError(event2) {
    console.error(event2.detail.message);
  }
  function handleNotes(event2) {
    const notes = event2.target.value;
    mutate(answers, get(answers)[get(currentQuestion).id] = { ...get(currentAnswer), notes });
    updateHistory();
  }
  function removePhoto(id) {
    const updatedPhotos = get(currentAnswer).photos.filter((p) => p.id !== id);
    mutate(answers, get(answers)[get(currentQuestion).id] = {
      ...get(currentAnswer),
      photos: updatedPhotos
    });
    updateHistory();
  }
  function navigate(direction) {
    if (direction === "prev" && get(currentQuestionIndex) > 0) {
      update(currentQuestionIndex, -1);
    } else if (direction === "next" && get(currentQuestionIndex) < mheQuestions.length - 1) {
      update(currentQuestionIndex);
    }
    if ("vibrate" in navigator) navigator.vibrate(15);
    updateHistory();
  }
  async function uploadPhotos(photos, questionId) {
    const uploadPromises = photos.map(async (photo) => {
      const fileExt = photo.file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `audit-photos/${fileName}`;
      const { error: uploadError } = await supabase.storage.from("public").upload(filePath, photo.file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("public").getPublicUrl(filePath);
      return publicUrl;
    });
    return Promise.all(uploadPromises);
  }
  async function saveAudit() {
    set(saving, true);
    set(saveError, null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      const { data: profile } = await supabase.from("profiles").select("company_id").eq("id", user.id).single();
      if (!(profile == null ? void 0 : profile.company_id)) throw new Error("Company not found");
      const duration = get(timerRef).stopTimer();
      const auditData = await Promise.all(Object.entries(get(answers)).map(async ([questionId, answer]) => {
        const photoUrls = await uploadPhotos(answer.photos, parseInt(questionId));
        return {
          questionId: parseInt(questionId),
          rating: answer.rating,
          notes: answer.notes,
          photos: photoUrls,
          aiInsight: answer.aiInsight
        };
      }));
      const totalScore = Object.values(get(answers)).reduce((sum, answer) => sum + answer.rating, 0);
      const avgScore = totalScore / Object.keys(get(answers)).length || 0;
      const totalQuestions = Object.keys(get(answers)).length;
      const maxPossiblePoints = totalQuestions * MAX_POINTS_PER_QUESTION;
      const percentageScore = totalScore / maxPossiblePoints * 100;
      const criticalIssues = Object.values(get(answers)).filter((answer) => answer.rating <= 2).length;
      const { error: saveError2 } = await supabase.from("audits").insert({
        user_id: user.id,
        company_id: profile.company_id,
        setup_id: auditSetupId,
        data: {
          version: 1,
          timestamp: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString(),
          answers: auditData,
          score: percentageScore,
          critical_issues: criticalIssues,
          duration_seconds: duration
        }
      });
      if (saveError2) throw saveError2;
      goto("/dashboard");
    } catch (error) {
      console.error("Failed to save audit:", error);
      set(saveError, error instanceof Error ? error.message : "Failed to save audit");
      set(saving, false);
    }
  }
  function handleExit() {
    set(showExitModal, true);
  }
  function confirmExit() {
    set(showExitModal, false);
    goto("/dashboard");
  }
  function cancelExit() {
    set(showExitModal, false);
  }
  legacy_pre_effect(() => get(currentQuestionIndex), () => {
    set(currentQuestion, mheQuestions[get(currentQuestionIndex)]);
  });
  legacy_pre_effect(
    () => (get(answers), get(currentQuestion)),
    () => {
      set(currentAnswer, get(answers)[get(currentQuestion).id] || {
        rating: 0,
        photos: [],
        notes: "",
        aiInsight: null
      });
    }
  );
  legacy_pre_effect(() => (get(currentQuestionIndex), mheQuestions), () => {
    progress.set(get(currentQuestionIndex) / (mheQuestions.length - 1) * 100);
  });
  legacy_pre_effect_reset();
  init();
  var div = root();
  var div_1 = child(div);
  var div_2 = child(div_1);
  reset(div_1);
  var button = sibling(div_1, 2);
  var node = child(button);
  Circle(node, { class: "w-5 h-5" });
  next(2);
  reset(button);
  var div_3 = sibling(button, 2);
  var div_4 = child(div_3);
  var div_5 = child(div_4);
  var h1 = child(div_5);
  var text = child(h1, true);
  reset(h1);
  var p_1 = sibling(h1, 2);
  var text_1 = child(p_1);
  reset(p_1);
  reset(div_5);
  var div_6 = sibling(div_5, 2);
  var div_7 = child(div_6);
  var node_1 = child(div_7);
  const expression = derived_safe_equal(() => {
    var _a;
    return ((_a = get(currentSetup)) == null ? void 0 : _a.start_time) ? new Date(get(currentSetup).start_time) : null;
  });
  bind_this(
    AuditTimer(node_1, {
      get startTime() {
        return get(expression);
      },
      onTick: handleTimerTick,
      $$legacy: true
    }),
    ($$value) => set(timerRef, $$value),
    () => get(timerRef)
  );
  reset(div_7);
  reset(div_6);
  next(2);
  reset(div_4);
  reset(div_3);
  var div_8 = sibling(div_3, 2);
  var div_9 = child(div_8);
  var div_10 = child(div_9);
  var div_11 = child(div_10);
  var div_12 = child(div_11);
  var node_2 = child(div_12);
  Truck(node_2, { class: "w-5 h-5 text-orange-600" });
  reset(div_12);
  var h2 = sibling(div_12, 2);
  var text_2 = child(h2, true);
  reset(h2);
  reset(div_11);
  var node_3 = sibling(div_11, 2);
  {
    var consequent = ($$anchor2) => {
      QuestionHistory($$anchor2, {
        get questionId() {
          return get(currentQuestion).id;
        },
        get previousAnswers() {
          return get(previousAnswers)[get(currentQuestion).id];
        }
      });
    };
    if_block(node_3, ($$render) => {
      var _a;
      if (!get(loadingPrevious) && ((_a = get(previousAnswers)[get(currentQuestion).id]) == null ? void 0 : _a.length) > 0) $$render(consequent);
    });
  }
  var div_13 = sibling(node_3, 2);
  each(div_13, 4, () => Array(5), index, ($$anchor2, _, i, $$array) => {
    var button_1 = root_2();
    var span = child(button_1);
    span.textContent = i + 1;
    var node_4 = sibling(span, 2);
    {
      var consequent_1 = ($$anchor3) => {
        var div_14 = root_3();
        append($$anchor3, div_14);
      };
      if_block(node_4, ($$render) => {
        if (get(currentAnswer).rating === i + 1) $$render(consequent_1);
      });
    }
    reset(button_1);
    template_effect(() => set_class(button_1, 1, `w-14 h-14 rounded-xl transition-all duration-200
                     hover:bg-orange-50 focus:outline-none focus:ring-2
                     focus:ring-orange-500 focus:ring-offset-2 relative
                     ${(get(currentAnswer).rating === i + 1 ? "bg-orange-500 text-white shadow-lg" : "bg-white shadow-md") ?? ""}`));
    event("click", button_1, () => handleRating(i + 1));
    append($$anchor2, button_1);
  });
  reset(div_13);
  var div_15 = sibling(div_13, 2);
  var node_5 = sibling(child(div_15), 2);
  PhotoUpload(node_5, {
    get photos() {
      return get(currentAnswer).photos;
    },
    $$events: { change: handlePhotos, error: handlePhotoError }
  });
  var node_6 = sibling(node_5, 2);
  PhotoDisplay(node_6, {
    get photos() {
      return get(currentAnswer).photos;
    },
    onRemove: removePhoto
  });
  reset(div_15);
  var div_16 = sibling(div_15, 2);
  var label = child(div_16);
  var text_3 = child(label, true);
  reset(label);
  var textarea = sibling(label, 2);
  remove_textarea_child(textarea);
  reset(div_16);
  var div_17 = sibling(div_16, 2);
  var node_7 = child(div_17);
  {
    var consequent_2 = ($$anchor2) => {
      var button_2 = root_4();
      var node_8 = child(button_2);
      Brain(node_8, { class: "w-5 h-5" });
      next(2);
      reset(button_2);
      template_effect(() => button_2.disabled = get(aiLoading) || !get(currentAnswer).rating || !get(currentAnswer).notes);
      event("click", button_2, requestAIInsights);
      append($$anchor2, button_2);
    };
    var alternate = ($$anchor2) => {
      var button_3 = root_5();
      var node_9 = child(button_3);
      const expression_1 = derived_safe_equal(() => get(aiLoading) ? "animate-spin" : "");
      Refresh_cw(node_9, {
        get class() {
          return `w-5 h-5 ${get(expression_1) ?? ""}`;
        }
      });
      next(2);
      reset(button_3);
      template_effect(() => button_3.disabled = get(aiLoading));
      event("click", button_3, requestAIInsights);
      append($$anchor2, button_3);
    };
    if_block(node_7, ($$render) => {
      if (!get(currentAnswer).aiInsight) $$render(consequent_2);
      else $$render(alternate, false);
    });
  }
  reset(div_17);
  reset(div_10);
  var node_10 = sibling(div_10, 2);
  {
    var consequent_3 = ($$anchor2) => {
      AIInsights($$anchor2, {
        get insight() {
          return get(currentAnswer).aiInsight;
        },
        get loading() {
          return get(aiLoading);
        },
        get error() {
          return get(aiError);
        }
      });
    };
    if_block(node_10, ($$render) => {
      if (get(currentAnswer).rating > 0 && get(currentAnswer).notes && (get(aiLoading) || get(currentAnswer).aiInsight || get(aiError))) $$render(consequent_3);
    });
  }
  var node_11 = sibling(node_10, 2);
  {
    var consequent_4 = ($$anchor2) => {
      var div_18 = root_7();
      var span_1 = child(div_18);
      var text_4 = child(span_1, true);
      reset(span_1);
      reset(div_18);
      template_effect(() => set_text(text_4, get(saveError)));
      transition(3, div_18, () => fly, () => ({ y: 10, duration: 300 }));
      append($$anchor2, div_18);
    };
    if_block(node_11, ($$render) => {
      if (get(saveError)) $$render(consequent_4);
    });
  }
  reset(div_9);
  reset(div_8);
  var div_19 = sibling(div_8, 2);
  var node_12 = child(div_19);
  {
    var consequent_5 = ($$anchor2) => {
      var button_4 = root_8();
      var node_13 = child(button_4);
      Chevron_left(node_13, { class: "w-6 h-6" });
      reset(button_4);
      event("click", button_4, () => navigate("prev"));
      append($$anchor2, button_4);
    };
    if_block(node_12, ($$render) => {
      if (get(currentQuestionIndex) > 0) $$render(consequent_5);
    });
  }
  var node_14 = sibling(node_12, 2);
  {
    var consequent_7 = ($$anchor2) => {
      var button_5 = root_9();
      var node_15 = child(button_5);
      {
        var consequent_6 = ($$anchor3) => {
          var fragment_2 = root_10();
          next(2);
          append($$anchor3, fragment_2);
        };
        var alternate_1 = ($$anchor3) => {
          var fragment_3 = root_11();
          var node_16 = first_child(fragment_3);
          Save(node_16, { class: "w-5 h-5" });
          next(2);
          append($$anchor3, fragment_3);
        };
        if_block(node_15, ($$render) => {
          if (get(saving)) $$render(consequent_6);
          else $$render(alternate_1, false);
        });
      }
      reset(button_5);
      template_effect(() => button_5.disabled = get(saving));
      event("click", button_5, saveAudit);
      append($$anchor2, button_5);
    };
    var alternate_2 = ($$anchor2) => {
      var button_6 = root_12();
      var node_17 = child(button_6);
      Chevron_right(node_17, { class: "w-6 h-6" });
      reset(button_6);
      event("click", button_6, () => navigate("next"));
      append($$anchor2, button_6);
    };
    if_block(node_14, ($$render) => {
      if (get(currentQuestionIndex) === mheQuestions.length - 1) $$render(consequent_7);
      else $$render(alternate_2, false);
    });
  }
  reset(div_19);
  var node_18 = sibling(div_19, 2);
  {
    var consequent_8 = ($$anchor2) => {
      var div_20 = root_13();
      var div_21 = child(div_20);
      var div_22 = sibling(child(div_21), 4);
      var button_7 = child(div_22);
      var button_8 = sibling(button_7, 2);
      reset(div_22);
      reset(div_21);
      reset(div_20);
      event("click", button_7, cancelExit);
      event("click", button_8, confirmExit);
      event("click", div_21, stopPropagation(function($$arg) {
        bubble_event.call(this, $$props, $$arg);
      }));
      transition(3, div_20, () => fade, () => ({ duration: 200 }));
      event("click", div_20, cancelExit);
      append($$anchor2, div_20);
    };
    if_block(node_18, ($$render) => {
      if (get(showExitModal)) $$render(consequent_8);
    });
  }
  reset(div);
  template_effect(
    ($0, $1) => {
      set_style(div_2, `width: ${$progress() ?? ""}%`);
      set_text(text, get(currentQuestion).category);
      set_text(text_1, `Question ${get(currentQuestionIndex) + 1} of ${mheQuestions.length ?? ""}`);
      set_text(text_2, get(currentLocale) === "de" && get(currentQuestion).text_de ? get(currentQuestion).text_de : get(currentLocale) === "tr" && get(currentQuestion).text_tr ? get(currentQuestion).text_tr : get(currentQuestion).text);
      set_text(text_3, $0);
      set_value(textarea, get(currentAnswer).notes);
      set_attribute(textarea, "placeholder", $1);
    },
    [
      () => $_()("walks.notes"),
      () => $_()("walks.addNotes")
    ],
    derived_safe_equal
  );
  event("click", button, handleExit);
  event("input", textarea, handleNotes);
  transition(1, div_9, () => fly, () => ({ y: 20, duration: 300 }));
  transition(2, div_9, () => fly, () => ({ y: -20, duration: 300 }));
  append($$anchor, div);
  pop();
  $$cleanup();
}
export {
  _page as component
};
//# sourceMappingURL=9.C8SVQE3E.js.map
