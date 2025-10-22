import { c as comment, a as append, t as template } from "./DkiQ5dRj.js";
import { i as init } from "./CgZxdHNJ.js";
import { R as get_descriptor, F as teardown, f as first_child, p as push, s as sibling, g as get, m as mutable_source, b as pop, c as child, h as derived_safe_equal, r as reset, t as template_effect, d as set, n as next, o as onMount, ad as onDestroy, u as update } from "./BXHzHFYX.js";
import { I as Icon, s as slot, c as set_class, d as set_attribute, e as each, i as index } from "./CQ5zajJZ.js";
import { l as legacy_rest_props, s as spread_props, p as prop } from "./CnKbWtpd.js";
import { s as set_text, e as event } from "./D8_nd-i4.js";
import { i as if_block } from "./CqHl9XhN.js";
import { c as component } from "./Yy-EATei.js";
import { t as transition, a as fade, s as slide } from "./B1ns0h2F.js";
import { s as stopPropagation } from "./CGgk3ROl.js";
import { c as bubble_event } from "./hmB93t6v.js";
import { S as Star } from "./CB6mNksc.js";
import { C as Chevron_up, a as Chevron_down } from "./BUNlCGfg.js";
import { C as Calendar } from "./C54mA3lC.js";
import { U as User } from "./DM20bSSB.js";
import { I as Image } from "./BKPy-hrQ.js";
import { M as Message_square } from "./BH4IY0xY.js";
import { B as Brain } from "./DqLQEwYL.js";
import { C as Clock } from "./B0rWwkV4.js";
function bind_prop(props, prop2, value) {
  var desc = get_descriptor(props, prop2);
  if (desc && desc.set) {
    props[prop2] = value;
    teardown(() => {
      props[prop2] = null;
    });
  }
}
function Circle($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "10" }
    ]
  ];
  Icon($$anchor, spread_props({ name: "circle" }, () => $$sanitized_props, {
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
var root_4 = template(`<button class="aspect-square rounded-lg overflow-hidden bg-gray-100 relative
                           hover:opacity-90 transition-opacity"><img alt="Previous audit evidence" class="w-full h-full object-cover"></button>`);
var root_3 = template(`<div class="space-y-2"><label class="text-sm font-medium text-gray-700 flex items-center space-x-2"><!> <span>Evidence Photos</span></label> <div class="grid grid-cols-3 gap-2"></div></div>`);
var root_5 = template(`<div class="space-y-2"><label class="text-sm font-medium text-gray-700 flex items-center space-x-2"><!> <span>Notes</span></label> <p class="text-gray-600 text-sm"> </p></div>`);
var root_8 = template(`<li class="text-sm text-gray-600"> <span> </span></li>`);
var root_7 = template(`<div class="space-y-2"><h4 class="text-sm font-medium text-gray-700">Recommendations:</h4> <ul class="space-y-2"></ul></div>`);
var root_6 = template(`<div class="space-y-2"><label class="text-sm font-medium text-gray-700 flex items-center space-x-2"><!> <span>AI Review</span></label> <div class="bg-purple-50 rounded-lg p-4 space-y-4"><p class="text-sm text-gray-600"> </p> <!></div></div>`);
var root_10 = template(`<div class="flex items-center justify-between py-2"><div class="flex items-center space-x-4"><div class="flex items-center space-x-1"><!> <span> </span></div> <span class="text-sm text-gray-500"> </span></div> <span class="text-sm text-gray-500"> </span></div>`);
var root_9 = template(`<div class="border-t border-gray-100 pt-6"><h4 class="text-sm font-medium text-gray-900 mb-4">Previous Submissions</h4> <div class="space-y-4"></div></div>`);
var root_2 = template(`<div class="mt-4 space-y-6 bg-white rounded-xl p-6 shadow-sm"><div class="space-y-6"><!> <!> <!> <div class="flex items-center justify-between text-sm text-gray-500"><div class="flex items-center space-x-2"><!> <span> </span></div> <div class="flex items-center space-x-2"><!> <span> </span></div></div></div> <!></div>`);
var root_1 = template(`<div class="mt-4"><button class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl
             hover:bg-gray-100 transition-colors"><div class="flex items-center space-x-4"><div class="flex items-center space-x-1"><!> <span> </span></div> <div class="text-sm text-gray-500"> </div></div> <!></button> <!></div>`);
var root_11 = template(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"><img alt="Expanded evidence" class="max-w-full max-h-full rounded-lg"></div>`);
var root$1 = template(`<!> <!>`, 1);
function QuestionHistory($$anchor, $$props) {
  push($$props, false);
  prop($$props, "questionId", 8);
  let previousAnswers = prop($$props, "previousAnswers", 8);
  let expanded = mutable_source(false);
  let expandedPhotoUrl = mutable_source(null);
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
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
  init();
  var fragment = root$1();
  var node = first_child(fragment);
  {
    var consequent_6 = ($$anchor2) => {
      var div = root_1();
      var button = child(div);
      var div_1 = child(button);
      var div_2 = child(div_1);
      var node_1 = child(div_2);
      const expression = derived_safe_equal(() => getScoreColor(previousAnswers()[0].rating));
      Star(node_1, {
        get class() {
          return `w-5 h-5 ${get(expression) ?? ""}`;
        }
      });
      var span = sibling(node_1, 2);
      var text = child(span, true);
      reset(span);
      reset(div_2);
      var div_3 = sibling(div_2, 2);
      var text_1 = child(div_3);
      reset(div_3);
      reset(div_1);
      var node_2 = sibling(div_1, 2);
      component(node_2, () => get(expanded) ? Chevron_up : Chevron_down, ($$anchor3, $$component) => {
        $$component($$anchor3, { class: "w-5 h-5 text-gray-400" });
      });
      reset(button);
      var node_3 = sibling(button, 2);
      {
        var consequent_5 = ($$anchor3) => {
          var div_4 = root_2();
          var div_5 = child(div_4);
          var node_4 = child(div_5);
          {
            var consequent = ($$anchor4) => {
              var div_6 = root_3();
              var label = child(div_6);
              var node_5 = child(label);
              Image(node_5, { class: "w-4 h-4" });
              next(2);
              reset(label);
              var div_7 = sibling(label, 2);
              each(div_7, 5, () => previousAnswers()[0].photos, index, ($$anchor5, photo) => {
                var button_1 = root_4();
                var img = child(button_1);
                reset(button_1);
                template_effect(() => set_attribute(img, "src", get(photo)));
                event("click", button_1, () => set(expandedPhotoUrl, get(photo)));
                append($$anchor5, button_1);
              });
              reset(div_7);
              reset(div_6);
              append($$anchor4, div_6);
            };
            if_block(node_4, ($$render) => {
              if (previousAnswers()[0].photos.length > 0) $$render(consequent);
            });
          }
          var node_6 = sibling(node_4, 2);
          {
            var consequent_1 = ($$anchor4) => {
              var div_8 = root_5();
              var label_1 = child(div_8);
              var node_7 = child(label_1);
              Message_square(node_7, { class: "w-4 h-4" });
              next(2);
              reset(label_1);
              var p = sibling(label_1, 2);
              var text_2 = child(p, true);
              reset(p);
              reset(div_8);
              template_effect(() => set_text(text_2, previousAnswers()[0].notes));
              append($$anchor4, div_8);
            };
            if_block(node_6, ($$render) => {
              if (previousAnswers()[0].notes) $$render(consequent_1);
            });
          }
          var node_8 = sibling(node_6, 2);
          {
            var consequent_3 = ($$anchor4) => {
              var div_9 = root_6();
              var label_2 = child(div_9);
              var node_9 = child(label_2);
              Brain(node_9, { class: "w-4 h-4" });
              next(2);
              reset(label_2);
              var div_10 = sibling(label_2, 2);
              var p_1 = child(div_10);
              var text_3 = child(p_1, true);
              reset(p_1);
              var node_10 = sibling(p_1, 2);
              {
                var consequent_2 = ($$anchor5) => {
                  var div_11 = root_7();
                  var ul = sibling(child(div_11), 2);
                  each(ul, 5, () => previousAnswers()[0].aiInsight.recommendations, index, ($$anchor6, rec) => {
                    var li = root_8();
                    var text_4 = child(li);
                    var span_1 = sibling(text_4);
                    var text_5 = child(span_1, true);
                    reset(span_1);
                    reset(li);
                    template_effect(() => {
                      set_text(text_4, `${get(rec).text ?? ""} `);
                      set_class(span_1, 1, `ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                            ${(get(rec).priority === "High" ? "bg-red-100 text-red-800" : get(rec).priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800") ?? ""}`);
                      set_text(text_5, get(rec).priority);
                    });
                    append($$anchor6, li);
                  });
                  reset(ul);
                  reset(div_11);
                  append($$anchor5, div_11);
                };
                if_block(node_10, ($$render) => {
                  if (previousAnswers()[0].aiInsight.recommendations.length > 0) $$render(consequent_2);
                });
              }
              reset(div_10);
              reset(div_9);
              template_effect(() => set_text(text_3, previousAnswers()[0].aiInsight.observation));
              append($$anchor4, div_9);
            };
            if_block(node_8, ($$render) => {
              if (previousAnswers()[0].aiInsight) $$render(consequent_3);
            });
          }
          var div_12 = sibling(node_8, 2);
          var div_13 = child(div_12);
          var node_11 = child(div_13);
          Calendar(node_11, { class: "w-4 h-4" });
          var span_2 = sibling(node_11, 2);
          var text_6 = child(span_2, true);
          reset(span_2);
          reset(div_13);
          var div_14 = sibling(div_13, 2);
          var node_12 = child(div_14);
          User(node_12, { class: "w-4 h-4" });
          var span_3 = sibling(node_12, 2);
          var text_7 = child(span_3, true);
          reset(span_3);
          reset(div_14);
          reset(div_12);
          reset(div_5);
          var node_13 = sibling(div_5, 2);
          {
            var consequent_4 = ($$anchor4) => {
              var div_15 = root_9();
              var div_16 = sibling(child(div_15), 2);
              each(div_16, 5, () => previousAnswers().slice(1), index, ($$anchor5, submission) => {
                var div_17 = root_10();
                var div_18 = child(div_17);
                var div_19 = child(div_18);
                var node_14 = child(div_19);
                const expression_1 = derived_safe_equal(() => getScoreColor(get(submission).rating));
                Star(node_14, {
                  get class() {
                    return `w-4 h-4 ${get(expression_1) ?? ""}`;
                  }
                });
                var span_4 = sibling(node_14, 2);
                var text_8 = child(span_4, true);
                reset(span_4);
                reset(div_19);
                var span_5 = sibling(div_19, 2);
                var text_9 = child(span_5);
                reset(span_5);
                reset(div_18);
                var span_6 = sibling(div_18, 2);
                var text_10 = child(span_6, true);
                reset(span_6);
                reset(div_17);
                template_effect(
                  ($0, $1) => {
                    set_class(span_4, 1, `font-medium ${$0 ?? ""}`);
                    set_text(text_8, get(submission).rating);
                    set_text(text_9, `by ${get(submission).user.full_name ?? ""}`);
                    set_text(text_10, $1);
                  },
                  [
                    () => getScoreColor(get(submission).rating),
                    () => formatDate(get(submission).created_at)
                  ],
                  derived_safe_equal
                );
                append($$anchor5, div_17);
              });
              reset(div_16);
              reset(div_15);
              append($$anchor4, div_15);
            };
            if_block(node_13, ($$render) => {
              if (previousAnswers().length > 1) $$render(consequent_4);
            });
          }
          reset(div_4);
          template_effect(
            ($0) => {
              set_text(text_6, $0);
              set_text(text_7, previousAnswers()[0].user.full_name);
            },
            [
              () => formatDate(previousAnswers()[0].created_at)
            ],
            derived_safe_equal
          );
          transition(3, div_4, () => slide);
          append($$anchor3, div_4);
        };
        if_block(node_3, ($$render) => {
          if (get(expanded)) $$render(consequent_5);
        });
      }
      reset(div);
      template_effect(
        ($0) => {
          set_class(span, 1, `text-2xl font-light ${$0 ?? ""}`);
          set_text(text, previousAnswers()[0].rating);
          set_text(text_1, `Previous score from ${previousAnswers()[0].user.full_name ?? ""}`);
        },
        [
          () => getScoreColor(previousAnswers()[0].rating)
        ],
        derived_safe_equal
      );
      event("click", button, () => set(expanded, !get(expanded)));
      append($$anchor2, div);
    };
    if_block(node, ($$render) => {
      if (previousAnswers().length > 0) $$render(consequent_6);
    });
  }
  var node_15 = sibling(node, 2);
  {
    var consequent_7 = ($$anchor2) => {
      var div_20 = root_11();
      var img_1 = child(div_20);
      reset(div_20);
      template_effect(() => set_attribute(img_1, "src", get(expandedPhotoUrl)));
      event("click", img_1, stopPropagation(function($$arg) {
        bubble_event.call(this, $$props, $$arg);
      }));
      event("click", div_20, () => set(expandedPhotoUrl, null));
      transition(3, div_20, () => fade, () => ({ duration: 200 }));
      append($$anchor2, div_20);
    };
    if_block(node_15, ($$render) => {
      if (get(expandedPhotoUrl)) $$render(consequent_7);
    });
  }
  append($$anchor, fragment);
  pop();
}
var root = template(`<div class="flex items-center space-x-2 text-gray-600"><!> <span class="font-mono"> </span></div>`);
function AuditTimer($$anchor, $$props) {
  push($$props, false);
  let ref = prop($$props, "ref", 12, null);
  let startTime = prop($$props, "startTime", 8, null);
  let onTick = prop($$props, "onTick", 8, null);
  let elapsedSeconds = mutable_source(0);
  let timerInterval = null;
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    return get(elapsedSeconds);
  }
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const remainingSeconds = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  function startTimer() {
    if (timerInterval) return;
    if (startTime()) {
      set(elapsedSeconds, Math.floor((Date.now() - startTime().getTime()) / 1e3));
    }
    timerInterval = setInterval(
      () => {
        update(elapsedSeconds);
        if (onTick()) onTick()(get(elapsedSeconds));
      },
      1e3
    );
  }
  onMount(() => {
    ref({ stopTimer });
    startTimer();
  });
  onDestroy(() => {
    stopTimer();
  });
  init();
  var div = root();
  var node = child(div);
  Clock(node, { class: "w-4 h-4" });
  var span = sibling(node, 2);
  var text = child(span, true);
  reset(span);
  reset(div);
  template_effect(
    ($0) => set_text(text, $0),
    [
      () => formatTime(get(elapsedSeconds))
    ],
    derived_safe_equal
  );
  append($$anchor, div);
  bind_prop($$props, "stopTimer", stopTimer);
  return pop({ stopTimer });
}
export {
  AuditTimer as A,
  Circle as C,
  QuestionHistory as Q
};
//# sourceMappingURL=D5suuuKE.js.map
