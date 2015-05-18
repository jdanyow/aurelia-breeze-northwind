System.register(['aurelia-dependency-injection', './order-service', '../lookups'], function (_export) {
  'use strict';

  var inject, OrderService, Lookups, Order;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_orderService) {
      OrderService = _orderService.OrderService;
    }, function (_lookups) {
      Lookups = _lookups.Lookups;
    }],
    execute: function () {
      Order = (function () {
        function Order(service, lookups) {
          _classCallCheck(this, _Order);

          this.service = service;
          this.customers = lookups.customers;
        }

        var _Order = Order;

        _createClass(_Order, [{
          key: 'activate',
          value: function activate(info) {
            var _this = this;

            var promise;

            if (info.id === 'new') {
              promise = this.service.createOrder();
            } else {
              promise = this.service.getOrder(info.id);
            }

            return promise.then(function (result) {
              _this.entityManager = result.entityManager;
              _this.order = result.order;
            });
          }
        }, {
          key: 'canDeactivate',
          value: function canDeactivate() {
            if (this.hasChanges) {
              clearTimeout(this._toastTimeout);
              this._toastTimeout = setTimeout(function () {
                return Materialize.toast('Navigation cancelled.  Save your changes!', 2000);
              }, 50);

              return false;
            }

            return true;
          }
        }, {
          key: 'hasChanges',
          get: function () {
            return this.entityManager.hasChanges();
          }
        }, {
          key: 'save',
          value: function save() {
            this.entityManager.acceptChanges();
            Materialize.toast('Changes saved.', 2000);
          }
        }, {
          key: 'revert',
          value: function revert() {
            this.entityManager.rejectChanges();
            Materialize.toast('Changes reverted.', 2000);

            if (this.hasChanges) {
              this.entityManager.rejectChanges();
            }
          }
        }]);

        Order = inject(OrderService, Lookups)(Order) || Order;
        return Order;
      })();

      _export('Order', Order);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUNBS2EsS0FBSzs7Ozs7Ozs7MkNBTFYsTUFBTTs7bUNBQ04sWUFBWTs7eUJBQ1osT0FBTzs7O0FBR0YsV0FBSztBQU9MLGlCQVBBLEtBQUssQ0FPSixPQUFPLEVBQUUsT0FBTyxFQUFFOzs7QUFDNUIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsY0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1NBQ3BDOztxQkFWVSxLQUFLOzs7O2lCQVlSLGtCQUFDLElBQUksRUFBRTs7O0FBQ2IsZ0JBQUksT0FBTyxDQUFDOztBQUdaLGdCQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssS0FBSyxFQUFFO0FBQ3JCLHFCQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0QyxNQUFNO0FBQ0wscUJBQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDMUM7O0FBRUQsbUJBQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM1QixvQkFBSyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUMxQyxvQkFBSyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUMzQixDQUFDLENBQUM7V0FDSjs7O2lCQUVZLHlCQUFHO0FBQ2QsZ0JBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUVuQiwwQkFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNqQyxrQkFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7dUJBQU0sV0FBVyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxJQUFJLENBQUM7ZUFBQSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUdoSCxxQkFBTyxLQUFLLENBQUM7YUFDZDs7QUFHRCxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O2VBRWEsWUFBRztBQUNmLG1CQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDeEM7OztpQkFFRyxnQkFBRztBQUVMLGdCQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ25DLHVCQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFBO1dBQzFDOzs7aUJBRUssa0JBQUc7QUFDUCxnQkFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNuQyx1QkFBVyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQTs7QUFHNUMsZ0JBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixrQkFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNwQztXQUNGOzs7QUE1RFUsYUFBSyxHQURqQixNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUNqQixLQUFLLEtBQUwsS0FBSztlQUFMLEtBQUs7Ozt1QkFBTCxLQUFLIiwiZmlsZSI6Im9yZGVycy9vcmRlci5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=