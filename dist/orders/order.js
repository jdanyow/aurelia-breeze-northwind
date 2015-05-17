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

            var promise;

            if (info.id === 'new') {
              promise = this.service.createOrder();
            } else {
              promise = this.service.getOrder(info.id);
            }

            return promise.then(function (result) {
              _this.entityManager = result.entityManager;
              _this.order = result.order;
              _this.details = result.details;
            });
          }
        }, {
          key: 'attached',
          value: function attached() {
            $('select').material_select();
            $('.datepicker').pickadate({
              format: 'm/d/yyyy',
              selectMonths: true,
              selectYears: 15 });
          }
        }, {
          key: 'isDirty',
          get: function () {
            return this.entityManager.hasChanges();
          }
        }, {
          key: 'save',
          value: function save() {
            var _this2 = this;

            var id = this.entity.OrderID;
            isBusy = true;
            this.entityManager.saveChanges().then(function (saveResult) {
              if (id !== _this2.entity.OrderID) {}
            });
          }
        }, {
          key: 'openDetail',
          value: function openDetail(detail) {}
        }, {
          key: 'calculateCost',
          value: function calculateCost(detail) {
            return detail.Quantity * detail.UnitPrice * (1 - detail.Discount);
          }
        }, {
          key: 'total',
          get: function () {
            return this.details.map(this.calculateCost).reduce(function (a, b) {
              return a + b;
            }, 0);
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
//# sourceMappingURL=data:application/json;base64,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