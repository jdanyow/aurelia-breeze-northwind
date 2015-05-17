/* */ 
'use strict';
var $ = require("./$"),
    weak = require("./$.collection-weak"),
    leakStore = weak.leakStore,
    ID = weak.ID,
    WEAK = weak.WEAK,
    has = $.has,
    isObject = $.isObject,
    isFrozen = Object.isFrozen || $.core.Object.isFrozen,
    tmp = {};
var WeakMap = require("./$.collection")('WeakMap', {
  get: function get(key) {
    if (isObject(key)) {
      if (isFrozen(key))
        return leakStore(this).get(key);
      if (has(key, WEAK))
        return key[WEAK][this[ID]];
    }
  },
  set: function set(key, value) {
    return weak.def(this, key, value);
  }
}, weak, true, true);
if ($.FW && new WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7) {
  $.each.call(['delete', 'has', 'get', 'set'], function(key) {
    var method = WeakMap.prototype[key];
    require("./$.redef")(WeakMap.prototype, key, function(a, b) {
      if (isObject(a) && isFrozen(a)) {
        var result = leakStore(this)[key](a, b);
        return key == 'set' ? this : result;
      }
      return method.call(this, a, b);
    });
  });
}
