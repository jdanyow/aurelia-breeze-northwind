System.register(['aurelia-dependency-injection', 'aurelia-router', './order-service', '../settings'], function (_export) {
  'use strict';

  var inject, AppRouter, OrderService, settings, OrdersList;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
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

            this.orders = [];
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
            this.router.navigate('orders/' + order.OrderID.toString(10));
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

        OrdersList = inject(AppRouter, OrderService)(OrdersList) || OrdersList;
        return OrdersList;
      })();

      _export('OrdersList', OrdersList);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlcnMtbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7aURBTWEsVUFBVTs7Ozs7Ozs7MkNBTmYsTUFBTTs7aUNBQ04sU0FBUzs7bUNBQ1QsWUFBWTs7Ozs7QUFJUCxnQkFBVTtBQVNWLGlCQVRBLFVBQVUsQ0FTVCxNQUFNLEVBQUUsT0FBTyxFQUFFOzs7OztBQUMzQixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7MEJBWlUsVUFBVTs7OztpQkFjYixvQkFBRztBQUNULGdCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDYjs7O2lCQUVHLGdCQUFHOzs7QUFDTCxnQkFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakIsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOztBQUV0QixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUNqQyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDZCxvQkFBSyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUM1QixvQkFBSyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNsQyxvQkFBSyxTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQ3hCLENBQUMsQ0FBQztXQUNOOzs7aUJBRU0saUJBQUMsS0FBSyxFQUFFO0FBQ2IsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCLGdCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDYjs7O2lCQUVRLG1CQUFDLEtBQUssRUFBRTtBQUNmLGdCQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztXQUM5RDs7O2lCQUVPLG9CQUFHO0FBQ1QsZ0JBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1dBQ3BDOzs7O2lCQXRDRCxNQUFNLEdBQUcsRUFBRTtpQkFDWCxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVE7aUJBQzVCLFNBQVMsR0FBRyxDQUFDO2lCQUNiLFNBQVMsR0FBRyxDQUFDO2lCQUNiLFNBQVMsR0FBRyxLQUFLOzs7O0FBUE4sa0JBQVUsR0FEdEIsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FDbkIsVUFBVSxLQUFWLFVBQVU7ZUFBVixVQUFVOzs7NEJBQVYsVUFBVSIsImZpbGUiOiJvcmRlcnMvb3JkZXJzLWxpc3QuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9