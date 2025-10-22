import { c as comment, a as append, t as template } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { f as first_child, p as push, o as onMount, t as template_effect, b as pop, c as child, s as sibling, h as derived_safe_equal, n as next, r as reset, g as get, m as mutable_source, e as mutate, d as set } from "../chunks/BXHzHFYX.js";
import { e as event, s as set_text, r as remove_textarea_child } from "../chunks/D8_nd-i4.js";
import { i as if_block } from "../chunks/CqHl9XhN.js";
import { I as Icon, s as slot, r as remove_input_defaults } from "../chunks/CQ5zajJZ.js";
import { t as transition, f as fly } from "../chunks/B1ns0h2F.js";
import { b as bind_value } from "../chunks/7QZrl-aJ.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import { i as isLandingPage, s as setLocale } from "../chunks/DIcdBaaF.js";
import { A as Arrow_left } from "../chunks/CLBcVVt3.js";
import { l as legacy_rest_props, s as spread_props } from "../chunks/CnKbWtpd.js";
import { C as Check } from "../chunks/BigxzFP9.js";
import { U as Users } from "../chunks/DKDK7n9-.js";
import { O as Orbit } from "../chunks/00S9Fma8.js";
import { M as Mail } from "../chunks/DjeQ6hMt.js";
function Asterisk($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    ["path", { "d": "M12 6v12" }],
    ["path", { "d": "M17.196 9 6.804 15" }],
    ["path", { "d": "m6.804 9 10.392 6" }]
  ];
  Icon($$anchor, spread_props({ name: "asterisk" }, () => $$sanitized_props, {
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
function Monitor($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "14",
        "x": "2",
        "y": "3",
        "rx": "2"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "16",
        "y1": "21",
        "y2": "21"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "17",
        "y2": "21"
      }
    ]
  ];
  Icon($$anchor, spread_props({ name: "monitor" }, () => $$sanitized_props, {
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
var root_1 = template(`<div class="bg-green-50 text-green-800 p-4 rounded-lg text-center svelte-173v3i6"><h3 class="font-medium mb-2 svelte-173v3i6">Thank you for your interest!</h3> <p class="svelte-173v3i6">We'll be in touch with you soon.</p></div>`);
var root_3 = template(`<div class="bg-red-50 text-red-600 p-4 rounded-lg svelte-173v3i6"> </div>`);
var root_4 = template(`<div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin svelte-173v3i6"></div> <span class="svelte-173v3i6">Sending...</span>`, 1);
var root_5 = template(`<!> <span class="svelte-173v3i6">Send Message</span>`, 1);
var root_2 = template(`<form class="space-y-6 svelte-173v3i6"><input type="hidden" name="access_key" value="41ff39f9-202e-440b-87d2-d2fd4a3fb1c1" class="svelte-173v3i6"> <input type="checkbox" name="botcheck" class="hidden svelte-173v3i6" style="display: none;"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 svelte-173v3i6"><div class="svelte-173v3i6"><label class="block text-sm font-medium text-gray-700 mb-1 svelte-173v3i6" for="firstName">First Name</label> <input id="firstName" type="text" class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 svelte-173v3i6" required></div> <div class="svelte-173v3i6"><label class="block text-sm font-medium text-gray-700 mb-1 svelte-173v3i6" for="lastName">Last Name</label> <input id="lastName" type="text" class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 svelte-173v3i6" required></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 svelte-173v3i6"><div class="svelte-173v3i6"><label class="block text-sm font-medium text-gray-700 mb-1 svelte-173v3i6" for="email">Email</label> <input id="email" type="email" class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 svelte-173v3i6" required></div> <div class="svelte-173v3i6"><label class="block text-sm font-medium text-gray-700 mb-1 svelte-173v3i6" for="phone">Phone Number</label> <input id="phone" type="tel" class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 svelte-173v3i6" required></div></div> <div class="svelte-173v3i6"><label class="block text-sm font-medium text-gray-700 mb-1 svelte-173v3i6" for="company">Company Name</label> <input id="company" type="text" class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 svelte-173v3i6" required></div> <div class="svelte-173v3i6"><label class="block text-sm font-medium text-gray-700 mb-1 svelte-173v3i6" for="message">Message</label> <textarea id="message" rows="4" class="w-full px-4 py-2 rounded-lg bg-gray-50 border-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     resize-none svelte-173v3i6" required></textarea></div> <!> <button type="submit" class="w-full flex items-center justify-center space-x-2 py-3 px-6
                   bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed svelte-173v3i6"><!></button></form>`);
var root = template(
  `<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-6 svelte-173v3i6"><button class="fixed top-6 left-6 flex items-center space-x-2 px-4 py-2 text-gray-600 
           hover:text-gray-900 transition-colors svelte-173v3i6"><!> <span class="svelte-173v3i6">Back to Home</span></button> <div class="max-w-7xl mx-auto svelte-173v3i6"><div class="text-center mb-16 svelte-173v3i6"><h1 class="text-4xl font-medium text-gray-900 svelte-173v3i6">Choose Your Plan</h1> <p class="mt-4 text-xl text-gray-500 svelte-173v3i6">Transform your operations with our flexible solutions</p></div> <div class="grid md:grid-cols-2 gap-8 mb-16 svelte-173v3i6"><div class="bg-white rounded-2xl shadow-lg overflow-hidden svelte-173v3i6"><div class="p-8 svelte-173v3i6"><div class="flex items-center justify-between svelte-173v3i6"><div class="svelte-173v3i6"><h2 class="text-2xl font-medium text-gray-900 svelte-173v3i6">Standard per Site</h2> <p class="text-gray-500 svelte-173v3i6">Complete Digital Solution</p></div> <!></div> <div class="mt-6 svelte-173v3i6"><span class="text-4xl font-light svelte-173v3i6">€799</span> <span class="text-gray-500 svelte-173v3i6">/month</span></div> <ul class="mt-8 space-y-4 svelte-173v3i6"><li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-600 svelte-173v3i6">Full access to all platform features</span></li> <li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-600 svelte-173v3i6">Unlimited users and audits</span></li> <li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-600 svelte-173v3i6">Unlimited photo uploads</span></li> <li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-600 svelte-173v3i6">AI-powered insights</span></li> <li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-600 svelte-173v3i6">Premium support</span></li></ul></div> <div class="px-8 pb-8 svelte-173v3i6"><button class="w-full py-3 px-6 text-center text-white bg-blue-500 hover:bg-blue-600
                   rounded-xl transition-colors svelte-173v3i6">Get Started</button></div></div> <div class="bg-white rounded-2xl shadow-lg overflow-hidden relative svelte-173v3i6"><div class="absolute top-5 right-5 svelte-173v3i6"><span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 svelte-173v3i6">Most Popular</span></div> <div class="p-8 svelte-173v3i6"><div class="flex items-center justify-between svelte-173v3i6"><div class="svelte-173v3i6"><h2 class="text-2xl font-medium text-gray-900 svelte-173v3i6">Enterprise</h2> <p class="text-gray-500 svelte-173v3i6">Complete Solution + Hardware + Expert</p></div> <!></div> <div class="mt-6 svelte-173v3i6"><span class="text-2xl font-medium svelte-173v3i6">Custom Pricing</span> <p class="text-gray-500 svelte-173v3i6">Contact for details</p></div> <ul class="mt-8 space-y-4 svelte-173v3i6"><li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-600 svelte-173v3i6">Everything in Standard plan</span></li> <li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-600 svelte-173v3i6">Hardware bundle (TV, tablet, keyboard and mouse)</span></li> <li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-600 svelte-173v3i6">Monthly on-site expert consultancy*</span></li> <li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-600 svelte-173v3i6">Customized independent on-site audits*</span></li> <li class="flex items-start svelte-173v3i6"><!> <span class="ml-3 text-gray-300 svelte-173v3i6">Currently only available in Hamburg</span></li></ul></div> <div class="px-8 pb-8 svelte-173v3i6"><button class="w-full py-3 px-6 text-center text-white bg-purple-500 hover:bg-purple-600
                   rounded-xl transition-colors svelte-173v3i6">Contact Us</button></div></div></div> <div id="contactForm" class="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 svelte-173v3i6"><div class="text-center mb-8 svelte-173v3i6"><h2 class="text-2xl font-medium text-gray-900 svelte-173v3i6">Get in Touch</h2> <p class="mt-2 text-gray-500 svelte-173v3i6">Fill out the form below and we'll get back to you shortly</p></div> <!></div></div></div> <footer class="bg-gray-900 text-white svelte-173v3i6"><div class="max-w-7xl mx-auto px-6 py-12 svelte-173v3i6"><div class="grid md:grid-cols-4 gap-8 svelte-173v3i6"><div class="space-y-4 svelte-173v3i6"><div class="flex items-center space-x-2 svelte-173v3i6"><div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 flex items-center justify-center text-white svelte-173v3i6"><!></div> <span class="text-lg font-medium svelte-173v3i6">MinuteWalk</span></div> <p class="text-gray-400 svelte-173v3i6">"Walk with Purpose, Talk with Impact"</p></div> <div class="svelte-173v3i6"><h3 class="text-lg font-medium mb-4 svelte-173v3i6">Product</h3> <ul class="space-y-2 svelte-173v3i6"><li class="svelte-173v3i6"><button class="text-gray-400 hover:text-white transition-colors svelte-173v3i6">Features</button></li> <li class="svelte-173v3i6"><button class="text-gray-400 hover:text-white transition-colors svelte-173v3i6">Pricing</button></li></ul></div> <div class="svelte-173v3i6"><h3 class="text-lg font-medium mb-4 svelte-173v3i6">Company</h3> <ul class="space-y-2 svelte-173v3i6"><li class="svelte-173v3i6"><button class="text-gray-400 hover:text-white transition-colors svelte-173v3i6">About</button></li> <li class="svelte-173v3i6"><button class="text-gray-400 hover:text-white transition-colors svelte-173v3i6">Contact</button></li></ul></div> <div class="svelte-173v3i6"><h3 class="text-lg font-medium mb-4 svelte-173v3i6">Legal</h3> <ul class="space-y-2 svelte-173v3i6"><li class="svelte-173v3i6"><button class="text-gray-400 hover:text-white transition-colors svelte-173v3i6">Privacy Policy</button></li></ul></div></div> <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 svelte-173v3i6"><p class="svelte-173v3i6"> </p></div></div></footer>`,
  1
);
function _page($$anchor, $$props) {
  push($$props, false);
  onMount(() => {
    isLandingPage.set(true);
    setLocale("en");
  });
  let formData = mutable_source({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    plan: ""
  });
  let loading = mutable_source(false);
  let success = mutable_source(false);
  let error = mutable_source(null);
  async function handleSubmit(event2) {
    event2.preventDefault();
    set(loading, true);
    set(error, null);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "41ff39f9-202e-440b-87d2-d2fd4a3fb1c1",
          subject: `New Contact Form Submission - ${get(formData).plan} Plan`,
          from_name: "MinuteWalk Contact Form",
          first_name: get(formData).firstName,
          last_name: get(formData).lastName,
          email: get(formData).email,
          phone: get(formData).phone,
          company: get(formData).company,
          message: get(formData).message,
          plan: get(formData).plan
        })
      });
      const result = await response.json();
      if (response.status === 200) {
        set(success, true);
        set(formData, {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          plan: ""
        });
      } else {
        throw new Error(result.message || "Failed to submit form");
      }
    } catch (e) {
      console.error("Form submission error:", e);
      set(error, e instanceof Error ? e.message : "Failed to submit form");
    } finally {
      set(loading, false);
    }
  }
  init();
  var fragment = root();
  var div = first_child(fragment);
  var button = child(div);
  var node = child(button);
  Arrow_left(node, { class: "w-5 h-5" });
  next(2);
  reset(button);
  var div_1 = sibling(button, 2);
  var div_2 = sibling(child(div_1), 2);
  var div_3 = child(div_2);
  var div_4 = child(div_3);
  var div_5 = child(div_4);
  var node_1 = sibling(child(div_5), 2);
  Monitor(node_1, { class: "w-8 h-8 text-blue-500" });
  reset(div_5);
  var ul = sibling(div_5, 4);
  var li = child(ul);
  var node_2 = child(li);
  Check(node_2, {
    class: "w-5 h-5 text-green-500 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li);
  var li_1 = sibling(li, 2);
  var node_3 = child(li_1);
  Check(node_3, {
    class: "w-5 h-5 text-green-500 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li_1);
  var li_2 = sibling(li_1, 2);
  var node_4 = child(li_2);
  Check(node_4, {
    class: "w-5 h-5 text-green-500 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li_2);
  var li_3 = sibling(li_2, 2);
  var node_5 = child(li_3);
  Check(node_5, {
    class: "w-5 h-5 text-green-500 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li_3);
  var li_4 = sibling(li_3, 2);
  var node_6 = child(li_4);
  Check(node_6, {
    class: "w-5 h-5 text-green-500 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li_4);
  reset(ul);
  reset(div_4);
  var div_6 = sibling(div_4, 2);
  var button_1 = child(div_6);
  reset(div_6);
  reset(div_3);
  var div_7 = sibling(div_3, 2);
  var div_8 = sibling(child(div_7), 2);
  var div_9 = child(div_8);
  var node_7 = sibling(child(div_9), 2);
  Users(node_7, { class: "w-8 h-8 text-purple-500" });
  reset(div_9);
  var ul_1 = sibling(div_9, 4);
  var li_5 = child(ul_1);
  var node_8 = child(li_5);
  Check(node_8, {
    class: "w-5 h-5 text-green-500 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li_5);
  var li_6 = sibling(li_5, 2);
  var node_9 = child(li_6);
  Check(node_9, {
    class: "w-5 h-5 text-green-500 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li_6);
  var li_7 = sibling(li_6, 2);
  var node_10 = child(li_7);
  Check(node_10, {
    class: "w-5 h-5 text-green-500 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li_7);
  var li_8 = sibling(li_7, 2);
  var node_11 = child(li_8);
  Check(node_11, {
    class: "w-5 h-5 text-green-500 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li_8);
  var li_9 = sibling(li_8, 2);
  var node_12 = child(li_9);
  Asterisk(node_12, {
    class: "w-5 h-5 text-gray-300 flex-shrink-0 mt-1"
  });
  next(2);
  reset(li_9);
  reset(ul_1);
  reset(div_8);
  var div_10 = sibling(div_8, 2);
  var button_2 = child(div_10);
  reset(div_10);
  reset(div_7);
  reset(div_2);
  var div_11 = sibling(div_2, 2);
  var node_13 = sibling(child(div_11), 2);
  {
    var consequent = ($$anchor2) => {
      var div_12 = root_1();
      transition(3, div_12, () => fly, () => ({ y: 20, duration: 300 }));
      append($$anchor2, div_12);
    };
    var alternate = ($$anchor2) => {
      var form = root_2();
      var input = child(form);
      var div_13 = sibling(input, 4);
      var div_14 = child(div_13);
      var input_1 = sibling(child(div_14), 2);
      remove_input_defaults(input_1);
      reset(div_14);
      var div_15 = sibling(div_14, 2);
      var input_2 = sibling(child(div_15), 2);
      remove_input_defaults(input_2);
      reset(div_15);
      reset(div_13);
      var div_16 = sibling(div_13, 2);
      var div_17 = child(div_16);
      var input_3 = sibling(child(div_17), 2);
      remove_input_defaults(input_3);
      reset(div_17);
      var div_18 = sibling(div_17, 2);
      var input_4 = sibling(child(div_18), 2);
      remove_input_defaults(input_4);
      reset(div_18);
      reset(div_16);
      var div_19 = sibling(div_16, 2);
      var input_5 = sibling(child(div_19), 2);
      remove_input_defaults(input_5);
      reset(div_19);
      var div_20 = sibling(div_19, 2);
      var textarea = sibling(child(div_20), 2);
      remove_textarea_child(textarea);
      reset(div_20);
      var node_14 = sibling(div_20, 2);
      {
        var consequent_1 = ($$anchor3) => {
          var div_21 = root_3();
          var text = child(div_21, true);
          reset(div_21);
          template_effect(() => set_text(text, get(error)));
          transition(3, div_21, () => fly, () => ({ y: 20, duration: 300 }));
          append($$anchor3, div_21);
        };
        if_block(node_14, ($$render) => {
          if (get(error)) $$render(consequent_1);
        });
      }
      var button_3 = sibling(node_14, 2);
      var node_15 = child(button_3);
      {
        var consequent_2 = ($$anchor3) => {
          var fragment_1 = root_4();
          next(2);
          append($$anchor3, fragment_1);
        };
        var alternate_1 = ($$anchor3) => {
          var fragment_2 = root_5();
          var node_16 = first_child(fragment_2);
          Mail(node_16, { class: "w-5 h-5" });
          next(2);
          append($$anchor3, fragment_2);
        };
        if_block(node_15, ($$render) => {
          if (get(loading)) $$render(consequent_2);
          else $$render(alternate_1, false);
        });
      }
      reset(button_3);
      reset(form);
      template_effect(() => button_3.disabled = get(loading));
      bind_value(input_1, () => get(formData).firstName, ($$value) => mutate(formData, get(formData).firstName = $$value));
      bind_value(input_2, () => get(formData).lastName, ($$value) => mutate(formData, get(formData).lastName = $$value));
      bind_value(input_3, () => get(formData).email, ($$value) => mutate(formData, get(formData).email = $$value));
      bind_value(input_4, () => get(formData).phone, ($$value) => mutate(formData, get(formData).phone = $$value));
      bind_value(input_5, () => get(formData).company, ($$value) => mutate(formData, get(formData).company = $$value));
      bind_value(textarea, () => get(formData).message, ($$value) => mutate(formData, get(formData).message = $$value));
      event("submit", form, handleSubmit);
      append($$anchor2, form);
    };
    if_block(node_13, ($$render) => {
      if (get(success)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(div_11);
  reset(div_1);
  reset(div);
  var footer = sibling(div, 2);
  var div_22 = child(footer);
  var div_23 = child(div_22);
  var div_24 = child(div_23);
  var div_25 = child(div_24);
  var div_26 = child(div_25);
  var node_17 = child(div_26);
  Orbit(node_17, { class: "w-5 h-5" });
  reset(div_26);
  next(2);
  reset(div_25);
  next(2);
  reset(div_24);
  var div_27 = sibling(div_24, 2);
  var ul_2 = sibling(child(div_27), 2);
  var li_10 = child(ul_2);
  var button_4 = child(li_10);
  reset(li_10);
  var li_11 = sibling(li_10, 2);
  var button_5 = child(li_11);
  reset(li_11);
  reset(ul_2);
  reset(div_27);
  var div_28 = sibling(div_27, 2);
  var ul_3 = sibling(child(div_28), 2);
  var li_12 = child(ul_3);
  var button_6 = child(li_12);
  reset(li_12);
  var li_13 = sibling(li_12, 2);
  var button_7 = child(li_13);
  reset(li_13);
  reset(ul_3);
  reset(div_28);
  var div_29 = sibling(div_28, 2);
  var ul_4 = sibling(child(div_29), 2);
  var li_14 = child(ul_4);
  var button_8 = child(li_14);
  reset(li_14);
  reset(ul_4);
  reset(div_29);
  reset(div_23);
  var div_30 = sibling(div_23, 2);
  var p = child(div_30);
  var text_1 = child(p);
  reset(p);
  reset(div_30);
  reset(div_22);
  reset(footer);
  template_effect(($0) => set_text(text_1, `© ${$0 ?? ""} MinuteWalk. All rights reserved.`), [() => (/* @__PURE__ */ new Date()).getFullYear()], derived_safe_equal);
  event("click", button, () => goto("/"));
  event("click", button_1, () => {
    var _a;
    mutate(formData, get(formData).plan = "Standard");
    (_a = document.getElementById("contactForm")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  event("click", button_2, () => {
    var _a;
    mutate(formData, get(formData).plan = "Enterprise");
    (_a = document.getElementById("contactForm")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  event("click", button_4, () => {
    var _a;
    return (_a = document.getElementById("features")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  event("click", button_5, () => goto("/contact"));
  event("click", button_6, () => goto("/about"));
  event("click", button_7, () => goto("/contact"));
  event("click", button_8, () => goto("/privacy"));
  append($$anchor, fragment);
  pop();
}
export {
  _page as component
};
//# sourceMappingURL=13.OVJmhEeq.js.map
