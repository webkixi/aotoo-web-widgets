var isClient = Aotoo.isClient
var context = ( C => C ? window : global)(isClient) || {}
context.$Aotoo = context.Aotoo
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

function $tree(props){
  if ( Array.isArray(props.data) ) {
    props.data = transTree(props.data)
    return $list(props)
  }
}

$Aotoo.plugins('item', $item)
$Aotoo.plugins('list', $list)
$Aotoo.plugins('tree', $tree)
$Aotoo.plugins('transTree', transTree)

module.exports = {}