System.register(['../entity-view-model', 'aurelia-dependency-injection', './customer-service', '../lookups'], function (_export) {
  'use strict';

  var EntityViewModel, inject, CustomerService, Lookups, Customer;

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  return {
    setters: [function (_entityViewModel) {
      EntityViewModel = _entityViewModel.EntityViewModel;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_customerService) {
      CustomerService = _customerService.CustomerService;
    }, function (_lookups) {
      Lookups = _lookups.Lookups;
    }],
    execute: function () {
      Customer = (function (_EntityViewModel) {
        function Customer(service, lookups) {
          _classCallCheck(this, _Customer);

          _get(Object.getPrototypeOf(_Customer.prototype), 'constructor', this).call(this, service);
        }

        _inherits(Customer, _EntityViewModel);

        var _Customer = Customer;
        Customer = inject(CustomerService, Lookups)(Customer) || Customer;
        return Customer;
      })(EntityViewModel);

      _export('Customer', Customer);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbWVycy9jdXN0b21lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7eURBTWEsUUFBUTs7Ozs7Ozs7Ozt5Q0FOYixlQUFlOzsyQ0FDZixNQUFNOzt5Q0FDTixlQUFlOzt5QkFDZixPQUFPOzs7QUFHRixjQUFRO0FBQ1IsaUJBREEsUUFBUSxDQUNQLE9BQU8sRUFBRSxPQUFPLEVBQUU7OztBQUM1QiwyRkFBTSxPQUFPLEVBQUU7U0FDaEI7O2tCQUhVLFFBQVE7O3dCQUFSLFFBQVE7QUFBUixnQkFBUSxHQURwQixNQUFNLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUNwQixRQUFRLEtBQVIsUUFBUTtlQUFSLFFBQVE7U0FBUyxlQUFlOzswQkFBaEMsUUFBUSIsImZpbGUiOiJjdXN0b21lcnMvY3VzdG9tZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9