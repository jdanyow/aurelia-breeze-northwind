/* */ 
System.register(['aurelia-templating', './binding-language', './syntax-interpreter'], function (_export) {
  var BindingLanguage, TemplatingBindingLanguage, SyntaxInterpreter;

  function configure(aurelia) {
    var instance,
        getInstance = function getInstance(c) {
      return instance || (instance = c.invoke(TemplatingBindingLanguage));
    };

    if (aurelia.container.hasHandler(TemplatingBindingLanguage)) {
      instance = aurelia.container.get(TemplatingBindingLanguage);
    } else {
      aurelia.container.registerHandler(TemplatingBindingLanguage, getInstance);
    }

    aurelia.container.registerHandler(BindingLanguage, getInstance);
  }

  return {
    setters: [function (_aureliaTemplating) {
      BindingLanguage = _aureliaTemplating.BindingLanguage;
    }, function (_bindingLanguage) {
      TemplatingBindingLanguage = _bindingLanguage.TemplatingBindingLanguage;
    }, function (_syntaxInterpreter) {
      SyntaxInterpreter = _syntaxInterpreter.SyntaxInterpreter;
    }],
    execute: function () {
      'use strict';

      _export('TemplatingBindingLanguage', TemplatingBindingLanguage);

      _export('SyntaxInterpreter', SyntaxInterpreter);

      _export('configure', configure);
    }
  };
});