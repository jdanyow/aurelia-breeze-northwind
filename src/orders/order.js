import {EntityViewModel} from '../entity-view-model';
import {inject} from 'aurelia-dependency-injection';
import {OrderService} from './order-service';
import {Lookups} from '../lookups';

@inject(OrderService, Lookups)
export class Order extends EntityViewModel {
  customers;

  constructor(service, lookups) {
    super(service);
    this.customers = lookups.customers;
  }

  get title() {
    if (this.entity.OrderID <= 0) {
      return 'New Order';
    }
    return `Order #${this.entity.OrderID}`;
  }
}
