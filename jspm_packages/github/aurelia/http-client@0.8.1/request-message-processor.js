/* */ 
System.register(['core-js', './http-response-message', 'aurelia-path'], function (_export) {
  var core, HttpResponseMessage, join, buildQueryString, _classCallCheck, RequestMessageProcessor;

  function buildFullUrl(message) {
    var url = join(message.baseUrl, message.url),
        qs;

    if (message.params) {
      qs = buildQueryString(message.params);
      url = qs ? '' + url + '?' + qs : url;
    }

    message.fullUrl = url;
  }

  return {
    setters: [function (_coreJs) {
      core = _coreJs['default'];
    }, function (_httpResponseMessage) {
      HttpResponseMessage = _httpResponseMessage.HttpResponseMessage;
    }, function (_aureliaPath) {
      join = _aureliaPath.join;
      buildQueryString = _aureliaPath.buildQueryString;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      RequestMessageProcessor = (function () {
        function RequestMessageProcessor(xhrType, transformers) {
          _classCallCheck(this, RequestMessageProcessor);

          this.XHRType = xhrType;
          this.transformers = transformers;
        }

        RequestMessageProcessor.prototype.abort = function abort() {
          if (this.xhr) {
            this.xhr.abort();
          }
        };

        RequestMessageProcessor.prototype.process = function process(client, message) {
          var _this = this;

          return new Promise(function (resolve, reject) {
            var xhr = _this.xhr = new _this.XHRType(),
                transformers = _this.transformers,
                i,
                ii;

            buildFullUrl(message);
            xhr.open(message.method, message.fullUrl, true);

            for (i = 0, ii = transformers.length; i < ii; ++i) {
              transformers[i](client, _this, message, xhr);
            }

            xhr.onload = function (e) {
              var response = new HttpResponseMessage(message, xhr, message.responseType, message.reviver);
              if (response.isSuccess) {
                resolve(response);
              } else {
                reject(response);
              }
            };

            xhr.ontimeout = function (e) {
              reject(new HttpResponseMessage(message, {
                response: e,
                status: xhr.status,
                statusText: xhr.statusText
              }, 'timeout'));
            };

            xhr.onerror = function (e) {
              reject(new HttpResponseMessage(message, {
                response: e,
                status: xhr.status,
                statusText: xhr.statusText
              }, 'error'));
            };

            xhr.onabort = function (e) {
              reject(new HttpResponseMessage(message, {
                response: e,
                status: xhr.status,
                statusText: xhr.statusText
              }, 'abort'));
            };

            xhr.send(message.content);
          });
        };

        return RequestMessageProcessor;
      })();

      _export('RequestMessageProcessor', RequestMessageProcessor);
    }
  };
});