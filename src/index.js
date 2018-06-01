var isClient = Aotoo.isClient
const transTree = require('./tree')
const Item = require('./itemview/foxdiv')
const List = require('./listview')

function $item(props, isreact){
  if (!props) return Item
  return <Item {...props} />
}

function $list(props, isreact){
  if (!props) return List
  return <List {...props} />
}

function $tree(props) {
  if (Array.isArray(props.data)) {
    let _props = {...props}
    _props.data = transTree(_props.data)
    return <List {..._props} />
  }
}

Aotoo.plugins('item', $item)
Aotoo.plugins('list', $list)
Aotoo.plugins('tree', $tree)
Aotoo.plugins('transTree', transTree)

module.exports = {}