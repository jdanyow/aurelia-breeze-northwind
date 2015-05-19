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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvb2t1cHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzJCQUVJLGNBQWMsRUFLZCxhQUFhLEVBU0osT0FBTzs7Ozs7Ozs7a0RBaEJaLG1CQUFtQjs7O0FBRXZCLG9CQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQ2pCLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUNqQyxPQUFPLENBQUMsYUFBYSxDQUFDO0FBRXJCLG1CQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQ2hCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUNoQyxPQUFPLENBQUMsYUFBYSxDQUFDOztBQU1aLGFBQU87aUJBQVAsT0FBTztnQ0FBUCxPQUFPOzs7cUJBQVAsT0FBTzs7aUJBSWQsZ0JBQUc7OztBQUNMLG1CQUFPLG1CQUFtQixFQUFFLENBQ3pCLElBQUksQ0FBQyxVQUFBLEVBQUU7cUJBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQUEsQ0FBQyxDQUMxRixJQUFJLENBQUMsVUFBQSxZQUFZLEVBQUk7QUFDcEIsb0JBQUssU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDekMsb0JBQUssUUFBUSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7YUFDekMsQ0FBQyxDQUFBO1dBQ0w7OztlQVhVLE9BQU87Ozt5QkFBUCxPQUFPIiwiZmlsZSI6Imxvb2t1cHMuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9