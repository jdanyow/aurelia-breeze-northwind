System.register(['./settings'], function (_export) {
  'use strict';

  var settings, entityManager;

  _export('createEntityManager', createEntityManager);

  function createEntityManager() {
    if (entityManager) {
      return new Promise(function (resolve, reject) {
        resolve(entityManager.createEmptyCopy());
      });
    }

    entityManager = new breeze.EntityManager(settings.serviceName);
    return entityManager.fetchMetadata().then(function () {
      return entityManager.createEmptyCopy();
    });
  }

  return {
    setters: [function (_settings) {
      settings = _settings['default'];
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0eS1tYW5hZ2VyLWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dCQUVJLGFBQWE7O2lDQUVELG1CQUFtQjs7QUFBNUIsV0FBUyxtQkFBbUIsR0FBRztBQUNwQyxRQUFJLGFBQWEsRUFBRTtBQUNqQixhQUFPLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUFFLGVBQU8sQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztPQUFFLENBQUMsQ0FBQztLQUM3Rjs7QUFFRCxpQkFBYSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0QsV0FBTyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQ2pDLElBQUksQ0FBQzthQUFNLGFBQWEsQ0FBQyxlQUFlLEVBQUU7S0FBQSxDQUFDLENBQUM7R0FDaEQiLCJmaWxlIjoiZW50aXR5LW1hbmFnZXItZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=