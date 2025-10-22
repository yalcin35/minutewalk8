import { c as comment, a as append } from "./DkiQ5dRj.js";
import "./CgZxdHNJ.js";
import { f as first_child } from "./BXHzHFYX.js";
import { I as Icon, s as slot } from "./CQ5zajJZ.js";
import { l as legacy_rest_props, s as spread_props } from "./CnKbWtpd.js";
function Calendar($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2"
      }
    ],
    ["path", { "d": "M3 10h18" }]
  ];
  Icon($$anchor, spread_props({ name: "calendar" }, () => $$sanitized_props, {
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
  Calendar as C
};
//# sourceMappingURL=C54mA3lC.js.map
