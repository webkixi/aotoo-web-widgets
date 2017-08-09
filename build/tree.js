'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // 数据结构
// const _data = [
//   {title: '典型页面', content: '123', idf: 'aaa'},
//   {title: '典型页面1', content: 'aaa', idf: 'bbb', parent: 'aaa'},
//   {title: '典型页面2', content: 'bbb', parent: 'aaa', attr: {"href":'http://www.163.com'}},
//   {title: '典型页面3', content: 'ccc', parent: 'aaa'},
//   {title: '典型页面4', content: 'ddd', parent: 'bbb'},
//   {title: '典型页面5', content: 'eee', parent: 'bbb'},
//   {title: '导航', content: '111'},
//   {title: '表单', content: '333'},
//   {title: '列表', content: '444'},
//   {title: '高级搜索', content: '5555'}
// ]

// resault
// [
//   {title: '典型页面', url: undefined, li: [{title: '典型页面1', url: undefined, li:[{典型页面4..}, {典型页面5..}]}, {典型页面2..}, {典型页面3...}]},
//   {title: '导航', content: '111'},
//   {title: '表单', content: '333'},
//   {title: '列表', content: '444'},
//   {title: '高级搜索', content: '5555'}
// ]

// html
// 将结果交给widget/ListView组件,拼接 ul/li 的结构化数据
// <List data={resault} />

// <li class="item ...">
// 	<div class="itemroot">
// 		<ul>
// 			<li data-href="http://www.163.com">xxx</li>
// 		</ul>
// 	</div>
// </li>

// let idrecode = {}

var _lodash = require('lodash.filter');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idrecode = [];
function subTree(item, dataAry, deep) {
	deep = deep || 1;
	var nsons = [];
	var sons = (0, _lodash2.default)(dataAry, function (o) {
		return o.parent == item.idf;
	});
	sons.map(function (son, ii) {
		son.itemClass = son.itemClass && son.itemClass.indexOf('level' + deep) == -1 ? son.itemClass + ' level' + deep : 'level' + deep;
		// son.itemClass = son.itemClass ? son.itemClass +' level'+deep : 'level'+deep
		if (son.idf && idrecode.indexOf(son.idf) == -1) {
			idrecode.push(son.idf);
			nsons = nsons.concat([subTree(son, dataAry, ++deep)]);
			--deep;
		} else {
			nsons = nsons.concat(son);
		}
	});
	item.li = nsons;
	return item;
}

function owerTree(item) {
	var ary = item.map(function (o) {
		if (Array.isArray(o)) return owerTree(item);
		return o;
	});
	return { li: ary };
}

// TreeStructor
module.exports = function (dataAry) {
	var menus = [];
	idrecode = [];
	dataAry.map(function (item, ii) {
		if (typeof item == 'string') menus.push(item);
		if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object' && !Array.isArray(item)) {
			// if (_.isPlainObject(item)) {
			if (item['attr']) {
				if (!item['attr']['data-treeid']) item['attr']['data-treeid'] = ii;
			} else {
				item['attr'] = { 'data-treeid': ii };
			}
			if (item.idf && idrecode.indexOf(item.idf) == -1) {
				item.itemClass = item.itemClass && item.itemClass.indexOf('level0') == -1 ? item.itemClass + ' level0' : 'level0';
				item.ref = item.idf;
				menus.push(subTree(item, dataAry));
			}
			if (!item.idf && !item.parent) {
				menus.push(item);
			}
		}
		if (Array.isArray(item)) {
			menus.push(owerTree(item));
		}
	});
	return menus;
};
//# sourceMappingURL=maps/tree.js.map
