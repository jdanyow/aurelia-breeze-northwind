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
                  return $(_this.element).material_select();
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
          value: function detached() {}
        }, {
          key: 'fixLabelOverlap',
          value: function fixLabelOverlap() {
            var $el = $(this.element);
            if ($el.prevUntil(null, ':input').val().length) {
              $el.addClass('active');
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9tYXRlcmlhbGl6ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7MENBb0JhLFdBQVc7Ozs7OztBQWpCeEIsV0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQ3pCLFFBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDMUMsU0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFdBQU8sS0FBSyxDQUFDO0dBQ2Q7O0FBRUQsV0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUNoQyxRQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsV0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM5Qjs7OztpQ0FaTyxNQUFNOzBDQUFFLGVBQWU7O29DQUN2QixTQUFTOzs7QUFtQkosaUJBQVc7QUFDWCxpQkFEQSxXQUFXLENBQ1YsT0FBTyxFQUFFLFNBQVMsRUFBRTs7O0FBQzlCLGNBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLGNBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQzVCOzsyQkFKVSxXQUFXOzs7O2lCQU1sQixnQkFBRzs7O0FBQ0wsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2Ysa0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDbEQ7O0FBR0Qsb0JBQU8sSUFBSSxDQUFDLEtBQUs7QUFDZixtQkFBSyxZQUFZO0FBQ2YsaUJBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ3hCLHdCQUFNLEVBQUUsVUFBVTtBQUNsQiw4QkFBWSxFQUFFLElBQUk7QUFDbEIsNkJBQVcsRUFBRSxFQUFFO0FBQ2YsdUJBQUssRUFBRTsyQkFBTSxTQUFTLENBQUMsTUFBSyxPQUFPLEVBQUUsUUFBUSxDQUFDO21CQUFBLEVBQy9DLENBQUMsQ0FBQztBQUNILHNCQUFNOztBQUFBLEFBRVIsbUJBQUssUUFBUTtBQUNYLDBCQUFVLENBQUM7eUJBQU0sQ0FBQyxDQUFDLE1BQUssT0FBTyxDQUFDLENBQUMsZUFBZSxFQUFFO2lCQUFBLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEQsc0JBQU07O0FBQUEsQUFFUixtQkFBSyxTQUFTO0FBQ1osMEJBQVUsQ0FBQzt5QkFBTSxDQUFDLENBQUMsTUFBSyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUU7aUJBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNoRCxzQkFBTTs7QUFBQSxBQUVSLG1CQUFLLE9BQU87QUFDVixvQkFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUU7MkJBQU0sTUFBSyxlQUFlLEVBQUU7bUJBQUEsRUFBRSxDQUFDLENBQUM7QUFDdEUsc0JBQU07O0FBQUEsQUFFUjtBQUNFLHNCQUFNLElBQUksS0FBSyxrREFBK0MsSUFBSSxDQUFDLEtBQUssUUFBSSxDQUFDO0FBQUEsYUFDaEY7V0FDRjs7O2lCQUVPLG9CQUFHLEVBRVY7OztpQkFFYywyQkFBRztBQUNoQixnQkFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQixnQkFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUU7QUFDOUMsaUJBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDeEI7V0FDRjs7O0FBaERVLG1CQUFXLEdBRHZCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQ2QsV0FBVyxLQUFYLFdBQVc7QUFBWCxtQkFBVyxHQUZ2QixlQUFlLENBQUMsYUFBYSxDQUFDLENBRWxCLFdBQVcsS0FBWCxXQUFXO2VBQVgsV0FBVzs7OzZCQUFYLFdBQVciLCJmaWxlIjoicmVzb3VyY2VzL21hdGVyaWFsaXplLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==