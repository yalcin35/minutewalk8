import { c as comment, a as append } from "./DkiQ5dRj.js";
import "./CgZxdHNJ.js";
import { f as first_child } from "./BXHzHFYX.js";
import { I as Icon, s as slot } from "./CQ5zajJZ.js";
import { l as legacy_rest_props, s as spread_props } from "./CnKbWtpd.js";
function Image($$anchor, $$props) {
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
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["circle", { "cx": "9", "cy": "9", "r": "2" }],
    [
      "path",
      {
        "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
      }
    ]
  ];
  Icon($$anchor, spread_props({ name: "image" }, () => $$sanitized_props, {
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
  Image as I
};
//# sourceMappingURL=BKPy-hrQ.js.map
