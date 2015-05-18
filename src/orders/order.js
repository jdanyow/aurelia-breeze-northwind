import {inject} from 'aurelia-dependency-injection';
import {OrderService} from './order-service';

@inject(OrderService)
export class Order {
  service;
  entityManager;
  order;
  customers;
  products;
  isBusy = false;

  constructor(service) {
    this.service = service;
  }

  activate(info) {
    var orderPromise, customersPromise, productsPromise;

    // load or create the order entity.
    if (info.id === 'new') {
      orderPromise = this.service.createOrder();
    } else {
      orderPromise = this.service.getOrder(info.id);
    }

    orderPromise = orderPromise.then(result => {
      this.entityManager = result.entityManager;
      this.order = result.order;
    });

    // load the customers lookup - used to populate the customer drop-down
    customersPromise = this.service.getCustomerLookup()
      .then(customers => this.customers = customers);

    return Promise.all([orderPromise, customersPromise]);
  }

  get hasChanges() {
    return this.entityManager.hasChanges();
  }

  save() {
    // var id = this.order.OrderID;
    // this.isBusy = true;
    // this.entityManager.saveChanges()
    //   .then(saveResult => {
    //     this.isBusy = false;
    //     if (id !== this.order.OrderID) {
    //       // todo: update window.location.
    //     }
    //   });
    alert('The breeze controller does not expose a SaveChanges action.');
  }

  revert() {
    this.entityManager.rejectChanges();
  }
}
