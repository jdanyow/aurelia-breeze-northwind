/* */ 
System.register(["./property-observation"], function (_export) {
  var BreezeObjectObserver, BreezePropertyObserver, _classCallCheck, _createClass, BreezeObservationAdapter;

  function createObserverLookup(obj) {
    var value = new BreezeObjectObserver(obj);

    Object.defineProperty(obj, "__breezeObserver__", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });

    return value;
  }

  function createCanObserveLookup(entityType) {
    var value = {},
        properties = entityType.getProperties(),
        property,
        ii = properties.length,
        i;

    for (i = 0; i < ii; i++) {
      property = properties[i];

      value[property.name] = property.isDataProperty || property.isScalar;
    }

    Object.defineProperty(entityType, "__canObserve__", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });

    return value;
  }

  return {
    setters: [function (_propertyObservation) {
      BreezeObjectObserver = _propertyObservation.BreezeObjectObserver;
      BreezePropertyObserver = _propertyObservation.BreezePropertyObserver;
    }],
    execute: function () {
      "use strict";

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      BreezeObservationAdapter = (function () {
        function BreezeObservationAdapter() {
          _classCallCheck(this, BreezeObservationAdapter);
        }

        _createClass(BreezeObservationAdapter, [{
          key: "handlesProperty",
          value: function handlesProperty(object, propertyName) {
            var type = object.entityType;
            return type ? !!(type.__canObserve__ || createCanObserveLookup(type))[propertyName] : false;
          }
        }, {
          key: "getObserver",
          value: function getObserver(object, propertyName) {
            var observerLookup;

            if (!this.handlesProperty(object, propertyName)) throw new Error("BreezeBindingAdapter does not support observing the " + propertyName + " property.  Check the handlesProperty method before calling createObserver.");

            observerLookup = object.__breezeObserver__ || createObserverLookup(object);
            return observerLookup.getObserver(propertyName);
          }
        }]);

        return BreezeObservationAdapter;
      })();

      _export("BreezeObservationAdapter", BreezeObservationAdapter);
    }
  };
});