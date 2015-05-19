import {EntityViewModel} from '../entity-view-model';
import {inject} from 'aurelia-dependency-injection';
import {EmployeeService} from './employee-service';
import {Lookups} from '../lookups';

@inject(EmployeeService, Lookups)
export class Employee extends EntityViewModel {
  constructor(service, lookups) {
    super(service);
  }
}
