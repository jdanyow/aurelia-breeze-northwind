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

          this.products = lookups.products;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci1kZXRhaWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1QkFJYSxZQUFZLEVBOERaLHNCQUFzQjs7Ozs7Ozs7MkNBbEUzQixNQUFNOzt5QkFDTixPQUFPOzs7QUFHRixrQkFBWTtBQU1aLGlCQU5BLFlBQVksQ0FNWCxPQUFPLEVBQUU7Ozs7O2VBSHJCLGFBQWEsR0FBRyxFQUFFO2VBQ2xCLE1BQU0sR0FBRyxJQUFJOztBQUdYLGNBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUNqQyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7bUJBQUksTUFBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7V0FBQSxDQUFDLENBQUM7U0FDakU7OzRCQVRVLFlBQVk7Ozs7aUJBV2Ysa0JBQUMsS0FBSyxFQUFFO0FBQ2QsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1dBQ3BCOzs7aUJBRVEscUJBQUc7QUFDVixnQkFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQ2hELFlBQVksQ0FBQyxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0UsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUNuQjs7O2lCQUVTLG9CQUFDLE1BQU0sRUFBRTtBQUNqQixnQkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUNuQjs7O2lCQUVXLHNCQUFDLE1BQU0sRUFBRTtBQUNuQixrQkFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUNsQzs7O2lCQUVvQiwrQkFBQyxJQUFJLEVBQUU7QUFFMUIsZ0JBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxXQUFXLEVBQUU7QUFDckMscUJBQU87YUFDUjtBQUNELGdCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1dBQzVEOzs7aUJBRVMsc0JBQUc7OztBQUNYLGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO3FCQUFJLE9BQUsscUJBQXFCLENBQUMsSUFBSSxDQUFDO2FBQUEsQ0FBQyxDQUFDO0FBQ2xILGFBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztXQUMxQjs7O2lCQUVVLHVCQUFHO0FBQ1osZ0JBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3pFLGFBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUMzQjs7O2lCQUVrQiw2QkFBQyxNQUFNLEVBQUU7QUFDMUIsbUJBQU8sTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBLEFBQUMsQ0FBQztXQUNuRTs7O2VBRWMsWUFBRztBQUNoQixtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7cUJBQUssQ0FBQyxHQUFHLENBQUM7YUFBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ3pGOzs7QUF2RFUsb0JBQVksR0FEeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFlBQVksS0FBWixZQUFZO2VBQVosWUFBWTs7OzhCQUFaLFlBQVk7O0FBOERaLDRCQUFzQjtpQkFBdEIsc0JBQXNCO2dDQUF0QixzQkFBc0I7OztxQkFBdEIsc0JBQXNCOztpQkFDM0IsZ0JBQUMsS0FBSyxFQUFFO0FBQ1osbUJBQU8sS0FBSyxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7V0FDeEQ7OztpQkFFTyxrQkFBQyxLQUFLLEVBQUU7QUFDZCxpQkFBSyxHQUFHLENBQUMsS0FBSyxDQUFDOztBQUVmLGdCQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksR0FBRyxFQUFFO0FBQ2hDLHFCQUFPLENBQUMsQ0FBQzthQUNWOztBQUVELG1CQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQSxDQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztXQUNqQzs7O2VBYlUsc0JBQXNCOzs7d0NBQXRCLHNCQUFzQiIsImZpbGUiOiJvcmRlcnMvb3JkZXItZGV0YWlscy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=