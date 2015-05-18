System.register(['aurelia-dependency-injection', './order-service'], function (_export) {
  'use strict';

  var inject, OrderService, Order;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_orderService) {
      OrderService = _orderService.OrderService;
    }],
    execute: function () {
      Order = (function () {
        function Order(service) {
          _classCallCheck(this, _Order);

          this.__initializeProperties();

          this.service = service;
        }

        var _Order = Order;

        _createClass(_Order, [{
          key: 'activate',
          value: function activate(info) {
            var _this = this;

            var orderPromise, customersPromise, productsPromise;

            if (info.id === 'new') {
              orderPromise = this.service.createOrder();
            } else {
              orderPromise = this.service.getOrder(info.id);
            }

            orderPromise = orderPromise.then(function (result) {
              _this.entityManager = result.entityManager;
              _this.order = result.order;
            });

            customersPromise = this.service.getCustomerLookup().then(function (customers) {
              return _this.customers = customers;
            });

            return Promise.all([orderPromise, customersPromise]);
          }
        }, {
          key: 'hasChanges',
          get: function () {
            return this.entityManager.hasChanges();
          }
        }, {
          key: 'save',
          value: function save() {
            alert('The breeze controller does not expose a SaveChanges action.');
          }
        }, {
          key: 'revert',
          value: function revert() {
            this.entityManager.rejectChanges();
          }
        }, {
          key: '__initializeProperties',
          value: function __initializeProperties() {
            this.isBusy = false;
          }
        }]);

        Order = inject(OrderService)(Order) || Order;
        return Order;
      })();

      _export('Order', Order);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7NEJBSWEsS0FBSzs7Ozs7Ozs7MkNBSlYsTUFBTTs7bUNBQ04sWUFBWTs7O0FBR1AsV0FBSztBQVFMLGlCQVJBLEtBQUssQ0FRSixPQUFPLEVBQUU7Ozs7O0FBQ25CLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3hCOztxQkFWVSxLQUFLOzs7O2lCQVlSLGtCQUFDLElBQUksRUFBRTs7O0FBQ2IsZ0JBQUksWUFBWSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsQ0FBQzs7QUFHcEQsZ0JBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxLQUFLLEVBQUU7QUFDckIsMEJBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzNDLE1BQU07QUFDTCwwQkFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMvQzs7QUFFRCx3QkFBWSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDekMsb0JBQUssYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFDMUMsb0JBQUssS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDM0IsQ0FBQyxDQUFDOztBQUdILDRCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FDaEQsSUFBSSxDQUFDLFVBQUEsU0FBUztxQkFBSSxNQUFLLFNBQVMsR0FBRyxTQUFTO2FBQUEsQ0FBQyxDQUFDOztBQUVqRCxtQkFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztXQUN0RDs7O2VBRWEsWUFBRztBQUNmLG1CQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDeEM7OztpQkFFRyxnQkFBRztBQVVMLGlCQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQztXQUN0RTs7O2lCQUVLLGtCQUFHO0FBQ1AsZ0JBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7V0FDcEM7Ozs7aUJBL0NELE1BQU0sR0FBRyxLQUFLOzs7O0FBTkgsYUFBSyxHQURqQixNQUFNLENBQUMsWUFBWSxDQUFDLENBQ1IsS0FBSyxLQUFMLEtBQUs7ZUFBTCxLQUFLOzs7dUJBQUwsS0FBSyIsImZpbGUiOiJvcmRlcnMvb3JkZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9