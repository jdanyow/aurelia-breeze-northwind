System.register(['./settings'], function (_export) {
  'use strict';

  var settings, entityManager;

  _export('createEntityManager', createEntityManager);

  function createEntityManager() {
    if (entityManager) {
      return new Promise(function (resolve, reject) {
        return resolve(entityManager.createEmptyCopy());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0eS1tYW5hZ2VyLWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dCQUVJLGFBQWE7O2lDQUVELG1CQUFtQjs7QUFBNUIsV0FBUyxtQkFBbUIsR0FBRztBQUNwQyxRQUFJLGFBQWEsRUFBRTtBQUNqQixhQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07ZUFBSyxPQUFPLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO09BQUEsQ0FBQyxDQUFDO0tBQ25GOztBQUVELGlCQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxXQUFPLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FDakMsSUFBSSxDQUFDO2FBQU0sYUFBYSxDQUFDLGVBQWUsRUFBRTtLQUFBLENBQUMsQ0FBQztHQUNoRCIsImZpbGUiOiJlbnRpdHktbWFuYWdlci1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==