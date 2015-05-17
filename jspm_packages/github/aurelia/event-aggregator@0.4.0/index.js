/* */ 
System.register([], function (_export) {
  var _classCallCheck, Handler, EventAggregator;

  _export('includeEventsIn', includeEventsIn);

  _export('configure', configure);

  function includeEventsIn(obj) {
    var ea = new EventAggregator();

    obj.subscribeOnce = function (event, callback) {
      return ea.subscribeOnce(event, callback);
    };

    obj.subscribe = function (event, callback) {
      return ea.subscribe(event, callback);
    };

    obj.publish = function (event, data) {
      ea.publish(event, data);
    };

    return ea;
  }

  function configure(aurelia) {
    aurelia.withInstance(EventAggregator, includeEventsIn(aurelia));
  }

  return {
    setters: [],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      Handler = (function () {
        function Handler(messageType, callback) {
          _classCallCheck(this, Handler);

          this.messageType = messageType;
          this.callback = callback;
        }

        Handler.prototype.handle = function handle(message) {
          if (message instanceof this.messageType) {
            this.callback.call(null, message);
          }
        };

        return Handler;
      })();

      EventAggregator = (function () {
        function EventAggregator() {
          _classCallCheck(this, EventAggregator);

          this.eventLookup = {};
          this.messageHandlers = [];
        }

        EventAggregator.prototype.publish = function publish(event, data) {
          var subscribers, i;

          if (typeof event === 'string') {
            subscribers = this.eventLookup[event];
            if (subscribers) {
              subscribers = subscribers.slice();
              i = subscribers.length;

              while (i--) {
                subscribers[i](data, event);
              }
            }
          } else {
            subscribers = this.messageHandlers.slice();
            i = subscribers.length;

            while (i--) {
              subscribers[i].handle(event);
            }
          }
        };

        EventAggregator.prototype.subscribe = function subscribe(event, callback) {
          var subscribers, handler;

          if (typeof event === 'string') {
            subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);

            subscribers.push(callback);

            return function () {
              var idx = subscribers.indexOf(callback);
              if (idx != -1) {
                subscribers.splice(idx, 1);
              }
            };
          } else {
            handler = new Handler(event, callback);
            subscribers = this.messageHandlers;

            subscribers.push(handler);

            return function () {
              var idx = subscribers.indexOf(handler);
              if (idx != -1) {
                subscribers.splice(idx, 1);
              }
            };
          }
        };

        EventAggregator.prototype.subscribeOnce = function subscribeOnce(event, callback) {
          var sub = this.subscribe(event, function (data, event) {
            sub();
            return callback(data, event);
          });
          return sub;
        };

        return EventAggregator;
      })();

      _export('EventAggregator', EventAggregator);
    }
  };
});