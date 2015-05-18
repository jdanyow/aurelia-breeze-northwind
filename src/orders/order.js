import {inject} from 'aurelia-dependency-injection';
import {OrderService} from './order-service';
import {Lookups} from '../lookups';

@inject(OrderService, Lookups)
export class Order {
  service;
  entityManager;
  order;
  customers;
  products;

  constructor(service, lookups) {
    this.service = service;
    this.customers = lookups.customers;
  }

  activate(info) {
    var promise;

    // load or create the order entity.
    if (info.id === 'new') {
      promise = this.service.createOrder();
    } else {
      promise = this.service.getOrder(info.id);
    }

    return promise.then(result => {
      this.entityManager = result.entityManager;
      this.order = result.order;
    });
  }

  canDeactivate() {
    if (this.hasChanges) {
      // use a timeout to throttle the amount of toast we pop.
      clearTimeout(this._toastTimeout);
      this._toastTimeout = setTimeout(() => Materialize.toast('Navigation cancelled.  Save your changes!', 2000), 50);

      // cancel navigation.
      return false;
    }

    // permit navigation.
    return true;
  }

  get hasChanges() {
    return this.entityManager.hasChanges();
  }

  save() {
    // fake save...
    this.entityManager.acceptChanges();
    Materialize.toast('Changes saved.', 2000)
  }

  revert() {
    this.entityManager.rejectChanges();
    Materialize.toast('Changes reverted.', 2000)

    // workaround Materialize datepicker binding timezone issue.
    if (this.hasChanges) {
      this.entityManager.rejectChanges();
    }
  }
}
