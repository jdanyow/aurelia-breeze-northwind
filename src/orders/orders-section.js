export class OrdersSection {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './orders-list', nav: false, title: '' },
      { route: ':id', moduleId: './order',       nav: false, title: '' },
    ]);
  }
}
