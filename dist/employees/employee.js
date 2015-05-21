System.register(['../entity-view-model', 'aurelia-dependency-injection', './employee-service', '../lookups'], function (_export) {
  'use strict';

  var EntityViewModel, inject, EmployeeService, Lookups, missingPhoto, Employee;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  return {
    setters: [function (_entityViewModel) {
      EntityViewModel = _entityViewModel.EntityViewModel;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_employeeService) {
      EmployeeService = _employeeService.EmployeeService;
    }, function (_lookups) {
      Lookups = _lookups.Lookups;
    }],
    execute: function () {
      missingPhoto = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAMFBMVEXFxcX19fX+/v7x8fHu7u7p6enl5eXh4eHc3NzZ2dnV1dXR0dHNzc3Jycn5+fnGxsbcfiHzAAACQ0lEQVR4Xu2Yz0obURTGxz+Nf2IyIcvSlswNmaixQxG6LIpLRRB9geAThO4KpUieQNy4kxBfQNoXCF103dJ9SWfTUiiOeQARXHhwvHf8zhfIxvnt8+Ny5nzn3BvvyZCTk5OTUzo9ePX77YfvrOBbbG6JPlIC/5O5409C/L5rBPNXbzgz9/inFfw0KXZ1gqU4LQh03+KzeUBLI1gwFnrEAdgjlIyNCK/ClbGyAQu27IIGWULhAhRcuwQVUNB1CVbAGBkXERapOePkCBJMuwVDLgfCGiQ4dAuakCB2CwIyCAISh/kswTEgKGQJOoBgNkuwCQimRMCloZwlGHKNKNQAwYgQECegazCJrzAzbh88yxK0J5GFJSSN/DxA2HcLQmImEgt6NO5ULgDzhB2KiQfx3iVY9gSqCJegYJ7rQ8FftwvqHsovu+C/CLg4DDyYvk2w6uHMkV0knHAXJKFIVkD4kRa89HT4qX4OE6Xg3KTYJn8vPCdeXLThi7Gy400ojcWqSxD0iCBA3Yjvxj0gyutZgvoA62E379iZLm8/7gDCi2yBX31MEAy4C5LwhlvtQgOchdyG/SoC6uFUihFBlABXRLKMXUywTHahkDhzCNLWXc/wLRmjggAehbrhWMYFFWAj64vgx7ggIksgHHOjQKhwSRRec7NECOEg4HFY0Al63CwQNtErOv6I7usELe4jCCGXZSEAvyL+hl3UCi7sbz2cDhYlfDlMawU1LIt4HvtaQQvbaviV8VAraGL/huMXlapOIM/YGwKj/drs5x+/AAAAAElFTkSuQmCC';

      Employee = (function (_EntityViewModel) {
        function Employee(service, lookups) {
          _classCallCheck(this, _Employee);

          _get(Object.getPrototypeOf(_Employee.prototype), 'constructor', this).call(this, service);
        }

        _inherits(Employee, _EntityViewModel);

        var _Employee = Employee;

        _createClass(_Employee, [{
          key: 'photo',
          get: function () {
            return 'data:image/png;base64,' + (this.entity.Photo || missingPhoto);
          }
        }, {
          key: 'title',
          get: function () {
            if (this.entity.FirstName || this.entity.LastName) {
              return '' + this.entity.FirstName + ' ' + this.entity.LastName;
            }
            return 'Employee';
          }
        }]);

        Employee = inject(EmployeeService, Lookups)(Employee) || Employee;
        return Employee;
      })(EntityViewModel);

      _export('Employee', Employee);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcGxveWVlcy9lbXBsb3llZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7eURBS0ksWUFBWSxFQUdILFFBQVE7Ozs7Ozs7Ozs7Ozt5Q0FSYixlQUFlOzsyQ0FDZixNQUFNOzt5Q0FDTixlQUFlOzt5QkFDZixPQUFPOzs7QUFFWCxrQkFBWSxHQUFHLGs2QkFBazZCOztBQUd4NkIsY0FBUTtBQUNSLGlCQURBLFFBQVEsQ0FDUCxPQUFPLEVBQUUsT0FBTyxFQUFFOzs7QUFDNUIsMkZBQU0sT0FBTyxFQUFFO1NBQ2hCOztrQkFIVSxRQUFROzt3QkFBUixRQUFROzs7O2VBS1YsWUFBRztBQUNWLG1CQUFPLHdCQUF3QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQSxBQUFDLENBQUM7V0FDdkU7OztlQUVRLFlBQUc7QUFDVixnQkFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUNqRCwwQkFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsU0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBRzthQUMzRDtBQUNELG1CQUFPLFVBQVUsQ0FBQztXQUNuQjs7O0FBZFUsZ0JBQVEsR0FEcEIsTUFBTSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FDcEIsUUFBUSxLQUFSLFFBQVE7ZUFBUixRQUFRO1NBQVMsZUFBZTs7MEJBQWhDLFFBQVEiLCJmaWxlIjoiZW1wbG95ZWVzL2VtcGxveWVlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==