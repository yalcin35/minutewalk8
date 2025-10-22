import { c as comment, a as append } from "./DkiQ5dRj.js";
import "./CgZxdHNJ.js";
import { f as first_child } from "./BXHzHFYX.js";
import { I as Icon, s as slot } from "./CQ5zajJZ.js";
import { l as legacy_rest_props, s as spread_props } from "./CnKbWtpd.js";
function Orbit($$anchor, $$props) {
  const $$sanitized_props = legacy_rest_props($$props, [
    "children",
    "$$slots",
    "$$events",
    "$$legacy"
  ]);
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "3" }
    ],
    ["circle", { "cx": "19", "cy": "5", "r": "2" }],
    ["circle", { "cx": "5", "cy": "19", "r": "2" }],
    [
      "path",
      { "d": "M10.4 21.9a10 10 0 0 0 9.941-15.416" }
    ],
    [
      "path",
      { "d": "M13.5 2.1a10 10 0 0 0-9.841 15.416" }
    ]
  ];
  Icon($$anchor, spread_props({ name: "orbit" }, () => $$sanitized_props, {
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
  Orbit as O
};
//# sourceMappingURL=00S9Fma8.js.map
