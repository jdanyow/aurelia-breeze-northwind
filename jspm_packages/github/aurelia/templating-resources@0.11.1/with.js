/* */ 
System.register(['aurelia-dependency-injection', 'aurelia-templating'], function (_export) {
  var inject, BoundViewFactory, ViewSlot, customAttribute, templateController, _classCallCheck, With;

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaTemplating) {
      BoundViewFactory = _aureliaTemplating.BoundViewFactory;
      ViewSlot = _aureliaTemplating.ViewSlot;
      customAttribute = _aureliaTemplating.customAttribute;
      templateController = _aureliaTemplating.templateController;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      With = (function () {
        function With(viewFactory, viewSlot) {
          _classCallCheck(this, _With);

          this.viewFactory = viewFactory;
          this.viewSlot = viewSlot;
        }

        var _With = With;

        _With.prototype.valueChanged = function valueChanged(newValue) {
          if (!this.view) {
            this.view = this.viewFactory.create(newValue);
            this.viewSlot.add(this.view);
          } else {
            this.view.bind(newValue);
          }
        };

        With = inject(BoundViewFactory, ViewSlot)(With) || With;
        With = templateController(With) || With;
        With = customAttribute('with')(With) || With;
        return With;
      })();

      _export('With', With);
    }
  };
});