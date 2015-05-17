export class App {
  configureRouter(config, router) {
    config.title = 'Northwind';
    config.map([
      { route: ['', 'orders'], moduleId: './orders/orders',    nav: true,  title: 'Orders' },
      { route: 'orders/:id',   moduleId: './orders/order',     nav: false, title: 'Order' },
      { route: 'customers',    moduleId: './customers', nav: true,  title: 'Customers' },
      { route: 'employees',    moduleId: './employees', nav: true,  title: 'Employees' },
    ]);
    this.router = router;
  }

  attached() {
    // http://materializecss.com/navbar.html
    $('.button-collapse').sideNav();
  }
}
