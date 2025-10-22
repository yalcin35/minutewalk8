import { c as comment, a as append, t as template } from "./DkiQ5dRj.js";
import { i as init } from "./CgZxdHNJ.js";
import { az as is_array, f as first_child, ae as writable, p as push, aJ as createEventDispatcher, ad as onDestroy, b as pop, s as sibling, g as get, m as mutable_source, d as set, c as child, n as next, r as reset, t as template_effect, h as derived_safe_equal, P as get$1 } from "./BXHzHFYX.js";
import { I as Icon, s as slot, e as each, d as set_attribute, c as set_class, i as index } from "./CQ5zajJZ.js";
import { l as legacy_rest_props, s as spread_props, p as prop, b as store_get, a as setup_stores } from "./CnKbWtpd.js";
import { r as raf, l as loop, t as transition, b as scale, s as slide } from "./B1ns0h2F.js";
import { e as event, s as set_text } from "./D8_nd-i4.js";
import { i as if_block } from "./CqHl9XhN.js";
import { b as bind_this } from "./BSpSymUc.js";
import { s as stopPropagation } from "./CGgk3ROl.js";
import { C as Camera } from "./Cvxibi4f.js";
import { I as Image$1 } from "./BKPy-hrQ.js";
import { a as $format, $ as $locale } from "./HJ-2R3CP.js";
import { B as Brain } from "./DqLQEwYL.js";
import { C as Chevron_up, a as Chevron_down } from "./BUNlCGfg.js";
import { T as Triangle_alert } from "./BYbTu6aK.js";
import "./DIcdBaaF.js";
function bubble_event($$props, event2) {
  var _a;
  var events = (
    /** @type {Record<string, Function[] | Function>} */
    (_a = $$props.$$events) == null ? void 0 : _a[event2.type]
  );
  var callbacks = is_array(events) ? events.slice() : events == null ? [] : [events];
  for (var fn of callbacks) {
    fn.call(this, event2);
  }
}
function Chevron_left($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  Icon($$anchor, spread_props({ name: "chevron-left" }, () => $$sanitized_props, {
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
function Chevron_right($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$anchor, spread_props({ name: "chevron-right" }, () => $$sanitized_props, {
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
function X($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    ["path", { "d": "M18 6 6 18" }],
    ["path", { "d": "m6 6 12 12" }]
  ];
  Icon($$anchor, spread_props({ name: "x" }, () => $$sanitized_props, {
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
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => (
        // @ts-ignore
        tick_spring(ctx, last_value[i], current_value[i], target_value[i])
      )
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = (
    /** @type {T} */
    value
  );
  let target_value = (
    /** @type {T | undefined} */
    value
  );
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set2(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = raf.now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = raf.now();
      cancel_task = false;
      task = loop((now) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const elapsed = Math.min(now - last_time, 1e3 / 30);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: elapsed * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now;
        last_value = /** @type {T} */
        value;
        store.set(value = /** @type {T} */
        next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token) fulfil();
      });
    });
  }
  const spring2 = {
    set: set2,
    update: (fn, opts2) => set2(fn(
      /** @type {T} */
      target_value,
      /** @type {T} */
      value
    ), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
var root_1$2 = template(`<div class="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"><div class="bg-white rounded-2xl w-full max-w-xs p-4 space-y-4"><button class="w-full p-4 flex items-center space-x-3 text-gray-700 hover:bg-gray-50 
               rounded-xl transition-colors"><!> <span>Take Photo</span></button> <button class="w-full p-4 flex items-center space-x-3 text-gray-700 hover:bg-gray-50 
               rounded-xl transition-colors"><!> <span>Choose from Library</span></button> <button class="w-full p-4 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">Cancel</button></div></div>`);
var root_2$1 = template(`<button class="w-full flex items-center justify-center space-x-2 p-4
           bg-blue-50 hover:bg-blue-100 text-blue-600
           rounded-xl transition-colors relative
           disabled:opacity-50 disabled:cursor-not-allowed"><!> <span class="text-sm font-medium"> </span></button>`);
var root$1 = template(`<!> <input type="file" accept="image/*" class="hidden"> <!>`, 1);
function PhotoUpload($$anchor, $$props) {
  push($$props, false);
  let maxPhotos = prop($$props, "maxPhotos", 8, 1);
  let maxSizeInMB = prop($$props, "maxSizeInMB", 8, 1);
  let quality = prop($$props, "quality", 8, 0.8);
  let minWidth = prop($$props, "minWidth", 8, 1280);
  let minHeight = prop($$props, "minHeight", 8, 720);
  let photos = prop($$props, "photos", 28, () => []);
  let showOptions = mutable_source(false);
  let fileInput = mutable_source();
  let processing = mutable_source(false);
  const dispatch = createEventDispatcher();
  function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  async function compressImage(file) {
    if (!file.type.match(/^image\/(jpeg|png|webp|heic)$/i)) {
      throw new Error("Only image files (JPEG, PNG, WebP, HEIC) are allowed");
    }
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const url = URL.createObjectURL(file);
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = url;
    });
    let width = img.width;
    let height = img.height;
    if (width < minWidth() || height < minHeight()) {
      const ratio = Math.max(minWidth() / width, minHeight() / height);
      width *= ratio;
      height *= ratio;
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality());
    });
  }
  async function handleFiles(files) {
    if (photos().length + files.length > maxPhotos()) {
      dispatch("error", {
        message: `Maximum ${maxPhotos()} photo allowed`
      });
      return;
    }
    set(processing, true);
    const newPhotos = [];
    for (const file of files) {
      try {
        if (!file.type.startsWith("image/")) {
          dispatch("error", { message: "Only image files are allowed" });
          continue;
        }
        if (file.size > maxSizeInMB() * 1024 * 1024) {
          dispatch("error", {
            message: `File size must be less than ${maxSizeInMB()}MB`
          });
          continue;
        }
        const compressed = await compressImage(file);
        const compressedFile = new File([compressed], file.name, { type: "image/jpeg" });
        const photo = {
          id: generateId(),
          file: compressedFile,
          thumbnail: URL.createObjectURL(compressed)
        };
        newPhotos.push(photo);
      } catch (error) {
        dispatch("error", {
          message: error instanceof Error ? error.message : "Failed to process image"
        });
      }
    }
    set(processing, false);
    photos([...photos(), ...newPhotos]);
    dispatch("change", { photos: photos() });
  }
  function openCamera() {
    set(showOptions, false);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e) => {
      const files = e.target.files;
      if (files) handleFiles(files);
    };
    input.click();
  }
  function openPhotoLibrary() {
    set(showOptions, false);
    get(fileInput).click();
  }
  onDestroy(() => {
    photos().forEach((photo) => {
      URL.revokeObjectURL(photo.thumbnail);
    });
  });
  init();
  var fragment = root$1();
  var node = first_child(fragment);
  {
    var consequent = ($$anchor2) => {
      var div = root_1$2();
      var div_1 = child(div);
      var button = child(div_1);
      var node_1 = child(button);
      Camera(node_1, { class: "w-6 h-6" });
      next(2);
      reset(button);
      var button_1 = sibling(button, 2);
      var node_2 = child(button_1);
      Image$1(node_2, { class: "w-6 h-6" });
      next(2);
      reset(button_1);
      var button_2 = sibling(button_1, 2);
      reset(div_1);
      reset(div);
      event("click", button, openCamera);
      event("click", button_1, openPhotoLibrary);
      event("click", button_2, () => set(showOptions, false));
      event("click", div_1, stopPropagation(function($$arg) {
        bubble_event.call(this, $$props, $$arg);
      }));
      event("click", div, () => set(showOptions, false));
      append($$anchor2, div);
    };
    if_block(node, ($$render) => {
      if (get(showOptions)) $$render(consequent);
    });
  }
  var input_1 = sibling(node, 2);
  bind_this(input_1, ($$value) => set(fileInput, $$value), () => get(fileInput));
  var node_3 = sibling(input_1, 2);
  {
    var consequent_1 = ($$anchor2) => {
      var button_3 = root_2$1();
      var node_4 = child(button_3);
      Camera(node_4, { class: "w-5 h-5" });
      var span = sibling(node_4, 2);
      var text = child(span, true);
      reset(span);
      reset(button_3);
      template_effect(() => {
        button_3.disabled = get(processing);
        set_text(text, photos().length === 0 ? "Add Photo" : `Replace Photo`);
      });
      event("click", button_3, () => set(showOptions, true));
      append($$anchor2, button_3);
    };
    if_block(node_3, ($$render) => {
      if (photos().length < maxPhotos()) $$render(consequent_1);
    });
  }
  event("change", input_1, (e) => handleFiles(e.target.files));
  append($$anchor, fragment);
  pop();
}
var root_2 = template(`<div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100"><img alt="Audit evidence" class="w-full h-full object-cover"> <button class="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full
                 flex items-center justify-center text-white
                 hover:bg-black/75 transition-colors"><!></button></div>`);
var root_1$1 = template(`<div class="grid grid-cols-3 gap-2"></div>`);
function PhotoDisplay($$anchor, $$props) {
  push($$props, false);
  let photos = prop($$props, "photos", 24, () => []);
  let onRemove = prop($$props, "onRemove", 8);
  init();
  var fragment = comment();
  var node = first_child(fragment);
  {
    var consequent = ($$anchor2) => {
      var div = root_1$1();
      each(div, 5, photos, (photo) => photo.id, ($$anchor3, photo) => {
        var div_1 = root_2();
        var img = child(div_1);
        var button = sibling(img, 2);
        var node_1 = child(button);
        X(node_1, { class: "w-4 h-4" });
        reset(button);
        reset(div_1);
        template_effect(() => set_attribute(img, "src", get(photo).thumbnail));
        event("click", button, () => onRemove()(get(photo).id));
        transition(3, div_1, () => scale, () => ({ duration: 200 }));
        append($$anchor3, div_1);
      });
      reset(div);
      append($$anchor2, div);
    };
    if_block(node, ($$render) => {
      if (photos().length > 0) $$render(consequent);
    });
  }
  append($$anchor, fragment);
  pop();
}
var root_1 = template(`<button class="text-gray-400 hover:text-gray-600 transition-colors"><!></button>`);
var root_4 = template(`<div class="flex items-center justify-center py-8"><div class="animate-pulse flex items-center space-x-2 text-purple-600"><!> <span> </span></div></div>`);
var root_6 = template(`<div class="bg-red-50 rounded-lg p-4 flex items-start space-x-3"><!> <p class="text-sm text-red-600"> </p></div>`);
var root_9 = template(`<div class="flex items-start space-x-3 bg-white rounded-lg p-4"><div class="flex-1"><p class="text-gray-700"> </p> <div class="mt-2 flex items-center space-x-4 text-sm"><span> </span> <span class="text-gray-500"> </span></div></div></div>`);
var root_10 = template(`<li> </li>`);
var root_8 = template(`<div class="space-y-6"><div><h4 class="text-sm font-medium text-gray-700 mb-2"> </h4> <p class="text-gray-600"> </p></div> <div><h4 class="text-sm font-medium text-gray-700 mb-2"> </h4> <p class="text-gray-600"> </p></div> <div><h4 class="text-sm font-medium text-gray-700 mb-2"> </h4> <div class="space-y-3"></div></div> <div><h4 class="text-sm font-medium text-gray-700 mb-2"> </h4> <ul class="list-disc list-inside space-y-2 text-gray-600"></ul></div></div>`);
var root_12 = template(`<p class="text-sm text-gray-500"> </p>`);
var root = template(`<div class="bg-white/50 backdrop-blur-sm rounded-xl p-6 space-y-4"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"><!></div> <div><h3 class="text-lg font-medium text-gray-900"> </h3> <p class="text-sm text-gray-500"> </p></div></div> <!></div> <!></div>`);
function AIInsights($$anchor, $$props) {
  push($$props, false);
  const [$$stores, $$cleanup] = setup_stores();
  const $_ = () => store_get($format, "$_", $$stores);
  let insight = prop($$props, "insight", 8, null);
  let loading = prop($$props, "loading", 8, false);
  let error = prop($$props, "error", 8, null);
  let expanded = mutable_source(false);
  init();
  var div = root();
  var div_1 = child(div);
  var div_2 = child(div_1);
  var div_3 = child(div_2);
  var node = child(div_3);
  Brain(node, { class: "w-5 h-5 text-purple-600" });
  reset(div_3);
  var div_4 = sibling(div_3, 2);
  var h3 = child(div_4);
  var text = child(h3, true);
  reset(h3);
  var p = sibling(h3, 2);
  var text_1 = child(p, true);
  reset(p);
  reset(div_4);
  reset(div_2);
  var node_1 = sibling(div_2, 2);
  {
    var consequent_1 = ($$anchor2) => {
      var button = root_1();
      var node_2 = child(button);
      {
        var consequent = ($$anchor3) => {
          Chevron_up($$anchor3, { class: "w-5 h-5" });
        };
        var alternate = ($$anchor3) => {
          Chevron_down($$anchor3, { class: "w-5 h-5" });
        };
        if_block(node_2, ($$render) => {
          if (get(expanded)) $$render(consequent);
          else $$render(alternate, false);
        });
      }
      reset(button);
      event("click", button, () => set(expanded, !get(expanded)));
      append($$anchor2, button);
    };
    if_block(node_1, ($$render) => {
      if (insight()) $$render(consequent_1);
    });
  }
  reset(div_1);
  var node_3 = sibling(div_1, 2);
  {
    var consequent_2 = ($$anchor2) => {
      var div_5 = root_4();
      var div_6 = child(div_5);
      var node_4 = child(div_6);
      Brain(node_4, { class: "w-5 h-5" });
      var span = sibling(node_4, 2);
      var text_2 = child(span, true);
      reset(span);
      reset(div_6);
      reset(div_5);
      template_effect(($0) => set_text(text_2, $0), [() => $_()("checkin.analyzing")], derived_safe_equal);
      append($$anchor2, div_5);
    };
    var alternate_1 = ($$anchor2, $$elseif) => {
      {
        var consequent_3 = ($$anchor3) => {
          var div_7 = root_6();
          var node_5 = child(div_7);
          Triangle_alert(node_5, {
            class: "w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
          });
          var p_1 = sibling(node_5, 2);
          var text_3 = child(p_1, true);
          reset(p_1);
          reset(div_7);
          template_effect(() => set_text(text_3, error()));
          append($$anchor3, div_7);
        };
        var alternate_2 = ($$anchor3, $$elseif2) => {
          {
            var consequent_4 = ($$anchor4) => {
              var div_8 = root_8();
              var div_9 = child(div_8);
              var h4 = child(div_9);
              var text_4 = child(h4, true);
              reset(h4);
              var p_2 = sibling(h4, 2);
              var text_5 = child(p_2, true);
              reset(p_2);
              reset(div_9);
              var div_10 = sibling(div_9, 2);
              var h4_1 = child(div_10);
              var text_6 = child(h4_1, true);
              reset(h4_1);
              var p_3 = sibling(h4_1, 2);
              var text_7 = child(p_3, true);
              reset(p_3);
              reset(div_10);
              var div_11 = sibling(div_10, 2);
              var h4_2 = child(div_11);
              var text_8 = child(h4_2, true);
              reset(h4_2);
              var div_12 = sibling(h4_2, 2);
              each(div_12, 5, () => insight().recommendations, index, ($$anchor5, rec) => {
                var div_13 = root_9();
                var div_14 = child(div_13);
                var p_4 = child(div_14);
                var text_9 = child(p_4, true);
                reset(p_4);
                var div_15 = sibling(p_4, 2);
                var span_1 = child(div_15);
                var text_10 = child(span_1);
                reset(span_1);
                var span_2 = sibling(span_1, 2);
                var text_11 = child(span_2);
                reset(span_2);
                reset(div_15);
                reset(div_14);
                reset(div_13);
                template_effect(() => {
                  set_text(text_9, get(rec).text);
                  set_class(span_1, 1, `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${(get(rec).priority === "High" ? "bg-red-100 text-red-800" : get(rec).priority === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800") ?? ""}`);
                  set_text(text_10, `${get(rec).priority ?? ""} Priority`);
                  set_text(text_11, `Impact: ${get(rec).impact ?? ""}`);
                });
                append($$anchor5, div_13);
              });
              reset(div_12);
              reset(div_11);
              var div_16 = sibling(div_11, 2);
              var h4_3 = child(div_16);
              var text_12 = child(h4_3, true);
              reset(h4_3);
              var ul = sibling(h4_3, 2);
              each(ul, 5, () => insight().followUp, index, ($$anchor5, question) => {
                var li = root_10();
                var text_13 = child(li, true);
                reset(li);
                template_effect(() => set_text(text_13, get(question)));
                append($$anchor5, li);
              });
              reset(ul);
              reset(div_16);
              reset(div_8);
              template_effect(
                ($0, $1, $2, $3) => {
                  set_text(text_4, $0);
                  set_text(text_5, insight().observation);
                  set_text(text_6, $1);
                  set_text(text_7, insight().analysis);
                  set_text(text_8, $2);
                  set_text(text_12, $3);
                },
                [
                  () => $_()("audit.observation"),
                  () => $_()("audit.analysis"),
                  () => $_()("audit.recommendations"),
                  () => $_()("audit.followUpQuestions")
                ],
                derived_safe_equal
              );
              transition(3, div_8, () => slide);
              append($$anchor4, div_8);
            };
            var alternate_3 = ($$anchor4, $$elseif3) => {
              {
                var consequent_5 = ($$anchor5) => {
                  var p_5 = root_12();
                  var text_14 = child(p_5, true);
                  reset(p_5);
                  template_effect(
                    ($0) => set_text(text_14, $0),
                    [
                      () => $_()("audit.clickToExpandAnalysis")
                    ],
                    derived_safe_equal
                  );
                  append($$anchor5, p_5);
                };
                if_block(
                  $$anchor4,
                  ($$render) => {
                    if (insight()) $$render(consequent_5);
                  },
                  $$elseif3
                );
              }
            };
            if_block(
              $$anchor3,
              ($$render) => {
                if (insight() && get(expanded)) $$render(consequent_4);
                else $$render(alternate_3, false);
              },
              $$elseif2
            );
          }
        };
        if_block(
          $$anchor2,
          ($$render) => {
            if (error()) $$render(consequent_3);
            else $$render(alternate_2, false);
          },
          $$elseif
        );
      }
    };
    if_block(node_3, ($$render) => {
      if (loading()) $$render(consequent_2);
      else $$render(alternate_1, false);
    });
  }
  reset(div);
  template_effect(
    ($0, $1) => {
      set_text(text, $0);
      set_text(text_1, $1);
    },
    [
      () => $_()("checkin.aiInsights"),
      () => $_()("checkin.aiAnalysis")
    ],
    derived_safe_equal
  );
  append($$anchor, div);
  pop();
  $$cleanup();
}
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error("Invalid file object"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
async function getAIInsights(question, rating, notes, photos, auditType = "5s") {
  try {
    if (!Array.isArray(photos)) {
      throw new Error("Photos must be an array");
    }
    const validPhotos = photos.filter((file) => file instanceof File && file.type.startsWith("image/"));
    const photoBase64Promises = validPhotos.map(fileToBase64);
    const photoBase64Data = await Promise.all(photoBase64Promises);
    let endpoint = "/audit/api/insights";
    const currentLocale = get$1($locale);
    if (auditType === "hse") {
      endpoint = "/audit/api/hse-insights";
    } else if (auditType === "mhe") {
      endpoint = "/audit/api/mhe-insights";
    } else if (auditType === "gemba") {
      endpoint = "/audit/api/gemba-insights";
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": currentLocale || "en",
        "Cookie": `language=${currentLocale || "en"}`
      },
      body: JSON.stringify({
        question,
        rating,
        notes,
        photos: photoBase64Data
      })
    });
    if (!response.ok) {
      throw new Error(`Failed to get AI insights (${response.status})`);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error instanceof Error ? error : new Error("Failed to get AI insights");
  }
}
export {
  AIInsights as A,
  Chevron_left as C,
  PhotoUpload as P,
  PhotoDisplay as a,
  Chevron_right as b,
  bubble_event as c,
  getAIInsights as g,
  spring as s
};
//# sourceMappingURL=hmB93t6v.js.map
