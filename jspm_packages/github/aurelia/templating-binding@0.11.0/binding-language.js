/* */ 
System.register(['aurelia-templating', 'aurelia-binding', './syntax-interpreter', 'aurelia-logging'], function (_export) {
  var BindingLanguage, Parser, ObserverLocator, BindingExpression, NameExpression, bindingMode, SyntaxInterpreter, LogManager, _classCallCheck, _inherits, info, logger, TemplatingBindingLanguage, InterpolationBindingExpression, InterpolationBinding;

  return {
    setters: [function (_aureliaTemplating) {
      BindingLanguage = _aureliaTemplating.BindingLanguage;
    }, function (_aureliaBinding) {
      Parser = _aureliaBinding.Parser;
      ObserverLocator = _aureliaBinding.ObserverLocator;
      BindingExpression = _aureliaBinding.BindingExpression;
      NameExpression = _aureliaBinding.NameExpression;
      bindingMode = _aureliaBinding.bindingMode;
    }, function (_syntaxInterpreter) {
      SyntaxInterpreter = _syntaxInterpreter.SyntaxInterpreter;
    }, function (_aureliaLogging) {
      LogManager = _aureliaLogging;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

      info = {};
      logger = LogManager.getLogger('templating-binding');

      TemplatingBindingLanguage = (function (_BindingLanguage) {
        function TemplatingBindingLanguage(parser, observerLocator, syntaxInterpreter) {
          _classCallCheck(this, TemplatingBindingLanguage);

          _BindingLanguage.call(this);
          this.parser = parser;
          this.observerLocator = observerLocator;
          this.syntaxInterpreter = syntaxInterpreter;
          this.emptyStringExpression = this.parser.parse('\'\'');
          syntaxInterpreter.language = this;
          this.attributeMap = syntaxInterpreter.attributeMap = {
            'class': 'className',
            contenteditable: 'contentEditable',
            'for': 'htmlFor',
            tabindex: 'tabIndex',
            textcontent: 'textContent',
            innerhtml: 'innerHTML',
            maxlength: 'maxLength',
            minlength: 'minLength',
            formaction: 'formAction',
            formenctype: 'formEncType',
            formmethod: 'formMethod',
            formnovalidate: 'formNoValidate',
            formtarget: 'formTarget' };
        }

        _inherits(TemplatingBindingLanguage, _BindingLanguage);

        TemplatingBindingLanguage.inject = function inject() {
          return [Parser, ObserverLocator, SyntaxInterpreter];
        };

        TemplatingBindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, attrName, attrValue) {
          var parts = attrName.split('.');

          info.defaultBindingMode = null;

          if (parts.length == 2) {
            info.attrName = parts[0].trim();
            info.attrValue = attrValue;
            info.command = parts[1].trim();
            info.expression = null;
          } else if (attrName == 'ref') {
            info.attrName = attrName;
            info.attrValue = attrValue;
            info.command = null;
            info.expression = new NameExpression(attrValue, 'element');
          } else {
            info.attrName = attrName;
            info.attrValue = attrValue;
            info.command = null;
            info.expression = this.parseContent(resources, attrName, attrValue);
          }

          return info;
        };

        TemplatingBindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
          var instruction;

          if (info.expression) {
            if (info.attrName === 'ref') {
              return info.expression;
            }

            instruction = existingInstruction || { attrName: info.attrName, attributes: {} };
            instruction.attributes[info.attrName] = info.expression;
          } else if (info.command) {
            instruction = this.syntaxInterpreter.interpret(resources, element, info, existingInstruction);
          }

          return instruction;
        };

        TemplatingBindingLanguage.prototype.parseText = function parseText(resources, value) {
          return this.parseContent(resources, 'textContent', value);
        };

        TemplatingBindingLanguage.prototype.parseContent = function parseContent(resources, attrName, attrValue) {
          var i = attrValue.indexOf('${', 0),
              ii = attrValue.length,
              char,
              pos = 0,
              open = 0,
              quote = null,
              interpolationStart,
              parts,
              partIndex = 0;
          while (i >= 0 && i < ii - 2) {
            open = 1;
            interpolationStart = i;
            i += 2;

            do {
              char = attrValue[i];
              i++;
              switch (char) {
                case '\'':
                case '"':
                  if (quote === null) {
                    quote = char;
                  } else if (quote === char) {
                    quote = null;
                  }
                  continue;
                case '\\':
                  i++;
                  continue;
              }

              if (quote !== null) {
                continue;
              }

              if (char === '{') {
                open++;
              } else if (char === '}') {
                open--;
              }
            } while (open > 0 && i < ii);

            if (open === 0) {
              parts = parts || [];
              if (attrValue[interpolationStart - 1] === '\\' && attrValue[interpolationStart - 2] !== '\\') {
                parts[partIndex] = attrValue.substring(pos, interpolationStart - 1) + attrValue.substring(interpolationStart, i);
                partIndex++;
                parts[partIndex] = this.emptyStringExpression;
                partIndex++;
              } else {
                parts[partIndex] = attrValue.substring(pos, interpolationStart);
                partIndex++;
                parts[partIndex] = this.parser.parse(attrValue.substring(interpolationStart + 2, i - 1));
                partIndex++;
              }
              pos = i;
              i = attrValue.indexOf('${', i);
            } else {
              break;
            }
          }

          if (partIndex === 0) {
            return null;
          }

          parts[partIndex] = attrValue.substr(pos);

          return new InterpolationBindingExpression(this.observerLocator, this.attributeMap[attrName] || attrName, parts, bindingMode.oneWay, resources.valueConverterLookupFunction, attrName);
        };

        return TemplatingBindingLanguage;
      })(BindingLanguage);

      _export('TemplatingBindingLanguage', TemplatingBindingLanguage);

      InterpolationBindingExpression = (function () {
        function InterpolationBindingExpression(observerLocator, targetProperty, parts, mode, valueConverterLookupFunction, attribute) {
          _classCallCheck(this, InterpolationBindingExpression);

          this.observerLocator = observerLocator;
          this.targetProperty = targetProperty;
          this.parts = parts;
          this.mode = mode;
          this.valueConverterLookupFunction = valueConverterLookupFunction;
          this.attribute = attribute;
          this.discrete = false;
        }

        InterpolationBindingExpression.prototype.createBinding = function createBinding(target) {
          return new InterpolationBinding(this.observerLocator, this.parts, target, this.targetProperty, this.mode, this.valueConverterLookupFunction);
        };

        return InterpolationBindingExpression;
      })();

      _export('InterpolationBindingExpression', InterpolationBindingExpression);

      InterpolationBinding = (function () {
        function InterpolationBinding(observerLocator, parts, target, targetProperty, mode, valueConverterLookupFunction) {
          _classCallCheck(this, InterpolationBinding);

          if (targetProperty === 'style') {
            logger.info('Internet Explorer does not support interpolation in "style" attributes.  Use the style attribute\'s alias, "css" instead.');
          } else if (target.parentElement && target.parentElement.nodeName === 'TEXTAREA' && targetProperty === 'textContent') {
            throw new Error('Interpolation binding cannot be used in the content of a textarea element.  Use <textarea value.bind="expression"></textarea> instead.');
          }
          this.observerLocator = observerLocator;
          this.parts = parts;
          this.targetProperty = observerLocator.getObserver(target, targetProperty);
          this.mode = mode;
          this.valueConverterLookupFunction = valueConverterLookupFunction;
          this.toDispose = [];
        }

        InterpolationBinding.prototype.getObserver = function getObserver(obj, propertyName) {
          return this.observerLocator.getObserver(obj, propertyName);
        };

        InterpolationBinding.prototype.bind = function bind(source) {
          this.source = source;

          if (this.mode == bindingMode.oneWay) {
            this.unbind();
            this.connect();
            this.setValue();
          } else {
            this.setValue();
          }
        };

        InterpolationBinding.prototype.setValue = function setValue() {
          var value = this.interpolate();
          this.targetProperty.setValue(value);
        };

        InterpolationBinding.prototype.partChanged = function partChanged(newValue, oldValue, connecting) {
          var _this = this;

          var map, info;
          if (!connecting) {
            this.setValue();
          }
          if (oldValue instanceof Array) {
            map = this.arrayPartMap;
            info = map ? map.get(oldValue) : null;
            if (info) {
              info.refs--;
              if (info.refs === 0) {
                info.dispose();
                map['delete'](oldValue);
              }
            }
          }
          if (newValue instanceof Array) {
            map = this.arrayPartMap || (this.arrayPartMap = new Map());
            info = map.get(newValue);
            if (!info) {
              info = {
                refs: 0,
                dispose: this.observerLocator.getArrayObserver(newValue).subscribe(function () {
                  return _this.setValue();
                })
              };
              map.set(newValue, info);
            }
            info.refs++;
          }
        };

        InterpolationBinding.prototype.connect = function connect() {
          var info,
              parts = this.parts,
              source = this.source,
              toDispose = this.toDispose = [],
              partChanged = this.partChanged.bind(this),
              i,
              ii;

          for (i = 0, ii = parts.length; i < ii; ++i) {
            if (i % 2 === 0) {} else {
              info = parts[i].connect(this, source);
              if (info.observer) {
                toDispose.push(info.observer.subscribe(partChanged));
              }
              if (info.value instanceof Array) {
                partChanged(info.value, undefined, true);
              }
            }
          }
        };

        InterpolationBinding.prototype.interpolate = function interpolate() {
          var value = '',
              parts = this.parts,
              source = this.source,
              valueConverterLookupFunction = this.valueConverterLookupFunction,
              i,
              ii,
              temp;

          for (i = 0, ii = parts.length; i < ii; ++i) {
            if (i % 2 === 0) {
              value += parts[i];
            } else {
              temp = parts[i].evaluate(source, valueConverterLookupFunction);
              value += typeof temp !== 'undefined' && temp !== null ? temp.toString() : '';
            }
          }

          return value;
        };

        InterpolationBinding.prototype.unbind = function unbind() {
          var i,
              ii,
              toDispose = this.toDispose,
              map = this.arrayPartMap;

          if (toDispose) {
            for (i = 0, ii = toDispose.length; i < ii; ++i) {
              toDispose[i]();
            }
          }

          this.toDispose = null;

          if (map) {
            for (var _iterator = map.values(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              if (_isArray) {
                if (_i >= _iterator.length) break;
                toDispose = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                toDispose = _i.value;
              }

              toDispose.dispose();
            }
            map.clear();
          }

          this.arrayPartMap = null;
        };

        return InterpolationBinding;
      })();
    }
  };
});