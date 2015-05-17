/* */ 
System.register(['aurelia-router', './route-loader', './router-view', './route-href'], function (_export) {
  var Router, AppRouter, RouteLoader, TemplatingRouteLoader, RouterView, RouteHref;

  function configure(aurelia) {
    aurelia.withSingleton(RouteLoader, TemplatingRouteLoader).withSingleton(Router, AppRouter).globalizeResources('./router-view', './route-href');
  }

  return {
    setters: [function (_aureliaRouter) {
      Router = _aureliaRouter.Router;
      AppRouter = _aureliaRouter.AppRouter;
      RouteLoader = _aureliaRouter.RouteLoader;
    }, function (_routeLoader) {
      TemplatingRouteLoader = _routeLoader.TemplatingRouteLoader;
    }, function (_routerView) {
      RouterView = _routerView.RouterView;
    }, function (_routeHref) {
      RouteHref = _routeHref.RouteHref;
    }],
    execute: function () {
      'use strict';

      _export('TemplatingRouteLoader', TemplatingRouteLoader);

      _export('RouterView', RouterView);

      _export('RouteHref', RouteHref);

      _export('configure', configure);
    }
  };
});