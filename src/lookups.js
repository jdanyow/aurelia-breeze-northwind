import {createEntityManager} from './entity-manager-factory';

var customersQuery = new breeze.EntityQuery
  .from('Customers')
  .select('CustomerID, CompanyName')
  .orderBy('CompanyName');

var productsQuery = new breeze.EntityQuery
  .from('Products')
  .select('ProductID, ProductName, UnitPrice')
  .orderBy('ProductName');

/**
* Manages the application's shared lookups.
* Eagerly loading the lookups because there are only two.
*/
export class Lookups {
  customers;
  products;

  load() {
    return createEntityManager()
      .then(em => Promise.all([em.executeQuery(customersQuery), em.executeQuery(productsQuery)]))
      .then(queryResults => {
        this.customers = queryResults[0].results;
        this.products = queryResults[1].results;
      })
  }
}
