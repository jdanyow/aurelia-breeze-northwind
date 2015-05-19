System.register([], function (_export) {
  'use strict';

  var EntityViewModel;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      EntityViewModel = (function () {
        function EntityViewModel(service) {
          _classCallCheck(this, EntityViewModel);

          this.service = service;
        }

        _createClass(EntityViewModel, [{
          key: 'activate',
          value: function activate(info) {
            var _this = this;

            var promise;

            if (info.id === 'new') {
              promise = this.service.createNew();
            } else {
              promise = this.service.loadExisting(info.id);
            }

            return promise.then(function (result) {
              _this.entityManager = result.entityManager;
              _this.entity = result.entity;
            });
          }
        }, {
          key: 'canDeactivate',
          value: function canDeactivate() {
            if (this.entity.entityAspect.entityState.isAdded()) {
              Materialize.toast('Add-new cancelled.', 2000);
              return true;
            }

            if (this.hasChanges) {
              if (!this._lastPop || +new Date() - this._lastPop > 2000) {
                this._lastPop = +new Date();
                Materialize.toast('Navigation cancelled.  Save your changes!', 2000);
              }
              return false;
            }

            return true;
          }
        }, {
          key: 'hasChanges',
          get: function () {
            return this.entityManager.hasChanges();
          }
        }, {
          key: 'save',
          value: function save() {
            this.entityManager.acceptChanges();
            Materialize.toast('Changes saved.', 2000);
          }
        }, {
          key: 'revert',
          value: function revert() {
            this.entityManager.rejectChanges();
            Materialize.toast('Changes reverted.', 2000);

            if (this.hasChanges) {
              this.entityManager.rejectChanges();
            }
          }
        }]);

        return EntityViewModel;
      })();

      _export('EntityViewModel', EntityViewModel);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0eS12aWV3LW1vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLGVBQWU7Ozs7Ozs7OztBQUFmLHFCQUFlO0FBS2YsaUJBTEEsZUFBZSxDQUtkLE9BQU8sRUFBRTtnQ0FMVixlQUFlOztBQU14QixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7cUJBUFUsZUFBZTs7aUJBU2xCLGtCQUFDLElBQUksRUFBRTs7O0FBQ2IsZ0JBQUksT0FBTyxDQUFDOztBQUdaLGdCQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssS0FBSyxFQUFFO0FBQ3JCLHFCQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQyxNQUFNO0FBQ0wscUJBQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDOUM7O0FBRUQsbUJBQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUM1QixvQkFBSyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUMxQyxvQkFBSyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUM3QixDQUFDLENBQUM7V0FDSjs7O2lCQUVZLHlCQUFHO0FBRWQsZ0JBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFO0FBQ2xELHlCQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlDLHFCQUFPLElBQUksQ0FBQzthQUNiOztBQUdELGdCQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFFbkIsa0JBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRTtBQUN4RCxvQkFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7QUFDNUIsMkJBQVcsQ0FBQyxLQUFLLENBQUMsMkNBQTJDLEVBQUUsSUFBSSxDQUFDLENBQUM7ZUFDdEU7QUFDRCxxQkFBTyxLQUFLLENBQUM7YUFDZDs7QUFHRCxtQkFBTyxJQUFJLENBQUM7V0FDYjs7O2VBRWEsWUFBRztBQUNmLG1CQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDeEM7OztpQkFFRyxnQkFBRztBQUVMLGdCQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ25DLHVCQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFBO1dBQzFDOzs7aUJBRUssa0JBQUc7QUFDUCxnQkFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNuQyx1QkFBVyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQTs7QUFHNUMsZ0JBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNuQixrQkFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUNwQztXQUNGOzs7ZUFoRVUsZUFBZTs7O2lDQUFmLGVBQWUiLCJmaWxlIjoiZW50aXR5LXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9