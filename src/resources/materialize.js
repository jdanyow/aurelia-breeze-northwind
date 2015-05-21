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
        setTimeout(() => this.bindSelect(), 10);
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
    clearInterval(this._interval);
    if (this.domObserver) {
      this.domObserver.disconnect();
      this.domObserver = null;
    }
  }

  fixLabelOverlap() {
    var $el = $(this.element);
    if ($el.prevUntil(null, ':input').val().length) {
      $el.addClass('active');
    }
  }

  bindSelect() {
    // Some hacky code to make the materialize select work with data-binding for the demo.
    // A better approach would be to create a custom element that uses the same styling
    // but is a complete re-write of this control.
    var input, getSelectedOption, selectedOption, lastSelectValue;

    // "materialize" the select and find the resulting input that replaces the select element.
    $(this.element).material_select();
    input = $(this.element).prevUntil(null, ':input')[0];

    // get the select element's selected option element.
    getSelectedOption = () => {
      var i, options, option, optionValue;
      options = this.element.options;
      i = options.length;
      while(i--) {
        option = options.item(i);
        if (option.selected) {
          return option;
        }
      }
      throw new Error('should have found a selected option');
    };

    // sync the input with the select element.
    selectedOption = getSelectedOption();
    input.value = selectedOption.text;

    // squirrel away the select element's value for dirty-checking purposes.
    lastSelectValue = this.element.value;

    // dirrrrrty checking.
    this._interval = setInterval(() => {
        if (lastSelectValue !== this.element.value) {
          selectedOption = getSelectedOption();
          if (input.value === selectedOption.text) {
            // materialize changed the select's value.  notify the binding system.
            fireEvent(this.element, 'change');
          } else {
            // the binding system updated the select's value.  synchronize the materialize input.
            input.value = selectedOption.text;
          }
          lastSelectValue = this.element.value;
        }
      },
      120);

    // handle option changes
    this.domObserver = new MutationObserver(() => {
      this.detached();
      $(this.element).material_select('destroy');
      this.bindSelect();
    });
    this.domObserver.observe(this.element, { childList: true, subtree: true });
  }
}
