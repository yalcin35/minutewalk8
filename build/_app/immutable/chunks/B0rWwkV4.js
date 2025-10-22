import { c as comment, a as append } from "./DkiQ5dRj.js";
import "./CgZxdHNJ.js";
import { f as first_child } from "./BXHzHFYX.js";
import { I as Icon, s as slot } from "./CQ5zajJZ.js";
import { l as legacy_rest_props, s as spread_props } from "./CnKbWtpd.js";
function Clock($$anchor, $$props) {
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
    ],
    ["polyline", { "points": "12 6 12 12 16 14" }]
  ];
  Icon($$anchor, spread_props({ name: "clock" }, () => $$sanitized_props, {
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
export {
  Clock as C
};
//# sourceMappingURL=B0rWwkV4.js.map
