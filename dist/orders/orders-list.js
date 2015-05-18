System.register(['aurelia-dependency-injection', 'aurelia-router', './order-service', '../settings'], function (_export) {
  'use strict';

  var inject, singleton, AppRouter, OrderService, settings, OrdersList;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
      singleton = _aureliaDependencyInjection.singleton;
    }, function (_aureliaRouter) {
      AppRouter = _aureliaRouter.AppRouter;
    }, function (_orderService) {
      OrderService = _orderService.OrderService;
    }, function (_settings) {
      settings = _settings['default'];
    }],
    execute: function () {
      OrdersList = (function () {
        function OrdersList(router, service) {
          _classCallCheck(this, _OrdersList);

          this.__initializeProperties();

          this.router = router;
          this.service = service;
        }

        var _OrdersList = OrdersList;

        _createClass(_OrdersList, [{
          key: 'activate',
          value: function activate() {
            this.load();
          }
        }, {
          key: 'load',
          value: function load() {
            var _this = this;

            this.isLoading = true;
            this.service.getPage(this.pageIndex).then(function (result) {
              _this.orders = result.orders;
              _this.pageCount = result.pageCount;
              _this.isLoading = false;
            });
          }
        }, {
          key: 'setPage',
          value: function setPage(index) {
            this.pageIndex = index;
            this.load();
          }
        }, {
          key: 'openOrder',
          value: function openOrder(order) {
            this.router.navigate('orders/' + order.OrderID);
          }
        }, {
          key: 'addOrder',
          value: function addOrder() {
            this.router.navigate('orders/new');
          }
        }, {
          key: '__initializeProperties',
          value: function __initializeProperties() {
            this.orders = [];
            this.pageSize = settings.pageSize;
            this.pageCount = 0;
            this.pageIndex = 0;
            this.isLoading = false;
          }
        }]);

        OrdersList = singleton()(OrdersList) || OrdersList;
        OrdersList = inject(AppRouter, OrderService)(OrdersList) || OrdersList;
        return OrdersList;
      })();

      _export('OrdersList', OrdersList);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlcnMtbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7NERBT2EsVUFBVTs7Ozs7Ozs7MkNBUGYsTUFBTTs4Q0FBRSxTQUFTOztpQ0FDakIsU0FBUzs7bUNBQ1QsWUFBWTs7Ozs7QUFLUCxnQkFBVTtBQVNWLGlCQVRBLFVBQVUsQ0FTVCxNQUFNLEVBQUUsT0FBTyxFQUFFOzs7OztBQUMzQixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7MEJBWlUsVUFBVTs7OztpQkFjYixvQkFBRztBQUNULGdCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDYjs7O2lCQUVHLGdCQUFHOzs7QUFDTCxnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FDakMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ2Qsb0JBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDNUIsb0JBQUssU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbEMsb0JBQUssU0FBUyxHQUFHLEtBQUssQ0FBQzthQUN4QixDQUFDLENBQUM7V0FDTjs7O2lCQUVNLGlCQUFDLEtBQUssRUFBRTtBQUNiLGdCQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN2QixnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ2I7OztpQkFFUSxtQkFBQyxLQUFLLEVBQUU7QUFDZixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztXQUNqRDs7O2lCQUVPLG9CQUFHO0FBQ1QsZ0JBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1dBQ3BDOzs7O2lCQXBDRCxNQUFNLEdBQUcsRUFBRTtpQkFDWCxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVE7aUJBQzVCLFNBQVMsR0FBRyxDQUFDO2lCQUNiLFNBQVMsR0FBRyxDQUFDO2lCQUNiLFNBQVMsR0FBRyxLQUFLOzs7O0FBUE4sa0JBQVUsR0FEdEIsU0FBUyxFQUFFLENBQ0MsVUFBVSxLQUFWLFVBQVU7QUFBVixrQkFBVSxHQUZ0QixNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUVuQixVQUFVLEtBQVYsVUFBVTtlQUFWLFVBQVU7Ozs0QkFBVixVQUFVIiwiZmlsZSI6Im9yZGVycy9vcmRlcnMtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=