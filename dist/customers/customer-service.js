System.register(['breeze', '../settings', '../entity-manager-factory'], function (_export) {
  'use strict';

  var breeze, settings, createEntityManager, CustomerService;

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
      CustomerService = (function () {
        function CustomerService() {
          _classCallCheck(this, CustomerService);
        }

        _createClass(CustomerService, [{
          key: 'getPage',
          value: function getPage(pageIndex) {
            var query = new breeze.EntityQuery.from('Customers').select('CustomerID, CompanyName, ContactName, City, Phone, Fax').orderBy('CompanyName').skip(pageIndex * settings.pageSize).take(settings.pageSize).inlineCount();

            return createEntityManager().then(function (em) {
              return em.executeQuery(query);
            }).then(function (queryResult) {
              return {
                entities: queryResult.results,
                pageCount: 1 };
            });
          }
        }, {
          key: 'loadExisting',
          value: function loadExisting(id) {
            var customerQuery = new breeze.EntityQuery().from('Customers').where('CustomerID', '==', id);

            return createEntityManager().then(function (em) {
              return em.executeQuery(customerQuery);
            }).then(function (queryResult) {
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
                entity: em.createEntity('Customer'),
                entityManager: em
              };
            });
          }
        }]);

        return CustomerService;
      })();

      _export('CustomerService', CustomerService);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbWVycy9jdXN0b21lci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2Q0FJYSxlQUFlOzs7Ozs7Ozs7Ozs7a0RBRnBCLG1CQUFtQjs7O0FBRWQscUJBQWU7aUJBQWYsZUFBZTtnQ0FBZixlQUFlOzs7cUJBQWYsZUFBZTs7aUJBQ25CLGlCQUFDLFNBQVMsRUFBRTtBQUNqQixnQkFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQ2pCLE1BQU0sQ0FBQyx3REFBd0QsQ0FBQyxDQUNoRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUN2QixXQUFXLEVBQUUsQ0FBQzs7QUFFakIsbUJBQU8sbUJBQW1CLEVBQUUsQ0FDekIsSUFBSSxDQUFDLFVBQUEsRUFBRTtxQkFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzthQUFBLENBQUMsQ0FDbEMsSUFBSSxDQUFDLFVBQUEsV0FBVyxFQUFJO0FBQ25CLHFCQUFPO0FBQ0wsd0JBQVEsRUFBRSxXQUFXLENBQUMsT0FBTztBQUM3Qix5QkFBUyxFQUFFLENBQUMsRUFDYixDQUFDO2FBQ0gsQ0FBQyxDQUFDO1dBQ047OztpQkFFVyxzQkFBQyxFQUFFLEVBQUU7QUFDZixnQkFBSSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUU3RixtQkFBTyxtQkFBbUIsRUFBRSxDQUN6QixJQUFJLENBQUMsVUFBQSxFQUFFO3FCQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO2FBQUEsQ0FBQyxDQUMxQyxJQUFJLENBQUMsVUFBQSxXQUFXLEVBQUk7QUFDbkIscUJBQU87QUFDTCxzQkFBTSxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzlCLDZCQUFhLEVBQUUsV0FBVyxDQUFDLGFBQWE7ZUFDekMsQ0FBQzthQUNILENBQUMsQ0FBQztXQUNOOzs7aUJBRVEscUJBQUc7QUFDVixtQkFBTyxtQkFBbUIsRUFBRSxDQUN6QixJQUFJLENBQUMsVUFBQSxFQUFFLEVBQUk7QUFDVixxQkFBTztBQUNMLHNCQUFNLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUM7QUFDbkMsNkJBQWEsRUFBRSxFQUFFO2VBQ2xCLENBQUM7YUFDSCxDQUFDLENBQUM7V0FDTjs7O2VBekNVLGVBQWU7OztpQ0FBZixlQUFlIiwiZmlsZSI6ImN1c3RvbWVycy9jdXN0b21lci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==