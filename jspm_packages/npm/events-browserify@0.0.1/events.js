/* */ 
(function(process) {
  if (!process.EventEmitter)
    process.EventEmitter = function() {};
  var EventEmitter = exports.EventEmitter = process.EventEmitter;
  var isArray = typeof Array.isArray === 'function' ? Array.isArray : function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };
  ;
  var defaultMaxListeners = 10;
  EventEmitter.prototype.setMaxListeners = function(n) {
    if (!this._events)
      this._events = {};
    this._events.maxListeners = n;
  };
  EventEmitter.prototype.emit = function(type) {
    if (type === 'error') {
      if (!this._events || !this._events.error || (isArray(this._events.error) && !this._events.error.length)) {
        if (arguments[1] instanceof Error) {
          throw arguments[1];
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }
    if (!this._events)
      return false;
    var handler = this._events[type];
    if (!handler)
      return false;
    if (typeof handler == 'function') {
      switch (arguments.length) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          var args = Array.prototype.slice.call(arguments, 1);
          handler.apply(this, args);
      }
      return true;
    } else if (isArray(handler)) {
      var args = Array.prototype.slice.call(arguments, 1);
      var listeners = handler.slice();
      for (var i = 0,
          l = listeners.length; i < l; i++) {
        listeners[i].apply(this, args);
      }
      return true;
    } else {
      return false;
    }
  };
  EventEmitter.prototype.addListener = function(type, listener) {
    if ('function' !== typeof listener) {
      throw new Error('addListener only takes instances of Function');
    }
    if (!this._events)
      this._events = {};
    this.emit('newListener', type, listener);
    if (!this._events[type]) {
      this._events[type] = listener;
    } else if (isArray(this._events[type])) {
      if (!this._events[type].warned) {
        var m;
        if (this._events.maxListeners !== undefined) {
          m = this._events.maxListeners;
        } else {
          m = defaultMaxListeners;
        }
        if (m && m > 0 && this._events[type].length > m) {
          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
          console.trace();
        }
      }
      this._events[type].push(listener);
    } else {
      this._events[type] = [this._events[type], listener];
    }
    return this;
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.once = function(type, listener) {
    var self = this;
    self.on(type, function g() {
      self.removeListener(type, g);
      listener.apply(this, arguments);
    });
    return this;
  };
  EventEmitter.prototype.removeListener = function(type, listener) {
    if ('function' !== typeof listener) {
      throw new Error('removeListener only takes instances of Function');
    }
    if (!this._events || !this._events[type])
      return this;
    var list = this._events[type];
    if (isArray(list)) {
      var i = list.indexOf(listener);
      if (i < 0)
        return this;
      list.splice(i, 1);
      if (list.length == 0)
        delete this._events[type];
    } else if (this._events[type] === listener) {
      delete this._events[type];
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function(type) {
    if (type && this._events && this._events[type])
      this._events[type] = null;
    return this;
  };
  EventEmitter.prototype.listeners = function(type) {
    if (!this._events)
      this._events = {};
    if (!this._events[type])
      this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };
})(require("process"));
