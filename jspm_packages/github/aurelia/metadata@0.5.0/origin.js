/* */ 
System.register(['core-js'], function (_export) {
  var core, _classCallCheck, originStorage, unknownOrigin, Origin;

  function ensureType(value) {
    if (value instanceof Origin) {
      return value;
    }

    return new Origin(value);
  }

  return {
    setters: [function (_coreJs) {
      core = _coreJs['default'];
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      originStorage = new Map();
      unknownOrigin = Object.freeze({ moduleId: undefined, moduleMember: undefined });

      Origin = (function () {
        function Origin(moduleId, moduleMember) {
          _classCallCheck(this, Origin);

          this.moduleId = moduleId;
          this.moduleMember = moduleMember;
        }

        Origin.get = function get(fn) {
          var origin = originStorage.get(fn);

          if (origin !== undefined) {
            return origin;
          }

          if (typeof fn.origin === 'function') {
            originStorage.set(fn, origin = ensureType(fn.origin()));
          } else if (fn.origin !== undefined) {
            originStorage.set(fn, origin = ensureType(fn.origin));
          }

          return origin || unknownOrigin;
        };

        Origin.set = function set(fn, origin) {
          if (Origin.get(fn) === unknownOrigin) {
            originStorage.set(fn, origin);
          }
        };

        return Origin;
      })();

      _export('Origin', Origin);
    }
  };
});