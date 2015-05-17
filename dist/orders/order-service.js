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
            var orderQuery = new breeze.EntityQuery().from('Orders').where('OrderID', '==', id),
                detailQuery = new breeze.EntityQuery().from('OrderDetails').where('OrderID', '==', id);

            return createEntityManager().then(function (em) {
              return Promise.all([em.executeQuery(orderQuery), em.executeQuery(detailQuery)]);
            }).then(function (values) {
              var queryResult = values[0];
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
        }, {
          key: 'getCustomerLookup',
          value: function getCustomerLookup() {
            var query = new breeze.EntityQuery.from('Customers').select('CustomerID, CompanyName').orderBy('CompanyName');

            return createEntityManager().then(function (em) {
              return em.executeQuery(query);
            }).then(function (queryResult) {
              return queryResult.results;
            });
          }
        }, {
          key: 'getProductsIndex',
          value: function getProductsIndex() {
            var query = new breeze.EntityQuery.from('Products').select('ProductID, ProductName').orderBy('ProductName');

            return createEntityManager().then(function (em) {
              return em.executeQuery(query);
            }).then(function (queryResult) {
              var index = {};
              queryResult.results.forEach(function (p) {
                return index[p.ProductID] = p.ProductName;
              });
              return index;
            });
          }
        }]);

        return OrderService;
      })();

      _export('OrderService', OrderService);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVycy9vcmRlci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2Q0FJYSxZQUFZOzs7Ozs7Ozs7Ozs7a0RBRmpCLG1CQUFtQjs7O0FBRWQsa0JBQVk7aUJBQVosWUFBWTtnQ0FBWixZQUFZOzs7cUJBQVosWUFBWTs7aUJBQ2hCLGlCQUFDLFNBQVMsRUFBRTtBQUNqQixnQkFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQ2QsTUFBTSxDQUFDLDBGQUEwRixDQUFDLENBQ2xHLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQ3ZCLFdBQVcsRUFBRSxDQUFDOztBQUVqQixtQkFBTyxtQkFBbUIsRUFBRSxDQUN6QixJQUFJLENBQUMsVUFBQSxFQUFFO3FCQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2FBQUEsQ0FBQyxDQUNsQyxJQUFJLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDbkIscUJBQU87QUFDTCxzQkFBTSxFQUFFLFdBQVcsQ0FBQyxPQUFPO0FBQzNCLHlCQUFTLEVBQUUsQ0FBQyxFQUNiLENBQUM7YUFDSCxDQUFDLENBQUM7V0FDTjs7O2lCQUVPLGtCQUFDLEVBQUUsRUFBRTtBQUNYLGdCQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUMvRSxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUUzRixtQkFBTyxtQkFBbUIsRUFBRSxDQUN6QixJQUFJLENBQUMsVUFBQSxFQUFFO3FCQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzthQUFBLENBQUMsQ0FDcEYsSUFBSSxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ2Qsa0JBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixxQkFBTztBQUNMLHFCQUFLLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDN0IsNkJBQWEsRUFBRSxXQUFXLENBQUMsYUFBYTtlQUN6QyxDQUFDO2FBQ0gsQ0FBQyxDQUFDO1dBQ047OztpQkFFVSx1QkFBRztBQUNaLG1CQUFPLG1CQUFtQixFQUFFLENBQ3pCLElBQUksQ0FBQyxVQUFBLEVBQUUsRUFBSTtBQUNWLHFCQUFPO0FBQ0wscUJBQUssRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztBQUMvQiw2QkFBYSxFQUFFLEVBQUU7ZUFDbEIsQ0FBQzthQUNILENBQUMsQ0FBQztXQUNOOzs7aUJBRWdCLDZCQUFHO0FBQ2xCLGdCQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDakIsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQ2pDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFMUIsbUJBQU8sbUJBQW1CLEVBQUUsQ0FDekIsSUFBSSxDQUFDLFVBQUEsRUFBRTtxQkFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzthQUFBLENBQUMsQ0FDbEMsSUFBSSxDQUFDLFVBQUEsV0FBVztxQkFBSSxXQUFXLENBQUMsT0FBTzthQUFBLENBQUMsQ0FBQztXQUM3Qzs7O2lCQUVlLDRCQUFHO0FBQ2pCLGdCQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDaEIsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQ2hDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7QUFFMUIsbUJBQU8sbUJBQW1CLEVBQUUsQ0FDekIsSUFBSSxDQUFDLFVBQUEsRUFBRTtxQkFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzthQUFBLENBQUMsQ0FDbEMsSUFBSSxDQUFDLFVBQUEsV0FBVyxFQUFJO0FBQ25CLGtCQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZix5QkFBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO3VCQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVc7ZUFBQSxDQUFDLENBQUM7QUFDckUscUJBQU8sS0FBSyxDQUFDO2FBQ2QsQ0FBQyxDQUFDO1dBQ047OztlQXJFVSxZQUFZOzs7OEJBQVosWUFBWSIsImZpbGUiOiJvcmRlcnMvb3JkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=