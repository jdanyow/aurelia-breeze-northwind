/* */ 
System.register([], function (_export) {
  var _classCallCheck, _createClass, Q, Deferred;

  return {
    setters: [],
    execute: function () {
      "use strict";

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      Q = (function () {
        function Q() {
          _classCallCheck(this, Q);
        }

        _createClass(Q, null, [{
          key: "defer",
          value: function defer() {
            return new Deferred();
          }
        }, {
          key: "resolve",
          value: function resolve(data) {
            return new Promise(function (resolve, reject) {
              resolve(data);
            });
          }
        }, {
          key: "reject",
          value: function reject(reason) {
            return new Promise(function (resolve, reject) {
              reject(reason);
            });
          }
        }]);

        return Q;
      })();

      _export("Q", Q);

      Deferred = function Deferred() {
        _classCallCheck(this, Deferred);

        var self = this;
        this.promise = new Promise(function (resolve, reject) {
          self.resolve = resolve;
          self.reject = reject;
        });
      };

      _export("Deferred", Deferred);
    }
  };
});