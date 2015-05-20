System.register(['aurelia-framework', 'aurelia-task-queue'], function (_export) {
  'use strict';

  var inject, customAttribute, TaskQueue, Materialize;

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
    }, function (_aureliaTaskQueue) {
      TaskQueue = _aureliaTaskQueue.TaskQueue;
    }],
    execute: function () {
      Materialize = (function () {
        function Materialize(element, taskQueue) {
          _classCallCheck(this, _Materialize);

          this.element = element;
          this.taskQueue = taskQueue;
        }

        var _Materialize = Materialize;

        _createClass(_Materialize, [{
          key: 'bind',
          value: function bind() {
            var _this = this;

            if (!this.value) {
              this.value = this.element.nodeName.toLowerCase();
            }

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
                  return _this.bindSelect();
                }, 10);
                break;

              case 'sidenav':
                setTimeout(function () {
                  return $(_this.element).sideNav();
                }, 10);
                break;

              case 'label':
                this.taskQueue.queueMicroTask({ call: function call() {
                    return _this.fixLabelOverlap();
                  } });
                break;

              default:
                throw new Error('Unrecognized materialize attribute value: \'' + this.value + '\'');
            }
          }
        }, {
          key: 'detached',
          value: function detached() {
            clearInterval(this._interval);
          }
        }, {
          key: 'fixLabelOverlap',
          value: function fixLabelOverlap() {
            var $el = $(this.element);
            if ($el.prevUntil(null, ':input').val().length) {
              $el.addClass('active');
            }
          }
        }, {
          key: 'bindSelect',
          value: function bindSelect() {
            var _this2 = this;

            var input, getSelectedOption, selectedOption, lastSelectValue;

            $(this.element).material_select();
            input = $(this.element).prevUntil(null, ':input')[0];

            getSelectedOption = function () {
              var i, options, option, optionValue;
              options = _this2.element.options;
              i = options.length;
              while (i--) {
                option = options.item(i);
                if (option.selected) {
                  return option;
                }
              }
              throw new Error('should have found a selected option');
            };

            selectedOption = getSelectedOption();
            input.value = selectedOption.text;

            lastSelectValue = this.element.value;

            this._interval = setInterval(function () {
              if (lastSelectValue !== _this2.element.value) {
                selectedOption = getSelectedOption();
                if (input.value === selectedOption.text) {
                  fireEvent(_this2.element, 'change');
                } else {
                  input.value = selectedOption.text;
                }
                lastSelectValue = _this2.element.value;
              }
            }, 120);
          }
        }]);

        Materialize = inject(Element, TaskQueue)(Materialize) || Materialize;
        Materialize = customAttribute('materialize')(Materialize) || Materialize;
        return Materialize;
      })();

      _export('Materialize', Materialize);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9tYXRlcmlhbGl6ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7MENBb0JhLFdBQVc7Ozs7OztBQWpCeEIsV0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQ3pCLFFBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUMsU0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFdBQU8sS0FBSyxDQUFDO0dBQ2Q7O0FBRUQsV0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUNoQyxRQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsV0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM5Qjs7OztpQ0FaTyxNQUFNOzBDQUFFLGVBQWU7O29DQUN2QixTQUFTOzs7QUFtQkosaUJBQVc7QUFDWCxpQkFEQSxXQUFXLENBQ1YsT0FBTyxFQUFFLFNBQVMsRUFBRTs7O0FBQzlCLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLGNBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQzVCOzsyQkFKVSxXQUFXOzs7O2lCQU1sQixnQkFBRzs7O0FBQ0wsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2Ysa0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDbEQ7O0FBR0Qsb0JBQU8sSUFBSSxDQUFDLEtBQUs7QUFDZixtQkFBSyxZQUFZO0FBQ2YsaUJBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ3hCLHdCQUFNLEVBQUUsVUFBVTtBQUNsQiw4QkFBWSxFQUFFLElBQUk7QUFDbEIsNkJBQVcsRUFBRSxFQUFFO0FBQ2YsdUJBQUssRUFBRTsyQkFBTSxTQUFTLENBQUMsTUFBSyxPQUFPLEVBQUUsUUFBUSxDQUFDO21CQUFBLEVBQy9DLENBQUMsQ0FBQztBQUNILHNCQUFNOztBQUFBLEFBRVIsbUJBQUssUUFBUTtBQUNYLDBCQUFVLENBQUM7eUJBQU0sTUFBSyxVQUFVLEVBQUU7aUJBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4QyxzQkFBTTs7QUFBQSxBQUVSLG1CQUFLLFNBQVM7QUFDWiwwQkFBVSxDQUFDO3lCQUFNLENBQUMsQ0FBQyxNQUFLLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtpQkFBQSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELHNCQUFNOztBQUFBLEFBRVIsbUJBQUssT0FBTztBQUNWLG9CQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRTsyQkFBTSxNQUFLLGVBQWUsRUFBRTttQkFBQSxFQUFFLENBQUMsQ0FBQztBQUN0RSxzQkFBTTs7QUFBQSxBQUVSO0FBQ0Usc0JBQU0sSUFBSSxLQUFLLGtEQUErQyxJQUFJLENBQUMsS0FBSyxRQUFJLENBQUM7QUFBQSxhQUNoRjtXQUNGOzs7aUJBRU8sb0JBQUc7QUFDVCx5QkFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztXQUMvQjs7O2lCQUVjLDJCQUFHO0FBQ2hCLGdCQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFCLGdCQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRTtBQUM5QyxpQkFBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN4QjtXQUNGOzs7aUJBRVMsc0JBQUc7OztBQUlYLGdCQUFJLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDOztBQUc5RCxhQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ2xDLGlCQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUdyRCw2QkFBaUIsR0FBRyxZQUFNO0FBQ3hCLGtCQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQztBQUNwQyxxQkFBTyxHQUFHLE9BQUssT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUMvQixlQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUNuQixxQkFBTSxDQUFDLEVBQUUsRUFBRTtBQUNULHNCQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QixvQkFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO0FBQ25CLHlCQUFPLE1BQU0sQ0FBQztpQkFDZjtlQUNGO0FBQ0Qsb0JBQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQzthQUN4RCxDQUFDOztBQUdGLDBCQUFjLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztBQUNyQyxpQkFBSyxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDOztBQUdsQywyQkFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDOztBQUdyQyxnQkFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsWUFBTTtBQUMvQixrQkFBSSxlQUFlLEtBQUssT0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQzFDLDhCQUFjLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztBQUNyQyxvQkFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLGNBQWMsQ0FBQyxJQUFJLEVBQUU7QUFFdkMsMkJBQVMsQ0FBQyxPQUFLLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDbkMsTUFBTTtBQUVMLHVCQUFLLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7aUJBQ25DO0FBQ0QsK0JBQWUsR0FBRyxPQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUM7ZUFDdEM7YUFDRixFQUNELEdBQUcsQ0FBQyxDQUFDO1dBQ1I7OztBQWhHVSxtQkFBVyxHQUR2QixNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUNkLFdBQVcsS0FBWCxXQUFXO0FBQVgsbUJBQVcsR0FGdkIsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUVsQixXQUFXLEtBQVgsV0FBVztlQUFYLFdBQVc7Ozs2QkFBWCxXQUFXIiwiZmlsZSI6InJlc291cmNlcy9tYXRlcmlhbGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=