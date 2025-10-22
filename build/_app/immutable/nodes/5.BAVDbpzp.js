import { t as template, a as append } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { p as push, o as onMount, t as template_effect, b as pop, c as child, h as derived_safe_equal, g as get, d as set, m as mutable_source, e as mutate, r as reset, s as sibling, f as first_child, n as next } from "../chunks/BXHzHFYX.js";
import { e as event, s as set_text } from "../chunks/D8_nd-i4.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { c as set_class, e as each, i as index, d as set_attribute } from "../chunks/CQ5zajJZ.js";
import { c as component } from "../chunks/Yy-EATei.js";
import { t as transition, s as slide } from "../chunks/B1ns0h2F.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import { q as questions } from "../chunks/DiESHsQE.js";
import { h as hseQuestions } from "../chunks/EHITfzmP.js";
import { m as mheQuestions } from "../chunks/C1LpbmO6.js";
import { g as gembaQuestions } from "../chunks/eGetAqWN.js";
import "../chunks/HJ-2R3CP.js";
import { A as Arrow_left } from "../chunks/CLBcVVt3.js";
import { C as Clipboard_check } from "../chunks/BC922t_S.js";
import { S as Star } from "../chunks/CB6mNksc.js";
import { M as Map } from "../chunks/IquHQOCh.js";
import { B as Building_2 } from "../chunks/D2SreymE.js";
import { U as User } from "../chunks/DM20bSSB.js";
import { C as Calendar } from "../chunks/C54mA3lC.js";
import { T as Triangle_alert } from "../chunks/BYbTu6aK.js";
import { C as Chevron_up, a as Chevron_down } from "../chunks/BUNlCGfg.js";
import { I as Image } from "../chunks/BKPy-hrQ.js";
import { M as Message_square } from "../chunks/BH4IY0xY.js";
import { B as Brain } from "../chunks/DqLQEwYL.js";
var root_1 = template(`<div class="flex justify-center py-12"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div></div>`);
var root_3 = template(`<div class="bg-red-50 text-red-600 rounded-xl p-6 space-y-4"><h3 class="font-medium text-lg">Error Loading Audit Data</h3> <p> </p> <button class="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">Return to History</button></div>`);
var root_6 = template(`<div class="bg-blue-50 p-4 rounded-lg"><p class="text-blue-700"> </p></div>`);
var root_11 = template(`<a target="_blank" rel="noopener noreferrer" class="aspect-square rounded-lg overflow-hidden bg-gray-100 relative hover:opacity-90 transition-opacity"><img alt="Audit evidence" class="w-full h-full object-cover"></a>`);
var root_10 = template(`<div class="space-y-2"><h4 class="flex items-center space-x-2 text-sm font-medium text-gray-700"><!> <span>Evidence Photos</span></h4> <div class="grid grid-cols-2 sm:grid-cols-3 gap-2"></div></div>`);
var root_12 = template(`<div class="space-y-2"><h4 class="flex items-center space-x-2 text-sm font-medium text-gray-700"><!> <span>Notes</span></h4> <p class="text-gray-700 bg-white p-4 rounded-lg"> </p></div>`);
var root_15 = template(`<li class="bg-white p-3 rounded-lg"><p class="text-gray-700"> </p> <div class="flex items-center space-x-3 mt-2 text-sm"><span> </span> <span class="text-gray-500"> </span></div></li>`);
var root_14 = template(`<div><h5 class="text-sm font-medium text-gray-700">Recommendations</h5> <ul class="space-y-2 mt-2"></ul></div>`);
var root_17 = template(`<li class="text-gray-700"> </li>`);
var root_16 = template(`<div><h5 class="text-sm font-medium text-gray-700">Follow-up Questions</h5> <ul class="list-disc list-inside mt-2"></ul></div>`);
var root_13 = template(`<div class="space-y-4 bg-purple-50 p-4 rounded-lg"><h4 class="flex items-center space-x-2 text-sm font-medium text-gray-700"><!> <span>AI Analysis</span></h4> <div class="space-y-3"><div><h5 class="text-sm font-medium text-gray-700">Observation</h5> <p class="text-gray-700"> </p></div> <div><h5 class="text-sm font-medium text-gray-700">Analysis</h5> <p class="text-gray-700"> </p></div> <!> <!></div></div>`);
var root_9 = template(`<div class="p-6 space-y-6 bg-gray-50"><!> <!> <!></div>`);
var root_8 = template(`<div class="bg-white rounded-xl shadow-lg overflow-hidden"><div class="p-6 border-b border-gray-100"><div class="flex items-start justify-between"><h3 class="text-lg font-medium text-gray-900"> </h3> <div class="flex items-center space-x-2"><!> <span> </span></div></div> <button class="mt-4 flex items-center space-x-2 text-blue-600 hover:text-blue-800"><span> </span> <!></button></div> <!></div>`);
var root_7 = template(`<div class="space-y-4"></div>`);
var root_18 = template(`<div class="bg-white rounded-xl shadow-lg p-6 text-center"><p class="text-gray-500">No questions or responses found for this audit.</p></div>`);
var root_5 = template(`<div class="bg-white rounded-xl shadow-lg p-6 space-y-6"><div class="flex items-center justify-between"><h2 class="text-xl font-medium text-gray-900">Audit Summary</h2> <div class="flex items-center space-x-2"><!> <span> </span></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-3"><div class="flex items-center space-x-2 text-gray-700"><!> <span> </span></div> <div class="flex items-center space-x-2 text-gray-700"><!> <span> </span></div> <div class="flex items-center space-x-2 text-gray-700"><!> <span> </span></div></div> <div class="space-y-3"><div class="flex items-center space-x-2 text-gray-700"><!> <span> </span></div> <div class="flex items-center space-x-2 text-gray-700"><!> <span> </span></div> <div class="flex items-center space-x-2 text-gray-700"><!> <span> </span></div></div></div> <!></div> <div class="space-y-4"><h2 class="text-xl font-medium text-gray-900">Audit Questions & Responses</h2> <!></div> <div class="flex justify-center pt-4"><button class="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">Back to History</button></div>`, 1);
var root = template(`<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6"><div class="max-w-4xl mx-auto space-y-8"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><button class="text-gray-600 hover:text-gray-900 transition-colors"><!></button> <div class="flex items-center space-x-3"><div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><!></div> <div><h1 class="text-2xl font-light text-gray-900"> </h1> <p class="text-gray-500"> </p></div></div></div></div> <!></div></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  let loading = mutable_source(true);
  let error = mutable_source(null);
  let auditData = mutable_source(null);
  let expandedQuestions = mutable_source({});
  let questionMap = mutable_source({});
  onMount(() => {
    var _a;
    try {
      const storedData = localStorage.getItem("currentAuditData");
      if (!storedData) {
        set(error, "No audit data found");
        return;
      }
      set(auditData, JSON.parse(storedData));
      if (get(auditData).audit_type) {
        let questionList = [];
        switch (get(auditData).audit_type.toLowerCase()) {
          case "hse":
            questionList = hseQuestions;
            break;
          case "mhe":
            questionList = mheQuestions;
            break;
          case "gemba":
            questionList = gembaQuestions;
            break;
          default:
            questionList = questions;
        }
        set(questionMap, questionList.reduce(
          (map, q) => {
            map[q.id] = q.text;
            return map;
          },
          {}
        ));
      }
      if ((_a = get(auditData).data) == null ? void 0 : _a.answers) {
        get(auditData).data.answers.forEach((answer) => {
          mutate(expandedQuestions, get(expandedQuestions)[answer.questionId] = false);
        });
      }
    } catch (e) {
      console.error("Error loading audit data:", e);
      set(error, e instanceof Error ? e.message : "Failed to load audit data");
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
  function getScoreColor(score) {
    if (score >= 4) return "text-green-500";
    if (score >= 3) return "text-yellow-500";
    return "text-red-500";
  }
  function toggleQuestionExpand(questionId) {
    mutate(expandedQuestions, get(expandedQuestions)[questionId] = !get(expandedQuestions)[questionId]);
  }
  init();
  var div = root();
  var div_1 = child(div);
  var div_2 = child(div_1);
  var div_3 = child(div_2);
  var button = child(div_3);
  var node = child(button);
  Arrow_left(node, { class: "w-5 h-5" });
  reset(button);
  var div_4 = sibling(button, 2);
  var div_5 = child(div_4);
  var node_1 = child(div_5);
  Clipboard_check(node_1, { class: "w-6 h-6 text-blue-600" });
  reset(div_5);
  var div_6 = sibling(div_5, 2);
  var h1 = child(div_6);
  var text = child(h1);
  reset(h1);
  var p = sibling(h1, 2);
  var text_1 = child(p, true);
  reset(p);
  reset(div_6);
  reset(div_4);
  reset(div_3);
  reset(div_2);
  var node_2 = sibling(div_2, 2);
  {
    var consequent = ($$anchor2) => {
      var div_7 = root_1();
      append($$anchor2, div_7);
    };
    var alternate = ($$anchor2, $$elseif) => {
      {
        var consequent_1 = ($$anchor3) => {
          var div_8 = root_3();
          var p_1 = sibling(child(div_8), 2);
          var text_2 = child(p_1, true);
          reset(p_1);
          var button_1 = sibling(p_1, 2);
          reset(div_8);
          template_effect(() => set_text(text_2, get(error)));
          event("click", button_1, () => goto("/history"));
          append($$anchor3, div_8);
        };
        var alternate_1 = ($$anchor3, $$elseif2) => {
          {
            var consequent_10 = ($$anchor4) => {
              var fragment = root_5();
              var div_9 = first_child(fragment);
              var div_10 = child(div_9);
              var div_11 = sibling(child(div_10), 2);
              var node_3 = child(div_11);
              const expression = derived_safe_equal(() => `w-6 h-6 ${getScoreColor(get(auditData).data.score || 0)}`);
              Star(node_3, {
                get class() {
                  return get(expression);
                }
              });
              var span = sibling(node_3, 2);
              var text_3 = child(span, true);
              reset(span);
              reset(div_11);
              reset(div_10);
              var div_12 = sibling(div_10, 2);
              var div_13 = child(div_12);
              var div_14 = child(div_13);
              var node_4 = child(div_14);
              Map(node_4, { class: "w-5 h-5 text-gray-500" });
              var span_1 = sibling(node_4, 2);
              var text_4 = child(span_1);
              reset(span_1);
              reset(div_14);
              var div_15 = sibling(div_14, 2);
              var node_5 = child(div_15);
              Building_2(node_5, { class: "w-5 h-5 text-gray-500" });
              var span_2 = sibling(node_5, 2);
              var text_5 = child(span_2);
              reset(span_2);
              reset(div_15);
              var div_16 = sibling(div_15, 2);
              var node_6 = child(div_16);
              Clipboard_check(node_6, { class: "w-5 h-5 text-gray-500" });
              var span_3 = sibling(node_6, 2);
              var text_6 = child(span_3);
              reset(span_3);
              reset(div_16);
              reset(div_13);
              var div_17 = sibling(div_13, 2);
              var div_18 = child(div_17);
              var node_7 = child(div_18);
              User(node_7, { class: "w-5 h-5 text-gray-500" });
              var span_4 = sibling(node_7, 2);
              var text_7 = child(span_4);
              reset(span_4);
              reset(div_18);
              var div_19 = sibling(div_18, 2);
              var node_8 = child(div_19);
              Calendar(node_8, { class: "w-5 h-5 text-gray-500" });
              var span_5 = sibling(node_8, 2);
              var text_8 = child(span_5);
              reset(span_5);
              reset(div_19);
              var div_20 = sibling(div_19, 2);
              var node_9 = child(div_20);
              Triangle_alert(node_9, { class: "w-5 h-5 text-gray-500" });
              var span_6 = sibling(node_9, 2);
              var text_9 = child(span_6);
              reset(span_6);
              reset(div_20);
              reset(div_17);
              reset(div_12);
              var node_10 = sibling(div_12, 2);
              {
                var consequent_2 = ($$anchor5) => {
                  var div_21 = root_6();
                  var p_2 = child(div_21);
                  var text_10 = child(p_2);
                  reset(p_2);
                  reset(div_21);
                  template_effect(
                    ($0) => set_text(text_10, `Audit Duration: ${$0 ?? ""} min ${get(auditData).data.duration_seconds % 60} sec`),
                    [
                      () => Math.floor(get(auditData).data.duration_seconds / 60)
                    ],
                    derived_safe_equal
                  );
                  append($$anchor5, div_21);
                };
                if_block(node_10, ($$render) => {
                  if (get(auditData).data.duration_seconds) $$render(consequent_2);
                });
              }
              reset(div_9);
              var div_22 = sibling(div_9, 2);
              var node_11 = sibling(child(div_22), 2);
              {
                var consequent_9 = ($$anchor5) => {
                  var div_23 = root_7();
                  each(div_23, 5, () => get(auditData).data.answers, index, ($$anchor6, answer) => {
                    var div_24 = root_8();
                    var div_25 = child(div_24);
                    var div_26 = child(div_25);
                    var h3 = child(div_26);
                    var text_11 = child(h3);
                    reset(h3);
                    var div_27 = sibling(h3, 2);
                    var node_12 = child(div_27);
                    const expression_1 = derived_safe_equal(() => `w-5 h-5 ${getScoreColor(get(answer).rating)}`);
                    Star(node_12, {
                      get class() {
                        return get(expression_1);
                      }
                    });
                    var span_7 = sibling(node_12, 2);
                    var text_12 = child(span_7, true);
                    reset(span_7);
                    reset(div_27);
                    reset(div_26);
                    var button_2 = sibling(div_26, 2);
                    var span_8 = child(button_2);
                    var text_13 = child(span_8, true);
                    reset(span_8);
                    var node_13 = sibling(span_8, 2);
                    component(node_13, () => get(expandedQuestions)[get(answer).questionId] ? Chevron_up : Chevron_down, ($$anchor7, $$component) => {
                      $$component($$anchor7, { class: "w-4 h-4" });
                    });
                    reset(button_2);
                    reset(div_25);
                    var node_14 = sibling(div_25, 2);
                    {
                      var consequent_8 = ($$anchor7) => {
                        var div_28 = root_9();
                        var node_15 = child(div_28);
                        {
                          var consequent_3 = ($$anchor8) => {
                            var div_29 = root_10();
                            var h4 = child(div_29);
                            var node_16 = child(h4);
                            Image(node_16, { class: "w-4 h-4" });
                            next(2);
                            reset(h4);
                            var div_30 = sibling(h4, 2);
                            each(div_30, 5, () => get(answer).photos, index, ($$anchor9, photo) => {
                              var a = root_11();
                              var img = child(a);
                              reset(a);
                              template_effect(() => {
                                set_attribute(a, "href", get(photo));
                                set_attribute(img, "src", get(photo));
                              });
                              append($$anchor9, a);
                            });
                            reset(div_30);
                            reset(div_29);
                            append($$anchor8, div_29);
                          };
                          if_block(node_15, ($$render) => {
                            if (get(answer).photos && get(answer).photos.length > 0) $$render(consequent_3);
                          });
                        }
                        var node_17 = sibling(node_15, 2);
                        {
                          var consequent_4 = ($$anchor8) => {
                            var div_31 = root_12();
                            var h4_1 = child(div_31);
                            var node_18 = child(h4_1);
                            Message_square(node_18, { class: "w-4 h-4" });
                            next(2);
                            reset(h4_1);
                            var p_3 = sibling(h4_1, 2);
                            var text_14 = child(p_3, true);
                            reset(p_3);
                            reset(div_31);
                            template_effect(() => set_text(text_14, get(answer).notes));
                            append($$anchor8, div_31);
                          };
                          if_block(node_17, ($$render) => {
                            if (get(answer).notes) $$render(consequent_4);
                          });
                        }
                        var node_19 = sibling(node_17, 2);
                        {
                          var consequent_7 = ($$anchor8) => {
                            var div_32 = root_13();
                            var h4_2 = child(div_32);
                            var node_20 = child(h4_2);
                            Brain(node_20, { class: "w-4 h-4 text-purple-600" });
                            next(2);
                            reset(h4_2);
                            var div_33 = sibling(h4_2, 2);
                            var div_34 = child(div_33);
                            var p_4 = sibling(child(div_34), 2);
                            var text_15 = child(p_4, true);
                            reset(p_4);
                            reset(div_34);
                            var div_35 = sibling(div_34, 2);
                            var p_5 = sibling(child(div_35), 2);
                            var text_16 = child(p_5, true);
                            reset(p_5);
                            reset(div_35);
                            var node_21 = sibling(div_35, 2);
                            {
                              var consequent_5 = ($$anchor9) => {
                                var div_36 = root_14();
                                var ul = sibling(child(div_36), 2);
                                each(ul, 5, () => get(answer).aiInsight.recommendations, index, ($$anchor10, rec) => {
                                  var li = root_15();
                                  var p_6 = child(li);
                                  var text_17 = child(p_6, true);
                                  reset(p_6);
                                  var div_37 = sibling(p_6, 2);
                                  var span_9 = child(div_37);
                                  var text_18 = child(span_9, true);
                                  reset(span_9);
                                  var span_10 = sibling(span_9, 2);
                                  var text_19 = child(span_10);
                                  reset(span_10);
                                  reset(div_37);
                                  reset(li);
                                  template_effect(() => {
                                    set_text(text_17, get(rec).text);
                                    set_class(span_9, 1, `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                        ${(get(rec).priority === "High" ? "bg-red-100 text-red-800" : get(rec).priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800") ?? ""}`);
                                    set_text(text_18, get(rec).priority);
                                    set_text(text_19, `Impact: ${get(rec).impact ?? ""}`);
                                  });
                                  append($$anchor10, li);
                                });
                                reset(ul);
                                reset(div_36);
                                append($$anchor9, div_36);
                              };
                              if_block(node_21, ($$render) => {
                                if (get(answer).aiInsight.recommendations && get(answer).aiInsight.recommendations.length > 0) $$render(consequent_5);
                              });
                            }
                            var node_22 = sibling(node_21, 2);
                            {
                              var consequent_6 = ($$anchor9) => {
                                var div_38 = root_16();
                                var ul_1 = sibling(child(div_38), 2);
                                each(ul_1, 5, () => get(answer).aiInsight.followUp, index, ($$anchor10, question) => {
                                  var li_1 = root_17();
                                  var text_20 = child(li_1, true);
                                  reset(li_1);
                                  template_effect(() => set_text(text_20, get(question)));
                                  append($$anchor10, li_1);
                                });
                                reset(ul_1);
                                reset(div_38);
                                append($$anchor9, div_38);
                              };
                              if_block(node_22, ($$render) => {
                                if (get(answer).aiInsight.followUp && get(answer).aiInsight.followUp.length > 0) $$render(consequent_6);
                              });
                            }
                            reset(div_33);
                            reset(div_32);
                            template_effect(() => {
                              set_text(text_15, get(answer).aiInsight.observation);
                              set_text(text_16, get(answer).aiInsight.analysis);
                            });
                            append($$anchor8, div_32);
                          };
                          if_block(node_19, ($$render) => {
                            if (get(answer).aiInsight) $$render(consequent_7);
                          });
                        }
                        reset(div_28);
                        transition(3, div_28, () => slide, () => ({ duration: 200 }));
                        append($$anchor7, div_28);
                      };
                      if_block(node_14, ($$render) => {
                        if (get(expandedQuestions)[get(answer).questionId]) $$render(consequent_8);
                      });
                    }
                    reset(div_24);
                    template_effect(
                      ($0) => {
                        set_text(text_11, `${get(answer).questionId ?? ""}. ${get(questionMap)[get(answer).questionId] || get(answer).question || "Question not found"}`);
                        set_class(span_7, 1, $0);
                        set_text(text_12, get(answer).rating);
                        set_text(text_13, get(expandedQuestions)[get(answer).questionId] ? "Hide Details" : "Show Details");
                      },
                      [
                        () => `text-xl font-light ${getScoreColor(get(answer).rating)}`
                      ],
                      derived_safe_equal
                    );
                    event("click", button_2, () => toggleQuestionExpand(get(answer).questionId));
                    append($$anchor6, div_24);
                  });
                  reset(div_23);
                  append($$anchor5, div_23);
                };
                var alternate_2 = ($$anchor5) => {
                  var div_39 = root_18();
                  append($$anchor5, div_39);
                };
                if_block(node_11, ($$render) => {
                  if (get(auditData).data.answers && get(auditData).data.answers.length > 0) $$render(consequent_9);
                  else $$render(alternate_2, false);
                });
              }
              reset(div_22);
              var div_40 = sibling(div_22, 2);
              var button_3 = child(div_40);
              reset(div_40);
              template_effect(
                ($0, $1, $2, $3) => {
                  set_class(span, 1, $0);
                  set_text(text_3, $1);
                  set_text(text_4, `Site: ${get(auditData).site_name ?? ""}`);
                  set_text(text_5, `Department: ${get(auditData).department_name ?? ""}`);
                  set_text(text_6, `Audit Type: ${$2 ?? ""}`);
                  set_text(text_7, `Conducted By: ${(get(auditData).full_name || get(auditData).email) ?? ""}`);
                  set_text(text_8, `Date: ${$3 ?? ""}`);
                  set_text(text_9, `Critical Issues: ${get(auditData).data.critical_issues || 0}`);
                },
                [
                  () => `text-2xl font-light ${getScoreColor(get(auditData).data.score || 0)}`,
                  () => get(auditData).data.score ? get(auditData).data.score.toFixed(1) : "N/A",
                  () => get(auditData).audit_type.toUpperCase(),
                  () => formatDate(get(auditData).created_at)
                ],
                derived_safe_equal
              );
              event("click", button_3, () => goto("/history"));
              append($$anchor4, fragment);
            };
            if_block(
              $$anchor3,
              ($$render) => {
                if (get(auditData)) $$render(consequent_10);
              },
              $$elseif2
            );
          }
        };
        if_block(
          $$anchor2,
          ($$render) => {
            if (get(error)) $$render(consequent_1);
            else $$render(alternate_1, false);
          },
          $$elseif
        );
      }
    };
    if_block(node_2, ($$render) => {
      if (get(loading)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(div_1);
  reset(div);
  template_effect(
    ($0, $1) => {
      set_text(text, `${$0 ?? ""} Audit Details`);
      set_text(text_1, $1);
    },
    [
      () => {
        var _a, _b;
        return (_b = (_a = get(auditData)) == null ? void 0 : _a.audit_type) == null ? void 0 : _b.toUpperCase();
      },
      () => get(auditData) ? formatDate(get(auditData).created_at) : "Loading..."
    ],
    derived_safe_equal
  );
  event("click", button, () => goto("/history"));
  append($$anchor, div);
  pop();
}
export {
  _page as component
};
//# sourceMappingURL=5.BAVDbpzp.js.map
