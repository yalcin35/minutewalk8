import { D as is_runes, q as untrack, k as render_effect, x as hydrating, C as is, F as teardown, v as queue_micro_task } from "./BXHzHFYX.js";
import { l as listen_to_event_and_reset_event } from "./D8_nd-i4.js";
function bind_value(input, get, set = get) {
  var runes = is_runes();
  listen_to_event_and_reset_event(input, "input", (is_reset) => {
    var value = is_reset ? input.defaultValue : input.value;
    value = is_numberlike_input(input) ? to_number(value) : value;
    set(value);
    if (runes && value !== (value = get())) {
      var start = input.selectionStart;
      var end = input.selectionEnd;
      input.value = value ?? "";
      if (end !== null) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
      }
    }
  });
  if (
    // If we are hydrating and the value has since changed,
    // then use the updated value from the input instead.
    hydrating && input.defaultValue !== input.value || // If defaultValue is set, then value == defaultValue
    // TODO Svelte 6: remove input.value check and set to empty string?
    untrack(get) == null && input.value
  ) {
    set(is_numberlike_input(input) ? to_number(input.value) : input.value);
  }
  render_effect(() => {
    var value = get();
    if (is_numberlike_input(input) && value === to_number(input.value)) {
      return;
    }
    if (input.type === "date" && !value && !input.value) {
      return;
    }
    if (value !== input.value) {
      input.value = value ?? "";
    }
  });
}
const pending = /* @__PURE__ */ new Set();
function bind_group(inputs, group_index, input, get, set = get) {
  var is_checkbox = input.getAttribute("type") === "checkbox";
  var binding_group = inputs;
  let hydration_mismatch = false;
  if (group_index !== null) {
    for (var index of group_index) {
      binding_group = binding_group[index] ?? (binding_group[index] = []);
    }
  }
  binding_group.push(input);
  listen_to_event_and_reset_event(
    input,
    "change",
    () => {
      var value = input.__value;
      if (is_checkbox) {
        value = get_binding_group_value(binding_group, value, input.checked);
      }
      set(value);
    },
    // TODO better default value handling
    () => set(is_checkbox ? [] : null)
  );
  render_effect(() => {
    var value = get();
    if (hydrating && input.defaultChecked !== input.checked) {
      hydration_mismatch = true;
      return;
    }
    if (is_checkbox) {
      value = value || [];
      input.checked = value.includes(input.__value);
    } else {
      input.checked = is(input.__value, value);
    }
  });
  teardown(() => {
    var index2 = binding_group.indexOf(input);
    if (index2 !== -1) {
      binding_group.splice(index2, 1);
    }
  });
  if (!pending.has(binding_group)) {
    pending.add(binding_group);
    queue_micro_task(() => {
      binding_group.sort((a, b) => a.compareDocumentPosition(b) === 4 ? -1 : 1);
      pending.delete(binding_group);
    });
  }
  queue_micro_task(() => {
    if (hydration_mismatch) {
      var value;
      if (is_checkbox) {
        value = get_binding_group_value(binding_group, value, input.checked);
      } else {
        var hydration_input = binding_group.find((input2) => input2.checked);
        value = hydration_input == null ? void 0 : hydration_input.__value;
      }
      set(value);
    }
  });
}
function bind_checked(input, get, set = get) {
  listen_to_event_and_reset_event(input, "change", (is_reset) => {
    var value = is_reset ? input.defaultChecked : input.checked;
    set(value);
  });
  if (
    // If we are hydrating and the value has since changed,
    // then use the update value from the input instead.
    hydrating && input.defaultChecked !== input.checked || // If defaultChecked is set, then checked == defaultChecked
    untrack(get) == null
  ) {
    set(input.checked);
  }
  render_effect(() => {
    var value = get();
    input.checked = Boolean(value);
  });
}
function get_binding_group_value(group, __value, checked) {
  var value = /* @__PURE__ */ new Set();
  for (var i = 0; i < group.length; i += 1) {
    if (group[i].checked) {
      value.add(group[i].__value);
    }
  }
  if (!checked) {
    value.delete(__value);
  }
  return Array.from(value);
}
function is_numberlike_input(input) {
  var type = input.type;
  return type === "number" || type === "range";
}
function to_number(value) {
  return value === "" ? null : +value;
}
export {
  bind_group as a,
  bind_value as b,
  bind_checked as c
};
//# sourceMappingURL=7QZrl-aJ.js.map
