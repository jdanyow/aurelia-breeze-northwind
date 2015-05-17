/* */ 
System.register(['core-js', './state', './segments'], function (_export) {
  var core, State, StaticSegment, DynamicSegment, StarSegment, EpsilonSegment, _classCallCheck, RouteRecognizer, RecognizeResults;

  function parse(route, names, types) {
    if (route.charAt(0) === '/') {
      route = route.substr(1);
    }

    var results = [];

    for (var _iterator3 = route.split('/'), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var segment = _ref3;

      var match = undefined;

      if (match = segment.match(/^:([^\/]+)$/)) {
        results.push(new DynamicSegment(match[1]));
        names.push(match[1]);
        types.dynamics++;
      } else if (match = segment.match(/^\*([^\/]+)$/)) {
        results.push(new StarSegment(match[1]));
        names.push(match[1]);
        types.stars++;
      } else if (segment === '') {
        results.push(new EpsilonSegment());
      } else {
        results.push(new StaticSegment(segment));
        types.statics++;
      }
    }

    return results;
  }

  function sortSolutions(states) {
    return states.sort(function (a, b) {
      if (a.types.stars !== b.types.stars) {
        return a.types.stars - b.types.stars;
      }

      if (a.types.stars) {
        if (a.types.statics !== b.types.statics) {
          return b.types.statics - a.types.statics;
        }
        if (a.types.dynamics !== b.types.dynamics) {
          return b.types.dynamics - a.types.dynamics;
        }
      }

      if (a.types.dynamics !== b.types.dynamics) {
        return a.types.dynamics - b.types.dynamics;
      }

      if (a.types.statics !== b.types.statics) {
        return b.types.statics - a.types.statics;
      }

      return 0;
    });
  }

  function recognizeChar(states, ch) {
    var nextStates = [];

    for (var i = 0, l = states.length; i < l; i++) {
      var state = states[i];

      nextStates = nextStates.concat(state.match(ch));
    }

    return nextStates;
  }

  function findHandler(state, path, queryParams) {
    var handlers = state.handlers,
        regex = state.regex;
    var captures = path.match(regex),
        currentCapture = 1;
    var result = new RecognizeResults(queryParams);

    for (var i = 0, l = handlers.length; i < l; i++) {
      var handler = handlers[i],
          names = handler.names,
          params = {};

      for (var j = 0, m = names.length; j < m; j++) {
        params[names[j]] = captures[currentCapture++];
      }

      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
    }

    return result;
  }

  function addSegment(currentState, segment) {
    segment.eachChar(function (ch) {
      currentState = currentState.put(ch);
    });

    return currentState;
  }
  return {
    setters: [function (_coreJs) {
      core = _coreJs['default'];
    }, function (_state) {
      State = _state.State;
    }, function (_segments) {
      StaticSegment = _segments.StaticSegment;
      DynamicSegment = _segments.DynamicSegment;
      StarSegment = _segments.StarSegment;
      EpsilonSegment = _segments.EpsilonSegment;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      RouteRecognizer = (function () {
        function RouteRecognizer() {
          _classCallCheck(this, RouteRecognizer);

          this.rootState = new State();
          this.names = {};
        }

        RouteRecognizer.prototype.add = function add(route) {
          if (Array.isArray(route)) {
            for (var _iterator = route, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var r = _ref;

              this.add(r);
            }

            return;
          }

          var currentState = this.rootState,
              regex = '^',
              types = { statics: 0, dynamics: 0, stars: 0 },
              names = [],
              routeName = route.handler.name,
              isEmpty = true;

          var segments = parse(route.path, names, types);
          for (var _iterator2 = segments, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var segment = _ref2;

            if (segment instanceof EpsilonSegment) {
              continue;
            }

            isEmpty = false;

            currentState = currentState.put({ validChars: '/' });
            regex += '/';

            currentState = addSegment(currentState, segment);
            regex += segment.regex();
          }

          if (isEmpty) {
            currentState = currentState.put({ validChars: '/' });
            regex += '/';
          }

          var handlers = [{ handler: route.handler, names: names }];

          if (routeName) {
            this.names[routeName] = {
              segments: segments,
              handlers: handlers
            };
          }

          currentState.handlers = handlers;
          currentState.regex = new RegExp(regex + '$');
          currentState.types = types;

          return currentState;
        };

        RouteRecognizer.prototype.handlersFor = function handlersFor(name) {
          var route = this.names[name],
              result = [];

          if (!route) {
            throw new Error('There is no route named ' + name);
          }

          for (var i = 0, l = route.handlers.length; i < l; i++) {
            result.push(route.handlers[i]);
          }

          return result;
        };

        RouteRecognizer.prototype.hasRoute = function hasRoute(name) {
          return !!this.names[name];
        };

        RouteRecognizer.prototype.generate = function generate(name, params) {
          params = Object.assign({}, params);

          var route = this.names[name],
              consumed = {},
              output = '';

          if (!route) {
            throw new Error('There is no route named ' + name);
          }

          var segments = route.segments;

          for (var i = 0, l = segments.length; i < l; i++) {
            var segment = segments[i];

            if (segment instanceof EpsilonSegment) {
              continue;
            }

            output += '/';
            var segmentValue = segment.generate(params, consumed);
            if (segmentValue === null || segmentValue === undefined) {
              throw new Error('A value is required for route parameter \'' + segment.name + '\' in route \'' + name + '\'.');
            }

            output += segmentValue;
          }

          if (output.charAt(0) !== '/') {
            output = '/' + output;
          }

          for (var param in consumed) {
            delete params[param];
          }

          output += this.generateQueryString(params);

          return output;
        };

        RouteRecognizer.prototype.generateQueryString = function generateQueryString(params) {
          var pairs = [],
              keys = [],
              encode = encodeURIComponent;

          for (var key in params) {
            if (params.hasOwnProperty(key)) {
              keys.push(key);
            }
          }

          keys.sort();
          for (var i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            var value = params[key];
            if (value === null || value === undefined) {
              continue;
            }

            if (Array.isArray(value)) {
              var arrayKey = '' + encode(key) + '[]';
              for (var j = 0, l = value.length; j < l; j++) {
                pairs.push('' + arrayKey + '=' + encode(value[j]));
              }
            } else {
              pairs.push('' + encode(key) + '=' + encode(value));
            }
          }

          if (pairs.length === 0) {
            return '';
          }

          return '?' + pairs.join('&');
        };

        RouteRecognizer.prototype.parseQueryString = function parseQueryString(queryString) {
          var queryParams = {};
          if (!queryString || typeof queryString !== 'string') {
            return queryParams;
          }

          if (queryString.charAt(0) === '?') {
            queryString = queryString.substr(1);
          }

          var pairs = queryString.split('&');
          for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('='),
                key = decodeURIComponent(pair[0]),
                keyLength = key.length,
                isArray = false,
                value;

            if (!key) {
              continue;
            } else if (pair.length === 1) {
              value = true;
            } else {
              if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
                isArray = true;
                key = key.slice(0, keyLength - 2);
                if (!queryParams[key]) {
                  queryParams[key] = [];
                }
              }
              value = pair[1] ? decodeURIComponent(pair[1]) : '';
            }
            if (isArray) {
              queryParams[key].push(value);
            } else {
              queryParams[key] = value;
            }
          }
          return queryParams;
        };

        RouteRecognizer.prototype.recognize = function recognize(path) {
          var states = [this.rootState],
              pathLen,
              i,
              l,
              queryStart,
              queryParams = {},
              isSlashDropped = false;

          queryStart = path.indexOf('?');
          if (queryStart !== -1) {
            var queryString = path.substr(queryStart + 1, path.length);
            path = path.substr(0, queryStart);
            queryParams = this.parseQueryString(queryString);
          }

          path = decodeURI(path);

          if (path.charAt(0) !== '/') {
            path = '/' + path;
          }

          pathLen = path.length;
          if (pathLen > 1 && path.charAt(pathLen - 1) === '/') {
            path = path.substr(0, pathLen - 1);
            isSlashDropped = true;
          }

          for (i = 0, l = path.length; i < l; i++) {
            states = recognizeChar(states, path.charAt(i));
            if (!states.length) {
              break;
            }
          }

          var solutions = [];
          for (i = 0, l = states.length; i < l; i++) {
            if (states[i].handlers) {
              solutions.push(states[i]);
            }
          }

          states = sortSolutions(solutions);

          var state = solutions[0];
          if (state && state.handlers) {
            if (isSlashDropped && state.regex.source.slice(-5) === '(.+)$') {
              path = path + '/';
            }
            return findHandler(state, path, queryParams);
          }
        };

        return RouteRecognizer;
      })();

      _export('RouteRecognizer', RouteRecognizer);

      RecognizeResults = function RecognizeResults(queryParams) {
        _classCallCheck(this, RecognizeResults);

        this.splice = Array.prototype.splice;
        this.slice = Array.prototype.slice;
        this.push = Array.prototype.push;
        this.length = 0;
        this.queryParams = queryParams || {};
      };
    }
  };
});