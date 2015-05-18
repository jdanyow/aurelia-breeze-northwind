System.register([], function (_export) {
  var _classCallCheck, _createClass, BreezePropertyObserver, BreezeObjectObserver;

  return {
    setters: [],
    execute: function () {
      "use strict";

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      BreezePropertyObserver = (function () {
        function BreezePropertyObserver(obj, propertyName, subscribe) {
          _classCallCheck(this, BreezePropertyObserver);

          this.obj = obj;
          this.propertyName = propertyName;
          this.subscribe = subscribe;
        }

        _createClass(BreezePropertyObserver, [{
          key: "getValue",
          value: function getValue() {
            return this.obj[this.propertyName];
          }
        }, {
          key: "setValue",
          value: function setValue(newValue) {
            this.obj[this.propertyName] = newValue;
          }
        }]);

        return BreezePropertyObserver;
      })();

      _export("BreezePropertyObserver", BreezePropertyObserver);

      BreezeObjectObserver = (function () {
        function BreezeObjectObserver(obj) {
          _classCallCheck(this, BreezeObjectObserver);

          this.obj = obj;
          this.observers = {};
          this.callbacks = {};
          this.callbackCount = 0;
        }

        _createClass(BreezeObjectObserver, [{
          key: "subscribe",
          value: function subscribe(propertyName, callback) {
            if (this.callbacks[propertyName]) {
              this.callbacks[propertyName].push(callback);
            } else {
              this.callbacks[propertyName] = [callback];
            }

            if (this.callbackCount === 0) {
              this.subscription = this.obj.entityAspect.propertyChanged.subscribe(this.handleChanges.bind(this));
            }

            this.callbackCount++;

            return this.unsubscribe.bind(this, propertyName, callback);
          }
        }, {
          key: "unsubscribe",
          value: function unsubscribe(propertyName, callback) {
            var callbacks = this.callbacks[propertyName],
                index = callbacks.indexOf(callback);
            if (index === -1) {
              return;
            }
            callbacks.splice(index, 1);
            this.callbackCount--;
            if (this.callbackCount === 0) {
              this.obj.entityAspect.propertyChanged.unsubscribe(this.subscription);
            }
          }
        }, {
          key: "getObserver",
          value: function getObserver(propertyName) {
            return this.observers[propertyName] || (this.observers[propertyName] = new BreezePropertyObserver(this.obj, propertyName, this.subscribe.bind(this, propertyName)));
          }
        }, {
          key: "handleChanges",
          value: function handleChanges(change) {
            var callbacks, i, ii, newValue, key;

            if (change.propertyName === null) {
              callbacks = this.callbacks;
              for (key in callbacks) {
                if (callbacks.hasOwnProperty(key)) {
                  this.handleChanges({ propertyName: key, oldValue: null });
                }
              }
            } else {
              callbacks = this.callbacks[change.propertyName];
            }

            if (!callbacks) {
              return;
            }

            newValue = this.obj[change.propertyName];

            for (i = 0, ii = callbacks.length; i < ii; i++) {
              callbacks[i](newValue, change.oldValue);
            }
          }
        }]);

        return BreezeObjectObserver;
      })();

      _export("BreezeObjectObserver", BreezeObjectObserver);
    }
  };
});