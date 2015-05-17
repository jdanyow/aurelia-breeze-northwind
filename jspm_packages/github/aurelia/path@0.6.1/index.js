/* */ 
System.register([], function (_export) {
  var r20, rbracket, class2type;

  _export('relativeToFile', relativeToFile);

  _export('join', join);

  _export('buildQueryString', buildQueryString);

  function trimDots(ary) {
    var i, part;
    for (i = 0; i < ary.length; ++i) {
      part = ary[i];
      if (part === '.') {
        ary.splice(i, 1);
        i -= 1;
      } else if (part === '..') {
        if (i === 0 || i == 1 && ary[2] === '..' || ary[i - 1] === '..') {
          continue;
        } else if (i > 0) {
          ary.splice(i - 1, 2);
          i -= 2;
        }
      }
    }
  }

  function relativeToFile(name, file) {
    var lastIndex,
        normalizedBaseParts,
        fileParts = file && file.split('/');

    name = name.trim();
    name = name.split('/');

    if (name[0].charAt(0) === '.' && fileParts) {
      normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
      name = normalizedBaseParts.concat(name);
    }

    trimDots(name);

    return name.join('/');
  }

  function join(path1, path2) {
    var url1, url2, url3, i, ii, urlPrefix, trailingSlash;

    if (!path1) {
      return path2;
    }

    if (!path2) {
      return path1;
    }

    urlPrefix = path1.indexOf('//') === 0 ? '//' : path1.indexOf('/') === 0 ? '/' : '';
    trailingSlash = path2.slice(-1) == '/' ? '/' : '';

    url1 = path1.split('/');
    url2 = path2.split('/');
    url3 = [];

    for (i = 0, ii = url1.length; i < ii; ++i) {
      if (url1[i] == '..') {
        url3.pop();
      } else if (url1[i] == '.' || url1[i] == '') {
        continue;
      } else {
        url3.push(url1[i]);
      }
    }

    for (i = 0, ii = url2.length; i < ii; ++i) {
      if (url2[i] == '..') {
        url3.pop();
      } else if (url2[i] == '.' || url2[i] == '') {
        continue;
      } else {
        url3.push(url2[i]);
      }
    }

    return urlPrefix + url3.join('/').replace(/\:\//g, '://') + trailingSlash;
  }

  function type(obj) {
    if (obj == null) {
      return obj + '';
    }

    return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
  }

  function buildQueryString(a, traditional) {
    var prefix,
        s = [],
        add = function add(key, value) {
      value = typeof value === 'function' ? value() : value == null ? '' : value;
      s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    };

    for (prefix in a) {
      _buildQueryString(prefix, a[prefix], traditional, add);
    }

    return s.join('&').replace(r20, '+');
  }

  function _buildQueryString(prefix, obj, traditional, add) {
    var name;

    if (Array.isArray(obj)) {
      obj.forEach(function (v, i) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          _buildQueryString(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
        }
      });
    } else if (!traditional && type(obj) === 'object') {
      for (name in obj) {
        _buildQueryString(prefix + '[' + name + ']', obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  return {
    setters: [],
    execute: function () {
      'use strict';

      r20 = /%20/g;
      rbracket = /\[\]$/;
      class2type = {};

      'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (name, i) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
      });
    }
  };
});