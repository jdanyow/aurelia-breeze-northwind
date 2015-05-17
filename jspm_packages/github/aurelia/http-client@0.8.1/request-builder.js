/* */ 
System.register(['aurelia-path', './http-request-message', './jsonp-request-message'], function (_export) {
  var join, HttpRequestMessage, JSONPRequestMessage, _classCallCheck, RequestBuilder;

  return {
    setters: [function (_aureliaPath) {
      join = _aureliaPath.join;
    }, function (_httpRequestMessage) {
      HttpRequestMessage = _httpRequestMessage.HttpRequestMessage;
    }, function (_jsonpRequestMessage) {
      JSONPRequestMessage = _jsonpRequestMessage.JSONPRequestMessage;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      RequestBuilder = (function () {
        function RequestBuilder(client) {
          _classCallCheck(this, RequestBuilder);

          this.client = client;
          this.transformers = client.requestTransformers.slice(0);
          this.useJsonp = false;
        }

        RequestBuilder.addHelper = function addHelper(name, fn) {
          RequestBuilder.prototype[name] = function () {
            this.transformers.push(fn.apply(this, arguments));
            return this;
          };
        };

        RequestBuilder.prototype.send = function send() {
          var message = this.useJsonp ? new JSONPRequestMessage() : new HttpRequestMessage();
          return this.client.send(message, this.transformers);
        };

        return RequestBuilder;
      })();

      _export('RequestBuilder', RequestBuilder);

      RequestBuilder.addHelper('asDelete', function () {
        return function (client, processor, message) {
          message.method = 'DELETE';
        };
      });

      RequestBuilder.addHelper('asGet', function () {
        return function (client, processor, message) {
          message.method = 'GET';
        };
      });

      RequestBuilder.addHelper('asHead', function () {
        return function (client, processor, message) {
          message.method = 'HEAD';
        };
      });

      RequestBuilder.addHelper('asOptions', function () {
        return function (client, processor, message) {
          message.method = 'OPTIONS';
        };
      });

      RequestBuilder.addHelper('asPatch', function () {
        return function (client, processor, message) {
          message.method = 'PATCH';
        };
      });

      RequestBuilder.addHelper('asPost', function () {
        return function (client, processor, message) {
          message.method = 'POST';
        };
      });

      RequestBuilder.addHelper('asPut', function () {
        return function (client, processor, message) {
          message.method = 'PUT';
        };
      });

      RequestBuilder.addHelper('asJsonp', function (callbackParameterName) {
        this.useJsonp = true;
        return function (client, processor, message) {
          message.callbackParameterName = callbackParameterName;
        };
      });

      RequestBuilder.addHelper('withUrl', function (url) {
        return function (client, processor, message) {
          message.url = url;
        };
      });

      RequestBuilder.addHelper('withContent', function (content) {
        return function (client, processor, message) {
          message.content = content;
        };
      });

      RequestBuilder.addHelper('withBaseUrl', function (baseUrl) {
        return function (client, processor, message) {
          message.baseUrl = baseUrl;
        };
      });

      RequestBuilder.addHelper('withParams', function (params) {
        return function (client, processor, message) {
          message.params = params;
        };
      });

      RequestBuilder.addHelper('withResponseType', function (responseType) {
        return function (client, processor, message) {
          message.responseType = responseType;
        };
      });

      RequestBuilder.addHelper('withTimeout', function (timeout) {
        return function (client, processor, message) {
          message.timeout = timeout;
        };
      });

      RequestBuilder.addHelper('withHeader', function (key, value) {
        return function (client, processor, message) {
          message.headers.add(key, value);
        };
      });

      RequestBuilder.addHelper('withCredentials', function (value) {
        return function (client, processor, message) {
          message.withCredentials = value;
        };
      });

      RequestBuilder.addHelper('withReviver', function (reviver) {
        return function (client, processor, message) {
          message.reviver = reviver;
        };
      });

      RequestBuilder.addHelper('withReplacer', function (replacer) {
        return function (client, processor, message) {
          message.replacer = replacer;
        };
      });

      RequestBuilder.addHelper('withProgressCallback', function (progressCallback) {
        return function (client, processor, message) {
          message.progressCallback = progressCallback;
        };
      });

      RequestBuilder.addHelper('withCallbackParameterName', function (callbackParameterName) {
        return function (client, processor, message) {
          message.callbackParameterName = callbackParameterName;
        };
      });
    }
  };
});