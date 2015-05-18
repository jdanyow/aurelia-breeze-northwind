import {inject} from 'aurelia-dependency-injection';
import {OrderService} from './order-service';

@inject(OrderService)
export class Order {
  service;
  entityManager;
  order;
  customers;
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

    // load the products lookup - used to populate display the order details
    productsPromise = this.service.getProductsIndex()
      .then(products => this.products = products);

    return Promise.all([orderPromise, customersPromise, productsPromise]);
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

  openDetail(detail) {

  }

  calculateCost(detail) {
    return detail.Quantity * detail.UnitPrice * (1 - detail.Discount);
  }

  get total() {
    return this.order.OrderDetails.map(this.calculateCost).reduce((a, b) => a + b, 0);
  }
}
