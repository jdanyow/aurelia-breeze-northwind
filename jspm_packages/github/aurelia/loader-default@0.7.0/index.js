/* */ 
System.register(['aurelia-metadata', 'aurelia-loader'], function (_export) {
  var Origin, Loader, _classCallCheck, _inherits, polyfilled, sys, DefaultLoader;

  function ensureOriginOnExports(executed, name) {
    var target = executed,
        key,
        exportedValue;

    if (target.__useDefault) {
      target = target['default'];
    }

    Origin.set(target, new Origin(name, 'default'));

    for (key in target) {
      exportedValue = target[key];

      if (typeof exportedValue === 'function') {
        Origin.set(exportedValue, new Origin(name, key));
      }
    }

    return executed;
  }

  return {
    setters: [function (_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }, function (_aureliaLoader) {
      Loader = _aureliaLoader.Loader;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

      polyfilled = false;

      if (!window.System || !window.System['import']) {
        sys = window.System = window.System || {};

        sys.polyfilled = polyfilled = true;
        sys.map = {};

        sys['import'] = function (moduleId) {
          return new Promise(function (resolve, reject) {
            require([moduleId], resolve, reject);
          });
        };

        sys.normalize = function (url) {
          return Promise.resolve(url);
        };
      }
      DefaultLoader = (function (_Loader) {
        function DefaultLoader() {
          _classCallCheck(this, DefaultLoader);

          _Loader.call(this);

          this.moduleRegistry = {};
          var that = this;

          if (polyfilled) {
            define('view', [], {
              load: function load(name, req, onload, config) {
                var entry = that.getOrCreateTemplateRegistryEntry(name),
                    address;

                if (entry.templateIsLoaded) {
                  onload(entry);
                  return;
                }

                address = req.toUrl(name);

                that.importTemplate(address).then(function (template) {
                  entry.setTemplate(template);
                  onload(entry);
                });
              }
            });
          } else {
            System.set('view', System.newModule({
              fetch: (function (_fetch) {
                function fetch(_x, _x2) {
                  return _fetch.apply(this, arguments);
                }

                fetch.toString = function () {
                  return _fetch.toString();
                };

                return fetch;
              })(function (load, fetch) {
                var id = load.name.substring(0, load.name.indexOf('!'));
                var entry = load.metadata.templateRegistryEntry = that.getOrCreateTemplateRegistryEntry(id);

                if (entry.templateIsLoaded) {
                  return '';
                }

                return that.importTemplate(load.address).then(function (template) {
                  entry.setTemplate(template);
                  return '';
                });
              }),
              instantiate: function instantiate(load) {
                return load.metadata.templateRegistryEntry;
              }
            }));
          }
        }

        _inherits(DefaultLoader, _Loader);

        DefaultLoader.prototype.loadModule = function loadModule(id) {
          var _this = this;

          return System.normalize(id).then(function (newId) {
            var existing = _this.moduleRegistry[newId];
            if (existing) {
              return existing;
            }

            return System['import'](newId).then(function (m) {
              _this.moduleRegistry[newId] = m;
              return ensureOriginOnExports(m, newId);
            });
          });
        };

        DefaultLoader.prototype.loadAllModules = function loadAllModules(ids) {
          var loads = [];

          for (var i = 0, ii = ids.length; i < ii; ++i) {
            loads.push(this.loadModule(ids[i]));
          }

          return Promise.all(loads);
        };

        DefaultLoader.prototype.loadTemplate = function loadTemplate(url) {
          return polyfilled ? System['import']('view!' + url) : System['import'](url + '!view');
        };

        DefaultLoader.prototype.loadText = function loadText(url) {
          return polyfilled ? System['import']('text!' + url) : System['import'](url + '!text');
        };

        return DefaultLoader;
      })(Loader);

      _export('DefaultLoader', DefaultLoader);

      window.AureliaLoader = DefaultLoader;
    }
  };
});