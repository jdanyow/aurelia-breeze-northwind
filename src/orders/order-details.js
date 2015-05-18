import {inject} from 'aurelia-dependency-injection';
import {OrderService} from './order-service';

@inject(OrderService)
export class OrderDetails {
  order;
  products;
  productsIndex = {};
  detail = null;

  constructor(service) {
    this.service = service;
  }

  activate(order) {
    this.order = order;

    this.detail = order.OrderDetails[0] || null;

    return this.service.getProducts()
      .then(products => {
        this.products = products;
        products.forEach(p => this.productsIndex[p.ProductID] = p.ProductName);
      });
  }

  addDetail() {
    this.detail = this.order.entityAspect.entityManager
      .createEntity('OrderDetail', { OrderID: this.order.OrderID });
    this.openDetail();
  }

  editDetail(detail) {
    this.detail = detail;
    this.openDetail();
  }

  removeDetail(detail) {
    detail.entityAspect.setDeleted();
  }

  openDetail() {
    $('#detail').openModal();
  }

  closeDetail() {
    $('#detail').closeModal();
  }

  calculateCost(detail) {
    return detail.Quantity * detail.UnitPrice * (1 - detail.Discount);
  }

  get totalCost() {
    return this.order.OrderDetails.map(this.calculateCost).reduce((a, b) => a + b, 0);
  }
}
