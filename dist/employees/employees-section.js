System.register([], function (_export) {
  'use strict';

  var OrdersSection;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      OrdersSection = (function () {
        function OrdersSection() {
          _classCallCheck(this, OrdersSection);
        }

        _createClass(OrdersSection, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.map([{ route: '', moduleId: './employee-list', nav: false, title: '' }, { route: ':id', moduleId: './employee', nav: false, title: '' }]);
          }
        }]);

        return OrdersSection;
      })();

      _export('OrdersSection', OrdersSection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcGxveWVlcy9lbXBsb3llZXMtc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFJYSxhQUFhOzs7Ozs7Ozs7QUFBYixtQkFBYTtpQkFBYixhQUFhO2dDQUFiLGFBQWE7OztxQkFBYixhQUFhOztpQkFDVCx5QkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzlCLGtCQUFNLENBQUMsR0FBRyxDQUFDLENBQ1QsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFLLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFDcEUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQ3JFLENBQUMsQ0FBQztXQUNKOzs7ZUFOVSxhQUFhOzs7K0JBQWIsYUFBYSIsImZpbGUiOiJlbXBsb3llZXMvZW1wbG95ZWVzLXNlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9