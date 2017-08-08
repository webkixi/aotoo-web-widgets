'use strict';

var transTree = require('./tree');

function $item(props, isreact) {
  var Item = require('./itemview/foxdiv');
  if (!props) return Item;
  return React.createElement(Item, props);
}

function $list(props, isreact) {
  var List = require('./listview');
  if (!props) return List;
  return React.createElement(List, props);
}

function $tree(props) {
  if (Array.isArray(props.data)) {
    props.data = transTree(props.data);
    return $list(props);
  }
}

Aotoo.plugins('item', $item);
Aotoo.plugins('list', $list);
Aotoo.plugins('tree', $tree);
Aotoo.plugins('transTree', transTree);

module.exports = {};
//# sourceMappingURL=maps/index.js.map
