/* */ 
System.register(['aurelia-dependency-injection', 'aurelia-task-queue', 'aurelia-templating'], function (_export) {
  var Container, inject, TaskQueue, CompositionEngine, ViewSlot, ViewResources, customElement, bindable, noView, _classCallCheck, Compose;

  function createInstruction(composer, instruction) {
    return Object.assign(instruction, {
      executionContext: composer.executionContext,
      container: composer.container,
      viewSlot: composer.viewSlot,
      viewResources: composer.viewResources,
      currentBehavior: composer.currentBehavior
    });
  }

  function processInstruction(composer, instruction) {
    composer.currentInstruction = null;
    composer.compositionEngine.compose(instruction).then(function (next) {
      composer.currentBehavior = next;
      composer.currentViewModel = next ? next.executionContext : null;
    });
  }
  return {
    setters: [function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaTaskQueue) {
      TaskQueue = _aureliaTaskQueue.TaskQueue;
    }, function (_aureliaTemplating) {
      CompositionEngine = _aureliaTemplating.CompositionEngine;
      ViewSlot = _aureliaTemplating.ViewSlot;
      ViewResources = _aureliaTemplating.ViewResources;
      customElement = _aureliaTemplating.customElement;
      bindable = _aureliaTemplating.bindable;
      noView = _aureliaTemplating.noView;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      Compose = (function () {
        function Compose(container, compositionEngine, viewSlot, viewResources, taskQueue) {
          _classCallCheck(this, _Compose);

          this.container = container;
          this.compositionEngine = compositionEngine;
          this.viewSlot = viewSlot;
          this.viewResources = viewResources;
          this.taskQueue = taskQueue;
        }

        var _Compose = Compose;

        _Compose.prototype.bind = function bind(executionContext) {
          this.executionContext = executionContext;
          processInstruction(this, createInstruction(this, {
            view: this.view,
            viewModel: this.viewModel,
            model: this.model
          }));
        };

        _Compose.prototype.modelChanged = function modelChanged(newValue, oldValue) {
          var _this = this;

          if (this.currentInstruction) {
            this.currentInstruction.model = newValue;
            return;
          }

          this.taskQueue.queueMicroTask(function () {
            if (_this.currentInstruction) {
              _this.currentInstruction.model = newValue;
              return;
            }

            var vm = _this.currentViewModel;

            if (vm && typeof vm.activate === 'function') {
              vm.activate(newValue);
            }
          });
        };

        _Compose.prototype.viewChanged = function viewChanged(newValue, oldValue) {
          var _this2 = this;

          var instruction = createInstruction(this, {
            view: newValue,
            viewModel: this.currentViewModel || this.viewModel,
            model: this.model
          });

          if (this.currentInstruction) {
            this.currentInstruction = instruction;
            return;
          }

          this.currentInstruction = instruction;
          this.taskQueue.queueMicroTask(function () {
            return processInstruction(_this2, _this2.currentInstruction);
          });
        };

        _Compose.prototype.viewModelChanged = function viewModelChanged(newValue, oldValue) {
          var _this3 = this;

          var instruction = createInstruction(this, {
            viewModel: newValue,
            view: this.view,
            model: this.model
          });

          if (this.currentInstruction) {
            this.currentInstruction = instruction;
            return;
          }

          this.currentInstruction = instruction;
          this.taskQueue.queueMicroTask(function () {
            return processInstruction(_this3, _this3.currentInstruction);
          });
        };

        Compose = inject(Container, CompositionEngine, ViewSlot, ViewResources, TaskQueue)(Compose) || Compose;
        Compose = noView(Compose) || Compose;
        Compose = bindable('viewModel')(Compose) || Compose;
        Compose = bindable('view')(Compose) || Compose;
        Compose = bindable('model')(Compose) || Compose;
        Compose = customElement('compose')(Compose) || Compose;
        return Compose;
      })();

      _export('Compose', Compose);
    }
  };
});