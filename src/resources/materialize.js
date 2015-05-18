import {inject, customAttribute} from 'aurelia-framework';

function createEvent(name) {
  var event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return event;
}

function fireEvent(element, name) {
  var event = createEvent(name);
  element.dispatchEvent(event);
}

@customAttribute('materialize')
@inject(Element)
export class Materialize {
  constructor(element) {
    this.element = element;
  }

  attached() {
    // handle the details of configuring the materialize javascript components...
    switch(this.value) {
      case 'datepicker':
        $(this.element).pickadate({
          format: 'm/d/yyyy',
          selectMonths: true,
          selectYears: 15,
          onSet: () => fireEvent(this.element, 'change') // fire a change event so the binding system knows the element value was changed
        });
        break;

      case 'select':
        setTimeout(() => $(this.element).material_select(), 10);
        break;

      case 'sidenav':
        $(this.element).sideNav();
        break;

      default:
        throw new Error(`Unrecognized materialize attribute value: '${this.value}'`);
    }
  }

  detached() {
    // todo: destroy
  }
}
