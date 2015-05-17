/* */ 
System.register(['aurelia-dependency-injection', 'aurelia-templating', 'aurelia-logging'], function (_export) {
  var inject, customAttribute, dynamicOptions, AggregateError, LogManager, _classCallCheck, GlobalBehavior;

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaTemplating) {
      customAttribute = _aureliaTemplating.customAttribute;
      dynamicOptions = _aureliaTemplating.dynamicOptions;
    }, function (_aureliaLogging) {
      AggregateError = _aureliaLogging.AggregateError;
      LogManager = _aureliaLogging;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      GlobalBehavior = (function () {
        function GlobalBehavior(element) {
          _classCallCheck(this, _GlobalBehavior);

          this.element = element;
        }

        var _GlobalBehavior = GlobalBehavior;

        _GlobalBehavior.prototype.bind = function bind() {
          var handler = GlobalBehavior.handlers[this.aureliaAttrName];

          if (!handler) {
            throw new Error('Binding handler not found for \'' + this.aureliaAttrName + '.' + this.aureliaCommand + '\'. Element:\n' + this.element.outerHTML + '\n');
          }

          try {
            this.handler = handler.bind(this, this.element, this.aureliaCommand) || handler;
          } catch (error) {
            throw AggregateError('Conventional binding handler failed.', error);
          }
        };

        _GlobalBehavior.prototype.attached = function attached() {
          if (this.handler && 'attached' in this.handler) {
            this.handler.attached(this, this.element);
          }
        };

        _GlobalBehavior.prototype.detached = function detached() {
          if (this.handler && 'detached' in this.handler) {
            this.handler.detached(this, this.element);
          }
        };

        _GlobalBehavior.prototype.unbind = function unbind() {
          if (this.handler && 'unbind' in this.handler) {
            this.handler.unbind(this, this.element);
          }

          this.handler = null;
        };

        GlobalBehavior = inject(Element)(GlobalBehavior) || GlobalBehavior;
        GlobalBehavior = dynamicOptions(GlobalBehavior) || GlobalBehavior;
        GlobalBehavior = customAttribute('global-behavior')(GlobalBehavior) || GlobalBehavior;
        return GlobalBehavior;
      })();

      _export('GlobalBehavior', GlobalBehavior);

      GlobalBehavior.createSettingsFromBehavior = function (behavior) {
        var settings = {};

        for (var key in behavior) {
          if (key === 'aureliaAttrName' || key === 'aureliaCommand' || !behavior.hasOwnProperty(key)) {
            continue;
          }

          settings[key] = behavior[key];
        }

        return settings;
      };

      GlobalBehavior.jQueryPlugins = {};

      GlobalBehavior.handlers = {
        jquery: {
          bind: function bind(behavior, element, command) {
            var settings = GlobalBehavior.createSettingsFromBehavior(behavior);
            var pluginName = GlobalBehavior.jQueryPlugins[command] || command;
            var jqueryElement = window.jQuery(element);

            if (!jqueryElement[pluginName]) {
              LogManager.getLogger('templating-resources').warn('Could not find the jQuery plugin ' + pluginName + ', possibly due to case mismatch. Trying to enumerate jQuery methods in lowercase. Add the correctly cased plugin name to the GlobalBehavior to avoid this performance hit.');

              for (var prop in jqueryElement) {
                if (prop.toLowerCase() === pluginName) {
                  pluginName = prop;
                }
              }
            }

            behavior.plugin = jqueryElement[pluginName](settings);
          },
          unbind: function unbind(behavior, element) {
            if (typeof behavior.plugin.destroy === 'function') {
              behavior.plugin.destroy();
              behavior.plugin = null;
            }
          }
        }
      };
    }
  };
});