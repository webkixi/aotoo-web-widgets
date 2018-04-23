/**
* list 通用组件
* 返回 div > (ul > li)*n
*/
// const cloneDeep = $Aotoo.cloneDeep
const merge = Aotoo.merge
const Fox = require('../itemview/foxli')

class TmpApp extends React.Component {
	constructor(props){
		super(props)
		this._dealWithData = this::this._dealWithData
		// this._dealWithItemView = this::this._dealWithItemView
		this.listMethod = this::this.listMethod
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

	// _dealWithItemView(index, item, props={}){
	// 	const listOperate = {
	// 		// parent: this.getListDom
	// 	}

	// 	if (item.itemMethod) {
	// 		props.itemMethod = item.itemMethod || props.itemMethod
	// 		delete item.itemMethod
	// 	}
	// 	return <Fox foxref={"child_"+index} operate={listOperate} idf={index} {...props} />;
	// }

	_dealWithData(data){
		var props = merge({}, this.props);
		const stateData = props.data

		//删除多余的属性
		delete props.listClass;
		delete props.listMethod;
		delete props.onscrollend;
		delete props.data
		
		const items = stateData.map(
			(item, ii) => {
				props.idf = ii
				props.key = 'fox'+ii
				props.data = item
				if (item && item.itemMethod) {
					props.itemMethod = item.itemMethod
					delete item.itemMethod
				}
				const listOperate = {} //{ // parent: this.getListDom }
				return <Fox foxref={"child_"+ii} operate={listOperate} idf={ii} {...props} />;
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


// class TmpApp extends React.Component {
// 	constructor(props){
// 		super(props)
// 		var pdata = this.props.data;
// 		if( pdata ){ if(!Array.isArray( pdata )){ pdata = [ pdata ] } }
// 		this.selected = []
// 		this.state = {
// 			data: pdata||[]
// 		}
//
// 		this._dealWithData = this::this._dealWithData
// 		this._dealWithItemView = this::this._dealWithItemView
// 		this.listMethod = this::this.listMethod
// 		this.getListDom = this::this.getListDom
// 	}
//
// 	shouldComponentUpdate(nextProps, nextState) {
//     return true
// 	}
//
// 	componentWillMount() {
//
// 	}
//
// 	getListDom(){
// 		return reactDom.findDOMNode(this);
// 	}
//
// 	componentWillReceiveProps(nextProps) {
// 		var pdata = nextProps.data;
// 		if (pdata) {
// 			if(!Array.isArray( pdata )) pdata = [ pdata ]
// 			this.setState({ data: pdata })
// 		}
// 	}
//
// 	componentDidMount(){
// 		this.listMethod(this.props.listMethod)
// 	}
//
// 	listMethod(lmd){
// 		if (lmd && typeof lmd == 'function') {
// 			let that = reactDom.findDOMNode(this);
// 			lmd(that, this.props.store)
// 		}
// 	}
//
// 	_dealWithItemView(opts){
// 		var that = this;
// 		var props = cloneDeep(that.props);
// 		props.idf = opts.i;
// 		props.key = 'fox'+opts.i;
// 		props.data = opts.item;
//
// 		const listOperate = {
// 			parent: this.getListDom
// 		}
//
// 		//删除多余的属性
// 		delete props.listClass;
// 		delete props.listMethod;
// 		delete props.itemView;
// 		delete props.onscrollend;
//
// 		if(that.props.itemView){
// 			var view = that.props.itemView;
// 			return React.createElement(view, props, that.props.children);
// 		}else{
// 			return <Fox ref={"child_"+opts.i} operate={listOperate} idf={opts.i} {...props} data={opts.item} />;
// 		}
// 	}
//
// 	_dealWithData(data){
// 		const stateData = this.state.data
// 		const items = stateData.map((item, ii) => this._dealWithItemView({i: ii, item: item}))
// 		return items.length ? <ul className="hlist"> {items} </ul> : ''
// 	}
//
// 	render(){
// 		let fills = this._dealWithData()
// 		let _cls = 'list-wrap'
// 		let sty
// 		if(this.props.listClass){
// 			_cls = "list-wrap " + this.props.listClass||''
// 		}
// 		if(this.props.listStyle){
// 			sty = this.props.listStyle;
// 		}
// 		if (this.props.header || this.props.footer || this.props.children) {
// 			return (
// 				<div className={_cls} style={sty}>
// 					{this.props.header}
// 					{fills}
// 					{this.props.footer}
// 					{this.props.children}
// 				</div>
// 			)
// 		} else {
// 			if (fills) {
// 				const fill = fills
// 				const ulclass = `hlist ${this.props.listClass||''}`
// 				return React.cloneElement(fill, {className: ulclass})
// 			} else {
// 				return <ul className="hlist"></ul>
// 			}
//
// 		}
// 	}
//
// }

module.exports = TmpApp;
