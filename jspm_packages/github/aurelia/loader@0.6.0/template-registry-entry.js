/* */ 
System.register(['aurelia-path'], function (_export) {
  var relativeToFile, _createClass, _classCallCheck, TemplateDependency, TemplateRegistryEntry;

  return {
    setters: [function (_aureliaPath) {
      relativeToFile = _aureliaPath.relativeToFile;
    }],
    execute: function () {
      'use strict';

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      TemplateDependency = function TemplateDependency(src, name) {
        _classCallCheck(this, TemplateDependency);

        this.src = src;
        this.name = name;
      };

      _export('TemplateDependency', TemplateDependency);

      TemplateRegistryEntry = (function () {
        function TemplateRegistryEntry(id) {
          _classCallCheck(this, TemplateRegistryEntry);

          this.id = id;
          this.template = null;
          this.dependencies = null;
          this.resources = null;
          this.factory = null;
        }

        TemplateRegistryEntry.prototype.setTemplate = function setTemplate(template) {
          var id = this.id,
              useResources,
              i,
              ii,
              current,
              src;

          this.template = template;
          useResources = template.content.querySelectorAll('require');
          this.dependencies = new Array(useResources.length);

          if (useResources.length === 0) {
            return;
          }

          for (i = 0, ii = useResources.length; i < ii; ++i) {
            current = useResources[i];
            src = current.getAttribute('from');

            if (!src) {
              throw new Error('<require> element in ' + this.id + ' has no "from" attribute.');
            }

            this.dependencies[i] = new TemplateDependency(relativeToFile(src, id), current.getAttribute('as'));

            if (current.parentNode) {
              current.parentNode.removeChild(current);
            }
          }
        };

        TemplateRegistryEntry.prototype.setResources = function setResources(resources) {
          this.resources = resources;
        };

        TemplateRegistryEntry.prototype.setFactory = function setFactory(factory) {
          this.factory = factory;
        };

        _createClass(TemplateRegistryEntry, [{
          key: 'templateIsLoaded',
          get: function () {
            return this.template !== null;
          }
        }, {
          key: 'isReady',
          get: function () {
            return this.factory !== null;
          }
        }]);

        return TemplateRegistryEntry;
      })();

      _export('TemplateRegistryEntry', TemplateRegistryEntry);
    }
  };
});