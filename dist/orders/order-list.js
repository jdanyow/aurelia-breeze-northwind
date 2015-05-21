System.register(['../list-view-model', 'aurelia-dependency-injection', 'aurelia-router', './order-service'], function (_export) {
  'use strict';

  var ListViewModel, inject, singleton, AppRouter, OrderService, OrderList;

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  return {
    setters: [function (_listViewModel) {
      ListViewModel = _listViewModel.ListViewModel;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
      singleton = _aureliaDependencyInjection.singleton;
    }, function (_aureliaRouter) {
      AppRouter = _aureliaRouter.AppRouter;
    }, function (_orderService) {
      OrderService = _orderService.OrderService;
    }],
    execute: function () {
      OrderList = (function (_ListViewModel) {
        function OrderList(router, service) {
          _classCallCheck(this, _OrderList);

          _get(Object.getPrototypeOf(_OrderList.prototype), 'constructor', this).call(this, 'orders', router, service);
        }

        _inherits(OrderList, _ListViewModel);

        var _OrderList = OrderList;
        OrderList = singleton()(OrderList) || OrderList;
        OrderList = inject(AppRouter, OrderService)(OrderList) || OrderList;
        return OrderList;
      })(ListViewModel);

      _export('OrderList', OrderList);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci1saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpRUFPYSxTQUFTOzs7Ozs7Ozs7O3FDQVBkLGFBQWE7OzJDQUNiLE1BQU07OENBQUUsU0FBUzs7aUNBQ2pCLFNBQVM7O21DQUNULFlBQVk7OztBQUlQLGVBQVM7QUFDVCxpQkFEQSxTQUFTLENBQ1IsTUFBTSxFQUFFLE9BQU8sRUFBRTs7O0FBQzNCLDRGQUFNLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFDO1NBQ2pDOztrQkFIVSxTQUFTOzt5QkFBVCxTQUFTO0FBQVQsaUJBQVMsR0FEckIsU0FBUyxFQUFFLENBQ0MsU0FBUyxLQUFULFNBQVM7QUFBVCxpQkFBUyxHQUZyQixNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUVuQixTQUFTLEtBQVQsU0FBUztlQUFULFNBQVM7U0FBUyxhQUFhOzsyQkFBL0IsU0FBUyIsImZpbGUiOiJvcmRlcnMvb3JkZXItbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=