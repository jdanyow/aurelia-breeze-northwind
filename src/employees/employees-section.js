/**
* The shell for the employees section of the application.  Will contain either
* the employee-list or employee page.
*/
export class EmployeesSection {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './employee-list', nav: false, title: '' },
      { route: ':id', moduleId: './employee',      nav: false, title: '' },
    ]);
  }
}
