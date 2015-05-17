/* */ 
(function(process) {
  module.exports = (function() {
    var isHackValue = function(t) {
      return t.value === '__hack';
    };
    var compactShorthands = function(tokens, isImportant, processable, Token) {
      var componentsSoFar = {};
      var initSoFar = function(shprop, last, clearAll) {
        var found = {};
        var shorthandPosition;
        if (!clearAll && componentsSoFar[shprop]) {
          for (var i = 0; i < processable[shprop].components.length; i++) {
            var prop = processable[shprop].components[i];
            found[prop] = [];
            if (!(componentsSoFar[shprop].found[prop]))
              continue;
            for (var ii = 0; ii < componentsSoFar[shprop].found[prop].length; ii++) {
              var comp = componentsSoFar[shprop].found[prop][ii];
              if (comp.isMarkedForDeletion)
                continue;
              found[prop].push(comp);
              if (comp.position && (!shorthandPosition || comp.position < shorthandPosition))
                shorthandPosition = comp.position;
            }
          }
        }
        componentsSoFar[shprop] = {
          lastShorthand: last,
          found: found,
          shorthandPosition: shorthandPosition
        };
      };
      var addComponentSoFar = function(token, index) {
        var shprop = processable[token.prop].componentOf;
        if (!componentsSoFar[shprop])
          initSoFar(shprop);
        if (!componentsSoFar[shprop].found[token.prop])
          componentsSoFar[shprop].found[token.prop] = [];
        componentsSoFar[shprop].found[token.prop].push(token);
        if (!componentsSoFar[shprop].shorthandPosition && index) {
          componentsSoFar[shprop].shorthandPosition = index;
        }
      };
      var compactSoFar = function(prop) {
        var i;
        var componentsCount = processable[prop].components.length;
        if (!componentsSoFar[prop] || !componentsSoFar[prop].found)
          return false;
        var components = [];
        var realComponents = [];
        for (i = 0; i < componentsCount; i++) {
          var pp = processable[prop].components[i];
          if (componentsSoFar[prop].found[pp] && componentsSoFar[prop].found[pp].length) {
            var foundRealComp = componentsSoFar[prop].found[pp][0];
            components.push(foundRealComp);
            if (foundRealComp.isReal !== false) {
              realComponents.push(foundRealComp);
            }
          } else if (componentsSoFar[prop].lastShorthand) {
            var c = componentsSoFar[prop].lastShorthand.components[i].clone(isImportant);
            components.push(c);
          } else {
            return false;
          }
        }
        if (realComponents.length === 0) {
          return false;
        }
        if (realComponents.length === componentsCount) {
          var canOverrideDefault = true;
          var functionNameMatches = true;
          var functionName;
          for (var ci = 0; ci < realComponents.length; ci++) {
            var rc = realComponents[ci];
            if (!processable[rc.prop].canOverride(processable[rc.prop].defaultValue, rc.value)) {
              canOverrideDefault = false;
            }
            var iop = rc.value.indexOf('(');
            if (iop >= 0) {
              var otherFunctionName = rc.value.substring(0, iop);
              if (functionName)
                functionNameMatches = functionNameMatches && otherFunctionName === functionName;
              else
                functionName = otherFunctionName;
            }
          }
          if (!canOverrideDefault || !functionNameMatches)
            return false;
        }
        var compacted = processable[prop].putTogether(prop, components, isImportant);
        if (!(compacted instanceof Array)) {
          compacted = [compacted];
        }
        var compactedLength = Token.getDetokenizedLength(compacted);
        var authenticLength = Token.getDetokenizedLength(realComponents);
        if (realComponents.length === componentsCount || compactedLength < authenticLength || components.some(isHackValue)) {
          compacted[0].isShorthand = true;
          compacted[0].components = processable[prop].breakUp(compacted[0]);
          for (i = 0; i < realComponents.length; i++) {
            realComponents[i].isMarkedForDeletion = true;
          }
          tokens[componentsSoFar[prop].shorthandPosition].replaceWith = compacted;
          initSoFar(prop, compacted[0]);
          for (i = 1; i < compacted.length; i++) {
            addComponentSoFar(compacted[i]);
          }
          return true;
        }
        return false;
      };
      var compactAllSoFar = function() {
        for (var i in componentsSoFar) {
          if (componentsSoFar.hasOwnProperty(i)) {
            while (compactSoFar(i)) {}
          }
        }
      };
      var i,
          token;
      for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        if (token.isMarkedForDeletion) {
          continue;
        }
        if (!processable[token.prop]) {
          continue;
        }
        if (processable[token.prop].isShorthand) {
          if (token.isImportant === isImportant || (token.isImportant && !isImportant)) {
            while (compactSoFar(token.prop)) {}
            initSoFar(token.prop, token, true);
          }
        } else if (processable[token.prop].componentOf) {
          if (token.isImportant === isImportant) {
            token.position = i;
            addComponentSoFar(token, i);
          } else if (!isImportant && token.isImportant) {
            var importantTrickComp = new Token(token.prop, token.value, isImportant);
            importantTrickComp.isIrrelevant = true;
            importantTrickComp.isReal = false;
            addComponentSoFar(importantTrickComp);
          }
        } else {
          continue;
        }
      }
      compactAllSoFar();
      var result = [];
      for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        if (token.replaceWith) {
          for (var ii = 0; ii < token.replaceWith.length; ii++) {
            result.push(token.replaceWith[ii]);
          }
        }
        if (!token.isMarkedForDeletion) {
          result.push(token);
        }
        token.isMarkedForDeletion = false;
        token.replaceWith = null;
      }
      return result;
    };
    return {compactShorthands: compactShorthands};
  })();
})(require("process"));
