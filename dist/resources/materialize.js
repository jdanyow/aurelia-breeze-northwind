System.register(['aurelia-framework'], function (_export) {
  'use strict';

  var inject, customAttribute, Materialize;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function createEvent(name) {
    var event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
  }

  function fireEvent(element, name) {
    var event = createEvent(name);
    element.dispatchEvent(event);
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      customAttribute = _aureliaFramework.customAttribute;
    }],
    execute: function () {
      Materialize = (function () {
        function Materialize(element) {
          _classCallCheck(this, _Materialize);

          this.element = element;
        }

        var _Materialize = Materialize;

        _createClass(_Materialize, [{
          key: 'attached',
          value: function attached() {
            var _this = this;

            switch (this.value) {
              case 'datepicker':
                $(this.element).pickadate({
                  format: 'm/d/yyyy',
                  selectMonths: true,
                  selectYears: 15,
                  onSet: function onSet() {
                    return fireEvent(_this.element, 'change');
                  } });
                break;

              case 'select':
                setTimeout(function () {
                  return $(_this.element).material_select();
                }, 10);
                break;

              case 'sidenav':
                $(this.element).sideNav();
                break;

              default:
                throw new Error('Unrecognized materialize attribute value: \'' + this.value + '\'');
            }
          }
        }, {
          key: 'detached',
          value: function detached() {}
        }]);

        Materialize = inject(Element)(Materialize) || Materialize;
        Materialize = customAttribute('materialize')(Materialize) || Materialize;
        return Materialize;
      })();

      _export('Materialize', Materialize);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9tYXRlcmlhbGl6ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7K0JBZWEsV0FBVzs7Ozs7O0FBYnhCLFdBQVMsV0FBVyxDQUFDLElBQUksRUFBRTtBQUN6QixRQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLFNBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxXQUFPLEtBQUssQ0FBQztHQUNkOztBQUVELFdBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDaEMsUUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLFdBQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDOUI7Ozs7aUNBWE8sTUFBTTswQ0FBRSxlQUFlOzs7QUFlbEIsaUJBQVc7QUFDWCxpQkFEQSxXQUFXLENBQ1YsT0FBTyxFQUFFOzs7QUFDbkIsY0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FDeEI7OzJCQUhVLFdBQVc7Ozs7aUJBS2Qsb0JBQUc7OztBQUVULG9CQUFPLElBQUksQ0FBQyxLQUFLO0FBQ2YsbUJBQUssWUFBWTtBQUNmLGlCQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUN4Qix3QkFBTSxFQUFFLFVBQVU7QUFDbEIsOEJBQVksRUFBRSxJQUFJO0FBQ2xCLDZCQUFXLEVBQUUsRUFBRTtBQUNmLHVCQUFLLEVBQUU7MkJBQU0sU0FBUyxDQUFDLE1BQUssT0FBTyxFQUFFLFFBQVEsQ0FBQzttQkFBQSxFQUMvQyxDQUFDLENBQUM7QUFDSCxzQkFBTTs7QUFBQSxBQUVSLG1CQUFLLFFBQVE7QUFDWCwwQkFBVSxDQUFDO3lCQUFNLENBQUMsQ0FBQyxNQUFLLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRTtpQkFBQSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELHNCQUFNOztBQUFBLEFBRVIsbUJBQUssU0FBUztBQUNaLGlCQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzFCLHNCQUFNOztBQUFBLEFBRVI7QUFDRSxzQkFBTSxJQUFJLEtBQUssa0RBQStDLElBQUksQ0FBQyxLQUFLLFFBQUksQ0FBQztBQUFBLGFBQ2hGO1dBQ0Y7OztpQkFFTyxvQkFBRyxFQUVWOzs7QUFoQ1UsbUJBQVcsR0FEdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNILFdBQVcsS0FBWCxXQUFXO0FBQVgsbUJBQVcsR0FGdkIsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUVsQixXQUFXLEtBQVgsV0FBVztlQUFYLFdBQVc7Ozs2QkFBWCxXQUFXIiwiZmlsZSI6InJlc291cmNlcy9tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=