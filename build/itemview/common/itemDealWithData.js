'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // const React = (typeof React != 'undefined' ? React : require('react'))


var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.merge');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.uniqueid');

var _lodash6 = _interopRequireDefault(_lodash5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapKeys = function mapKeys(obj, cb) {
  var keys = Object.keys(obj);
  return keys.map(function (item, ii) {
    cb(obj[item], item);
  });
};

var isPlainObject = function isPlainObject(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object') {
    return !Array.isArray(obj);
  }
};

var itemrootCkb = React.createElement('input', { type: 'checkbox', className: 'itemrootCkb' });

function lazyimg(img, idf) {
  var hoc = this.hoc || [];
  if (hoc.indexOf('scroll') > -1) {
    if (img.indexOf('$$$') > -1) {
      var tmp = img.split('$$$');
      if (tmp.length === 2) {
        if (idf) return React.createElement('li', { key: 'img' + idf, className: 'himg-item lazyimg', 'data-imgsrc': tmp[1], 'data-imgtmp': tmp[0] });
        return React.createElement('div', { className: 'himg lazyimg', 'data-imgsrc': tmp[1], 'data-imgtmp': tmp[0] });
      }
    } else {
      if (idf) return React.createElement('li', { 'data-iid': idf, key: 'img' + idf, className: 'himg-item lazyimg', 'data-imgsrc': img });
      return React.createElement('div', { className: 'himg lazyimg', 'data-imgsrc': img });
    }
  }
  if (img.indexOf('$$$') > -1) {
    var tmp = img.split('$$$');
    if (tmp.length === 2) {
      if (idf) return React.createElement(
        'li',
        { key: 'img' + idf, className: 'himg-item' },
        React.createElement('img', { 'data-imgsrc': tmp[1], 'data-imgtmp': tmp[0], src: tmp[0] })
      );
      return React.createElement('img', { className: 'himg', 'data-imgsrc': tmp[1], 'data-imgtmp': tmp[0], src: tmp[0] });
    }
  } else {
    if (idf) return React.createElement(
      'li',
      { 'data-iid': idf, key: 'img' + idf, className: 'himg-item' },
      React.createElement('img', { 'data-imgsrc': img, src: img })
    );
    return React.createElement('img', { className: 'himg', 'data-imgsrc': img, src: img });
  }
}

// 处理title及url
// 处理li的相关数据
function normalItem(obj) {
  if (typeof obj === 'string' || typeof obj === 'number' || React.isValidElement(obj)) return obj;else if (Array.isArray(obj)) {
    return dealWithLi(obj);
  } else {
    if (obj.title) {
      var title = obj.title;
      if (obj.url && (typeof title == 'string' || typeof title == 'number')) {
        title = React.createElement(
          'a',
          { className: 'htitle', href: obj.url },
          obj.title
        );
      }
      if (obj.li) {
        var _title = title;
        if (typeof title == 'string' || typeof title == 'number') {
          _title = React.createElement(
            'span',
            { className: 'caption' },
            title
          );
        }
        title = React.createElement(
          'div',
          { className: 'itemCategory' },
          itemrootCkb,
          _title,
          dealWithLi(obj.li)
        );
      }
      return title;
    } else if (obj.li) return dealWithLi(obj.li);
    return '';
  }
}

function dealWithLi(prop_li, liClassName) {
  var lis = [];
  if (Array.isArray(prop_li)) {
    prop_li.map(function (li_item, li_i) {
      var _item = normalItem(li_item);
      var _liItem;
      var _props = { "key": (0, _lodash6.default)('li-') };
      if (Array.isArray(li_item)) {
        _props.className = "nextLevel2";
        _liItem = React.createElement('li', _props, _item);
      } else {
        if (isPlainObject(li_item.attr)) {
          var data_attr = {};
          mapKeys(li_item.attr, function (value, key) {
            if (key.indexOf('data-') > -1) data_attr[key] = value;else {
              switch (key) {
                case 'className':
                  data_attr['className'] = value;
                  break;
                case 'style':
                  data_attr['style'] = value;
                  break;
                default:
                  data_attr['data-' + key] = value;
              }
            }
          });
          _props = (0, _lodash4.default)(_props, data_attr);
        }
        if (li_item.li) {
          // itemroot
          _props.className = li_item.itemClass ? li_item.itemClass + ' itemroot' : 'itemroot';
        } else {
          _props.className = li_item.itemClass ? li_item.itemClass : '';
        }
        _liItem = React.createElement('li', _props, _item);
      }
      lis.push(_liItem);
    });
    return React.createElement('ul', {
      className: liClassName
    }, lis);
  } else {
    lis.push(React.createElement(
      'li',
      { key: 'li-' + li_i },
      prop_li
    ));
    return React.createElement(
      'ul',
      null,
      lis
    );
  }
}

/*
* 数据处理部分
* f_div / f_li 的公共数据处理部分
*/
function dealWithData(state) {
  var clsName = "item";
  var itemStyle = '';
  var sty = {};
  var wid = '';
  var _state = state;
  var data = _state.data;
  var hoc = _state.hoc;
  var items = [];

  if (_state.itemClass) clsName = "item " + _state.itemClass;

  if (data) {
    if (!Array.isArray(data)) {
      var body;
      var footer;
      var dot;

      var bodys = [];
      var footers = [];
      var dots = [];

      var headerDom;
      var bodyDom;
      var footerDom;
      var dotDom;
      var liDom;

      if (data.itemClass) clsName = "item " + data.itemClass;
      if (data.itemStyle) {
        //  clsName = 'item';
        sty = data.itemStyle;
      }

      var ref = data.ref;
      var k1 = data.id || '',
          v1 = data.url || 'javascript:void();',
          k2 = data.title || data.caption || data.catName || data.text || data.model || data.quality || data.vender || (typeof data === 'string' || typeof data === 'number' || React.isValidElement(data) ? data : '') || '',
          v2 = data.attr || '',
          k3,
          v3 = data.value || '',
          k4,
          v4 = data.content;

      if (data.url) {
        //  k2 = <a href={v1} target="_blank">{k2}</a>
        k2 = React.createElement(
          'a',
          { className: 'htitle', href: v1 },
          k2
        );
        if (data.target) {
          k2 = React.createElement(
            'a',
            { href: v1, target: '_blank' },
            k2
          );
        }
      }

      if (data.li) {
        k3 = dealWithLi(data.li, data.liClassName);
      }

      if (data.img) {
        if (Array.isArray(data.img)) {
          var tmp_k2 = [];
          tmp_k2 = data.img.map(function (pic, j) {
            return lazyimg.call({ hoc: hoc }, pic, j);
          });
          k4 = React.createElement(
            'ul',
            { className: 'himg' },
            tmp_k2
          );
          //  k4 = k2 = <ul className="himg">{tmp_k2}</ul>;
        } else {
          k4 = lazyimg.call({ hoc: hoc }, data.img);
        }
      }

      if (data.body) {
        body = data.body;
        if (!Array.isArray(body)) body = [body];

        body.map(function (item, i) {
          if (typeof item === 'string' || typeof item === 'number') {
            bodys.push(React.createElement(
              'div',
              { 'data-pid': i, key: 'body_' + i },
              item
            ));
          }
          if (isPlainObject(item)) {
            var cls = item.caption ? 'hb-item caption' : 'hb-item';
            if (!React.isValidElement(item)) {
              var title = item.title || item.caption || item.text;
              if (React.isValidElement(title)) {
                var props = (0, _lodash2.default)(title.props);
                props.key = 'body_' + i;
                title = React.createElement(title.type, props);
              } else if ((typeof title === 'string' || typeof title == 'number') && typeof item.url === 'string') {
                title = React.createElement(
                  'a',
                  { className: 'htitle', href: item.url, key: 'body_' + i },
                  title
                );
              }

              var ppp = function () {
                if (item.k) {
                  //k v结构
                  return React.createElement(
                    'div',
                    { key: 'bodyk-' + i, 'data-pid': i, className: cls },
                    title,
                    item.k,
                    item.v
                  );
                }
                if (item.li) {
                  //li结构
                  var lis = dealWithLi(item.li);
                  return React.createElement(
                    'div',
                    { key: 'bodyul-' + i, className: cls },
                    title,
                    lis
                  );
                }
                return title;
              }();
              bodys.push(ppp);
            } else {
              var _props2 = (0, _lodash4.default)({}, item.props);
              _props2.key = 'bodyitem_' + i;
              bodys.push(React.createElement(item.type, _props2));
            }
          }
        });
      }

      if (data.footer) {
        footer = data.footer;
        if (!Array.isArray(footer)) footer = [footer];

        footer.map(function (item, i) {
          if (typeof item === 'string' || typeof item === 'number') {
            footers.push(React.createElement(
              'div',
              { 'data-pid': i, key: 'footer' + i },
              item
            ));
          }
          if (isPlainObject(item)) {
            var cls = item.caption ? 'hf-item caption' : 'hf-item';
            if (!React.isValidElement(item)) {
              var title = item.title || item.caption || item.text;
              if (React.isValidElement(title)) {
                var props = (0, _lodash2.default)(title.props);
                props.key = 'footer_' + i;
                title = React.createElement(title.type, props);
              } else if ((typeof title === 'string' || typeof title == 'number') && typeof item.url === 'string') {
                title = React.createElement(
                  'a',
                  { className: 'htitle', href: item.url },
                  title
                );
              }

              //attr定义一些特殊的状态
              var ppp = function () {
                if (item.k) {
                  //k v结构
                  return React.createElement(
                    'div',
                    { 'data-pid': i, key: 'footer' + i, className: cls },
                    title,
                    item.k,
                    item.v
                  );
                }
                if (item.li) {
                  //li结构
                  var lis = dealWithLi(item.li);
                  return React.createElement(
                    'div',
                    { key: 'footerul' + i, className: cls },
                    title,
                    lis
                  );
                }
                return title;
              }();
              footers.push(ppp);
            } else {
              var _props3 = (0, _lodash4.default)({}, item.props);
              _props3.key = 'footer_' + i;
              footers.push(React.createElement(item.type, _props3));
            }
          }
        });
      }

      if (data.dot) {
        dot = data.dot;
        if (!Array.isArray(dot)) dot = [dot];

        dot.map(function (item, i) {
          if (typeof item === 'string' || typeof item === 'number') {
            var _React$createElement;

            dots.push(React.createElement(
              'div',
              (_React$createElement = { key: 'dot-' + i, 'data-did': i }, _defineProperty(_React$createElement, 'key', 'dot' + i), _defineProperty(_React$createElement, 'className', 'dot'), _React$createElement),
              item
            ));
          }
          if (isPlainObject(item)) {
            if (React.isValidElement(item)) {
              var it = item;
              var props = (0, _lodash2.default)(it.props);
              var styl = props.style;
              delete props.style;
              var tmp = React.createElement(it.type, props, it.props.children);
              dots.push(React.createElement(
                'div',
                { 'data-did': i, key: 'dot' + i, className: 'dot', style: styl },
                tmp
              ));
            } else {
              var lft, top, botm, rht;
              if (item.position) {
                lft = item.position.left;
                top = item.position.top;
                botm = item.position.bottom;
                rht = item.position.right;
              }

              var styl = function () {
                var kkk = {};
                lft ? kkk.left = lft : '';
                top ? kkk.top = top : '';
                botm ? kkk.bottom = botm : '';
                rht ? kkk.right = rht : '';
                return kkk;
              }();

              var title = item.title || item.caption || item.text || item.price;
              if (title && typeof title === 'string' && item.url && typeof item.url === 'string') {
                title = React.createElement(
                  'a',
                  { className: 'htitle', href: item.url },
                  title
                );
              }
              if (title) {
                dots.push(React.createElement(
                  'div',
                  { 'data-did': i, key: 'dot' + i, className: 'dot', style: styl },
                  React.createElement(
                    'div',
                    null,
                    title
                  )
                ));
              }
            }
          }
        });
      }

      if (k3) liDom = k3;

      if (k2 || k3 || k4) {
        headerDom = liDom ? data.img && Array.isArray(data.img) ? React.createElement(
          'div',
          { className: "hheader" },
          k2,
          liDom,
          k4
        ) : React.createElement(
          'div',
          { className: "hheader" },
          k2,
          k4,
          liDom
        ) : data.img ? React.createElement(
          'div',
          { className: "hheader" },
          k2,
          k4
        ) : React.createElement(
          'div',
          { className: "hheader" },
          k2
        );
      }

      if (bodys.length) {
        bodyDom = data.img && Array.isArray(data.img) ? React.createElement(
          'div',
          { className: 'hbody rebody' },
          bodys
        ) : React.createElement(
          'div',
          { className: 'hbody' },
          bodys
        );
      }

      if (footers.length) footerDom = React.createElement(
        'div',
        { className: 'hfoot' },
        footers
      );
      if (dots.length) dotDom = dots;
    }
  }

  var fill = Array.isArray(data) ? items : k4 || bodyDom || footerDom || dotDom ? React.createElement(
    'div',
    { className: 'inner' },
    headerDom,
    bodyDom,
    footerDom,
    dotDom
  ) : liDom ? k2 ? React.isValidElement(k2) ? React.createElement(
    'div',
    { className: 'itemCategory' },
    itemrootCkb,
    k2,
    liDom
  ) : React.createElement(
    'div',
    { className: 'itemCategory' },
    itemrootCkb,
    React.createElement(
      'span',
      { className: 'caption' },
      k2
    ),
    liDom
  ) : liDom : k2;

  return {
    ref: ref,
    k1: k1,
    v1: v1,
    k2: k2,
    v2: v2,
    clsName: clsName,
    sty: sty,
    fill: fill
  };
}

module.exports = dealWithData;
//# sourceMappingURL=../../maps/itemview/common/itemDealWithData.js.map
