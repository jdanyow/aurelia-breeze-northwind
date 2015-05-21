System.register(['../list-view-model', 'aurelia-dependency-injection', 'aurelia-router', './employee-service'], function (_export) {
  'use strict';

  var ListViewModel, inject, singleton, AppRouter, EmployeeService, EmployeeList;

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  return {
    setters: [function (_listViewModel) {
      ListViewModel = _listViewModel.ListViewModel;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
      singleton = _aureliaDependencyInjection.singleton;
    }, function (_aureliaRouter) {
      AppRouter = _aureliaRouter.AppRouter;
    }, function (_employeeService) {
      EmployeeService = _employeeService.EmployeeService;
    }],
    execute: function () {
      EmployeeList = (function (_ListViewModel) {
        function EmployeeList(router, service) {
          _classCallCheck(this, _EmployeeList);

          _get(Object.getPrototypeOf(_EmployeeList.prototype), 'constructor', this).call(this, 'employees', router, service);
        }

        _inherits(EmployeeList, _ListViewModel);

        var _EmployeeList = EmployeeList;
        EmployeeList = singleton()(EmployeeList) || EmployeeList;
        EmployeeList = inject(AppRouter, EmployeeService)(EmployeeList) || EmployeeList;
        return EmployeeList;
      })(ListViewModel);

      _export('EmployeeList', EmployeeList);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcGxveWVlcy9lbXBsb3llZS1saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvRUFPYSxZQUFZOzs7Ozs7Ozs7O3FDQVBqQixhQUFhOzsyQ0FDYixNQUFNOzhDQUFFLFNBQVM7O2lDQUNqQixTQUFTOzt5Q0FDVCxlQUFlOzs7QUFJVixrQkFBWTtBQUNaLGlCQURBLFlBQVksQ0FDWCxNQUFNLEVBQUUsT0FBTyxFQUFFOzs7QUFDM0IsK0ZBQU0sV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUM7U0FDcEM7O2tCQUhVLFlBQVk7OzRCQUFaLFlBQVk7QUFBWixvQkFBWSxHQUR4QixTQUFTLEVBQUUsQ0FDQyxZQUFZLEtBQVosWUFBWTtBQUFaLG9CQUFZLEdBRnhCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBRXRCLFlBQVksS0FBWixZQUFZO2VBQVosWUFBWTtTQUFTLGFBQWE7OzhCQUFsQyxZQUFZIiwiZmlsZSI6ImVtcGxveWVlcy9lbXBsb3llZS1saXN0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==