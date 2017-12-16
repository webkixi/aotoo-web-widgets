'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cloneDeep = $Aotoo.cloneDeep;
var merge = $Aotoo.merge;
var uniqueId = $Aotoo.uniqueId;
var isPlainObject = $Aotoo.isPlainObject;
var filter = $Aotoo.filter;

var mapKeys = function mapKeys(obj, cb) {
  var keys = Object.keys(obj);
  return keys.map(function (item, ii) {
    cb(obj[item], item);
  });
};

// var isPlainObject = function(obj){
//   if (typeof obj == 'object') {
//     return !Array.isArray(obj)
//   }
// }

var itemrootCkb = React.createElement('input', { type: 'checkbox', className: 'itemrootCkb' });

function lazyimg(img, idf) {
  // const hoc = this.hoc || []
  // if ( hoc.indexOf('scroll') >-1 ){
  //   if (img.indexOf('$$$')>-1){
  //     var tmp = img.split('$$$')
  //     if (tmp.length===2){
  //       if (idf) return <li key={'img'+idf} className='himg-item lazyimg' data-imgsrc={tmp[1]} data-imgtmp={tmp[0]} />
  //       return <div className='himg lazyimg' data-imgsrc={tmp[1]} data-imgtmp={tmp[0]}/>
  //     }
  //   }
  //   else{
  //     if (idf) return <li data-iid={idf} key={'img'+idf} className="himg-item lazyimg" data-imgsrc={img}></li>
  //     return <div className="himg lazyimg" data-imgsrc={img} ></div>
  //   }
  // }
  if (React.isValidElement(img)) {
    return img;
  }
  if (img.indexOf('$$$') > -1) {
    var tmp = img.split('$$$');
    if (tmp.length === 2) {
      if (idf || idf == 0) return React.createElement(
        'li',
        { key: 'img' + idf, className: 'himg-item lazyimg' },
        React.createElement('img', { 'data-imgsrc': tmp[1], 'data-imgtmp': tmp[0], src: tmp[0] })
      );
      return React.createElement('img', { className: 'himg lazyimg', 'data-imgsrc': tmp[1], 'data-imgtmp': tmp[0], src: tmp[0] });
    }
  } else {
    if (idf || idf == 0) return React.createElement(
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
  var title = void 0;
  if (typeof obj == 'string' || typeof obj == 'number' || React.isValidElement(obj)) {
    title = obj;
  } else {
    if (isPlainObject(obj)) {
      title = obj.title;

      if (typeof title === 'string' || typeof title === 'number') {
        if (typeof obj.url == 'string') {
          title = React.createElement(
            'a',
            { className: 'htitle', href: obj.url },
            obj.title
          );
        }
      }

      if (obj.li) {
        title = React.createElement(
          'div',
          { className: 'itemCategory' },
          itemrootCkb,
          React.createElement(
            'div',
            { className: 'caption' },
            title
          ),
          dealWithLi(obj.li)
        );
      }
    }
  }
  return title;
}

// function normalItem(obj){
//   if (typeof obj === 'string' || typeof obj === 'number' || React.isValidElement(obj)) return obj
//   else if (Array.isArray(obj)){
//     return dealWithLi(obj)
//   } else {
//     if (obj.title){
//       let title = obj.title
//       if (obj.url && (typeof title == 'string' || typeof title == 'number')) {
//         title = <a className='htitle' href={obj.url} >{obj.title}</a>
//       }
//       if (obj.li){
//         let _title = title
//         if (typeof title == 'string' || typeof title == 'number') {
//           _title = <span className="caption">{title}</span>
//         }
//         title = (
//           <div className='itemCategory'>
//             {itemrootCkb}
//             {_title}
//             {dealWithLi(obj.li)}
//           </div>
//         )
//       }
//       return title;
//     }
//     else if (obj.li) return dealWithLi(obj.li)
//     return '';
//   }
// }

function dealWithLi(prop_li) {
  var liClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'property-ul';

  var lis = [];
  if (Array.isArray(prop_li)) {
    prop_li.map(function (li_item, li_i) {
      if ((typeof li_item === 'undefined' ? 'undefined' : _typeof(li_item)) != 'object') {
        li_item = { title: li_item };
      }
      var _item = normalItem(li_item);
      var _liItem;
      var _props = { "key": uniqueId('li-') };
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
          _props = merge(_props, data_attr);
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
    return React.createElement('ul', {
      className: liClassName
    }, lis);
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

      // 排序header的三个部件，title, img, li
      var sortMyHead = function sortMyHead() {
        return __sorts.map(function (item) {
          switch (item) {
            case 'title':
              return k2 ? k2 : undefined;
              break;
            case 'img':
              return k4 ? k4 : undefined;
              break;
            case 'li':
              return liDom ? liDom : undefined;
              break;
          }
        });
      };

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

      var __keys = [];
      var __sorts = [];

      if (typeof data == 'string' || typeof data == 'number' || React.isValidElement(data)) {
        data = { title: data };
      }

      if (data.itemClass) clsName = "item " + data.itemClass;
      if (data.itemStyle) {
        //  clsName = 'item';
        sty = data.itemStyle;
      }

      //  var ref = data.foxref
      var ref = _state.foxref;
      var k1 = data.id || '',
          v1 = data.url || 'javascript:void();',
          k2 = data.title || data.caption || data.catName || data.text || data.model || data.quality || data.vender || '',
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
        var property_ul_className = 'property-ul';
        if (data.liClassName) {
          property_ul_className += ' ' + data.liClassName;
        }
        k3 = dealWithLi(data.li, property_ul_className);
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
                //  let props = cloneDeep(title.props)
                //  props.key = 'body_'+i
                //  title = React.createElement(title.type, props)
                title = React.cloneElement(title, { key: 'body_' + i });
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
                  var _property_ul_className = 'property-ul';
                  if (item.liClassName) {
                    _property_ul_className += ' ' + item.liClassName;
                  }
                  var lis = dealWithLi(item.li, _property_ul_className);
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
              var props = merge({}, item.props);
              props.key = 'bodyitem_' + i;
              bodys.push(React.createElement(item.type, props));
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
                //  let props = cloneDeep(title.props)
                //  props.key = 'footer_'+i
                //  title = React.createElement(title.type, props)
                title = React.cloneElement(title, { key: 'footer_' + i });
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
                  var _property_ul_className2 = 'property-ul';
                  if (item.liClassName) {
                    _property_ul_className2 += ' ' + item.liClassName;
                  }
                  var lis = dealWithLi(item.li, _property_ul_className2);
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
              var props = merge({}, item.props);
              props.key = 'footer_' + i;
              footers.push(React.createElement(item.type, props));
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
              //  var props = cloneDeep(it.props)
              //  var styl = props.style;
              //  delete props.style;
              //  var tmp = React.createElement(it.type, props, it.props.children)

              var styl = it.props.style;
              var tmp = React.cloneElement(it, { style: {} });
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

      if (isPlainObject(data)) {
        __sorts = [];
        var accessSortsKeys = ['title', 'img', 'li'];
        Object.keys(data).forEach(function (key, ii) {
          if (accessSortsKeys.indexOf(key) > -1) __sorts.push(key);
        });

        var len = __sorts.length;
        if (len) {
          if (len == 1) __sorts = __sorts.concat([undefined, undefined]);
          if (len == 2) __sorts = __sorts.concat(undefined);
        } else {
          __sorts = [undefined, undefined, undefined];
        }
      }

      if (k2 || k3 || k4) {
        var sortDom = sortMyHead();
        headerDom = React.createElement(
          'div',
          { className: "hheader" },
          sortDom[0],
          sortDom[1],
          sortDom[2]
        );
      }

      //  if(k2 || k3 || k4){
      //    headerDom = liDom
      //    ? (data.img && Array.isArray(data.img)
      //      ? <div className={"hheader"}>{k2}{liDom}{k4}</div>
      //      : <div className={"hheader"}>{k2}{k4}{liDom}</div>)
      //    : (data.img
      //      ? <div className={"hheader"}>{k2}{k4}</div>
      //      : <div className={"hheader"}>{k2}</div>)
      //  }

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
