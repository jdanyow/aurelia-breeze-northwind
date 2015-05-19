import {bindable} from 'aurelia-framework';

export class Pager {
  @bindable pageIndex;
  @bindable pageCount;
  @bindable setPage;
}
