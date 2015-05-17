/* */ 
"format cjs";
if (typeof define !== 'function') {
  var define = require("amdefine")(module, require);
}
define(function(require, exports, module) {
  var util = require("./util");
  var binarySearch = require("./binary-search");
  var ArraySet = require("./array-set").ArraySet;
  var base64VLQ = require("./base64-vlq");
  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }
    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    var names = util.getArg(sourceMap, 'names', []);
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file', null);
    if (version != this._version) {
      throw new Error('Unsupported version: ' + version);
    }
    sources = sources.map(util.normalize);
    this._names = ArraySet.fromArray(names, true);
    this._sources = ArraySet.fromArray(sources, true);
    this.sourceRoot = sourceRoot;
    this.sourcesContent = sourcesContent;
    this._mappings = mappings;
    this.file = file;
  }
  SourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap) {
    var smc = Object.create(SourceMapConsumer.prototype);
    smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc.__generatedMappings = aSourceMap._mappings.toArray().slice();
    smc.__originalMappings = aSourceMap._mappings.toArray().slice().sort(util.compareByOriginalPositions);
    return smc;
  };
  SourceMapConsumer.prototype._version = 3;
  Object.defineProperty(SourceMapConsumer.prototype, 'sources', {get: function() {
      return this._sources.toArray().map(function(s) {
        return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
      }, this);
    }});
  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {get: function() {
      if (!this.__generatedMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }
      return this.__generatedMappings;
    }});
  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {get: function() {
      if (!this.__originalMappings) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        this._parseMappings(this._mappings, this.sourceRoot);
      }
      return this.__originalMappings;
    }});
  SourceMapConsumer.prototype._nextCharIsMappingSeparator = function SourceMapConsumer_nextCharIsMappingSeparator(aStr) {
    var c = aStr.charAt(0);
    return c === ";" || c === ",";
  };
  SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var str = aStr;
    var temp = {};
    var mapping;
    while (str.length > 0) {
      if (str.charAt(0) === ';') {
        generatedLine++;
        str = str.slice(1);
        previousGeneratedColumn = 0;
      } else if (str.charAt(0) === ',') {
        str = str.slice(1);
      } else {
        mapping = {};
        mapping.generatedLine = generatedLine;
        base64VLQ.decode(str, temp);
        mapping.generatedColumn = previousGeneratedColumn + temp.value;
        previousGeneratedColumn = mapping.generatedColumn;
        str = temp.rest;
        if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
          base64VLQ.decode(str, temp);
          mapping.source = this._sources.at(previousSource + temp.value);
          previousSource += temp.value;
          str = temp.rest;
          if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
            throw new Error('Found a source, but no line and column');
          }
          base64VLQ.decode(str, temp);
          mapping.originalLine = previousOriginalLine + temp.value;
          previousOriginalLine = mapping.originalLine;
          mapping.originalLine += 1;
          str = temp.rest;
          if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
            throw new Error('Found a source and line, but no column');
          }
          base64VLQ.decode(str, temp);
          mapping.originalColumn = previousOriginalColumn + temp.value;
          previousOriginalColumn = mapping.originalColumn;
          str = temp.rest;
          if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
            base64VLQ.decode(str, temp);
            mapping.name = this._names.at(previousName + temp.value);
            previousName += temp.value;
            str = temp.rest;
          }
        }
        this.__generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          this.__originalMappings.push(mapping);
        }
      }
    }
    this.__generatedMappings.sort(util.compareByGeneratedPositions);
    this.__originalMappings.sort(util.compareByOriginalPositions);
  };
  SourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator) {
    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
    }
    return binarySearch.search(aNeedle, aMappings, aComparator);
  };
  SourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];
        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }
      mapping.lastGeneratedColumn = Infinity;
    }
  };
  SourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };
    var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositions);
    if (index >= 0) {
      var mapping = this._generatedMappings[index];
      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source != null && this.sourceRoot != null) {
          source = util.join(this.sourceRoot, source);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: util.getArg(mapping, 'name', null)
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };
  SourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource) {
    if (!this.sourcesContent) {
      return null;
    }
    if (this.sourceRoot != null) {
      aSource = util.relative(this.sourceRoot, aSource);
    }
    if (this._sources.has(aSource)) {
      return this.sourcesContent[this._sources.indexOf(aSource)];
    }
    var url;
    if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
      var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
      if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
      }
      if ((!url.path || url.path == "/") && this._sources.has("/" + aSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
      }
    }
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  };
  SourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };
    if (this.sourceRoot != null) {
      needle.source = util.relative(this.sourceRoot, needle.source);
    }
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions);
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      return {
        line: util.getArg(mapping, 'generatedLine', null),
        column: util.getArg(mapping, 'generatedColumn', null),
        lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
      };
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };
  SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: Infinity
    };
    if (this.sourceRoot != null) {
      needle.source = util.relative(this.sourceRoot, needle.source);
    }
    var mappings = [];
    var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions);
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      while (mapping && mapping.originalLine === needle.originalLine) {
        mappings.push({
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        });
        mapping = this._originalMappings[--index];
      }
    }
    return mappings.reverse();
  };
  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;
  SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
    var mappings;
    switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var sourceRoot = this.sourceRoot;
    mappings.map(function(mapping) {
      var source = mapping.source;
      if (source != null && sourceRoot != null) {
        source = util.join(sourceRoot, source);
      }
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name
      };
    }).forEach(aCallback, context);
  };
  exports.SourceMapConsumer = SourceMapConsumer;
});
