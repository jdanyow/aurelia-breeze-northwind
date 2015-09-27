import {inject} from 'aurelia-dependency-injection';
import {Lookups} from './lookups';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Lookups, EventAggregator)
export class App {
  constructor(lookups, events) {
    this.lookups = lookups;

    // subscribe to the router's navigation complete event.
    events.subscribe('router:navigation:complete', this.navigationComplete);
  }

  configureRouter(config, router) {
    config.title = 'Northwind';
    config.map([
      { route: '', redirect: 'orders' },
      { route: 'orders',    moduleId: './orders/orders-section',       nav: true, title: 'Orders' },
      { route: 'customers', moduleId: './customers/customers-section', nav: true, title: 'Customers' },
      { route: 'employees', moduleId: './employees/employees-section', nav: true, title: 'Employees' },
      { route: 'about',     moduleId: './about',                       nav: true, title: 'About' },
    ]);
    this.router = router;
  }

  activate() {
    return this.lookups.load();
  }

  navigationComplete(navigationInstruction) {
    // Enable the materialize "waves" effect on the new page.
    Waves.displayEffect()

    // Track page-views with google-analytics.
    ga('send', 'pageview', '/' + navigationInstruction.fragment);
  }
}
