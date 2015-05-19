System.register(['../settings'], function (_export) {
  'use strict';

  var settings, ListViewModel;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_settings) {
      settings = _settings['default'];
    }],
    execute: function () {
      ListViewModel = (function () {
        function ListViewModel(route, router, service) {
          _classCallCheck(this, ListViewModel);

          this.__initializeProperties();

          this.route = route;
          this.router = router;
          this.service = service;
        }

        _createClass(ListViewModel, [{
          key: 'activate',
          value: function activate() {
            this.load();
          }
        }, {
          key: 'load',
          value: function load() {
            var _this = this;

            this.isLoading = true;
            this.service.getPage(this.pageIndex).then(function (result) {
              _this.entities = result.entities;
              _this.pageCount = result.pageCount;
              _this.isLoading = false;
            });
          }
        }, {
          key: 'setPage',
          value: function setPage(index) {
            this.pageIndex = index;
            this.load();
          }
        }, {
          key: 'open',
          value: function open(id) {
            this.router.navigate(this.route + '/' + id);
          }
        }, {
          key: '__initializeProperties',
          value: function __initializeProperties() {
            this.entities = [];
            this.pageSize = settings.pageSize;
            this.pageCount = 0;
            this.pageIndex = 0;
            this.isLoading = false;
          }
        }]);

        return ListViewModel;
      })();

      _export('ListViewModel', ListViewModel);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3Qtdmlldy1tb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Z0JBRWEsYUFBYTs7Ozs7Ozs7Ozs7QUFBYixtQkFBYTtBQVViLGlCQVZBLGFBQWEsQ0FVWixLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRTtnQ0FWekIsYUFBYTs7OztBQVd0QixjQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixjQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUN4Qjs7cUJBZFUsYUFBYTs7aUJBZ0JoQixvQkFBRztBQUNULGdCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7V0FDYjs7O2lCQUVHLGdCQUFHOzs7QUFDTCxnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FDakMsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ2Qsb0JBQUssUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDaEMsb0JBQUssU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDbEMsb0JBQUssU0FBUyxHQUFHLEtBQUssQ0FBQzthQUN4QixDQUFDLENBQUM7V0FDTjs7O2lCQUVNLGlCQUFDLEtBQUssRUFBRTtBQUNiLGdCQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN2QixnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1dBQ2I7OztpQkFFRyxjQUFDLEVBQUUsRUFBRTtBQUNQLGdCQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztXQUM3Qzs7OztpQkFqQ0QsUUFBUSxHQUFHLEVBQUU7aUJBQ2IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRO2lCQUM1QixTQUFTLEdBQUcsQ0FBQztpQkFDYixTQUFTLEdBQUcsQ0FBQztpQkFDYixTQUFTLEdBQUcsS0FBSzs7OztlQVJOLGFBQWE7OzsrQkFBYixhQUFhIiwiZmlsZSI6Imxpc3Qtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=