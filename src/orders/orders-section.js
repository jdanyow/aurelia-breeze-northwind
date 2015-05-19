/**
* The shell for the orders section of the application.  Will contain either
* the order-list or order page.
*/
export class OrdersSection {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './order-list', nav: false, title: '' },
      { route: ':id', moduleId: './order',      nav: false, title: '' },
    ]);
  }
}
