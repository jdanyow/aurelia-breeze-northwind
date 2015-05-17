/*
*  this will all be refactored... just getting some data on the page to play with materialize components
*/

import breeze from 'breeze';

var host = "http://sampleservice.breezejs.com";
var serviceName = host + "/api/northwind";

export class Orders {
  orders = [];
  pageSize = 100;
  pageCount = 0;
  pageIndex = 0;
  isLoading = false;

  activate() {
    this.loadPage();
  }

  loadPage() {
    this.isLoading = true;

    var query = new breeze.EntityQuery.from('Orders')
      .select('OrderID, Customer.CompanyName, Employee.FirstName, Employee.LastName, OrderDate, Freight')
      .orderByDesc('OrderDate')
      .skip(this.pageIndex * this.pageSize)
      .take(this.pageSize)
      .inlineCount();

    return new breeze.EntityManager(serviceName)
      .executeQuery(query)
      .then(queryResult => {
        this.orders = queryResult.results;
        this.pageCount = Math.ceil(queryResult.inlineCount / this.pageSize);
        this.pageCount = 8; // this shouldn't be necessary
        this.isLoading = false;
      });
  }

  setPage(index) {
    this.pageIndex = index;
    this.loadPage();
  }
}
