import {inject} from './aurelia-dependency-injection';
import {Lookups} from './lookups';

@inject(Lookups)
export class App {
  constructor(lookups) {
    this.lookups = lookups;
  }

  configureRouter(config, router) {
    config.title = 'Northwind';
    config.map([
      { route: '', redirect: 'orders' },
      { route: 'orders',    moduleId: './orders/orders-section', nav: true, title: 'Orders' },
      { route: 'customers', moduleId: './customers',             nav: true, title: 'Customers' },
      { route: 'employees', moduleId: './employees',             nav: true, title: 'Employees' },
    ]);
    this.router = router;
  }

  activate() {
    return this.lookups.load();
  }
}
