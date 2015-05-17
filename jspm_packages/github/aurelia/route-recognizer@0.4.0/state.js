/* */ 
System.register([], function (_export) {
  var _classCallCheck, State;

  return {
    setters: [],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      State = (function () {
        function State(charSpec) {
          _classCallCheck(this, State);

          this.charSpec = charSpec;
          this.nextStates = [];
        }

        State.prototype.get = function get(charSpec) {
          for (var _iterator = this.nextStates, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var child = _ref;

            var isEqual = child.charSpec.validChars === charSpec.validChars && child.charSpec.invalidChars === charSpec.invalidChars;

            if (isEqual) {
              return child;
            }
          }
        };

        State.prototype.put = function put(charSpec) {
          var state = this.get(charSpec);

          if (state) {
            return state;
          }

          state = new State(charSpec);

          this.nextStates.push(state);

          if (charSpec.repeat) {
            state.nextStates.push(state);
          }

          return state;
        };

        State.prototype.match = function match(ch) {
          var nextStates = this.nextStates,
              results = [],
              child,
              charSpec,
              chars;

          for (var i = 0, l = nextStates.length; i < l; i++) {
            child = nextStates[i];

            charSpec = child.charSpec;

            if (typeof (chars = charSpec.validChars) !== 'undefined') {
              if (chars.indexOf(ch) !== -1) {
                results.push(child);
              }
            } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
              if (chars.indexOf(ch) === -1) {
                results.push(child);
              }
            }
          }

          return results;
        };

        return State;
      })();

      _export('State', State);

      ;
    }
  };
});