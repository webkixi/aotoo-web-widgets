'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var isClient = Aotoo.isClient;
var transTree = require('./tree');
var Item = require('./itemview/foxdiv');
var List = require('./listview');

function $item(props, isreact) {
  if (!props) return Item;
  return React.createElement(Item, props);
}

function $list(props, isreact) {
  if (!props) return List;
  return React.createElement(List, props);
}

function $tree(props) {
  if (Array.isArray(props.data)) {
    var _props = _extends({}, props);
    _props.data = transTree(_props.data);
    return React.createElement(List, _props);
  }
}

Aotoo.plugins('item', $item);
Aotoo.plugins('list', $list);
Aotoo.plugins('tree', $tree);
Aotoo.plugins('transTree', transTree);

module.exports = {};
//# sourceMappingURL=maps/index.js.map
