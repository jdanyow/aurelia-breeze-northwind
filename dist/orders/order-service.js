System.register(['breeze', '../settings', '../entity-manager-factory'], function (_export) {
  'use strict';

  var breeze, settings, createEntityManager, OrderService;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_breeze) {
      breeze = _breeze['default'];
    }, function (_settings) {
      settings = _settings['default'];
    }, function (_entityManagerFactory) {
      createEntityManager = _entityManagerFactory.createEntityManager;
    }],
    execute: function () {
      OrderService = (function () {
        function OrderService() {
          _classCallCheck(this, OrderService);
        }

        _createClass(OrderService, [{
          key: 'getPage',
          value: function getPage(pageIndex) {
            var query = new breeze.EntityQuery.from('Orders').select('OrderID, Customer.CompanyName, Employee.FirstName, Employee.LastName, OrderDate, Freight').orderByDesc('OrderDate').skip(pageIndex * settings.pageSize).take(settings.pageSize).inlineCount();

            return createEntityManager().then(function (em) {
              return em.executeQuery(query);
            }).then(function (queryResult) {
              return {
                orders: queryResult.results,
                pageCount: 8 };
            });
          }
        }, {
          key: 'getOrder',
          value: function getOrder(id) {
            var query = new breeze.EntityQuery().from('Orders').where('OrderID', '==', id);

            return createEntityManager().then(function (em) {
              return em.executeQuery(query);
            }).then(function (queryResult) {
              return {
                order: queryResult.results[0],
                entityManager: queryResult.entityManager
              };
            });
          }
        }, {
          key: 'createOrder',
          value: function createOrder() {
            return createEntityManager().then(function (em) {
              return {
                order: em.createEntity('Order'),
                entityManager: em
              };
            });
          }
        }]);

        return OrderService;
      })();

      _export('OrderService', OrderService);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2Q0FJYSxZQUFZOzs7Ozs7Ozs7Ozs7a0RBRmpCLG1CQUFtQjs7O0FBRWQsa0JBQVk7aUJBQVosWUFBWTtnQ0FBWixZQUFZOzs7cUJBQVosWUFBWTs7aUJBQ2hCLGlCQUFDLFNBQVMsRUFBRTtBQUNqQixnQkFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQ2QsTUFBTSxDQUFDLDBGQUEwRixDQUFDLENBQ2xHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQ3ZCLFdBQVcsRUFBRSxDQUFDOztBQUVqQixtQkFBTyxtQkFBbUIsRUFBRSxDQUN6QixJQUFJLENBQUMsVUFBQSxFQUFFO3FCQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2FBQUEsQ0FBQyxDQUNsQyxJQUFJLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDbkIscUJBQU87QUFDTCxzQkFBTSxFQUFFLFdBQVcsQ0FBQyxPQUFPO0FBQzNCLHlCQUFTLEVBQUUsQ0FBQyxFQUNiLENBQUM7YUFDSCxDQUFDLENBQUM7V0FDTjs7O2lCQUVPLGtCQUFDLEVBQUUsRUFBRTtBQUNYLGdCQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNkLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUU5QixtQkFBTyxtQkFBbUIsRUFBRSxDQUN6QixJQUFJLENBQUMsVUFBQSxFQUFFO3FCQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2FBQUEsQ0FBQyxDQUNsQyxJQUFJLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDbkIscUJBQU87QUFDTCxxQkFBSyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzdCLDZCQUFhLEVBQUUsV0FBVyxDQUFDLGFBQWE7ZUFDekMsQ0FBQzthQUNILENBQUMsQ0FBQztXQUNOOzs7aUJBRVUsdUJBQUc7QUFDWixtQkFBTyxtQkFBbUIsRUFBRSxDQUN6QixJQUFJLENBQUMsVUFBQSxFQUFFLEVBQUk7QUFDVixxQkFBTztBQUNMLHFCQUFLLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7QUFDL0IsNkJBQWEsRUFBRSxFQUFFO2VBQ2xCLENBQUM7YUFDSCxDQUFDLENBQUM7V0FDTjs7O2VBM0NVLFlBQVk7Ozs4QkFBWixZQUFZIiwiZmlsZSI6Im9yZGVycy9vcmRlci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==