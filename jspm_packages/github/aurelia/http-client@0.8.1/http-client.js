/* */ 
System.register(['core-js', './headers', './request-builder', './http-request-message', './jsonp-request-message'], function (_export) {
  var core, Headers, RequestBuilder, HttpRequestMessage, createHttpRequestMessageProcessor, JSONPRequestMessage, createJSONPRequestMessageProcessor, _classCallCheck, HttpClient;

  function trackRequestStart(client, processor) {
    client.pendingRequests.push(processor);
    client.isRequesting = true;
  }

  function trackRequestEnd(client, processor) {
    var index = client.pendingRequests.indexOf(processor);

    client.pendingRequests.splice(index, 1);
    client.isRequesting = client.pendingRequests.length > 0;

    if (!client.isRequesting) {
      var evt = new window.CustomEvent('aurelia-http-client-requests-drained', { bubbles: true, cancelable: true });
      setTimeout(function () {
        return document.dispatchEvent(evt);
      }, 1);
    }
  }

  return {
    setters: [function (_coreJs) {
      core = _coreJs['default'];
    }, function (_headers) {
      Headers = _headers.Headers;
    }, function (_requestBuilder) {
      RequestBuilder = _requestBuilder.RequestBuilder;
    }, function (_httpRequestMessage) {
      HttpRequestMessage = _httpRequestMessage.HttpRequestMessage;
      createHttpRequestMessageProcessor = _httpRequestMessage.createHttpRequestMessageProcessor;
    }, function (_jsonpRequestMessage) {
      JSONPRequestMessage = _jsonpRequestMessage.JSONPRequestMessage;
      createJSONPRequestMessageProcessor = _jsonpRequestMessage.createJSONPRequestMessageProcessor;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      HttpClient = (function () {
        function HttpClient() {
          _classCallCheck(this, HttpClient);

          this.requestTransformers = [];
          this.requestProcessorFactories = new Map();
          this.requestProcessorFactories.set(HttpRequestMessage, createHttpRequestMessageProcessor);
          this.requestProcessorFactories.set(JSONPRequestMessage, createJSONPRequestMessageProcessor);
          this.pendingRequests = [];
          this.isRequesting = false;
        }

        HttpClient.prototype.configure = function configure(fn) {
          var builder = new RequestBuilder(this);
          fn(builder);
          this.requestTransformers = builder.transformers;
          return this;
        };

        HttpClient.prototype.createRequest = function createRequest(url) {
          var builder = new RequestBuilder(this);

          if (url) {
            builder.withUrl(url);
          }

          return builder;
        };

        HttpClient.prototype.send = function send(message, transformers) {
          var _this = this;

          var createProcessor = this.requestProcessorFactories.get(message.constructor),
              processor,
              promise,
              i,
              ii;

          if (!createProcessor) {
            throw new Error('No request message processor factory for ' + message.constructor + '.');
          }

          processor = createProcessor();
          trackRequestStart(this, processor);

          transformers = transformers || this.requestTransformers;

          for (i = 0, ii = transformers.length; i < ii; ++i) {
            transformers[i](this, processor, message);
          }

          promise = processor.process(this, message).then(function (response) {
            trackRequestEnd(_this, processor);
            return response;
          })['catch'](function (response) {
            trackRequestEnd(_this, processor);
            throw response;
          });

          promise.abort = promise.cancel = function () {
            processor.abort();
          };

          return promise;
        };

        HttpClient.prototype['delete'] = function _delete(url) {
          return this.createRequest(url).asDelete().send();
        };

        HttpClient.prototype.get = function get(url) {
          return this.createRequest(url).asGet().send();
        };

        HttpClient.prototype.head = function head(url) {
          return this.createRequest(url).asHead().send();
        };

        HttpClient.prototype.jsonp = function jsonp(url) {
          var callbackParameterName = arguments[1] === undefined ? 'jsoncallback' : arguments[1];

          return this.createRequest(url).asJsonp(callbackParameterName).send();
        };

        HttpClient.prototype.options = function options(url) {
          return this.createRequest(url).asOptions().send();
        };

        HttpClient.prototype.put = function put(url, content) {
          return this.createRequest(url).asPut().withContent(content).send();
        };

        HttpClient.prototype.patch = function patch(url, content) {
          return this.createRequest(url).asPatch().withContent(content).send();
        };

        HttpClient.prototype.post = function post(url, content) {
          return this.createRequest(url).asPost().withContent(content).send();
        };

        return HttpClient;
      })();

      _export('HttpClient', HttpClient);
    }
  };
});