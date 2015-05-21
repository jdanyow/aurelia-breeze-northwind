import {inject} from 'aurelia-dependency-injection';
import {Lookups} from '../lookups';

@inject(Lookups)
export class OrderDetails {
  order;
  allProducts;
  products;
  productsIndex = {};
  detail = null;

  constructor(lookups) {
    this.products = this.allProducts = lookups.products;
    this.products.forEach(p => this.productsIndex[p.ProductID] = p);
  }

  activate(order) {
    this.order = order;
  }

  addDetail() {
    this.detail = this.order.entityAspect.entityManager
      .createEntity('OrderDetail', { OrderID: this.order.OrderID, Quantity: 1 });
    this.openDetail();
  }

  editDetail(detail) {
    this.detail = detail;
    this.openDetail();
  }

  removeDetail(detail) {
    detail.entityAspect.setDeleted();
  }

  detailPropertyChanged(args) {
    // autofill UnitPrice based on selected Product
    if (args.propertyName !== 'ProductID') {
      return;
    }
    var product = this.productsIndex[args.newValue];
    this.detail.UnitPrice = product ? product.UnitPrice : null;
  }

  openDetail() {
    // subscribe to Product change to autofill UnitPrice
    this._subscription = this.detail.entityAspect.propertyChanged.subscribe(args => this.detailPropertyChanged(args));

    // prevent selecting the same product twice.
    this.products = this.allProducts
      .filter(p => this.order.OrderDetails.filter(d => d.ProductID === p.ProductID && d !== this.detail).length === 0);

    // open the modal.
    $('#detail').openModal();
  }

  closeDetail() {
    this.detail.entityAspect.propertyChanged.unsubscribe(this._subscription);
    $('#detail').closeModal();
  }

  calculateDetailCost(detail) {
    return detail.Quantity * detail.UnitPrice * (1 - detail.Discount);
  }

  get detailTotal() {
    return this.order.OrderDetails.map(this.calculateDetailCost).reduce((a, b) => a + b, 0);
  }
}

/**
* Value converter for the "discount" field to allow users to enter discounts as whole numbers
* even though they are stored as decimals.
*/
export class DiscountValueConverter {
  toView(value) {
    return value === null ? null : Math.floor(value * 100);
  }

  fromView(value) {
    value = +value;

    if (isNaN(value) || value >= 100) {
      return 0;
    }

    return (value / 100).toFixed(2);
  }
}
