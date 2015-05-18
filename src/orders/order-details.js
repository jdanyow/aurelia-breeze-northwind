import {inject} from 'aurelia-dependency-injection';
import {Lookups} from '../lookups';

@inject(Lookups)
export class OrderDetails {
  order;
  products;
  productsIndex = {};
  detail = null;

  constructor(lookups) {
    this.products = lookups.products;
    this.products.forEach(p => this.productsIndex[p.ProductID] = p.ProductName);
  }

  activate(order) {
    this.order = order;
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
