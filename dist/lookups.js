System.register(['./entity-manager-factory'], function (_export) {
  'use strict';

  var createEntityManager, customersQuery, productsQuery, Lookups;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_entityManagerFactory) {
      createEntityManager = _entityManagerFactory.createEntityManager;
    }],
    execute: function () {
      customersQuery = new breeze.EntityQuery.from('Customers').select('CustomerID, CompanyName').orderBy('CompanyName');
      productsQuery = new breeze.EntityQuery.from('Products').select('ProductID, ProductName').orderBy('ProductName');

      Lookups = (function () {
        function Lookups() {
          _classCallCheck(this, Lookups);
        }

        _createClass(Lookups, [{
          key: 'load',
          value: function load() {
            var _this = this;

            return createEntityManager().then(function (em) {
              return Promise.all([em.executeQuery(customersQuery), em.executeQuery(productsQuery)]);
            }).then(function (queryResults) {
              _this.customers = queryResults[0].results;
              _this.products = queryResults[1].results;
            });
          }
        }]);

        return Lookups;
      })();

      _export('Lookups', Lookups);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvb2t1cHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJCQUVJLGNBQWMsRUFLZCxhQUFhLEVBS0osT0FBTzs7Ozs7Ozs7a0RBWlosbUJBQW1COzs7QUFFdkIsb0JBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDakIsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQ2pDLE9BQU8sQ0FBQyxhQUFhLENBQUM7QUFFckIsbUJBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDaEIsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQ2hDLE9BQU8sQ0FBQyxhQUFhLENBQUM7O0FBRWQsYUFBTztpQkFBUCxPQUFPO2dDQUFQLE9BQU87OztxQkFBUCxPQUFPOztpQkFJZCxnQkFBRzs7O0FBQ0wsbUJBQU8sbUJBQW1CLEVBQUUsQ0FDekIsSUFBSSxDQUFDLFVBQUEsRUFBRTtxQkFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFBQSxDQUFDLENBQzFGLElBQUksQ0FBQyxVQUFBLFlBQVksRUFBSTtBQUNwQixvQkFBSyxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN6QyxvQkFBSyxRQUFRLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUN6QyxDQUFDLENBQUE7V0FDTDs7O2VBWFUsT0FBTzs7O3lCQUFQLE9BQU8iLCJmaWxlIjoibG9va3Vwcy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=