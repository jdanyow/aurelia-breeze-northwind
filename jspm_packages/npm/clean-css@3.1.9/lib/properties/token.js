/* */ 
(function(process) {
  module.exports = (function() {
    var createTokenPrototype = function(processable) {
      var important = '!important';
      function Token(prop, p2, p3) {
        this.prop = prop;
        if (typeof(p2) === 'string') {
          this.value = p2;
          this.isImportant = p3;
        } else {
          this.value = processable[prop].defaultValue;
          this.isImportant = p2;
        }
      }
      Token.prototype.prop = null;
      Token.prototype.value = null;
      Token.prototype.granularValues = null;
      Token.prototype.components = null;
      Token.prototype.position = null;
      Token.prototype.isImportant = false;
      Token.prototype.isDirty = false;
      Token.prototype.isShorthand = false;
      Token.prototype.isIrrelevant = false;
      Token.prototype.isReal = true;
      Token.prototype.isMarkedForDeletion = false;
      Token.prototype.metadata = null;
      Token.prototype.isComponentOf = function(other) {
        if (!processable[this.prop] || !processable[other.prop])
          return false;
        if (!(processable[other.prop].components instanceof Array) || !processable[other.prop].components.length)
          return false;
        return processable[other.prop].components.indexOf(this.prop) >= 0;
      };
      Token.prototype.clone = function(isImportant) {
        var token = new Token(this.prop, this.value, (typeof(isImportant) !== 'undefined' ? isImportant : this.isImportant));
        return token;
      };
      Token.prototype.cloneIrrelevant = function(isImportant) {
        var token = Token.makeDefault(this.prop, (typeof(isImportant) !== 'undefined' ? isImportant : this.isImportant));
        token.isIrrelevant = true;
        return token;
      };
      Token.makeDefaults = function(props, important) {
        return props.map(function(prop) {
          return new Token(prop, important);
        });
      };
      Token.tokenizeOne = function(fullProp) {
        var colonPos = fullProp.value.indexOf(':');
        if (colonPos < 0) {
          return new Token('', fullProp.value);
        }
        var prop = fullProp.value.substr(0, colonPos).trim();
        var value = fullProp.value.substr(colonPos + 1).trim();
        var isImportant = false;
        var importantPos = value.indexOf(important);
        if (importantPos >= 1 && importantPos === value.length - important.length) {
          value = value.substr(0, importantPos).trim();
          isImportant = true;
        }
        var result = new Token(prop, value, isImportant);
        if (processable[prop] && processable[prop].isShorthand) {
          result.isShorthand = true;
          result.components = processable[prop].breakUp(result);
          result.isDirty = true;
        }
        result.metadata = fullProp.metadata;
        return result;
      };
      Token.tokenize = function(input) {
        var tokens = input.map(Token.tokenizeOne);
        return tokens;
      };
      Token.detokenize = function(tokens) {
        if (!(tokens instanceof Array)) {
          tokens = [tokens];
        }
        var tokenized = [];
        var list = [];
        for (var i = 0; i < tokens.length; i++) {
          var t = tokens[i];
          if (t.isShorthand && t.isDirty) {
            var news = processable[t.prop].putTogether(t.prop, t.components, t.isImportant);
            Array.prototype.splice.apply(tokens, [i, 1].concat(news));
            t.isDirty = false;
            i--;
            continue;
          }
          var property = t.prop === '' && t.value.indexOf('__ESCAPED_') === 0 ? t.value : t.prop + ':' + t.value + (t.isImportant ? important : '');
          property = property.replace(/\) ([^\+\-\/\*])/g, ')$1');
          tokenized.push({
            value: property,
            metadata: t.metadata || {}
          });
          list.push(property);
        }
        return {
          list: list,
          tokenized: tokenized
        };
      };
      Token.getDetokenizedLength = function(tokens) {
        if (!(tokens instanceof Array)) {
          tokens = [tokens];
        }
        var result = 0;
        for (var i = 0; i < tokens.length; i++) {
          var t = tokens[i];
          if (t.isShorthand && t.isDirty) {
            var news = processable[t.prop].putTogether(t.prop, t.components, t.isImportant);
            Array.prototype.splice.apply(tokens, [i, 1].concat(news));
            t.isDirty = false;
            i--;
            continue;
          }
          if (t.prop) {
            result += t.prop.length + 1;
          }
          if (t.value) {
            result += t.value.length;
          }
          if (t.isImportant) {
            result += important.length;
          }
        }
        return result;
      };
      return Token;
    };
    return {createTokenPrototype: createTokenPrototype};
  })();
})(require("process"));
