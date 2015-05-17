/* */ 
System.register([], function (_export) {
  var _classCallCheck, Headers;

  return {
    setters: [],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      Headers = (function () {
        function Headers() {
          var headers = arguments[0] === undefined ? {} : arguments[0];

          _classCallCheck(this, Headers);

          this.headers = headers;
        }

        Headers.prototype.add = function add(key, value) {
          this.headers[key] = value;
        };

        Headers.prototype.get = function get(key) {
          return this.headers[key];
        };

        Headers.prototype.clear = function clear() {
          this.headers = {};
        };

        Headers.prototype.configureXHR = function configureXHR(xhr) {
          var headers = this.headers,
              key;

          for (key in headers) {
            xhr.setRequestHeader(key, headers[key]);
          }
        };

        Headers.parse = function parse(headerStr) {
          var headers = new Headers();
          if (!headerStr) {
            return headers;
          }

          var headerPairs = headerStr.split('\r\n');
          for (var i = 0; i < headerPairs.length; i++) {
            var headerPair = headerPairs[i];

            var index = headerPair.indexOf(': ');
            if (index > 0) {
              var key = headerPair.substring(0, index);
              var val = headerPair.substring(index + 2);
              headers.add(key, val);
            }
          }

          return headers;
        };

        return Headers;
      })();

      _export('Headers', Headers);
    }
  };
});