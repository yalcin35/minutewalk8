import { t as template, a as append } from "../chunks/DkiQ5dRj.js";
import { i as init } from "../chunks/CgZxdHNJ.js";
import { p as push, o as onMount, b as pop } from "../chunks/BXHzHFYX.js";
import { g as goto } from "../chunks/CKn-8tHH.js";
import "../chunks/HJ-2R3CP.js";
var root = template(`<div class="min-h-screen flex items-center justify-center"><p>Redirecting to new history page...</p></div>`);
function _page($$anchor, $$props) {
  push($$props, false);
  onMount(() => {
    goto("/history");
  });
  init();
  var div = root();
  append($$anchor, div);
  pop();
}
export {
  _page as component
};
//# sourceMappingURL=7.B66LPzaT.js.map
