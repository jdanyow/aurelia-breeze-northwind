import {EntityViewModel} from '../entity-view-model';
import {inject} from 'aurelia-dependency-injection';
import {CustomerService} from './customer-service';
import {Lookups} from '../lookups';

@inject(CustomerService, Lookups)
export class Customer extends EntityViewModel {
  constructor(service, lookups) {
    super(service);
  }

  get title() {
    return this.entity.CompanyName || 'Customer';
  }
}
