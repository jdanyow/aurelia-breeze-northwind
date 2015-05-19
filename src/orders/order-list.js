import {ListViewModel} from '../list-view-model';
import {inject, singleton} from 'aurelia-dependency-injection';
import {AppRouter} from 'aurelia-router';
import {OrderService} from './order-service';

@inject(AppRouter, OrderService)
@singleton()
export class OrderList extends ListViewModel {
  constructor(router, service) {
    super('orders', router, service)
  }
}
