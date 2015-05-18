System.register(['aurelia-dependency-injection', '../lookups'], function (_export) {
  'use strict';

  var inject, Lookups, OrderDetails;

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
            return _this.productsIndex[p.ProductID] = p.ProductName;
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
            this.detail = this.order.entityAspect.entityManager.createEntity('OrderDetail', { OrderID: this.order.OrderID });
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
          key: 'openDetail',
          value: function openDetail() {
            $('#detail').openModal();
          }
        }, {
          key: 'closeDetail',
          value: function closeDetail() {
            $('#detail').closeModal();
          }
        }, {
          key: 'calculateCost',
          value: function calculateCost(detail) {
            return detail.Quantity * detail.UnitPrice * (1 - detail.Discount);
          }
        }, {
          key: 'totalCost',
          get: function () {
            return this.order.OrderDetails.map(this.calculateCost).reduce(function (a, b) {
              return a + b;
            }, 0);
          }
        }]);

        OrderDetails = inject(Lookups)(OrderDetails) || OrderDetails;
        return OrderDetails;
      })();

      _export('OrderDetails', OrderDetails);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci1kZXRhaWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1QkFJYSxZQUFZOzs7Ozs7OzsyQ0FKakIsTUFBTTs7eUJBQ04sT0FBTzs7O0FBR0Ysa0JBQVk7QUFNWixpQkFOQSxZQUFZLENBTVgsT0FBTyxFQUFFOzs7OztlQUhyQixhQUFhLEdBQUcsRUFBRTtlQUNsQixNQUFNLEdBQUcsSUFBSTs7QUFHWCxjQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDakMsY0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO21CQUFJLE1BQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVztXQUFBLENBQUMsQ0FBQztTQUM3RTs7NEJBVFUsWUFBWTs7OztpQkFXZixrQkFBQyxLQUFLLEVBQUU7QUFDZCxnQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7V0FDcEI7OztpQkFFUSxxQkFBRztBQUNWLGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FDaEQsWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDaEUsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUNuQjs7O2lCQUVTLG9CQUFDLE1BQU0sRUFBRTtBQUNqQixnQkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUNuQjs7O2lCQUVXLHNCQUFDLE1BQU0sRUFBRTtBQUNuQixrQkFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUNsQzs7O2lCQUVTLHNCQUFHO0FBQ1gsYUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1dBQzFCOzs7aUJBRVUsdUJBQUc7QUFDWixhQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDM0I7OztpQkFFWSx1QkFBQyxNQUFNLEVBQUU7QUFDcEIsbUJBQU8sTUFBTSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBLEFBQUMsQ0FBQztXQUNuRTs7O2VBRVksWUFBRztBQUNkLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7cUJBQUssQ0FBQyxHQUFHLENBQUM7YUFBQSxFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ25GOzs7QUE1Q1Usb0JBQVksR0FEeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFlBQVksS0FBWixZQUFZO2VBQVosWUFBWTs7OzhCQUFaLFlBQVkiLCJmaWxlIjoib3JkZXJzL29yZGVyLWRldGFpbHMuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9