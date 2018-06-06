'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
itemView
放回 li 结构, 用于modules/list 调用，作为ul/li部分
*/
// const React = (typeof React != 'undefined' ? React : require('react'))
var dealWithDataMethod = require('./common/itemDealWithDataX');

function getClass(resault) {
	var props = this.props;
	var data = props.data;
	var cls = resault.clsName;
	if (data) {
		if (data.className) cls = data.className;
		if (data.li) cls += ' itemroot';
	}
	return cls;
}

// props: {
// 	idf,
// 	data: [....],  item: {....}
// 	itemClass
// }
//
// item: {
// title:any,
// url: 和title在一起，组成a，没有的话,title就是title
// li:[], 会在 li下组成一个新的ul->li结构
// img:[]/String,
// body:[{title:any, url, li:[], k, v}],   k和v在一起变成 span span 结构
// footer:[{like body}],
// dot:[{like body}],
// data-xxx:"dom's attr"
// }

var fox = function (_React$Component) {
	_inherits(fox, _React$Component);

	function fox(props) {
		_classCallCheck(this, fox);

		var _this = _possibleConstructorReturn(this, (fox.__proto__ || Object.getPrototypeOf(fox)).call(this, props));

		_this.dealWithData = dealWithDataMethod.bind(_this);
		return _this;
	}

	_createClass(fox, [{
		key: '_preRender',
		value: function _preRender() {
			this.resault = this.dealWithData(this.props);
			this.idf = this.props.idf;
		}
	}, {
		key: 'render',
		value: function render() {
			this._preRender();
			var self = this;
			var _resault = this.resault,
			    ref = _resault.ref,
			    k1 = _resault.k1,
			    v1 = _resault.v1,
			    k2 = _resault.k2,
			    v2 = _resault.v2,
			    clsName = _resault.clsName,
			    sty = _resault.sty,
			    fill = _resault.fill;

			var data_attr = {};

			var stateData = this.props.data;

			if ((typeof stateData === 'undefined' ? 'undefined' : _typeof(stateData)) == 'object') {
				Object.keys(stateData).map(function (key) {
					var value = stateData[key];
					if (key.indexOf('data-') > -1) {
						data_attr[key] = value;
					}
					if (key == 'attr') {
						Object.keys(stateData['attr']).map(function (item, ii) {
							if (item.indexOf('data-') != 0) {
								data_attr['data-' + item] = stateData['attr'][item];
							} else {
								data_attr[item] = stateData['attr'][item];
							}
						});
					}
				});
			}

			var _props = {
				// ref: ref
				id: k1,
				style: sty,
				className: getClass.call(self, this.resault)
			};
			return React.createElement(
				'li',
				_extends({}, _props, data_attr),
				fill
			);
		}
	}]);

	return fox;
}(React.Component);

module.exports = Aotoo.wrap(fox);
//# sourceMappingURL=../maps/itemview/foxli.js.map
