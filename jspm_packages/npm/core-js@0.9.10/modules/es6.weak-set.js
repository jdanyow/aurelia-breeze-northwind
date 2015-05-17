/* */ 
'use strict';
var weak = require("./$.collection-weak");
require("./$.collection")('WeakSet', {add: function add(value) {
    return weak.def(this, value, true);
  }}, weak, false, true);
