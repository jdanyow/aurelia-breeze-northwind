/* */ 
System.register(['./decorator-applicator'], function (_export) {
  var DecoratorApplicator, Decorators;
  return {
    setters: [function (_decoratorApplicator) {
      DecoratorApplicator = _decoratorApplicator.DecoratorApplicator;
    }],
    execute: function () {
      'use strict';

      Decorators = {
        configure: {
          parameterizedDecorator: function parameterizedDecorator(name, decorator) {
            Decorators[name] = function () {
              var applicator = new DecoratorApplicator();
              return applicator[name].apply(applicator, arguments);
            };

            DecoratorApplicator.prototype[name] = function () {
              var result = decorator.apply(null, arguments);
              return this.decorator(result);
            };
          },
          simpleDecorator: function simpleDecorator(name, decorator) {
            Decorators[name] = function () {
              return new DecoratorApplicator().decorator(decorator);
            };

            DecoratorApplicator.prototype[name] = function () {
              return this.decorator(decorator);
            };
          }
        }
      };

      _export('Decorators', Decorators);
    }
  };
});