/* */ 
'use strict';
var strong = require("./$.collection-strong");
require("./$.collection")('Map', {
  get: function get(key) {
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  set: function set(key, value) {
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
