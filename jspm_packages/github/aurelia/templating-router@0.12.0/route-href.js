/* */ 
System.register(['aurelia-templating', 'aurelia-dependency-injection', 'aurelia-router'], function (_export) {
  var customAttribute, bindable, inject, Router, _classCallCheck, RouteHref;

  return {
    setters: [function (_aureliaTemplating) {
      customAttribute = _aureliaTemplating.customAttribute;
      bindable = _aureliaTemplating.bindable;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      RouteHref = (function () {
        function RouteHref(router, element) {
          _classCallCheck(this, _RouteHref);

          this.router = router;
          this.element = element;
        }

        var _RouteHref = RouteHref;

        _RouteHref.prototype.bind = function bind() {
          this.processChange();
        };

        _RouteHref.prototype.attributeChanged = function attributeChanged(value, previous) {
          if (previous) {
            this.element.removeAttribute(previous);
          }

          this.processChange();
        };

        _RouteHref.prototype.processChange = function processChange() {
          var href = this.router.generate(this.route, this.params);
          this.element.setAttribute(this.attribute, href);
        };

        RouteHref = inject(Router, Element)(RouteHref) || RouteHref;
        RouteHref = bindable({ name: 'attribute', defaultValue: 'href' })(RouteHref) || RouteHref;
        RouteHref = bindable({ name: 'params', changeHandler: 'processChange' })(RouteHref) || RouteHref;
        RouteHref = bindable({ name: 'route', changeHandler: 'processChange' })(RouteHref) || RouteHref;
        RouteHref = customAttribute('route-href')(RouteHref) || RouteHref;
        return RouteHref;
      })();

      _export('RouteHref', RouteHref);
    }
  };
});