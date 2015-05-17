/* */ 
System.register(['breeze', './promise-adapter', 'aurelia-binding', './observation-adapter', 'aurelia-http-client', './ajax-adapter'], function (_export) {
  var breeze, Q, ObjectObservationAdapter, BreezeObservationAdapter, HttpClient;

  _export('configure', configure);

  function configure(aurelia) {
    breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore');

    breeze.config.setQ(Q);

    aurelia.withInstance(ObjectObservationAdapter, new BreezeObservationAdapter());

    var adapter = breeze.config.initializeAdapterInstance('ajax', 'aurelia', true);
    adapter.setHttpClientFactory(function () {
      return aurelia.container.get(HttpClient);
    });
  }

  return {
    setters: [function (_breeze) {
      breeze = _breeze['default'];
    }, function (_promiseAdapter) {
      Q = _promiseAdapter.Q;
    }, function (_aureliaBinding) {
      ObjectObservationAdapter = _aureliaBinding.ObjectObservationAdapter;
    }, function (_observationAdapter) {
      BreezeObservationAdapter = _observationAdapter.BreezeObservationAdapter;
    }, function (_aureliaHttpClient) {
      HttpClient = _aureliaHttpClient.HttpClient;
    }, function (_ajaxAdapter) {}],
    execute: function () {
      'use strict';
    }
  };
});