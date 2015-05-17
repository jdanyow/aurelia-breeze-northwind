/* */ 
System.register([], function (_export) {
  var _classCallCheck, specials, escapeRegex, StaticSegment, DynamicSegment, StarSegment, EpsilonSegment;

  return {
    setters: [],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
      escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

      StaticSegment = (function () {
        function StaticSegment(string) {
          _classCallCheck(this, StaticSegment);

          this.string = string;
        }

        StaticSegment.prototype.eachChar = function eachChar(callback) {
          for (var _iterator = this.string, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var ch = _ref;

            callback({ validChars: ch });
          }
        };

        StaticSegment.prototype.regex = function regex() {
          return this.string.replace(escapeRegex, '\\$1');
        };

        StaticSegment.prototype.generate = function generate() {
          return this.string;
        };

        return StaticSegment;
      })();

      _export('StaticSegment', StaticSegment);

      DynamicSegment = (function () {
        function DynamicSegment(name) {
          _classCallCheck(this, DynamicSegment);

          this.name = name;
        }

        DynamicSegment.prototype.eachChar = function eachChar(callback) {
          callback({ invalidChars: '/', repeat: true });
        };

        DynamicSegment.prototype.regex = function regex() {
          return '([^/]+)';
        };

        DynamicSegment.prototype.generate = function generate(params, consumed) {
          consumed[this.name] = true;
          return params[this.name];
        };

        return DynamicSegment;
      })();

      _export('DynamicSegment', DynamicSegment);

      StarSegment = (function () {
        function StarSegment(name) {
          _classCallCheck(this, StarSegment);

          this.name = name;
        }

        StarSegment.prototype.eachChar = function eachChar(callback) {
          callback({ invalidChars: '', repeat: true });
        };

        StarSegment.prototype.regex = function regex() {
          return '(.+)';
        };

        StarSegment.prototype.generate = function generate(params, consumed) {
          consumed[this.name] = true;
          return params[this.name];
        };

        return StarSegment;
      })();

      _export('StarSegment', StarSegment);

      EpsilonSegment = (function () {
        function EpsilonSegment() {
          _classCallCheck(this, EpsilonSegment);
        }

        EpsilonSegment.prototype.eachChar = function eachChar() {};

        EpsilonSegment.prototype.regex = function regex() {
          return '';
        };

        EpsilonSegment.prototype.generate = function generate() {
          return '';
        };

        return EpsilonSegment;
      })();

      _export('EpsilonSegment', EpsilonSegment);
    }
  };
});