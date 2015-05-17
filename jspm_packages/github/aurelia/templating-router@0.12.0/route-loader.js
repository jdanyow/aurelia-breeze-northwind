/* */ 
System.register(['aurelia-dependency-injection', 'aurelia-templating', 'aurelia-router', 'aurelia-path', 'aurelia-metadata'], function (_export) {
  var inject, CompositionEngine, RouteLoader, Router, relativeToFile, Origin, _classCallCheck, _inherits, TemplatingRouteLoader;

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaTemplating) {
      CompositionEngine = _aureliaTemplating.CompositionEngine;
    }, function (_aureliaRouter) {
      RouteLoader = _aureliaRouter.RouteLoader;
      Router = _aureliaRouter.Router;
    }, function (_aureliaPath) {
      relativeToFile = _aureliaPath.relativeToFile;
    }, function (_aureliaMetadata) {
      Origin = _aureliaMetadata.Origin;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

      TemplatingRouteLoader = (function (_RouteLoader) {
        function TemplatingRouteLoader(compositionEngine) {
          _classCallCheck(this, _TemplatingRouteLoader);

          _RouteLoader.call(this);
          this.compositionEngine = compositionEngine;
        }

        _inherits(TemplatingRouteLoader, _RouteLoader);

        var _TemplatingRouteLoader = TemplatingRouteLoader;

        _TemplatingRouteLoader.prototype.loadRoute = function loadRoute(router, config) {
          var childContainer = router.container.createChild(),
              instruction = {
            viewModel: relativeToFile(config.moduleId, Origin.get(router.container.viewModel.constructor).moduleId),
            childContainer: childContainer,
            view: config.view || config.viewStrategy
          };

          childContainer.getChildRouter = function () {
            var childRouter;

            childContainer.registerHandler(Router, function (c) {
              return childRouter || (childRouter = router.createChild(childContainer));
            });

            return childContainer.get(Router);
          };

          return this.compositionEngine.createViewModel(instruction).then(function (instruction) {
            instruction.executionContext = instruction.viewModel;
            instruction.router = router;
            return instruction;
          });
        };

        TemplatingRouteLoader = inject(CompositionEngine)(TemplatingRouteLoader) || TemplatingRouteLoader;
        return TemplatingRouteLoader;
      })(RouteLoader);

      _export('TemplatingRouteLoader', TemplatingRouteLoader);
    }
  };
});