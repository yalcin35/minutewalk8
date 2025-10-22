import { w as block, x as hydrating, y as hydrate_next, E as EFFECT_TRANSPARENT, z as branch, A as pause_effect, B as hydrate_node } from "./BXHzHFYX.js";
function component(node, get_component, render_fn) {
  if (hydrating) {
    hydrate_next();
  }
  var anchor = node;
  var component2;
  var effect;
  block(() => {
    if (component2 === (component2 = get_component())) return;
    if (effect) {
      pause_effect(effect);
      effect = null;
    }
    if (component2) {
      effect = branch(() => render_fn(anchor, component2));
    }
  }, EFFECT_TRANSPARENT);
  if (hydrating) {
    anchor = hydrate_node;
  }
}
export {
  component as c
};
//# sourceMappingURL=Yy-EATei.js.map
