import {inject} from './aurelia-dependency-injection';
import {Lookups} from './lookups';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Lookups, EventAggregator)
export class App {
  constructor(lookups, events) {
    this.lookups = lookups;

    // enable the materialize "waves" effect.
    events.subscribe('router:navigation:complete', () => Waves.displayEffect());
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
