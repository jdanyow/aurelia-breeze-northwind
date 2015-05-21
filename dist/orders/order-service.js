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
                entities: queryResult.results,
                pageCount: 8 };
            });
          }
        }, {
          key: 'loadExisting',
          value: function loadExisting(id) {
            var orderQuery = new breeze.EntityQuery().from('Orders').where('OrderID', '==', id),
                detailQuery = new breeze.EntityQuery().from('OrderDetails').where('OrderID', '==', id);

            return createEntityManager().then(function (em) {
              return Promise.all([em.executeQuery(orderQuery), em.executeQuery(detailQuery)]);
            }).then(function (values) {
              var queryResult = values[0];
              return {
                entity: queryResult.results[0],
                entityManager: queryResult.entityManager
              };
            });
          }
        }, {
          key: 'createNew',
          value: function createNew() {
            return createEntityManager().then(function (em) {
              return {
                entity: em.createEntity('Order'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2Q0FJYSxZQUFZOzs7Ozs7Ozs7Ozs7a0RBRmpCLG1CQUFtQjs7O0FBRWQsa0JBQVk7aUJBQVosWUFBWTtnQ0FBWixZQUFZOzs7cUJBQVosWUFBWTs7aUJBQ2hCLGlCQUFDLFNBQVMsRUFBRTtBQUNqQixnQkFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQ2QsTUFBTSxDQUFDLDBGQUEwRixDQUFDLENBQ2xHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQ3ZCLFdBQVcsRUFBRSxDQUFDOztBQUVqQixtQkFBTyxtQkFBbUIsRUFBRSxDQUN6QixJQUFJLENBQUMsVUFBQSxFQUFFO3FCQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2FBQUEsQ0FBQyxDQUNsQyxJQUFJLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDbkIscUJBQU87QUFDTCx3QkFBUSxFQUFFLFdBQVcsQ0FBQyxPQUFPO0FBQzdCLHlCQUFTLEVBQUUsQ0FBQyxFQUNiLENBQUM7YUFDSCxDQUFDLENBQUM7V0FDTjs7O2lCQUVXLHNCQUFDLEVBQUUsRUFBRTtBQUNmLGdCQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUMvRSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUUzRixtQkFBTyxtQkFBbUIsRUFBRSxDQUN6QixJQUFJLENBQUMsVUFBQSxFQUFFO3FCQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzthQUFBLENBQUMsQ0FDcEYsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ2Qsa0JBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixxQkFBTztBQUNMLHNCQUFNLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDOUIsNkJBQWEsRUFBRSxXQUFXLENBQUMsYUFBYTtlQUN6QyxDQUFDO2FBQ0gsQ0FBQyxDQUFDO1dBQ047OztpQkFFUSxxQkFBRztBQUNWLG1CQUFPLG1CQUFtQixFQUFFLENBQ3pCLElBQUksQ0FBQyxVQUFBLEVBQUUsRUFBSTtBQUNWLHFCQUFPO0FBQ0wsc0JBQU0sRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztBQUNoQyw2QkFBYSxFQUFFLEVBQUU7ZUFDbEIsQ0FBQzthQUNILENBQUMsQ0FBQztXQUNOOzs7ZUEzQ1UsWUFBWTs7OzhCQUFaLFlBQVkiLCJmaWxlIjoib3JkZXJzL29yZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9