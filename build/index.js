'use strict';

var isClient = Aotoo.isClient;
var context = function (C) {
  return C ? window : global;
}(isClient) || {};
context.$Aotoo = context.Aotoo;
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
    props.data = transTree(props.data);
    return $list(props);
  }
}

$Aotoo.plugins('item', $item);
$Aotoo.plugins('list', $list);
$Aotoo.plugins('tree', $tree);
$Aotoo.plugins('transTree', transTree);

module.exports = {};
//# sourceMappingURL=maps/index.js.map
