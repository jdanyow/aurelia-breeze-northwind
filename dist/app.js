System.register(['./aurelia-dependency-injection', './lookups'], function (_export) {
  'use strict';

  var inject, Lookups, App;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_lookups) {
      Lookups = _lookups.Lookups;
    }],
    execute: function () {
      App = (function () {
        function App(lookups) {
          _classCallCheck(this, _App);

          this.lookups = lookups;
        }

        var _App = App;

        _createClass(_App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'Northwind';
            config.map([{ route: '', redirect: 'orders' }, { route: 'orders', moduleId: './orders/orders-section', nav: true, title: 'Orders' }, { route: 'customers', moduleId: './customers', nav: true, title: 'Customers' }, { route: 'employees', moduleId: './employees', nav: true, title: 'Employees' }]);
            this.router = router;
          }
        }, {
          key: 'activate',
          value: function activate() {
            return this.lookups.load();
          }
        }]);

        App = inject(Lookups)(App) || App;
        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUJBSWEsR0FBRzs7Ozs7Ozs7MkNBSlIsTUFBTTs7eUJBQ04sT0FBTzs7O0FBR0YsU0FBRztBQUNILGlCQURBLEdBQUcsQ0FDRixPQUFPLEVBQUU7OztBQUNuQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7bUJBSFUsR0FBRzs7OztpQkFLQyx5QkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzlCLGtCQUFNLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztBQUMzQixrQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNULEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQ2pDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBSyxRQUFRLEVBQUUseUJBQXlCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ3ZGLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFjLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUMxRixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBYyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsQ0FDM0YsQ0FBQyxDQUFDO0FBQ0gsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1dBQ3RCOzs7aUJBRU8sb0JBQUc7QUFDVCxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1dBQzVCOzs7QUFsQlUsV0FBRyxHQURmLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FDSCxHQUFHLEtBQUgsR0FBRztlQUFILEdBQUc7OztxQkFBSCxHQUFHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=