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
    // permit navigating away from new entities.
    if (this.order.entityAspect.entityState.isAdded()) {
      Materialize.toast('Add-new cancelled.', 2000);
      return true;
    }

    // disallow navigating away from modified entities.
    if (this.hasChanges) {
      // throttle the amount of toast we pop.
      if (!this._lastPop || +new Date() - this._lastPop > 2000) {
        this._lastPop = +new Date();
        Materialize.toast('Navigation cancelled.  Save your changes!', 2000);
      }
      return false;
    }

    // permit navigating away from unmodified entities.
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
