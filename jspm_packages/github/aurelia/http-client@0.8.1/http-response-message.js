/* */ 
System.register(["./headers"], function (_export) {
  var Headers, _classCallCheck, _createClass, HttpResponseMessage, mimeTypes;

  return {
    setters: [function (_headers) {
      Headers = _headers.Headers;
    }],
    execute: function () {
      "use strict";

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      HttpResponseMessage = (function () {
        function HttpResponseMessage(requestMessage, xhr, responseType, reviver) {
          _classCallCheck(this, HttpResponseMessage);

          this.requestMessage = requestMessage;
          this.statusCode = xhr.status;
          this.response = xhr.response || xhr.responseText;
          this.isSuccess = xhr.status >= 200 && xhr.status < 400;
          this.statusText = xhr.statusText;
          this.reviver = reviver;
          this.mimeType = null;

          if (xhr.getAllResponseHeaders) {
            try {
              this.headers = Headers.parse(xhr.getAllResponseHeaders());
            } catch (err) {
              if (xhr.requestHeaders) this.headers = { headers: xhr.requestHeaders };
            }
          } else {
            this.headers = new Headers();
          }

          var contentType;
          if (this.headers && this.headers.headers) contentType = this.headers.headers["Content-Type"];
          if (contentType) {
            this.mimeType = responseType = contentType.split(";")[0].trim();
            if (mimeTypes.hasOwnProperty(this.mimeType)) responseType = mimeTypes[this.mimeType];
          }
          this.responseType = responseType;
        }

        _createClass(HttpResponseMessage, [{
          key: "content",
          get: function () {
            try {
              if (this._content !== undefined) {
                return this._content;
              }

              if (this.response === undefined || this.response === null) {
                return this._content = this.response;
              }

              if (this.responseType === "json") {
                return this._content = JSON.parse(this.response, this.reviver);
              }

              if (this.reviver) {
                return this._content = this.reviver(this.response);
              }

              return this._content = this.response;
            } catch (e) {
              if (this.isSuccess) {
                throw e;
              }

              return this._content = null;
            }
          }
        }]);

        return HttpResponseMessage;
      })();

      _export("HttpResponseMessage", HttpResponseMessage);

      mimeTypes = {
        "text/html": "html",
        "text/javascript": "js",
        "application/javascript": "js",
        "text/json": "json",
        "application/json": "json",
        "application/rss+xml": "rss",
        "application/atom+xml": "atom",
        "application/xhtml+xml": "xhtml",
        "text/markdown": "md",
        "text/xml": "xml",
        "text/mathml": "mml",
        "application/xml": "xml",
        "text/yml": "yml",
        "text/csv": "csv",
        "text/css": "css",
        "text/less": "less",
        "text/stylus": "styl",
        "text/scss": "scss",
        "text/sass": "sass",
        "text/plain": "txt"
      };

      _export("mimeTypes", mimeTypes);
    }
  };
});