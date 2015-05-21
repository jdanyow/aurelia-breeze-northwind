System.register(['./settings'], function (_export) {
  'use strict';

  var settings, entityManager;

  _export('createEntityManager', createEntityManager);

  function createEntityManager() {
    if (entityManager) {
      return new Promise(function (resolve, reject) {
        return resolve(copyEntityManager());
      });
    }

    entityManager = new breeze.EntityManager(settings.serviceName);
    return entityManager.fetchMetadata().then(function () {
      return copyEntityManager();
    });
  }

  function copyEntityManager() {
    var copy = entityManager.createEmptyCopy();
    copy.entityChanged.subscribe(logChanges);
    return copy;
  }

  function logChanges(data) {
    var message = 'Entity Changed.  Entity: ' + (data.entity ? data.entity.entityType.name + '/' + data.entity.entityAspect.getKey().toString() : '?') + ';  EntityAction: ' + data.entityAction.getName() + '; ';
    if (data.entityAction === breeze.EntityAction.PropertyChange) {
      var pcArgs = data.args;
      message += 'PropertyName: ' + (pcArgs.propertyName || 'null') + '; Old Value: ' + (pcArgs.oldValue ? pcArgs.oldValue.toString() : 'null') + '; New Value: ' + (pcArgs.newValue ? pcArgs.newValue.toString() : 'null') + ';';
    }
    if (data.entityAction === breeze.EntityAction.EntityStateChange) {
      message += 'New State: ' + data.entity.entityAspect.entityState.getName() + ';';
    }
    console.log(message);
  }return {
    setters: [function (_settings) {
      settings = _settings['default'];
    }],
    execute: function () {
      ;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0eS1tYW5hZ2VyLWZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dCQUVJLGFBQWE7O2lDQUtELG1CQUFtQjs7QUFBNUIsV0FBUyxtQkFBbUIsR0FBRztBQUNwQyxRQUFJLGFBQWEsRUFBRTtBQUNqQixhQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07ZUFBSyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztPQUFBLENBQUMsQ0FBQztLQUN2RTs7QUFFRCxpQkFBYSxHQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0QsV0FBTyxhQUFhLENBQUMsYUFBYSxFQUFFLENBQ2pDLElBQUksQ0FBQzthQUFNLGlCQUFpQixFQUFFO0tBQUEsQ0FBQyxDQUFDO0dBQ3BDOztBQUVELFdBQVMsaUJBQWlCLEdBQUc7QUFDM0IsUUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQzNDLFFBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3pDLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBR0QsV0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFO0FBQ3hCLFFBQUksT0FBTyxHQUFHLDJCQUEyQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUEsQUFBQyxHQUFHLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQzlNLFFBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRTtBQUM1RCxVQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3ZCLGFBQU8sSUFBSSxnQkFBZ0IsSUFBSSxNQUFNLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQSxBQUFDLEdBQUcsZUFBZSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUEsQUFBQyxHQUFHLGVBQWUsSUFBSSxNQUFNLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFBLEFBQUMsR0FBRyxHQUFHLENBQUM7S0FDN047QUFDRCxRQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTtBQUMvRCxhQUFPLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUM7S0FDakY7QUFDRCxXQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQ3RCOzs7OztBQUFBLE9BQUMiLCJmaWxlIjoiZW50aXR5LW1hbmFnZXItZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=