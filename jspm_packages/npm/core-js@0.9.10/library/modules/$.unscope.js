/* */ 
var $ = require("./$"),
    UNSCOPABLES = require("./$.wks")('unscopables');
if ($.FW && !(UNSCOPABLES in []))
  $.hide(Array.prototype, UNSCOPABLES, {});
module.exports = function(key) {
  if ($.FW)
    [][UNSCOPABLES][key] = true;
};
