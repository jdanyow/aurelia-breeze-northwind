/* */ 
var $def = require("./$.def");
$def($def.S, 'RegExp', {escape: require("./$.replacer")(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)});
