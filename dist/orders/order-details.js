System.register(['aurelia-dependency-injection', './order-service'], function (_export) {
  'use strict';

  var inject, OrderService, OrderDetails;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_orderService) {
      OrderService = _orderService.OrderService;
    }],
    execute: function () {
      OrderDetails = (function () {
        function OrderDetails(service) {
          _classCallCheck(this, _OrderDetails);

          this.productsIndex = {};
          this.detail = null;

          this.service = service;
        }

        var _OrderDetails = OrderDetails;

        _createClass(_OrderDetails, [{
          key: 'activate',
          value: function activate(order) {
            var _this = this;

            this.order = order;

            this.detail = order.OrderDetails[0] || null;

            return this.service.getProducts().then(function (products) {
              _this.products = products;
              products.forEach(function (p) {
                return _this.productsIndex[p.ProductID] = p.ProductName;
              });
            });
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

        OrderDetails = inject(OrderService)(OrderDetails) || OrderDetails;
        return OrderDetails;
      })();

      _export('OrderDetails', OrderDetails);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci1kZXRhaWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs0QkFJYSxZQUFZOzs7Ozs7OzsyQ0FKakIsTUFBTTs7bUNBQ04sWUFBWTs7O0FBR1Asa0JBQVk7QUFNWixpQkFOQSxZQUFZLENBTVgsT0FBTyxFQUFFOzs7ZUFIckIsYUFBYSxHQUFHLEVBQUU7ZUFDbEIsTUFBTSxHQUFHLElBQUk7O0FBR1gsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDeEI7OzRCQVJVLFlBQVk7Ozs7aUJBVWYsa0JBQUMsS0FBSyxFQUFFOzs7QUFDZCxnQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRW5CLGdCQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDOztBQUU1QyxtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUM5QixJQUFJLENBQUMsVUFBQSxRQUFRLEVBQUk7QUFDaEIsb0JBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUN6QixzQkFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7dUJBQUksTUFBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXO2VBQUEsQ0FBQyxDQUFDO2FBQ3hFLENBQUMsQ0FBQztXQUNOOzs7aUJBRVEscUJBQUc7QUFDVixnQkFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQ2hELFlBQVksQ0FBQyxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ2hFLGdCQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDbkI7OztpQkFFUyxvQkFBQyxNQUFNLEVBQUU7QUFDakIsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDbkI7OztpQkFFVyxzQkFBQyxNQUFNLEVBQUU7QUFDbkIsa0JBQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDbEM7OztpQkFFUyxzQkFBRztBQUNYLGFBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztXQUMxQjs7O2lCQUVVLHVCQUFHO0FBQ1osYUFBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1dBQzNCOzs7aUJBRVksdUJBQUMsTUFBTSxFQUFFO0FBQ3BCLG1CQUFPLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQSxBQUFDLENBQUM7V0FDbkU7OztlQUVZLFlBQUc7QUFDZCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO3FCQUFLLENBQUMsR0FBRyxDQUFDO2FBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQztXQUNuRjs7O0FBbkRVLG9CQUFZLEdBRHhCLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FDUixZQUFZLEtBQVosWUFBWTtlQUFaLFlBQVk7Ozs4QkFBWixZQUFZIiwiZmlsZSI6Im9yZGVycy9vcmRlci1kZXRhaWxzLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==