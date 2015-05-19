/**
* The shell for the customers section of the application.  Will contain either
* the customer-list or customer page.
*/
export class CustomersSection {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './customer-list', nav: false, title: '' },
      { route: ':id', moduleId: './customer',      nav: false, title: '' },
    ]);
  }
}
