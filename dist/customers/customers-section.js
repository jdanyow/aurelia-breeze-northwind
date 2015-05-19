System.register([], function (_export) {
  'use strict';

  var CustomersSection;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      CustomersSection = (function () {
        function CustomersSection() {
          _classCallCheck(this, CustomersSection);
        }

        _createClass(CustomersSection, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.map([{ route: '', moduleId: './customer-list', nav: false, title: '' }, { route: ':id', moduleId: './customer', nav: false, title: '' }]);
          }
        }]);

        return CustomersSection;
      })();

      _export('CustomersSection', CustomersSection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbWVycy9jdXN0b21lcnMtc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFJYSxnQkFBZ0I7Ozs7Ozs7OztBQUFoQixzQkFBZ0I7aUJBQWhCLGdCQUFnQjtnQ0FBaEIsZ0JBQWdCOzs7cUJBQWhCLGdCQUFnQjs7aUJBQ1oseUJBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUM5QixrQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNULEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBSyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQ3BFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUNyRSxDQUFDLENBQUM7V0FDSjs7O2VBTlUsZ0JBQWdCOzs7a0NBQWhCLGdCQUFnQiIsImZpbGUiOiJjdXN0b21lcnMvY3VzdG9tZXJzLXNlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9