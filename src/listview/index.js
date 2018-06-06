/**
* list 通用组件
* 返回 div > (ul > li)*n
*/
// const cloneDeep = Aotoo.cloneDeep
const merge = Aotoo.merge
const Fox = require('../itemview/foxli')

class TmpApp extends (React.PureComponent || React.Component) {
	constructor(props){
		super(props)
		this._dealWithData = this._dealWithData.bind(this)
		this.listMethod = this.listMethod.bind(this)
	}

	componentDidMount(){
		this.listMethod(this.props.listMethod)
	}

	listMethod(lmd){
		if (lmd && typeof lmd == 'function') {
			let that = ReactDom.findDOMNode(this);
			lmd(that, this.props.store)
		}
	}

	_dealWithData(data){
		var props = merge({}, this.props);
		const stateData = props.data||[]
		const ItemView = props.itemView

		//删除多余的属性
		props.listClass = undefined
		props.listMethod = undefined
		props.onscrollend = undefined
		delete props.data
		delete props.itemView
		
		const items = []
		stateData.forEach(
			(item, ii) => {
				props.idf = ii
				props.key = 'fox'+ii
				props.data = item
				if (item && item.itemMethod) {
					props.itemMethod = item.itemMethod
					delete item.itemMethod
				}
				const listOperate = {} //{ // parent: this.getListDom }
				// return <Fox foxref={"child_"+ii} operate={listOperate} idf={ii} {...props} />;
				if (ItemView && typeof ItemView == 'function') {
					item.push(ItemView(props, Fox))
				} else {
					items.push(<Fox {...props} />)
				}
			}
		)
		return items.length ? <ul className="hlist"> {items} </ul> : ''
	}

	render(){
		let fills = this._dealWithData()
		let _cls = 'list-wrap'
		let sty
		if(this.props.listClass){
			_cls = "list-wrap " + this.props.listClass||''
		}
		if(this.props.listStyle){
			sty = this.props.listStyle;
		}
		if (this.props.header || this.props.footer || this.props.children) {
			return (
				<div className={_cls} style={sty}>
					{this.props.header}
					{fills}
					{this.props.footer}
					{this.props.children}
				</div>
			)
		} else {
			const ulclass = `hlist ${this.props.listClass||''}`
			if (fills) {
				const fill = fills
				return React.cloneElement(fill, {className: ulclass, style: sty})
			} else {
				return <ul className={ulclass}></ul>
			}
		}
	}
}

module.exports = TmpApp;
