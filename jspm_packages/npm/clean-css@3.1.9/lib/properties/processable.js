/* */ 
(function(process) {
  module.exports = (function() {
    var tokenModule = require("./token");
    var validator = require("./validator");
    var Splitter = require("../utils/splitter");
    var canOverride = {
      always: function() {
        return true;
      },
      sameValue: function(val1, val2) {
        return val1 === val2;
      },
      sameFunctionOrValue: function(val1, val2) {
        if (validator.areSameFunction(val1, val2)) {
          return true;
        }
        return val1 === val2;
      },
      unit: function(val1, val2) {
        if (validator.isValidAndCompatibleUnitWithoutFunction(val1) && !validator.isValidAndCompatibleUnitWithoutFunction(val2))
          return false;
        if (validator.isValidUnitWithoutFunction(val2))
          return true;
        if (validator.isValidUnitWithoutFunction(val1))
          return false;
        if (validator.isValidFunctionWithoutVendorPrefix(val2) && validator.isValidFunctionWithoutVendorPrefix(val1)) {
          return true;
        }
        return canOverride.sameFunctionOrValue(val1, val2);
      },
      color: function(val1, val2) {
        if (validator.isValidNamedColor(val2) || validator.isValidHexColor(val2))
          return true;
        if (validator.isValidNamedColor(val1) || validator.isValidHexColor(val1))
          return false;
        if (validator.isValidRgbaColor(val2) || validator.isValidHslaColor(val2))
          return true;
        if (validator.isValidRgbaColor(val1) || validator.isValidHslaColor(val1))
          return false;
        return canOverride.sameFunctionOrValue(val1, val2);
      },
      backgroundImage: function(val1, val2) {
        if (val2 === 'none' || val2 === 'inherit' || validator.isValidUrl(val2))
          return true;
        if (val1 === 'none' || val1 === 'inherit' || validator.isValidUrl(val1))
          return false;
        return canOverride.sameFunctionOrValue(val1, val2);
      },
      border: function(val1, val2) {
        var brokenUp1 = breakUp.border(Token.tokenizeOne({value: val1}));
        var brokenUp2 = breakUp.border(Token.tokenizeOne({value: val2}));
        return canOverride.color(brokenUp1[2].value, brokenUp2[2].value);
      }
    };
    canOverride = Object.freeze(canOverride);
    var breakUp = {};
    breakUp.takeCareOfFourValues = function(splitfunc) {
      return function(token) {
        var descriptor = processable[token.prop];
        var result = [];
        var splitval = splitfunc(token.value);
        if (splitval.length === 0 || (splitval.length < descriptor.components.length && descriptor.components.length > 4)) {
          return [token];
        }
        if (splitval.length < descriptor.components.length && splitval.length < 2) {
          splitval[1] = splitval[0];
        }
        if (splitval.length < descriptor.components.length && splitval.length < 3) {
          splitval[2] = splitval[0];
        }
        if (splitval.length < descriptor.components.length && splitval.length < 4) {
          splitval[3] = splitval[1];
        }
        for (var i = 0; i < descriptor.components.length; i++) {
          var t = new Token(descriptor.components[i], splitval[i], token.isImportant);
          result.push(t);
        }
        return result;
      };
    };
    breakUp.fourBySpaces = breakUp.takeCareOfFourValues(function(val) {
      return new Splitter(' ').split(val).filter(function(v) {
        return v;
      });
    });
    breakUp.commaSeparatedMulitpleValues = function(splitfunc) {
      return function(token) {
        if (token.value.indexOf(',') === -1)
          return splitfunc(token);
        var values = new Splitter(',').split(token.value);
        var components = [];
        for (var i = 0,
            l = values.length; i < l; i++) {
          token.value = values[i];
          components.push(splitfunc(token));
        }
        token.value = values.join(',');
        for (var j = 0,
            m = components[0].length; j < m; j++) {
          for (var k = 0,
              n = components.length,
              newValues = []; k < n; k++) {
            newValues.push(components[k][j].value);
          }
          components[0][j].value = newValues.join(',');
        }
        return components[0];
      };
    };
    breakUp.background = function(token) {
      var result = Token.makeDefaults(['background-image', 'background-position', 'background-size', 'background-repeat', 'background-attachment', 'background-origin', 'background-clip', 'background-color'], token.isImportant);
      var image = result[0];
      var position = result[1];
      var size = result[2];
      var repeat = result[3];
      var attachment = result[4];
      var origin = result[5];
      var clip = result[6];
      var color = result[7];
      var positionSet = false;
      var clipSet = false;
      var originSet = false;
      var repeatSet = false;
      if (token.value === 'inherit') {
        color.value = image.value = repeat.value = position.value = size.value = attachment.value = origin.value = clip.value = 'inherit';
        return result;
      }
      var parts = new Splitter(' ').split(token.value);
      if (parts.length === 0)
        return result;
      for (var i = parts.length - 1; i >= 0; i--) {
        var currentPart = parts[i];
        if (validator.isValidBackgroundAttachment(currentPart)) {
          attachment.value = currentPart;
        } else if (validator.isValidBackgroundBox(currentPart)) {
          if (clipSet) {
            origin.value = currentPart;
            originSet = true;
          } else {
            clip.value = currentPart;
            clipSet = true;
          }
        } else if (validator.isValidBackgroundRepeat(currentPart)) {
          if (repeatSet) {
            repeat.value = currentPart + ' ' + repeat.value;
          } else {
            repeat.value = currentPart;
            repeatSet = true;
          }
        } else if (validator.isValidBackgroundPositionPart(currentPart) || validator.isValidBackgroundSizePart(currentPart)) {
          if (i > 0) {
            var previousPart = parts[i - 1];
            if (previousPart.indexOf('/') > 0) {
              var twoParts = new Splitter('/').split(previousPart);
              size.value = twoParts.pop() + ' ' + currentPart;
              parts[i - 1] = twoParts.pop();
            } else if (i > 1 && parts[i - 2] == '/') {
              size.value = previousPart + ' ' + currentPart;
              i -= 2;
            } else if (parts[i - 1] == '/') {
              size.value = currentPart;
            } else {
              position.value = currentPart + (positionSet ? ' ' + position.value : '');
              positionSet = true;
            }
          } else {
            position.value = currentPart + (positionSet ? ' ' + position.value : '');
            positionSet = true;
          }
        } else if (validator.isValidBackgroundPositionAndSize(currentPart)) {
          var sizeValue = new Splitter('/').split(currentPart);
          size.value = sizeValue.pop();
          position.value = sizeValue.pop();
        } else if ((color.value == processable[color.prop].defaultValue || color.value == 'none') && validator.isValidColor(currentPart)) {
          color.value = currentPart;
        } else if (validator.isValidUrl(currentPart) || validator.isValidFunction(currentPart)) {
          image.value = currentPart;
        }
      }
      if (clipSet && !originSet)
        origin.value = clip.value;
      return result;
    };
    breakUp.listStyle = function(token) {
      var result = Token.makeDefaults(['list-style-type', 'list-style-position', 'list-style-image'], token.isImportant);
      var type = result[0],
          position = result[1],
          image = result[2];
      if (token.value === 'inherit') {
        type.value = position.value = image.value = 'inherit';
        return result;
      }
      var parts = new Splitter(' ').split(token.value);
      var ci = 0;
      if (ci < parts.length && validator.isValidListStyleType(parts[ci])) {
        type.value = parts[ci];
        ci++;
      }
      if (ci < parts.length && validator.isValidListStylePosition(parts[ci])) {
        position.value = parts[ci];
        ci++;
      }
      if (ci < parts.length) {
        image.value = parts.splice(ci, parts.length - ci + 1).join(' ');
      }
      return result;
    };
    breakUp._widthStyleColor = function(token, prefix, order) {
      var components = order.map(function(prop) {
        return prefix + '-' + prop;
      });
      var result = Token.makeDefaults(components, token.isImportant);
      var color = result[order.indexOf('color')];
      var style = result[order.indexOf('style')];
      var width = result[order.indexOf('width')];
      if (token.value === 'inherit' || token.value === 'inherit inherit inherit') {
        color.value = style.value = width.value = 'inherit';
        return result;
      }
      var parts = new Splitter(' ').split(token.value),
          w;
      if (parts.length === 0) {
        return result;
      }
      if (parts.length >= 1) {
        w = parts.filter(function(p) {
          return p !== 'inherit' && validator.isValidOutlineWidth(p);
        });
        if (w.length) {
          width.value = w[0];
          parts.splice(parts.indexOf(w[0]), 1);
        }
      }
      if (parts.length >= 1) {
        w = parts.filter(function(p) {
          return p !== 'inherit' && validator.isValidOutlineStyle(p);
        });
        if (w.length) {
          style.value = w[0];
          parts.splice(parts.indexOf(w[0]), 1);
        }
      }
      if (parts.length >= 1) {
        w = parts.filter(function(p) {
          return validator.isValidOutlineColor(p);
        });
        if (w.length) {
          color.value = w[0];
          parts.splice(parts.indexOf(w[0]), 1);
        }
      }
      return result;
    };
    breakUp.outline = function(token) {
      return breakUp._widthStyleColor(token, 'outline', ['color', 'style', 'width']);
    };
    breakUp.border = function(token) {
      return breakUp._widthStyleColor(token, 'border', ['width', 'style', 'color']);
    };
    breakUp.borderRadius = function(token) {
      var parts = token.value.split('/');
      if (parts.length == 1)
        return breakUp.fourBySpaces(token);
      var horizontalPart = token.clone();
      var verticalPart = token.clone();
      horizontalPart.value = parts[0];
      verticalPart.value = parts[1];
      var horizontalBreakUp = breakUp.fourBySpaces(horizontalPart);
      var verticalBreakUp = breakUp.fourBySpaces(verticalPart);
      for (var i = 0; i < 4; i++) {
        horizontalBreakUp[i].value = [horizontalBreakUp[i].value, verticalBreakUp[i].value];
      }
      return horizontalBreakUp;
    };
    var putTogether = {
      fourUnits: function(prop, tokens, isImportant) {
        if (tokens[0].isIrrelevant)
          tokens[0].value = tokens[2].value;
        if (tokens[2].isIrrelevant)
          tokens[2].value = tokens[0].value;
        if (tokens[1].isIrrelevant)
          tokens[1].value = tokens[3].value;
        if (tokens[3].isIrrelevant)
          tokens[3].value = tokens[1].value;
        if (tokens[0].isIrrelevant && tokens[2].isIrrelevant) {
          if (tokens[1].value === tokens[3].value)
            tokens[0].value = tokens[2].value = tokens[1].value;
          else
            tokens[0].value = tokens[2].value = '0';
        }
        if (tokens[1].isIrrelevant && tokens[3].isIrrelevant) {
          if (tokens[0].value === tokens[2].value)
            tokens[1].value = tokens[3].value = tokens[0].value;
          else
            tokens[1].value = tokens[3].value = '0';
        }
        var result = new Token(prop, tokens[0].value, isImportant);
        result.granularValues = [];
        result.granularValues[tokens[0].prop] = tokens[0].value;
        result.granularValues[tokens[1].prop] = tokens[1].value;
        result.granularValues[tokens[2].prop] = tokens[2].value;
        result.granularValues[tokens[3].prop] = tokens[3].value;
        if (tokens[0].isIrrelevant && tokens[1].isIrrelevant && tokens[2].isIrrelevant && tokens[3].isIrrelevant) {
          result.value = processable[prop].shortestValue || processable[prop].defaultValue;
          return result;
        }
        if (tokens[0].value === tokens[1].value && tokens[0].value === tokens[2].value && tokens[0].value === tokens[3].value) {
          return result;
        }
        result.value += ' ' + tokens[1].value;
        if (tokens[0].value === tokens[2].value && tokens[1].value === tokens[3].value) {
          return result;
        }
        result.value += ' ' + tokens[2].value;
        if (tokens[1].value === tokens[3].value) {
          return result;
        }
        result.value += ' ' + tokens[3].value;
        return result;
      },
      bySpacesOmitDefaults: function(prop, tokens, isImportant, meta) {
        var result = new Token(prop, '', isImportant);
        var irrelevantTokens = tokens.filter(function(t) {
          return t.isIrrelevant;
        });
        if (irrelevantTokens.length === tokens.length) {
          result.isIrrelevant = true;
          result.value = processable[prop].shortestValue || processable[prop].defaultValue;
          return result;
        }
        var valueIfAllDefault = processable[prop].defaultValue;
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          var definition = processable[token.prop] && processable[token.prop];
          result.granularValues = result.granularValues || {};
          result.granularValues[token.prop] = token.value;
          if (token.isIrrelevant) {
            var tokenShortest = processable[token.prop].shortestValue || processable[token.prop].defaultValue;
            if (tokenShortest.length < valueIfAllDefault.length) {
              valueIfAllDefault = tokenShortest;
            }
          }
          if (definition.mergeWithPrevious && token.value === tokens[i - 1].value)
            continue;
          if (token.isIrrelevant)
            continue;
          if (definition.defaultValue === token.value)
            if (!definition.mergeWithPrevious || tokens[i - 1].value === processable[tokens[i - 1].prop].defaultValue)
              continue;
          if (meta && meta.partsCount && meta.position < meta.partsCount - 1 && definition.multiValueLastOnly)
            continue;
          var requiresPreceeding = definition.shorthandFollows;
          if (requiresPreceeding && (tokens[i - 1].value == processable[requiresPreceeding].defaultValue)) {
            result.value += ' ' + tokens[i - 1].value;
          }
          result.value += (definition.prefixShorthandValueWith || ' ') + token.value;
        }
        result.value = result.value.trim();
        if (!result.value) {
          result.value = valueIfAllDefault;
        }
        return result;
      },
      commaSeparatedMulitpleValues: function(assembleFunction) {
        return function(prop, tokens, isImportant) {
          var tokenSplitLengths = tokens.map(function(token) {
            return new Splitter(',').split(token.value).length;
          });
          var partsCount = Math.max.apply(Math, tokenSplitLengths);
          if (partsCount == 1)
            return assembleFunction(prop, tokens, isImportant);
          var merged = [];
          for (var i = 0; i < partsCount; i++) {
            merged.push([]);
            for (var j = 0; j < tokens.length; j++) {
              var split = new Splitter(',').split(tokens[j].value);
              merged[i].push(split[i] || split[0]);
            }
          }
          var mergedValues = [];
          var firstProcessed;
          for (i = 0; i < partsCount; i++) {
            var newTokens = [];
            for (var k = 0,
                n = merged[i].length; k < n; k++) {
              var newToken = tokens[k].clone();
              newToken.value = merged[i][k];
              newTokens.push(newToken);
            }
            var meta = {
              partsCount: partsCount,
              position: i
            };
            var processed = assembleFunction(prop, newTokens, isImportant, meta);
            mergedValues.push(processed.value);
            if (!firstProcessed)
              firstProcessed = processed;
          }
          firstProcessed.value = mergedValues.join(',');
          return firstProcessed;
        };
      },
      takeCareOfInherit: function(innerFunc) {
        return function(prop, tokens, isImportant, meta) {
          var inheritingTokens = [];
          var nonInheritingTokens = [];
          var result2Shorthandable = [];
          var i;
          for (i = 0; i < tokens.length; i++) {
            if (tokens[i].value === 'inherit') {
              inheritingTokens.push(tokens[i]);
              var r2s = new Token(tokens[i].prop, tokens[i].isImportant);
              r2s.isIrrelevant = true;
              result2Shorthandable.push(r2s);
            } else {
              nonInheritingTokens.push(tokens[i]);
              result2Shorthandable.push(tokens[i]);
            }
          }
          if (nonInheritingTokens.length === 0) {
            return new Token(prop, 'inherit', isImportant);
          } else if (inheritingTokens.length > 0) {
            var result1 = [new Token(prop, 'inherit', isImportant)].concat(nonInheritingTokens);
            var result2 = [innerFunc(prop, result2Shorthandable, isImportant, meta)].concat(inheritingTokens);
            var dl1 = Token.getDetokenizedLength(result1);
            var dl2 = Token.getDetokenizedLength(result2);
            return dl1 < dl2 ? result1 : result2;
          } else {
            return innerFunc(prop, tokens, isImportant, meta);
          }
        };
      },
      borderRadius: function(prop, tokens, isImportant) {
        var verticalTokens = [];
        var newTokens = [];
        for (var i = 0,
            l = tokens.length; i < l; i++) {
          var token = tokens[i];
          var newToken = token.clone();
          newTokens.push(newToken);
          if (!Array.isArray(token.value))
            continue;
          if (token.value.length > 1) {
            verticalTokens.push({
              prop: token.prop,
              value: token.value[1],
              isImportant: token.isImportant
            });
          }
          newToken.value = token.value[0];
        }
        var result = putTogether.takeCareOfInherit(putTogether.fourUnits)(prop, newTokens, isImportant);
        if (verticalTokens.length > 0) {
          var verticalResult = putTogether.takeCareOfInherit(putTogether.fourUnits)(prop, verticalTokens, isImportant);
          if (result.value != verticalResult.value)
            result.value += '/' + verticalResult.value;
        }
        return result;
      }
    };
    var processable = {
      'color': {
        canOverride: canOverride.color,
        defaultValue: 'transparent',
        shortestValue: 'red'
      },
      'background': {
        components: ['background-image', 'background-position', 'background-size', 'background-repeat', 'background-attachment', 'background-origin', 'background-clip', 'background-color'],
        breakUp: breakUp.commaSeparatedMulitpleValues(breakUp.background),
        putTogether: putTogether.commaSeparatedMulitpleValues(putTogether.takeCareOfInherit(putTogether.bySpacesOmitDefaults)),
        defaultValue: '0 0',
        shortestValue: '0'
      },
      'background-clip': {
        canOverride: canOverride.always,
        defaultValue: 'border-box',
        shortestValue: 'border-box',
        shorthandFollows: 'background-origin',
        mergeWithPrevious: true
      },
      'background-color': {
        canOverride: canOverride.color,
        defaultValue: 'transparent',
        multiValueLastOnly: true,
        nonMergeableValue: 'none',
        shortestValue: 'red'
      },
      'background-image': {
        canOverride: canOverride.backgroundImage,
        defaultValue: 'none'
      },
      'background-origin': {
        canOverride: canOverride.always,
        defaultValue: 'padding-box',
        shortestValue: 'border-box'
      },
      'background-repeat': {
        canOverride: canOverride.always,
        defaultValue: 'repeat'
      },
      'background-position': {
        canOverride: canOverride.always,
        defaultValue: '0 0',
        shortestValue: '0'
      },
      'background-size': {
        canOverride: canOverride.always,
        defaultValue: 'auto',
        shortestValue: '0 0',
        prefixShorthandValueWith: '/',
        shorthandFollows: 'background-position'
      },
      'background-attachment': {
        canOverride: canOverride.always,
        defaultValue: 'scroll'
      },
      'border': {
        breakUp: breakUp.border,
        canOverride: canOverride.border,
        components: ['border-width', 'border-style', 'border-color'],
        defaultValue: 'none',
        putTogether: putTogether.takeCareOfInherit(putTogether.bySpacesOmitDefaults)
      },
      'border-color': {
        canOverride: canOverride.color,
        defaultValue: 'none'
      },
      'border-style': {
        canOverride: canOverride.always,
        defaultValue: 'none'
      },
      'border-width': {
        canOverride: canOverride.unit,
        defaultValue: 'medium',
        shortestValue: '0'
      },
      'list-style': {
        components: ['list-style-type', 'list-style-position', 'list-style-image'],
        canOverride: canOverride.always,
        breakUp: breakUp.listStyle,
        putTogether: putTogether.takeCareOfInherit(putTogether.bySpacesOmitDefaults),
        defaultValue: 'outside',
        shortestValue: 'none'
      },
      'list-style-type': {
        canOverride: canOverride.always,
        shortestValue: 'none',
        defaultValue: '__hack'
      },
      'list-style-position': {
        canOverride: canOverride.always,
        defaultValue: 'outside',
        shortestValue: 'inside'
      },
      'list-style-image': {
        canOverride: canOverride.always,
        defaultValue: 'none'
      },
      'outline': {
        components: ['outline-color', 'outline-style', 'outline-width'],
        breakUp: breakUp.outline,
        putTogether: putTogether.takeCareOfInherit(putTogether.bySpacesOmitDefaults),
        defaultValue: '0'
      },
      'outline-color': {
        canOverride: canOverride.color,
        defaultValue: 'invert',
        shortestValue: 'red'
      },
      'outline-style': {
        canOverride: canOverride.always,
        defaultValue: 'none'
      },
      'outline-width': {
        canOverride: canOverride.unit,
        defaultValue: 'medium',
        shortestValue: '0'
      },
      '-moz-transform': {canOverride: canOverride.sameFunctionOrValue},
      '-ms-transform': {canOverride: canOverride.sameFunctionOrValue},
      '-webkit-transform': {canOverride: canOverride.sameFunctionOrValue},
      'transform': {canOverride: canOverride.sameFunctionOrValue}
    };
    var addFourValueShorthand = function(prop, components, options) {
      options = options || {};
      processable[prop] = {
        components: components,
        breakUp: options.breakUp || breakUp.fourBySpaces,
        putTogether: options.putTogether || putTogether.takeCareOfInherit(putTogether.fourUnits),
        defaultValue: options.defaultValue || '0',
        shortestValue: options.shortestValue
      };
      for (var i = 0; i < components.length; i++) {
        processable[components[i]] = {
          breakUp: options.breakUp || breakUp.fourBySpaces,
          canOverride: options.canOverride || canOverride.unit,
          defaultValue: options.defaultValue || '0',
          shortestValue: options.shortestValue
        };
      }
    };
    ['', '-moz-', '-o-', '-webkit-'].forEach(function(prefix) {
      addFourValueShorthand(prefix + 'border-radius', [prefix + 'border-top-left-radius', prefix + 'border-top-right-radius', prefix + 'border-bottom-right-radius', prefix + 'border-bottom-left-radius'], {
        breakUp: breakUp.borderRadius,
        putTogether: putTogether.borderRadius
      });
    });
    addFourValueShorthand('border-color', ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'], {
      breakUp: breakUp.fourBySpaces,
      canOverride: canOverride.color,
      defaultValue: 'currentColor',
      shortestValue: 'red'
    });
    addFourValueShorthand('border-style', ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'], {
      breakUp: breakUp.fourBySpaces,
      canOverride: canOverride.always,
      defaultValue: 'none'
    });
    addFourValueShorthand('border-width', ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'], {
      defaultValue: 'medium',
      shortestValue: '0'
    });
    addFourValueShorthand('padding', ['padding-top', 'padding-right', 'padding-bottom', 'padding-left']);
    addFourValueShorthand('margin', ['margin-top', 'margin-right', 'margin-bottom', 'margin-left']);
    for (var proc in processable) {
      if (!processable.hasOwnProperty(proc))
        continue;
      var currDesc = processable[proc];
      if (!(currDesc.components instanceof Array) || currDesc.components.length === 0)
        continue;
      currDesc.isShorthand = true;
      for (var cI = 0; cI < currDesc.components.length; cI++) {
        if (!processable[currDesc.components[cI]]) {
          throw new Error('"' + currDesc.components[cI] + '" is defined as a component of "' + proc + '" but isn\'t defined in processable.');
        }
        processable[currDesc.components[cI]].componentOf = proc;
      }
    }
    var Token = tokenModule.createTokenPrototype(processable);
    return {
      implementedFor: /background|border|color|list|margin|outline|padding|transform/,
      processable: function(compatibility) {
        validator.setCompatibility(compatibility);
        return processable;
      },
      Token: Token
    };
  })();
})(require("process"));
