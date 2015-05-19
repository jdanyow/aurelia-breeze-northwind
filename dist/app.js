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

          events.subscribe('router:navigation:complete', function () {
            return Waves.displayEffect();
          });
        }

        var _App = App;

        _createClass(_App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'Northwind';
            config.map([{ route: '', redirect: 'orders' }, { route: 'orders', moduleId: './orders/orders-section', nav: true, title: 'Orders' }, { route: 'customers', moduleId: './customers', nav: true, title: 'Customers' }, { route: 'employees', moduleId: './employees/employees-section', nav: true, title: 'Employees' }]);
            this.router = router;
          }
        }, {
          key: 'activate',
          value: function activate() {
            return this.lookups.load();
          }
        }]);

        App = inject(Lookups, EventAggregator)(App) || App;
        return App;
      })();

      _export('App', App);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0NBS2EsR0FBRzs7Ozs7Ozs7MkNBTFIsTUFBTTs7eUJBQ04sT0FBTzs7Z0RBQ1AsZUFBZTs7O0FBR1YsU0FBRztBQUNILGlCQURBLEdBQUcsQ0FDRixPQUFPLEVBQUUsTUFBTSxFQUFFOzs7QUFDM0IsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O0FBR3ZCLGdCQUFNLENBQUMsU0FBUyxDQUFDLDRCQUE0QixFQUFFO21CQUFNLEtBQUssQ0FBQyxhQUFhLEVBQUU7V0FBQSxDQUFDLENBQUM7U0FDN0U7O21CQU5VLEdBQUc7Ozs7aUJBUUMseUJBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUM5QixrQkFBTSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7QUFDM0Isa0JBQU0sQ0FBQyxHQUFHLENBQUMsQ0FDVCxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUNqQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUssUUFBUSxFQUFFLHlCQUF5QixFQUFRLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUM3RixFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBb0IsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQ2hHLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsK0JBQStCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQ2pHLENBQUMsQ0FBQztBQUNILGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztXQUN0Qjs7O2lCQUVPLG9CQUFHO0FBQ1QsbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztXQUM1Qjs7O0FBckJVLFdBQUcsR0FEZixNQUFNLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUNwQixHQUFHLEtBQUgsR0FBRztlQUFILEdBQUc7OztxQkFBSCxHQUFHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=