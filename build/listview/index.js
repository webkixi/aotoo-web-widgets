'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* list 通用组件
* 返回 div > (ul > li)*n
*/
// const cloneDeep = Aotoo.cloneDeep
var merge = Aotoo.merge;
var Fox = require('../itemview/foxli');

var TmpApp = function (_ref) {
	_inherits(TmpApp, _ref);

	function TmpApp(props) {
		_classCallCheck(this, TmpApp);

		var _this = _possibleConstructorReturn(this, (TmpApp.__proto__ || Object.getPrototypeOf(TmpApp)).call(this, props));

		_this._dealWithData = _this._dealWithData.bind(_this);
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
		key: '_dealWithData',
		value: function _dealWithData(data) {
			var props = merge({}, this.props);
			var stateData = props.data || [];
			var ItemView = props.itemView;

			//删除多余的属性
			props.listClass = undefined;
			props.listMethod = undefined;
			props.onscrollend = undefined;
			delete props.data;
			delete props.itemView;

			var items = [];
			stateData.forEach(function (item, ii) {
				props.idf = ii;
				props.key = 'fox' + ii;
				props.data = item;
				if (item && item.itemMethod) {
					props.itemMethod = item.itemMethod;
					delete item.itemMethod;
				}
				var listOperate = {}; //{ // parent: this.getListDom }
				// return <Fox foxref={"child_"+ii} operate={listOperate} idf={ii} {...props} />;
				if (ItemView && typeof ItemView == 'function') {
					item.push(ItemView(props, Fox));
				} else {
					items.push(React.createElement(Fox, props));
				}
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
					return React.cloneElement(fill, { className: ulclass, style: sty });
				} else {
					return React.createElement('ul', { className: ulclass });
				}
			}
		}
	}]);

	return TmpApp;
}(React.PureComponent || React.Component);

module.exports = TmpApp;
//# sourceMappingURL=../maps/listview/index.js.map
