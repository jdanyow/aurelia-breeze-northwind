System.register(['aurelia-dependency-injection', '../lookups'], function (_export) {
  'use strict';

  var inject, Lookups, OrderDetails, DiscountValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_lookups) {
      Lookups = _lookups.Lookups;
    }],
    execute: function () {
      OrderDetails = (function () {
        function OrderDetails(lookups) {
          var _this = this;

          _classCallCheck(this, _OrderDetails);

          this.productsIndex = {};
          this.detail = null;

          this.products = this.allProducts = lookups.products;
          this.products.forEach(function (p) {
            return _this.productsIndex[p.ProductID] = p;
          });
        }

        var _OrderDetails = OrderDetails;

        _createClass(_OrderDetails, [{
          key: 'activate',
          value: function activate(order) {
            this.order = order;
          }
        }, {
          key: 'addDetail',
          value: function addDetail() {
            this.detail = this.order.entityAspect.entityManager.createEntity('OrderDetail', { OrderID: this.order.OrderID, Quantity: 1 });
            this.openDetail();
          }
        }, {
          key: 'editDetail',
          value: function editDetail(detail) {
            this.detail = detail;
            this.openDetail();
          }
        }, {
          key: 'removeDetail',
          value: function removeDetail(detail) {
            detail.entityAspect.setDeleted();
          }
        }, {
          key: 'detailPropertyChanged',
          value: function detailPropertyChanged(args) {
            if (args.propertyName !== 'ProductID') {
              return;
            }
            var product = this.productsIndex[args.newValue];
            this.detail.UnitPrice = product ? product.UnitPrice : null;
          }
        }, {
          key: 'openDetail',
          value: function openDetail() {
            var _this2 = this;

            this._subscription = this.detail.entityAspect.propertyChanged.subscribe(function (args) {
              return _this2.detailPropertyChanged(args);
            });

            this.products = this.allProducts.filter(function (p) {
              return _this2.order.OrderDetails.filter(function (d) {
                return d.ProductID === p.ProductID && d !== _this2.detail;
              }).length === 0;
            });

            $('#detail').openModal();
          }
        }, {
          key: 'closeDetail',
          value: function closeDetail() {
            this.detail.entityAspect.propertyChanged.unsubscribe(this._subscription);
            $('#detail').closeModal();
          }
        }, {
          key: 'calculateDetailCost',
          value: function calculateDetailCost(detail) {
            return detail.Quantity * detail.UnitPrice * (1 - detail.Discount);
          }
        }, {
          key: 'detailTotal',
          get: function () {
            return this.order.OrderDetails.map(this.calculateDetailCost).reduce(function (a, b) {
              return a + b;
            }, 0);
          }
        }]);

        OrderDetails = inject(Lookups)(OrderDetails) || OrderDetails;
        return OrderDetails;
      })();

      _export('OrderDetails', OrderDetails);

      DiscountValueConverter = (function () {
        function DiscountValueConverter() {
          _classCallCheck(this, DiscountValueConverter);
        }

        _createClass(DiscountValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            return value === null ? null : Math.floor(value * 100);
          }
        }, {
          key: 'fromView',
          value: function fromView(value) {
            value = +value;

            if (isNaN(value) || value >= 100) {
              return 0;
            }

            return (value / 100).toFixed(2);
          }
        }]);

        return DiscountValueConverter;
      })();

      _export('DiscountValueConverter', DiscountValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci1kZXRhaWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1QkFJYSxZQUFZLEVBc0VaLHNCQUFzQjs7Ozs7Ozs7MkNBMUUzQixNQUFNOzt5QkFDTixPQUFPOzs7QUFHRixrQkFBWTtBQU9aLGlCQVBBLFlBQVksQ0FPWCxPQUFPLEVBQUU7Ozs7O2VBSHJCLGFBQWEsR0FBRyxFQUFFO2VBQ2xCLE1BQU0sR0FBRyxJQUFJOztBQUdYLGNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3BELGNBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQzttQkFBSSxNQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztXQUFBLENBQUMsQ0FBQztTQUNqRTs7NEJBVlUsWUFBWTs7OztpQkFZZixrQkFBQyxLQUFLLEVBQUU7QUFDZCxnQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7V0FDcEI7OztpQkFFUSxxQkFBRztBQUNWLGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FDaEQsWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3RSxnQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1dBQ25COzs7aUJBRVMsb0JBQUMsTUFBTSxFQUFFO0FBQ2pCLGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixnQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1dBQ25COzs7aUJBRVcsc0JBQUMsTUFBTSxFQUFFO0FBQ25CLGtCQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1dBQ2xDOzs7aUJBRW9CLCtCQUFDLElBQUksRUFBRTtBQUUxQixnQkFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFdBQVcsRUFBRTtBQUNyQyxxQkFBTzthQUNSO0FBQ0QsZ0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELGdCQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7V0FDNUQ7OztpQkFFUyxzQkFBRzs7O0FBRVgsZ0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7cUJBQUksT0FBSyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7YUFBQSxDQUFDLENBQUM7O0FBR2xILGdCQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQzdCLE1BQU0sQ0FBQyxVQUFBLENBQUM7cUJBQUksT0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUM7dUJBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxPQUFLLE1BQU07ZUFBQSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7YUFBQSxDQUFDLENBQUM7O0FBR25ILGFBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztXQUMxQjs7O2lCQUVVLHVCQUFHO0FBQ1osZ0JBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3pFLGFBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUMzQjs7O2lCQUVrQiw2QkFBQyxNQUFNLEVBQUU7QUFDMUIsbUJBQU8sTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBLEFBQUMsQ0FBQztXQUNuRTs7O2VBRWMsWUFBRztBQUNoQixtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7cUJBQUssQ0FBQyxHQUFHLENBQUM7YUFBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ3pGOzs7QUEvRFUsb0JBQVksR0FEeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFlBQVksS0FBWixZQUFZO2VBQVosWUFBWTs7OzhCQUFaLFlBQVk7O0FBc0VaLDRCQUFzQjtpQkFBdEIsc0JBQXNCO2dDQUF0QixzQkFBc0I7OztxQkFBdEIsc0JBQXNCOztpQkFDM0IsZ0JBQUMsS0FBSyxFQUFFO0FBQ1osbUJBQU8sS0FBSyxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7V0FDeEQ7OztpQkFFTyxrQkFBQyxLQUFLLEVBQUU7QUFDZCxpQkFBSyxHQUFHLENBQUMsS0FBSyxDQUFDOztBQUVmLGdCQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFO0FBQ2hDLHFCQUFPLENBQUMsQ0FBQzthQUNWOztBQUVELG1CQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQSxDQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztXQUNqQzs7O2VBYlUsc0JBQXNCOzs7d0NBQXRCLHNCQUFzQiIsImZpbGUiOiJvcmRlcnMvb3JkZXItZGV0YWlscy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=