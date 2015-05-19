import breeze from 'breeze';
import settings from '../settings';
import {createEntityManager} from '../entity-manager-factory';

export class CustomerService {
  getPage(pageIndex) {
    var query = new breeze.EntityQuery
      .from('Customers')
      .select('CustomerID, CompanyName, ContactName, City, Phone, Fax')
      .orderBy('CompanyName')
      .skip(pageIndex * settings.pageSize)
      .take(settings.pageSize)
      .inlineCount();

    return createEntityManager()
      .then(em => em.executeQuery(query))
      .then(queryResult => {
        return {
          entities: queryResult.results,
          pageCount: 1, //Math.ceil(queryResult.inlineCount / this.pageSize);
        };
      });
  }

  loadExisting(id) {
    var customerQuery = new breeze.EntityQuery().from('Customers').where('CustomerID', '==', id);

    return createEntityManager()
      .then(em => em.executeQuery(customerQuery))
      .then(queryResult => {
        return {
          entity: queryResult.results[0],
          entityManager: queryResult.entityManager
        };
      });
  }

  createNew() {
    return createEntityManager()
      .then(em => {
        return {
          entity: em.createEntity('Customer'),
          entityManager: em
        };
      });
  }
}
