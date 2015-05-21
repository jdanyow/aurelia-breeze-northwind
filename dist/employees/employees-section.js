System.register([], function (_export) {
  'use strict';

  var EmployeesSection;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      EmployeesSection = (function () {
        function EmployeesSection() {
          _classCallCheck(this, EmployeesSection);
        }

        _createClass(EmployeesSection, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.map([{ route: '', moduleId: './employee-list', nav: false, title: '' }, { route: ':id', moduleId: './employee', nav: false, title: '' }]);
          }
        }]);

        return EmployeesSection;
      })();

      _export('EmployeesSection', EmployeesSection);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcGxveWVlcy9lbXBsb3llZXMtc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7TUFJYSxnQkFBZ0I7Ozs7Ozs7OztBQUFoQixzQkFBZ0I7aUJBQWhCLGdCQUFnQjtnQ0FBaEIsZ0JBQWdCOzs7cUJBQWhCLGdCQUFnQjs7aUJBQ1oseUJBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUM5QixrQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNULEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBSyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQ3BFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUNyRSxDQUFDLENBQUM7V0FDSjs7O2VBTlUsZ0JBQWdCOzs7a0NBQWhCLGdCQUFnQiIsImZpbGUiOiJlbXBsb3llZXMvZW1wbG95ZWVzLXNlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9