'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * list 通用组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * 返回 div > (ul > li)*n
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


// const isClient = typeof window !== 'undefined'
// const React = (typeof React != 'undefined' ? React : require('react'))
// const reactDom = ( C => typeof ReactDOM != 'undefined' ? ReactDOM : typeof ReactDom != 'undefined' ? ReactDom : C ? require('react-dom') : require('react-dom/server'))(isClient)

var Fox = require('../itemview/foxli');

var TmpApp = function (_React$Component) {
	_inherits(TmpApp, _React$Component);

	function TmpApp(props) {
		_classCallCheck(this, TmpApp);

		var _this = _possibleConstructorReturn(this, (TmpApp.__proto__ || Object.getPrototypeOf(TmpApp)).call(this, props));

		_this._dealWithData = _this._dealWithData.bind(_this);
		_this._dealWithItemView = _this._dealWithItemView.bind(_this);
		_this.listMethod = _this.listMethod.bind(_this);
		return _this;
	}

	_createClass(TmpApp, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.listMethod(this.props.listMethod);
		}
	}, {
		key: 'listMethod',
		value: function listMethod(lmd) {
			if (lmd && typeof lmd == 'function') {
				var that = ReactDom.findDOMNode(this);
				lmd(that, this.props.store);
			}
		}
	}, {
		key: '_dealWithItemView',
		value: function _dealWithItemView(opts) {
			var that = this;
			var props = (0, _lodash2.default)(that.props);
			props.idf = opts.i;
			props.key = 'fox' + opts.i;
			props.data = opts.item;

			var listOperate = {}
			// parent: this.getListDom


			//删除多余的属性
			;delete props.listClass;
			delete props.listMethod;
			delete props.onscrollend;

			if (opts.item.itemMethod) {
				props.itemMethod = opts.item.itemMethod || props.itemMethod;
				delete opts.item.itemMethod;
			}
			return React.createElement(Fox, _extends({ ref: "child_" + opts.i, operate: listOperate, idf: opts.i }, props, { data: opts.item }));
		}
	}, {
		key: '_dealWithData',
		value: function _dealWithData(data) {
			var _this2 = this;

			var stateData = this.props.data;
			var items = stateData.map(function (item, ii) {
				return _this2._dealWithItemView({ i: ii, item: item });
			});
			return items.length ? React.createElement(
				'ul',
				{ className: 'hlist' },
				' ',
				items,
				' '
			) : '';
		}
	}, {
		key: 'render',
		value: function render() {
			var fills = this._dealWithData();
			var _cls = 'list-wrap';
			var sty = void 0;
			if (this.props.listClass) {
				_cls = "list-wrap " + this.props.listClass || '';
			}
			if (this.props.listStyle) {
				sty = this.props.listStyle;
			}
			if (this.props.header || this.props.footer || this.props.children) {
				return React.createElement(
					'div',
					{ className: _cls, style: sty },
					this.props.header,
					fills,
					this.props.footer,
					this.props.children
				);
			} else {
				var ulclass = 'hlist ' + (this.props.listClass || '');
				if (fills) {
					var fill = fills;
					return React.cloneElement(fill, { className: ulclass });
				} else {
					return React.createElement('ul', { className: ulclass });
				}
			}
		}
	}]);

	return TmpApp;
}(React.Component);

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
//# sourceMappingURL=../maps/listview/index.js.map
