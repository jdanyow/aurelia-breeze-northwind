import settings from './settings';

var entityManager;

export function createEntityManager() {
  if (entityManager) {
    return new Promise(function(resolve, reject) { resolve(entityManager.createEmptyCopy()); });
  }

  entityManager = new breeze.EntityManager(settings.serviceName);
  return entityManager.fetchMetadata()
    .then(() => entityManager.createEmptyCopy());
}
