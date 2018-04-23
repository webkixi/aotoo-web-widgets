'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// const cloneDeep = $Aotoo.cloneDeep
var merge = Aotoo.merge;
var uniqueId = Aotoo.uniqueId;
// const isPlainObject = $Aotoo.isPlainObject
var isPlainObject = Aotoo.isObject;
// const filter = $Aotoo.filter
var itemrootCkb = React.createElement('input', { type: 'checkbox', className: 'itemrootCkb' });

var mapKeys = function mapKeys(obj, cb) {
  var keys = Object.keys(obj);
  return keys.map(function (item, ii) {
    cb(obj[item], item);
  });
};

function validSingleItem(title) {
  return typeof title == 'string' || typeof title == 'number' || React.isValidElement(title);
}

function sortObject(obj, sortsKey) {
  var sorts = [];
  var nomatch = [];
  var __sorts = {};
  var __nomatch = {};
  var result;
  if (isPlainObject(obj)) {
    var accessSortsKeys = sortsKey || ['title', 'img', 'li'];
    Object.keys(obj).forEach(function (key, ii) {
      if (accessSortsKeys.indexOf(key) > -1) {
        // sorts.push(key)
        __sorts[ii] = key;
      } else {
        // nomatch.push(key)
        __nomatch[ii] = key;
      }
    });
    // return sorts
    return __sorts;
  }
}

function blankUrl(url) {
  var re = /^__ */g;
  if (url && re.test(url)) {
    return url.replace(re, '');
  }
}

function lazyimg(img, idf) {
  if (React.isValidElement(img)) {
    return img;
  }
  if (isPlainObject(img)) {
    var __img = {};
    var _url;
    var _attr;
    var result;
    var dataAttrs = {};
    var attributs = ['title', 'src', 'alt', 'url', 'className', 'attr'];
    for (var jj = 0; jj < attributs.length; jj++) {
      var key = attributs[jj];
      if (img[key]) {
        if (key == 'attr') {
          if (isPlainObject(img['attr'])) {
            Object.keys(img['attr']).forEach(function (k, ii) {
              dataAttrs['data-' + k] = img['attr'][k];
            });
          }
        } else if (key == 'url') {
          _url = blankUrl(img.url);
        } else {
          __img[key] = img[key];
        }
      }
    }
    result = React.createElement('img', img);
    if (img.url) {
      result = _url ? React.createElement(
        'a',
        { href: _url, target: '_blank' },
        result
      ) : React.createElement(
        'a',
        { href: img.url },
        result
      );
    }
    if (img.attr) {
      result = React.cloneElement(result, _extends({}, dataAttrs));
    }
    return result;
  } else {
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
          var _url = blankUrl(obj.url);
          title = _url ? React.createElement(
            'a',
            { className: 'htitle', href: _url, target: '_blank' },
            obj.title
          ) : React.createElement(
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

function ItemPart(item, index, key, cls, type) {
  var i = index;
  var __bodys;
  var __cls = cls;
  var __key = key;
  if (typeof item === 'string' || typeof item === 'number') {
    __bodys = item;
  }

  if (isPlainObject(item)) {
    if (React.isValidElement(item)) {
      __bodys = React.cloneElement(item, { key: __key });
    } else {
      var title = item.title || item.caption || item.text;
      var itemClass = item.itemClass || item.className;
      var itemStyle = item.itemStyle || item.style;
      var attr = item.attr;
      var dataAttr = {};

      __cls = item.caption ? __cls + ' caption' : __cls;
      __cls = itemClass ? __cls + ' ' + itemClass : __cls;

      if (isPlainObject(attr)) {
        Object.keys(attr).forEach(function (key, ii) {
          dataAttr['data-' + key] = attr[key];
        });
      }

      if (validSingleItem(title) && typeof item.url === 'string') {
        var _url = blankUrl(item.url);
        title = _url ? React.createElement(
          'a',
          { className: 'htitle', href: _url, target: '_blank' },
          title
        ) : React.createElement(
          'a',
          { className: 'htitle', href: item.url },
          title
        );
      }

      var subItem = function () {
        var tmp, temp, tmp_img, __imgs;
        var part_img, part_li, part_k;

        if (item.img) {
          part_img = true;
          if (Array.isArray(item.img)) {
            __imgs = item.img.map(function (pic, j) {
              return lazyimg.call(null, pic, j);
            });
            tmp_img = React.createElement(
              'ul',
              { className: 'himg' },
              __imgs
            );
          } else {
            tmp_img = lazyimg.call(null, item.img);
          }
        }

        if (item.k) {
          //k v结构
          part_k = true;
          tmp = React.createElement(
            'div',
            { key: __key, 'data-pid': i, className: __cls },
            title,
            tmp_img,
            item.k,
            item.v
          );
        }

        if (item.li) {
          //li结构
          part_li = true;
          var property_ul_className = 'property-ul';
          if (item.liClass || item.liClassName) {
            property_ul_className += ' ' + (item.liClass || item.liClassName);
          }
          var lis = dealWithLi(item.li, property_ul_className);
          tmp = React.createElement(
            'div',
            { key: __key, className: __cls },
            title,
            tmp_img,
            lis
          );
        }

        if (tmp) {
          temp = tmp;
        }

        if (typeof title == 'string' && !temp) {
          temp = tmp_img ? React.createElement(
            'div',
            { key: __key, 'data-pid': i, className: __cls },
            title,
            tmp_img
          ) : title;
        }

        if (React.isValidElement(title) && !temp) {
          temp = tmp_img ? React.createElement(
            'div',
            { key: __key, 'data-pid': i, className: __cls },
            title,
            tmp_img
          ) : React.cloneElement(title, { key: __key });
        }

        if (typeof temp == 'string') {
          if (itemClass || itemStyle || dataAttr) {
            var tempProps = typeof itemClass == 'string' ? merge({}, { className: __cls }) : {};
            tempProps = isPlainObject(itemStyle) ? merge(tempProps, { style: itemStyle }) : tempProps;
            tempProps = dataAttr ? _extends({}, tempProps, dataAttr) : tempProps;
            return React.createElement(
              'span',
              tempProps,
              temp
            );
          }
          return temp;
        } else {
          var itemProps = {};
          if (isPlainObject(itemStyle)) {
            itemProps['style'] = itemStyle;
            // temp = React.cloneElement(temp, {style: itemStyle})
          }
          return React.cloneElement(temp, _extends({}, itemProps, dataAttr));
        }
      }();

      __bodys = subItem;
    }
  }
  return __bodys;
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
        var _url = blankUrl(data.url);
        k2 = _url ? React.createElement(
          'a',
          { className: 'htitle', href: _url, target: '_blank' },
          k2
        ) : React.createElement(
          'a',
          { className: 'htitle', href: data.url },
          k2
        );
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
          var __key = 'body_' + i;
          var __cls = 'hb-item';
          var __type = 'body';
          bodys.push(ItemPart(item, i, __key, __cls, __type));
        });
      }

      if (data.footer) {
        footer = data.footer;
        if (!Array.isArray(footer)) footer = [footer];
        footer.map(function (item, i) {
          var __key = 'footer_' + i;
          var __cls = 'hf-item';
          var __type = 'footer';
          footers.push(ItemPart(item, i, __key, __cls, __type));
        });
      }

      if (data.dot) {
        dot = data.dot;
        if (!Array.isArray(dot)) dot = [dot];
        dot.map(function (item, i) {
          var __key = 'dot_' + i;
          var __cls = 'hd-item dot';
          var __type = 'dot';
          dots.push(ItemPart(item, i, __key, __cls, __type));
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
//# sourceMappingURL=../../maps/itemview/common/itemDealWithDataX.js.map
