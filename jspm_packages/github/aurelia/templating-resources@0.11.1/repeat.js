/* */ 
System.register(['aurelia-dependency-injection', 'aurelia-binding', 'aurelia-templating'], function (_export) {
  var inject, ObserverLocator, calcSplices, getChangeRecords, BoundViewFactory, ViewSlot, customAttribute, bindable, templateController, _classCallCheck, Repeat;

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaBinding) {
      ObserverLocator = _aureliaBinding.ObserverLocator;
      calcSplices = _aureliaBinding.calcSplices;
      getChangeRecords = _aureliaBinding.getChangeRecords;
    }, function (_aureliaTemplating) {
      BoundViewFactory = _aureliaTemplating.BoundViewFactory;
      ViewSlot = _aureliaTemplating.ViewSlot;
      customAttribute = _aureliaTemplating.customAttribute;
      bindable = _aureliaTemplating.bindable;
      templateController = _aureliaTemplating.templateController;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      Repeat = (function () {
        function Repeat(viewFactory, viewSlot, observerLocator) {
          _classCallCheck(this, _Repeat);

          this.viewFactory = viewFactory;
          this.viewSlot = viewSlot;
          this.observerLocator = observerLocator;
          this.local = 'item';
          this.key = 'key';
          this.value = 'value';
        }

        var _Repeat = Repeat;

        _Repeat.prototype.bind = function bind(executionContext) {
          var _this = this;

          var items = this.items,
              observer;

          this.executionContext = executionContext;

          if (!items) {
            if (this.oldItems) {
              this.viewSlot.removeAll();
            }

            return;
          }

          if (this.oldItems === items) {
            if (items instanceof Map) {
              var records = getChangeRecords(items);
              observer = this.observerLocator.getMapObserver(items);

              this.handleMapChangeRecords(items, records);

              this.disposeSubscription = observer.subscribe(function (records) {
                _this.handleMapChangeRecords(items, records);
              });
            } else {
              var splices = calcSplices(items, 0, items.length, this.lastBoundItems, 0, this.lastBoundItems.length);
              observer = this.observerLocator.getArrayObserver(items);

              this.handleSplices(items, splices);
              this.lastBoundItems = this.oldItems = null;

              this.disposeSubscription = observer.subscribe(function (splices) {
                _this.handleSplices(items, splices);
              });
            }
          } else {
            this.processItems();
          }
        };

        _Repeat.prototype.unbind = function unbind() {
          this.oldItems = this.items;

          if (this.items instanceof Array) {
            this.lastBoundItems = this.items.slice(0);
          }

          if (this.disposeSubscription) {
            this.disposeSubscription();
            this.disposeSubscription = null;
          }
        };

        _Repeat.prototype.itemsChanged = function itemsChanged() {
          this.processItems();
        };

        _Repeat.prototype.processItems = function processItems() {
          var items = this.items,
              viewSlot = this.viewSlot;

          if (this.disposeSubscription) {
            this.disposeSubscription();
            viewSlot.removeAll();
          }

          if (!items) {
            return;
          }

          if (items instanceof Array) {
            this.processArrayItems(items);
          } else if (items instanceof Map) {
            this.processMapEntries(items);
          } else if (typeof items === 'number') {
            this.processNumber(items);
          } else {
            throw new Error('Object in "repeat" must be of type Array, Map or Number');
          }
        };

        _Repeat.prototype.processArrayItems = function processArrayItems(items) {
          var _this2 = this;

          var viewFactory = this.viewFactory,
              viewSlot = this.viewSlot,
              i,
              ii,
              row,
              view,
              observer;

          observer = this.observerLocator.getArrayObserver(items);

          for (i = 0, ii = items.length; i < ii; ++i) {
            row = this.createFullExecutionContext(items[i], i, ii);
            view = viewFactory.create(row);
            viewSlot.add(view);
          }

          this.disposeSubscription = observer.subscribe(function (splices) {
            _this2.handleSplices(items, splices);
          });
        };

        _Repeat.prototype.processMapEntries = function processMapEntries(items) {
          var _this3 = this;

          var viewFactory = this.viewFactory,
              viewSlot = this.viewSlot,
              index = 0,
              row,
              view,
              observer;

          observer = this.observerLocator.getMapObserver(items);

          items.forEach(function (value, key) {
            row = _this3.createFullExecutionKvpContext(key, value, index, items.size);
            view = viewFactory.create(row);
            viewSlot.add(view);
            ++index;
          });

          this.disposeSubscription = observer.subscribe(function (record) {
            _this3.handleMapChangeRecords(items, record);
          });
        };

        _Repeat.prototype.processNumber = function processNumber(value) {
          var viewFactory = this.viewFactory,
              viewSlot = this.viewSlot,
              i,
              ii,
              row,
              view;

          for (i = 0, ii = Math.floor(value); i < ii; ++i) {
            row = this.createFullExecutionContext(i, i, ii);
            view = viewFactory.create(row);
            viewSlot.add(view);
          }
        };

        _Repeat.prototype.createBaseExecutionContext = function createBaseExecutionContext(data) {
          var context = {};
          context[this.local] = data;
          context.$parent = this.executionContext;
          return context;
        };

        _Repeat.prototype.createBaseExecutionKvpContext = function createBaseExecutionKvpContext(key, value) {
          var context = {};
          context[this.key] = key;
          context[this.value] = value;
          context.$parent = this.executionContext;
          return context;
        };

        _Repeat.prototype.createFullExecutionContext = function createFullExecutionContext(data, index, length) {
          var context = this.createBaseExecutionContext(data);
          return this.updateExecutionContext(context, index, length);
        };

        _Repeat.prototype.createFullExecutionKvpContext = function createFullExecutionKvpContext(key, value, index, length) {
          var context = this.createBaseExecutionKvpContext(key, value);
          return this.updateExecutionContext(context, index, length);
        };

        _Repeat.prototype.updateExecutionContext = function updateExecutionContext(context, index, length) {
          var first = index === 0,
              last = index === length - 1,
              even = index % 2 === 0;

          context.$index = index;
          context.$first = first;
          context.$last = last;
          context.$middle = !(first || last);
          context.$odd = !even;
          context.$even = even;

          return context;
        };

        _Repeat.prototype.handleSplices = function handleSplices(array, splices) {
          var viewLookup = new Map(),
              viewSlot = this.viewSlot,
              spliceIndexLow,
              view,
              i,
              ii,
              j,
              jj,
              row,
              splice,
              addIndex,
              end,
              itemsLeftToAdd,
              removed,
              model,
              children,
              length;

          for (i = 0, ii = splices.length; i < ii; ++i) {
            splice = splices[i];
            addIndex = splice.index;
            itemsLeftToAdd = splice.addedCount;
            end = splice.index + splice.addedCount;
            removed = splice.removed;
            if (typeof spliceIndexLow === 'undefined' || spliceIndexLow === null || spliceIndexLow > splice.index) {
              spliceIndexLow = splice.index;
            }

            for (j = 0, jj = removed.length; j < jj; ++j) {
              if (itemsLeftToAdd > 0) {
                view = viewSlot.children[splice.index + j];
                view.executionContext[this.local] = array[addIndex + j];
                --itemsLeftToAdd;
              } else {
                view = viewSlot.removeAt(addIndex + splice.addedCount);
                if (view) {
                  viewLookup.set(removed[j], view);
                }
              }
            }

            addIndex += removed.length;

            for (; 0 < itemsLeftToAdd; ++addIndex) {
              model = array[addIndex];
              view = viewLookup.get(model);
              if (view) {
                viewLookup['delete'](model);
                viewSlot.insert(addIndex, view);
              } else {
                row = this.createBaseExecutionContext(model);
                view = this.viewFactory.create(row);
                viewSlot.insert(addIndex, view);
              }
              --itemsLeftToAdd;
            }
          }

          children = this.viewSlot.children;
          length = children.length;

          if (spliceIndexLow > 0) {
            spliceIndexLow = spliceIndexLow - 1;
          }

          for (; spliceIndexLow < length; ++spliceIndexLow) {
            this.updateExecutionContext(children[spliceIndexLow].executionContext, spliceIndexLow, length);
          }

          viewLookup.forEach(function (x) {
            return x.unbind();
          });
        };

        _Repeat.prototype.handleMapChangeRecords = function handleMapChangeRecords(map, records) {
          var viewSlot = this.viewSlot,
              key,
              i,
              ii,
              view,
              children,
              length,
              row,
              removeIndex,
              record;

          for (i = 0, ii = records.length; i < ii; ++i) {
            record = records[i];
            key = record.key;
            switch (record.type) {
              case 'update':
                removeIndex = this.getViewIndexByKey(key);
                viewSlot.removeAt(removeIndex);
                row = this.createBaseExecutionKvpContext(key, map.get(key));
                view = this.viewFactory.create(row);
                viewSlot.insert(removeIndex, view);
                break;
              case 'add':
                row = this.createBaseExecutionKvpContext(key, map.get(key));
                view = this.viewFactory.create(row);
                viewSlot.insert(map.size, view);
                break;
              case 'delete':
                if (!record.oldValue) {
                  return;
                }
                removeIndex = this.getViewIndexByKey(key);
                viewSlot.removeAt(removeIndex);
                break;
              case 'clear':
                viewSlot.removeAll();
            }
          }

          children = viewSlot.children;
          length = children.length;

          for (i = 0; i < length; i++) {
            this.updateExecutionContext(children[i].executionContext, i, length);
          }
        };

        _Repeat.prototype.getViewIndexByKey = function getViewIndexByKey(key) {
          var viewSlot = this.viewSlot,
              i,
              ii,
              child;

          for (i = 0, ii = viewSlot.children.length; i < ii; ++i) {
            child = viewSlot.children[i];
            if (child.bindings[0].source[this.key] === key) {
              return i;
            }
          }
        };

        Repeat = inject(BoundViewFactory, ViewSlot, ObserverLocator)(Repeat) || Repeat;
        Repeat = templateController(Repeat) || Repeat;
        Repeat = bindable('value')(Repeat) || Repeat;
        Repeat = bindable('key')(Repeat) || Repeat;
        Repeat = bindable('local')(Repeat) || Repeat;
        Repeat = bindable('items')(Repeat) || Repeat;
        Repeat = customAttribute('repeat')(Repeat) || Repeat;
        return Repeat;
      })();

      _export('Repeat', Repeat);
    }
  };
});