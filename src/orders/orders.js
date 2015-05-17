import {inject} from 'aurelia-dependency-injection';
import {AppRouter} from 'aurelia-router';
import {OrderService} from './order-service';
import settings from '../settings';

@inject(AppRouter, OrderService)
export class Orders {
  router;
  service;
  orders = [];
  pageSize = settings.pageSize;
  pageCount = 0;
  pageIndex = 0;
  isLoading = false;

  constructor(router, service) {
    this.router = router;
    this.service = service;
  }

  activate() {
    this.load();
  }

  load() {
    this.orders = [];
    this.isLoading = true;

    this.service.getPage(this.pageIndex)
      .then(result => {
        this.orders = result.orders;
        this.pageCount = result.pageCount;
        this.isLoading = false;
      });
  }

  setPage(index) {
    this.pageIndex = index;
    this.load();
  }

  openOrder(order) {
    this.router.navigate('orders/' + order.OrderID.toString(10));
  }

  addOrder() {
    this.router.navigate('orders/new');
  }
}
