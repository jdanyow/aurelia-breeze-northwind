/* */ 
System.register(['./headers', './request-message-processor', './transformers'], function (_export) {
  var Headers, RequestMessageProcessor, timeoutTransformer, callbackParameterNameTransformer, _classCallCheck, JSONPRequestMessage, JSONPXHR;

  _export('createJSONPRequestMessageProcessor', createJSONPRequestMessageProcessor);

  function createJSONPRequestMessageProcessor() {
    return new RequestMessageProcessor(JSONPXHR, [timeoutTransformer, callbackParameterNameTransformer]);
  }

  return {
    setters: [function (_headers) {
      Headers = _headers.Headers;
    }, function (_requestMessageProcessor) {
      RequestMessageProcessor = _requestMessageProcessor.RequestMessageProcessor;
    }, function (_transformers) {
      timeoutTransformer = _transformers.timeoutTransformer;
      callbackParameterNameTransformer = _transformers.callbackParameterNameTransformer;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      JSONPRequestMessage = function JSONPRequestMessage(url, callbackParameterName) {
        _classCallCheck(this, JSONPRequestMessage);

        this.method = 'JSONP';
        this.url = url;
        this.content = undefined;
        this.headers = new Headers();
        this.responseType = 'jsonp';
        this.callbackParameterName = callbackParameterName;
      };

      _export('JSONPRequestMessage', JSONPRequestMessage);

      JSONPXHR = (function () {
        function JSONPXHR() {
          _classCallCheck(this, JSONPXHR);
        }

        JSONPXHR.prototype.open = function open(method, url) {
          this.method = method;
          this.url = url;
          this.callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        };

        JSONPXHR.prototype.send = function send() {
          var _this = this;

          var url = this.url + (this.url.indexOf('?') >= 0 ? '&' : '?') + this.callbackParameterName + '=' + this.callbackName;

          window[this.callbackName] = function (data) {
            delete window[_this.callbackName];
            document.body.removeChild(script);

            if (_this.status === undefined) {
              _this.status = 200;
              _this.statusText = 'OK';
              _this.response = data;
              _this.onload(_this);
            }
          };

          var script = document.createElement('script');
          script.src = url;
          document.body.appendChild(script);

          if (this.timeout !== undefined) {
            setTimeout(function () {
              if (_this.status === undefined) {
                _this.status = 0;
                _this.ontimeout(new Error('timeout'));
              }
            }, this.timeout);
          }
        };

        JSONPXHR.prototype.abort = function abort() {
          if (this.status === undefined) {
            this.status = 0;
            this.onabort(new Error('abort'));
          }
        };

        JSONPXHR.prototype.setRequestHeader = function setRequestHeader() {};

        return JSONPXHR;
      })();
    }
  };
});