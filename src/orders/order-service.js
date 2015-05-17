import breeze from 'breeze';
import settings from '../settings';
import {createEntityManager} from '../entity-manager-factory';

export class OrderService {
  getPage(pageIndex) {
    var query = new breeze.EntityQuery
      .from('Orders')
      .select('OrderID, Customer.CompanyName, Employee.FirstName, Employee.LastName, OrderDate, Freight')
      .orderByDesc('OrderDate')
      .skip(pageIndex * settings.pageSize)
      .take(settings.pageSize)
      .inlineCount();

    return createEntityManager()
      .then(em => em.executeQuery(query))
      .then(queryResult => {
        return {
          orders: queryResult.results,
          pageCount: 8, //Math.ceil(queryResult.inlineCount / this.pageSize);
        };
      });
  }

  getOrder(id) {
    var query = new breeze.EntityQuery()
      .from('Orders')
      .where('OrderID', '==', id);

    return createEntityManager()
      .then(em => em.executeQuery(query))
      .then(queryResult => {
        return {
          order: queryResult.results[0],
          entityManager: queryResult.entityManager
        };
      });
  }

  createOrder() {
    return createEntityManager()
      .then(em => {
        return {
          order: em.createEntity('Order'),
          entityManager: em
        };
      });
  }
}
