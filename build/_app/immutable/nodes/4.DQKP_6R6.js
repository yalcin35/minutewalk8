import { t as template, a as append } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { p as push, o as onMount, l as legacy_pre_effect, a as legacy_pre_effect_reset, t as template_effect, b as pop, s as sibling, c as child, g as get, m as mutable_source, d as set, r as reset, e as mutate, n as next, h as derived_safe_equal, u as update, f as first_child } from "../chunks/BXHzHFYX.js";
import { e as event, r as remove_textarea_child, s as set_text } from "../chunks/D8_nd-i4.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { e as each, i as index, a as set_style, b as set_value, c as set_class } from "../chunks/CQ5zajJZ.js";
import { t as transition, f as fly } from "../chunks/B1ns0h2F.js";
import { a as setup_stores, b as store_get } from "../chunks/CnKbWtpd.js";
import { s as spring, P as PhotoUpload, a as PhotoDisplay, A as AIInsights, C as Chevron_left, b as Chevron_right, g as getAIInsights } from "../chunks/hmB93t6v.js";
import { q as questions } from "../chunks/DiESHsQE.js";
import { s as supabase } from "../chunks/Bnago9pU.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import "../chunks/HJ-2R3CP.js";
import { B as Brain } from "../chunks/DqLQEwYL.js";
import { R as Refresh_cw } from "../chunks/4bm3SFb5.js";
import { S as Save } from "../chunks/Baani2JM.js";
var root_2 = template(`<div class="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"></div>`);
var root_1 = template(`<button><span class="text-lg font-medium"></span> <!></button>`);
var root_3 = template(`<button class="flex items-center space-x-2 px-4 py-2 bg-purple-50 
                     text-purple-600 rounded-lg hover:bg-purple-100 
                     transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed"><!> <span>Get AI Review</span></button>`);
var root_4 = template(`<button class="flex items-center space-x-2 px-4 py-2 bg-purple-50 
                     text-purple-600 rounded-lg hover:bg-purple-100 
                     transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed"><!> <span>Refresh AI Review</span></button>`);
var root_6 = template(`<div class="bg-red-50 text-red-600 p-4 rounded-lg flex items-start space-x-2"><span> </span></div>`);
var root_7 = template(`<button class="w-12 h-12 rounded-xl bg-white text-blue-500 shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-blue-500
               focus:ring-offset-2"><!></button>`);
var root_9 = template(`<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> <span>Saving...</span>`, 1);
var root_10 = template(`<!> <span>Save Audit</span>`, 1);
var root_8 = template(`<button class="px-6 h-12 rounded-xl bg-green-500 text-white shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-green-500
               focus:ring-offset-2 space-x-2 disabled:opacity-50
               disabled:cursor-not-allowed disabled:hover:scale-100"><!></button>`);
var root_11 = template(`<button class="w-12 h-12 rounded-xl bg-blue-500 text-white shadow-lg
               flex items-center justify-center transform transition-all
               duration-200 hover:scale-105 active:scale-95
               focus:outline-none focus:ring-2 focus:ring-blue-500
               focus:ring-offset-2"><!></button>`);
var root = template(`<div class="min-h-screen bg-gradient-to-br from-blue-50 to-white"><div class="fixed top-0 left-0 w-full h-1 bg-gray-100"><div class="h-full bg-blue-500 transition-all duration-300 ease-out"></div></div> <div class="bg-white shadow-sm"><div class="max-w-4xl mx-auto px-6 py-4"><h1 class="text-sm font-medium text-blue-600"> </h1> <p class="text-gray-500 text-sm mt-1"> </p></div></div> <div class="max-w-4xl mx-auto p-6 space-y-8"><div class="space-y-8"><div class="bg-white rounded-2xl shadow-lg p-6 space-y-6"><h2 class="text-xl font-light text-gray-900"> </h2> <div class="flex justify-between items-center py-4"></div> <div class="space-y-2"><label for="evidence-photos" class="text-sm font-medium text-gray-700">Evidence Photos</label> <!> <!></div> <div class="space-y-2"><label for="observation-notes" class="text-sm font-medium text-gray-700">Notes</label> <textarea id="observation-notes" class="w-full p-4 h-24 rounded-xl bg-gray-50
                   border-none text-gray-700 placeholder-gray-400
                   focus:ring-2 focus:ring-blue-500 focus:outline-none
                   resize-none" placeholder="Add your observations..."></textarea></div> <div class="flex space-x-4"><!></div></div> <!> <!></div></div> <div class="fixed bottom-8 right-8 flex space-x-4"><!> <!></div></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  const [$$stores, $$cleanup] = setup_stores();
  const $progress = () => store_get(progress, "$progress", $$stores);
  const currentQuestion = mutable_source();
  const currentAnswer = mutable_source();
  let currentQuestionIndex = mutable_source(0);
  let progress = spring(0);
  let answers = mutable_source({});
  let aiLoading = mutable_source(false);
  let aiError = mutable_source(null);
  let saving = mutable_source(false);
  let saveError = mutable_source(null);
  onMount(() => {
    {
      window.addEventListener("popstate", handlePopState);
      const state = {
        questionIndex: get(currentQuestionIndex),
        answers: get(answers)
      };
      history.replaceState(state, "", window.location.href);
    }
    return () => {
      {
        window.removeEventListener("popstate", handlePopState);
      }
    };
  });
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
  async function requestAIInsights() {
    if (get(currentAnswer).rating === 0 || !get(currentAnswer).notes) {
      set(aiError, "Please provide a rating and notes before requesting AI insights");
      return;
    }
    set(aiLoading, true);
    set(aiError, null);
    try {
      const insight = await getAIInsights(get(currentQuestion).text, get(currentAnswer).rating, get(currentAnswer).notes, get(currentAnswer).photos.map((p) => p.file));
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
    } else if (direction === "next" && get(currentQuestionIndex) < questions.length - 1) {
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
      const { error: saveError2 } = await supabase.from("audits").insert({
        user_id: user.id,
        company_id: profile.company_id,
        data: {
          version: 1,
          timestamp: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toISOString(),
          answers: auditData
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
  legacy_pre_effect(() => get(currentQuestionIndex), () => {
    set(currentQuestion, questions[get(currentQuestionIndex)]);
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
  legacy_pre_effect(() => (get(currentQuestionIndex), questions), () => {
    progress.set(get(currentQuestionIndex) / (questions.length - 1) * 100);
  });
  legacy_pre_effect_reset();
  init();
  var div = root();
  var div_1 = child(div);
  var div_2 = child(div_1);
  reset(div_1);
  var div_3 = sibling(div_1, 2);
  var div_4 = child(div_3);
  var h1 = child(div_4);
  var text = child(h1, true);
  reset(h1);
  var p_1 = sibling(h1, 2);
  var text_1 = child(p_1);
  reset(p_1);
  reset(div_4);
  reset(div_3);
  var div_5 = sibling(div_3, 2);
  var div_6 = child(div_5);
  var div_7 = child(div_6);
  var h2 = child(div_7);
  var text_2 = child(h2, true);
  reset(h2);
  var div_8 = sibling(h2, 2);
  each(div_8, 4, () => Array(5), index, ($$anchor2, _, i, $$array) => {
    var button = root_1();
    var span = child(button);
    span.textContent = i + 1;
    var node = sibling(span, 2);
    {
      var consequent = ($$anchor3) => {
        var div_9 = root_2();
        append($$anchor3, div_9);
      };
      if_block(node, ($$render) => {
        if (get(currentAnswer).rating === i + 1) $$render(consequent);
      });
    }
    reset(button);
    template_effect(() => set_class(button, 1, `w-14 h-14 rounded-xl transition-all duration-200
                     hover:bg-blue-50 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2 relative
                     ${(get(currentAnswer).rating === i + 1 ? "bg-blue-500 text-white shadow-lg" : "bg-white shadow-md") ?? ""}`));
    event("click", button, () => handleRating(i + 1));
    append($$anchor2, button);
  });
  reset(div_8);
  var div_10 = sibling(div_8, 2);
  var node_1 = sibling(child(div_10), 2);
  PhotoUpload(node_1, {
    id: "evidence-photos",
    get photos() {
      return get(currentAnswer).photos;
    },
    $$events: { change: handlePhotos, error: handlePhotoError }
  });
  var node_2 = sibling(node_1, 2);
  PhotoDisplay(node_2, {
    get photos() {
      return get(currentAnswer).photos;
    },
    onRemove: removePhoto
  });
  reset(div_10);
  var div_11 = sibling(div_10, 2);
  var textarea = sibling(child(div_11), 2);
  remove_textarea_child(textarea);
  reset(div_11);
  var div_12 = sibling(div_11, 2);
  var node_3 = child(div_12);
  {
    var consequent_1 = ($$anchor2) => {
      var button_1 = root_3();
      var node_4 = child(button_1);
      Brain(node_4, { class: "w-5 h-5" });
      next(2);
      reset(button_1);
      template_effect(() => button_1.disabled = get(aiLoading) || !get(currentAnswer).rating || !get(currentAnswer).notes);
      event("click", button_1, requestAIInsights);
      append($$anchor2, button_1);
    };
    var alternate = ($$anchor2) => {
      var button_2 = root_4();
      var node_5 = child(button_2);
      const expression = derived_safe_equal(() => get(aiLoading) ? "animate-spin" : "");
      Refresh_cw(node_5, {
        get class() {
          return `w-5 h-5 ${get(expression) ?? ""}`;
        }
      });
      next(2);
      reset(button_2);
      template_effect(() => button_2.disabled = get(aiLoading));
      event("click", button_2, requestAIInsights);
      append($$anchor2, button_2);
    };
    if_block(node_3, ($$render) => {
      if (!get(currentAnswer).aiInsight) $$render(consequent_1);
      else $$render(alternate, false);
    });
  }
  reset(div_12);
  reset(div_7);
  var node_6 = sibling(div_7, 2);
  {
    var consequent_2 = ($$anchor2) => {
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
    if_block(node_6, ($$render) => {
      if (get(currentAnswer).rating > 0 && get(currentAnswer).notes && (get(aiLoading) || get(currentAnswer).aiInsight || get(aiError))) $$render(consequent_2);
    });
  }
  var node_7 = sibling(node_6, 2);
  {
    var consequent_3 = ($$anchor2) => {
      var div_13 = root_6();
      var span_1 = child(div_13);
      var text_3 = child(span_1, true);
      reset(span_1);
      reset(div_13);
      template_effect(() => set_text(text_3, get(saveError)));
      transition(3, div_13, () => fly, () => ({ y: 10, duration: 300 }));
      append($$anchor2, div_13);
    };
    if_block(node_7, ($$render) => {
      if (get(saveError)) $$render(consequent_3);
    });
  }
  reset(div_6);
  reset(div_5);
  var div_14 = sibling(div_5, 2);
  var node_8 = child(div_14);
  {
    var consequent_4 = ($$anchor2) => {
      var button_3 = root_7();
      var node_9 = child(button_3);
      Chevron_left(node_9, { class: "w-6 h-6" });
      reset(button_3);
      event("click", button_3, () => navigate("prev"));
      append($$anchor2, button_3);
    };
    if_block(node_8, ($$render) => {
      if (get(currentQuestionIndex) > 0) $$render(consequent_4);
    });
  }
  var node_10 = sibling(node_8, 2);
  {
    var consequent_6 = ($$anchor2) => {
      var button_4 = root_8();
      var node_11 = child(button_4);
      {
        var consequent_5 = ($$anchor3) => {
          var fragment_1 = root_9();
          next(2);
          append($$anchor3, fragment_1);
        };
        var alternate_1 = ($$anchor3) => {
          var fragment_2 = root_10();
          var node_12 = first_child(fragment_2);
          Save(node_12, { class: "w-5 h-5" });
          next(2);
          append($$anchor3, fragment_2);
        };
        if_block(node_11, ($$render) => {
          if (get(saving)) $$render(consequent_5);
          else $$render(alternate_1, false);
        });
      }
      reset(button_4);
      template_effect(() => button_4.disabled = get(saving));
      event("click", button_4, saveAudit);
      append($$anchor2, button_4);
    };
    var alternate_2 = ($$anchor2) => {
      var button_5 = root_11();
      var node_13 = child(button_5);
      Chevron_right(node_13, { class: "w-6 h-6" });
      reset(button_5);
      event("click", button_5, () => navigate("next"));
      append($$anchor2, button_5);
    };
    if_block(node_10, ($$render) => {
      if (get(currentQuestionIndex) === questions.length - 1) $$render(consequent_6);
      else $$render(alternate_2, false);
    });
  }
  reset(div_14);
  reset(div);
  template_effect(() => {
    set_style(div_2, `width: ${$progress() ?? ""}%`);
    set_text(text, get(currentQuestion).category);
    set_text(text_1, `Question ${get(currentQuestionIndex) + 1} of ${questions.length ?? ""}`);
    set_text(text_2, get(currentQuestion).text);
    set_value(textarea, get(currentAnswer).notes);
  });
  event("input", textarea, handleNotes);
  transition(1, div_6, () => fly, () => ({ y: 20, duration: 300 }));
  transition(2, div_6, () => fly, () => ({ y: -20, duration: 300 }));
  append($$anchor, div);
  pop();
  $$cleanup();
}
export {
  _page as component
};
//# sourceMappingURL=4.DQKP_6R6.js.map
