import {inject, customAttribute} from 'aurelia-framework';
import {TaskQueue} from 'aurelia-task-queue';

function createEvent(name) {
  var event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return event;
}

function fireEvent(element, name) {
  var event = createEvent(name);
  element.dispatchEvent(event);
}

/**
* Custom html attribute that turns on javascript based materialize-css compoenents.
* Also smooths out some issues with materialize and data-binding.
*/
@customAttribute('materialize')
@inject(Element, TaskQueue)
export class Materialize {
  constructor(element, taskQueue) {
    this.element = element;
    this.taskQueue = taskQueue;
  }

  bind() {
    if (!this.value) {
      this.value = this.element.nodeName.toLowerCase();
    }

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
        setTimeout(() => $(this.element).sideNav(), 10);
        break;

      case 'label':
        this.taskQueue.queueMicroTask({ call: () => this.fixLabelOverlap() });
        break;

      default:
        throw new Error(`Unrecognized materialize attribute value: '${this.value}'`);
    }
  }

  detached() {
    // todo: destroy
  }

  fixLabelOverlap() {
    var $el = $(this.element);
    if ($el.prevUntil(null, ':input').val().length) {
      $el.addClass('active');
    }
  }
}
