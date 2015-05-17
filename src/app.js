export class App {
  configureRouter(config, router) {
    config.title = 'Northwind';
    config.map([
      { route: ['', 'orders'], moduleId: './orders',    nav: true, title: 'Orders' },
      { route: 'customers',    moduleId: './customers', nav: true, title: 'Customers' },
      { route: 'employees',    moduleId: './employees', nav: true, title: 'Employees' },
    ]);
    this.router = router;
  }

  attached() {
    // http://materializecss.com/navbar.html
    $('.button-collapse').sideNav();
  }
}
