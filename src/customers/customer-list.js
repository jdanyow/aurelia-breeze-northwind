import {ListViewModel} from '../list-view-model';
import {inject, singleton} from 'aurelia-dependency-injection';
import {AppRouter} from 'aurelia-router';
import {CustomerService} from './customer-service';

@inject(AppRouter, CustomerService)
@singleton()
export class CustomerList extends ListViewModel {
  constructor(router, service) {
    super('customers', router, service)
  }
}
