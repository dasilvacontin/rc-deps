'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.programForFilename = programForFilename;
exports.getDepNameWithProgramAndType = getDepNameWithProgramAndType;
exports.listDeps = listDeps;
// I'm only covering cases and properties that I personally use. Feel free to
// file a PR that improves support.

var RC_FORMAT = {
  babel: {
    presets: 'preset',
    plugins: 'plugin'
  },
  eslint: {
    extends: 'config',
    parser: null,
    plugins: 'plugin'
  }
};

function programForFilename(filename) {
  var match = /\.(.+)rc$/.exec(filename);
  return match[1];
}

function getDepNameWithProgramAndType(program, type, name) {
  // null indicates leave name as-is, e.g. for eslint parser
  if (type === null) return name;
  var lead = program + '-' + type + '-';
  name = name.replace(lead, '');
  return '' + lead + name;
}

function listDeps(filename, rc) {
  var deps = [];

  var program = programForFilename(filename);
  if (!program) return deps;

  var rcConfig = RC_FORMAT[program];
  if (!rcConfig) return deps;

  var _loop = function _loop() {
    var type = rcConfig[setting];
    var value = rc[setting];

    var getDepName = function getDepName(name) {
      return getDepNameWithProgramAndType(program, type, name);
    };
    if (typeof value === 'string') deps.push(getDepName(value));else if (Array.isArray(value)) deps.push.apply(deps, value.map(getDepName));
  };

  for (var setting in rcConfig) {
    _loop();
  }

  return deps;
}