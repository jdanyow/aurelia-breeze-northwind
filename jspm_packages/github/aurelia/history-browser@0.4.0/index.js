/* */ 
System.register(['core-js', 'aurelia-history'], function (_export) {
  var core, History, _classCallCheck, _inherits, routeStripper, rootStripper, isExplorer, trailingSlash, BrowserHistory;

  _export('configure', configure);

  function updateHash(location, fragment, replace) {
    if (replace) {
      var href = location.href.replace(/(javascript:|#).*$/, '');
      location.replace(href + '#' + fragment);
    } else {
      location.hash = '#' + fragment;
    }
  }

  function configure(aurelia) {
    aurelia.withSingleton(History, BrowserHistory);
  }

  return {
    setters: [function (_coreJs) {
      core = _coreJs['default'];
    }, function (_aureliaHistory) {
      History = _aureliaHistory.History;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

      routeStripper = /^[#\/]|\s+$/g;
      rootStripper = /^\/+|\/+$/g;
      isExplorer = /msie [\w.]+/;
      trailingSlash = /\/$/;

      BrowserHistory = (function (_History) {
        function BrowserHistory() {
          _classCallCheck(this, BrowserHistory);

          _History.call(this);

          this.interval = 50;
          this.active = false;
          this.previousFragment = '';
          this._checkUrlCallback = this.checkUrl.bind(this);

          if (typeof window !== 'undefined') {
            this.location = window.location;
            this.history = window.history;
          }
        }

        _inherits(BrowserHistory, _History);

        BrowserHistory.prototype.getHash = function getHash(window) {
          var match = (window || this).location.href.match(/#(.*)$/);
          return match ? match[1] : '';
        };

        BrowserHistory.prototype.getFragment = function getFragment(fragment, forcePushState) {
          var root;

          if (!fragment) {
            if (this._hasPushState || !this._wantsHashChange || forcePushState) {
              fragment = this.location.pathname + this.location.search;
              root = this.root.replace(trailingSlash, '');
              if (!fragment.indexOf(root)) {
                fragment = fragment.substr(root.length);
              }
            } else {
              fragment = this.getHash();
            }
          }

          return fragment.replace(routeStripper, '');
        };

        BrowserHistory.prototype.activate = function activate(options) {
          if (this.active) {
            throw new Error('History has already been activated.');
          }

          this.active = true;

          this.options = Object.assign({}, { root: '/' }, this.options, options);
          this.root = this.options.root;
          this._wantsHashChange = this.options.hashChange !== false;
          this._wantsPushState = !!this.options.pushState;
          this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);

          var fragment = this.getFragment();

          this.root = ('/' + this.root + '/').replace(rootStripper, '/');

          if (this._hasPushState) {
            window.onpopstate = this._checkUrlCallback;
          } else if (this._wantsHashChange && 'onhashchange' in window) {
            window.addEventListener('hashchange', this._checkUrlCallback);
          } else if (this._wantsHashChange) {
            this._checkUrlTimer = setTimeout(this._checkUrlCallback, this.interval);
          }

          this.fragment = fragment;

          var loc = this.location;
          var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

          if (this._wantsHashChange && this._wantsPushState) {
            if (!this._hasPushState && !atRoot) {
              this.fragment = this.getFragment(null, true);
              this.location.replace(this.root + this.location.search + '#' + this.fragment);

              return true;
            } else if (this._hasPushState && atRoot && loc.hash) {
              this.fragment = this.getHash().replace(routeStripper, '');
              this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
            }
          }

          if (!this.options.silent) {
            return this.loadUrl();
          }
        };

        BrowserHistory.prototype.deactivate = function deactivate() {
          window.onpopstate = null;
          window.removeEventListener('hashchange', this._checkUrlCallback);
          clearTimeout(this._checkUrlTimer);
          this.active = false;
        };

        BrowserHistory.prototype.checkUrl = function checkUrl() {
          var current = this.getFragment();

          if (this._checkUrlTimer) {
            clearTimeout(this._checkUrlTimer);
            this._checkUrlTimer = setTimeout(this._checkUrlCallback, this.interval);
          }

          if (current === this.fragment && this.iframe) {
            current = this.getFragment(this.getHash(this.iframe));
          }

          if (current === this.fragment) {
            return false;
          }

          if (this.iframe) {
            this.navigate(current, false);
          }

          this.loadUrl();
        };

        BrowserHistory.prototype.loadUrl = function loadUrl(fragmentOverride) {
          var fragment = this.fragment = this.getFragment(fragmentOverride);

          return this.options.routeHandler ? this.options.routeHandler(fragment) : false;
        };

        BrowserHistory.prototype.navigate = function navigate(fragment, options) {
          if (fragment && fragment.indexOf('://') != -1) {
            window.location.href = fragment;
            return true;
          }

          if (!this.active) {
            return false;
          }

          if (options === undefined) {
            options = {
              trigger: true
            };
          } else if (typeof options === 'boolean') {
            options = {
              trigger: options
            };
          }

          fragment = this.getFragment(fragment || '');

          if (this.fragment === fragment) {
            return;
          }

          this.fragment = fragment;

          var url = this.root + fragment;

          if (fragment === '' && url !== '/') {
            url = url.slice(0, -1);
          }

          if (this._hasPushState) {
            this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
          } else if (this._wantsHashChange) {
            updateHash(this.location, fragment, options.replace);

            if (this.iframe && fragment !== this.getFragment(this.getHash(this.iframe))) {
              if (!options.replace) {
                this.iframe.document.open().close();
              }

              updateHash(this.iframe.location, fragment, options.replace);
            }
          } else {
            return this.location.assign(url);
          }

          if (options.trigger) {
            return this.loadUrl(fragment);
          } else {
            this.previousFragment = fragment;
          }
        };

        BrowserHistory.prototype.navigateBack = function navigateBack() {
          this.history.back();
        };

        return BrowserHistory;
      })(History);

      _export('BrowserHistory', BrowserHistory);
    }
  };
});