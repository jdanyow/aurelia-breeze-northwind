/* */ 
System.register([], function (_export) {
  _export('timeoutTransformer', timeoutTransformer);

  _export('callbackParameterNameTransformer', callbackParameterNameTransformer);

  _export('credentialsTransformer', credentialsTransformer);

  _export('progressTransformer', progressTransformer);

  _export('responseTypeTransformer', responseTypeTransformer);

  _export('headerTransformer', headerTransformer);

  _export('contentTransformer', contentTransformer);

  function timeoutTransformer(client, processor, message, xhr) {
    if (message.timeout !== undefined) {
      xhr.timeout = message.timeout;
    }
  }

  function callbackParameterNameTransformer(client, processor, message, xhr) {
    if (message.callbackParameterName !== undefined) {
      xhr.callbackParameterName = message.callbackParameterName;
    }
  }

  function credentialsTransformer(client, processor, message, xhr) {
    if (message.withCredentials !== undefined) {
      xhr.withCredentials = message.withCredentials;
    }
  }

  function progressTransformer(client, processor, message, xhr) {
    if (message.progressCallback) {
      xhr.upload.onprogress = message.progressCallback;
    }
  }

  function responseTypeTransformer(client, processor, message, xhr) {
    var responseType = message.responseType;

    if (responseType === 'json') {
      responseType = 'text';
    }

    xhr.responseType = responseType;
  }

  function headerTransformer(client, processor, message, xhr) {
    message.headers.configureXHR(xhr);
  }

  function contentTransformer(client, processor, message, xhr) {
    if (window.FormData && message.content instanceof FormData) {
      return;
    }

    if (window.Blob && message.content instanceof Blob) {
      return;
    }

    if (window.ArrayBufferView && message.content instanceof ArrayBufferView) {
      return;
    }

    if (message.content instanceof Document) {
      return;
    }

    if (typeof message.content === 'string') {
      return;
    }

    if (message.content === null || message.content === undefined) {
      return;
    }

    message.content = JSON.stringify(message.content, message.replacer);
  }

  return {
    setters: [],
    execute: function () {
      'use strict';
    }
  };
});