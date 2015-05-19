System.register(['./aurelia-dependency-injection', './lookups', 'aurelia-event-aggregator'], function (_export) {
  'use strict';

  var inject, Lookups, EventAggregator, App;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_lookups) {
      Lookups = _lookups.Lookups;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      App = (function () {
        function App(lookups, events) {
          _classCallCheck(this, _App);

          this.lookups = lookups;

          events.subscribe('router:navigation:complete', this.navigationComplete);
        }

        var _App = App;

        _createClass(_App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'Northwind';
            config.map([{ route: '', redirect: 'orders' }, { route: 'orders', moduleId: './orders/orders-section', nav: true, title: 'Orders' }, { route: 'customers', moduleId: './customers/customers-section', nav: true, title: 'Customers' }, { route: 'employees', moduleId: './employees/employees-section', nav: true, title: 'Employees' }]);
            this.router = router;
          }
        }, {
          key: 'activate',
          value: function activate() {
            return this.lookups.load();
          }
        }, {
          key: 'navigationComplete',
          value: function navigationComplete(navigationInstruction) {
            Waves.displayEffect();

            ga('send', 'pageview', '/' + navigationInstruction.fragment);
          }
        }]);

        App = inject(Lookups, EventAggregator)(App) || App;
        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0NBS2EsR0FBRzs7Ozs7Ozs7MkNBTFIsTUFBTTs7eUJBQ04sT0FBTzs7Z0RBQ1AsZUFBZTs7O0FBR1YsU0FBRztBQUNILGlCQURBLEdBQUcsQ0FDRixPQUFPLEVBQUUsTUFBTSxFQUFFOzs7QUFDM0IsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O0FBR3ZCLGdCQUFNLENBQUMsU0FBUyxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3pFOzttQkFOVSxHQUFHOzs7O2lCQVFDLHlCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDOUIsa0JBQU0sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0FBQzNCLGtCQUFNLENBQUMsR0FBRyxDQUFDLENBQ1QsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFDakMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFLLFFBQVEsRUFBRSx5QkFBeUIsRUFBUSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFDN0YsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSwrQkFBK0IsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFDaEcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSwrQkFBK0IsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsQ0FDakcsQ0FBQyxDQUFDO0FBQ0gsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1dBQ3RCOzs7aUJBRU8sb0JBQUc7QUFDVCxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1dBQzVCOzs7aUJBRWlCLDRCQUFDLHFCQUFxQixFQUFFO0FBRXhDLGlCQUFLLENBQUMsYUFBYSxFQUFFLENBQUE7O0FBR3JCLGNBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztXQUM5RDs7O0FBN0JVLFdBQUcsR0FEZixNQUFNLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUNwQixHQUFHLEtBQUgsR0FBRztlQUFILEdBQUc7OztxQkFBSCxHQUFHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=