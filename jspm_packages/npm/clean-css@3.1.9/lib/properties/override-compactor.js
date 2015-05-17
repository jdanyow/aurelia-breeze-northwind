/* */ 
(function(process) {
  var validator = require("./validator");
  module.exports = (function() {
    var sameValue = function(val1, val2) {
      return val1 === val2;
    };
    var compactOverrides = function(tokens, processable, Token, compatibility) {
      var result,
          can,
          token,
          t,
          i,
          ii,
          iiii,
          oldResult,
          matchingComponent;
      var nameMatchFilter1 = function(x) {
        return x.prop === token.prop;
      };
      var nameMatchFilter2 = function(x) {
        return x.prop === t.prop;
      };
      function willResultInShorterValue(shorthand, token) {
        var shorthandCopy = shorthand.clone();
        shorthandCopy.isDirty = true;
        shorthandCopy.isShorthand = true;
        shorthandCopy.components = [];
        shorthand.components.forEach(function(component) {
          var componentCopy = component.clone();
          if (component.prop == token.prop)
            componentCopy.value = token.value;
          shorthandCopy.components.push(componentCopy);
        });
        return Token.getDetokenizedLength([shorthand, token]) >= Token.getDetokenizedLength([shorthandCopy]);
      }
      for (result = tokens, i = 0; (ii = result.length - 1 - i) >= 0; i++) {
        token = result[ii];
        can = (processable[token.prop] && processable[token.prop].canOverride) || sameValue;
        oldResult = result;
        result = [];
        var removeSelf = false;
        var oldResultLength = oldResult.length;
        for (var iii = 0; iii < oldResultLength; iii++) {
          t = oldResult[iii];
          if (t === token && !removeSelf) {
            result.push(t);
            continue;
          }
          if (iii > ii && !token.isImportant) {
            result.push(t);
            continue;
          }
          if (iii > ii && t.isImportant && token.isImportant && t.prop != token.prop && t.isComponentOf(token)) {
            result.push(t);
            continue;
          }
          if (t.isImportant && !token.isImportant) {
            result.push(t);
            continue;
          }
          if (token.isShorthand && !t.isShorthand && t.isComponentOf(token)) {
            matchingComponent = token.components.filter(nameMatchFilter2)[0];
            can = (processable[t.prop] && processable[t.prop].canOverride) || sameValue;
            if (!can(t.value, matchingComponent.value)) {
              result.push(t);
            }
          } else if (t.isShorthand && !token.isShorthand && token.isComponentOf(t)) {
            matchingComponent = t.components.filter(nameMatchFilter1)[0];
            if (can(matchingComponent.value, token.value)) {
              var disabledForToken = !compatibility.properties.backgroundSizeMerging && token.prop.indexOf('background-size') > -1 || processable[token.prop].nonMergeableValue && processable[token.prop].nonMergeableValue == token.value;
              if (disabledForToken) {
                result.push(t);
                continue;
              }
              if (!compatibility.properties.merging) {
                var wouldBreakCompatibility = false;
                for (iiii = 0; iiii < t.components.length; iiii++) {
                  var o = processable[t.components[iiii].prop];
                  can = (o && o.canOverride) || sameValue;
                  if (!can(o.defaultValue, t.components[iiii].value)) {
                    wouldBreakCompatibility = true;
                    break;
                  }
                }
                if (wouldBreakCompatibility) {
                  result.push(t);
                  continue;
                }
              }
              if ((!token.isImportant || token.isImportant && matchingComponent.isImportant) && willResultInShorterValue(t, token)) {
                matchingComponent.value = token.value;
                removeSelf = true;
              } else {
                matchingComponent.isIrrelevant = true;
              }
              t.isDirty = true;
            }
            result.push(t);
          } else if (token.isShorthand && t.isShorthand && token.prop === t.prop) {
            for (iiii = 0; iiii < t.components.length; iiii++) {
              can = (processable[t.components[iiii].prop] && processable[t.components[iiii].prop].canOverride) || sameValue;
              if (!can(t.components[iiii].value, token.components[iiii].value)) {
                result.push(t);
                break;
              }
              if (t.components[iiii].isImportant && token.components[iiii].isImportant && (validator.isValidFunction(t.components[iiii].value) ^ validator.isValidFunction(token.components[iiii].value))) {
                result.push(t);
                break;
              }
            }
          } else if (t.prop !== token.prop || !can(t.value, token.value)) {
            result.push(t);
          } else if (t.isImportant && token.isImportant && (validator.isValidFunction(t.value) ^ validator.isValidFunction(token.value))) {
            result.push(t);
          }
        }
        if (removeSelf) {
          i--;
        }
      }
      return result;
    };
    return {compactOverrides: compactOverrides};
  })();
})(require("process"));
