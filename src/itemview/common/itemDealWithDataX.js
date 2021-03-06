// const cloneDeep = Aotoo.cloneDeep
const merge = Aotoo.merge
const uniqueId = Aotoo.uniqueId
const isPlainObject = Aotoo.isObject
const itemrootCkb = <input type='checkbox' className='itemrootCkb'/>

var mapKeys = function(obj, cb){
  const keys = Object.keys(obj)
  return keys.map(function(item, ii){
    cb(obj[item], item)
  })
}

function validSingleItem(title) {
  return typeof title == 'string' || typeof title == 'number' || React.isValidElement(title)
}

function sortObject(obj, sortsKey) {
  var sorts = []
  var nomatch = []
  var __sorts = {}
  var __nomatch = {}
  var result
  if (isPlainObject(obj)) {
    const accessSortsKeys = sortsKey || ['title', 'img', 'li']
    Object.keys(obj).forEach(function (key, ii) {
      if (accessSortsKeys.indexOf(key) > -1) {
        // sorts.push(key)
        __sorts[ii] = key
      } else {
        // nomatch.push(key)
        __nomatch[ii] = key
      }
    })
    // return sorts
    return __sorts
  }
}

function itemKey(item, prefix) {
  const dynamicKey = uniqueId(prefix)
  return isPlainObject(item) ? item.key ? item.key : dynamicKey : dynamicKey
}

function blankUrl(url) {
  var re = /^__ */g
  if (url && re.test(url)) {
    return url.replace(re, '')
  }
}

function lazyimg(img, idf){
  if (React.isValidElement(img)) {
    return img
  }
  if (isPlainObject(img)) {
    var __img = {}
    var _url
    var _attr
    var result
    var dataAttrs = {}
    var attributs = ['title', 'src', 'alt', 'url', 'className', 'attr']
    for( var jj=0; jj<attributs.length; jj++) {
      var key = attributs[jj]
      if (img[key]) {
        if (key == 'attr') {
          if (isPlainObject(img['attr'])) {
            Object.keys(img['attr']).forEach(function(k, ii) {
              dataAttrs['data-'+k] = img['attr'][k]
            })
          }
        } 
        else if (key == 'url') {
          _url = blankUrl(img.url)
        }
        else {
          __img[key] = img[key]
        }
      }
    }
    result = <img {...img} />
    if (img.url) {
      result = _url ? <a href={_url} target="_blank">{result}</a> : <a href={img.url}>{result}</a>
    }
    if (img.attr) {
      result = React.cloneElement(result, { ...dataAttrs })
    }
    return result
  } else {
    if (img.indexOf('$$$')>-1){
      var tmp = img.split('$$$')
      if (tmp.length===2){
        if (idf||idf==0) return <li key={'img'+idf} className='himg-item lazyimg'><img data-imgsrc={tmp[1]} data-imgtmp={tmp[0]} src={tmp[0]}/></li>
        return <img className='himg lazyimg' data-imgsrc={tmp[1]} data-imgtmp={tmp[0]} src={tmp[0]}/>
      }
    }
    else{
      if (idf||idf==0) return <li data-iid={idf} key={'img'+idf} className="himg-item" ><img data-imgsrc={img} src={img}/></li>
      return <img className="himg" data-imgsrc={img} src={img}/>
    }
  }
}

function setItemClassName(item, curProps) {
  if (item) {
    if (item.className || item.itemClass) {
      curProps.className = item.itemClass || item.className
    }
  
    if (item.style) {
      curProps.style = item.style
    }
  
    // 激活className
    if (item.activated) {
      if (curProps.className) {
        if (curProps.className.indexOf(' activated') == -1) {
          curProps.className += ' activated'
        }
      } else {
        curProps.className = 'activated'
      }
    }
    
    // 无效className
    if (item.disabled) {
      if (curProps.className) {
        if (curProps.className.indexOf(' disabled') == -1) {
          curProps.className += ' disabled'
        }
      } else {
        curProps.className = 'disabled'
      }
    }
    
    // li className
    if (item.li) {
      curProps.className = curProps.className ? curProps.className + ' itemroot' : 'itemroot'
    }
  }

  return curProps
}

// 处理title及url
// 处理li的相关数据
function normalItem(obj){
  let title
  if (typeof obj == 'string' || typeof obj == 'number' || React.isValidElement(obj)) {
    title = obj
  } else {
    if (isPlainObject(obj)) {
      title = obj.title

      if (typeof title === 'string' || typeof title === 'number') {
        if (typeof obj.url == 'string') {
          var _url = blankUrl(obj.url)
          title = _url ? <a className='htitle' href={_url} target="_blank">{obj.title}</a> : <a className='htitle' href={obj.url} >{obj.title}</a>
        }
      }

      if (obj.li) {
        title = (
          <div className='itemCategory'>
            {itemrootCkb}
            <div className="caption">{title}</div>
            {dealWithLi(obj.li)}
          </div>
        )
      }
    }
  }
  return title
}

function dealWithLi(prop_li, liClassName='property-ul'){
  var lis = []
  if (!Array.isArray(prop_li)) {
    prop_li = [prop_li]
  }
  if(Array.isArray(prop_li)){
    prop_li.forEach(function(li_item, li_i){
      if (typeof li_item != 'object') {
        li_item = {title: li_item}
      }
      var _item = normalItem(li_item);
      var _liItem;
      // var _props = { "key": li_item.key || uniqueId('li-') }
      var _props = { "key": itemKey(li_item, "li_") }
      if (Array.isArray(li_item)){
         _props.className = "nextLevel2";
         _liItem = React.createElement('li', _props, _item)
      } else {
        if (isPlainObject(li_item.attr)){
          let data_attr = {};
          mapKeys(li_item.attr, function(value, key) {
            if (key.indexOf('data-')>-1) data_attr[key] = value;
            else {
              switch (key) {
                case 'className':
                  data_attr['className'] = value
                break;
                case 'style':
                  data_attr['style'] = value
                break;
                default:
                  data_attr['data-'+key] = value;
              }
            }
          });
          _props = merge(_props, data_attr);
        }
        _props = setItemClassName(li_item, _props)
        // if (li_item.li) {   // itemroot
        //   _props.className = li_item.itemClass ? li_item.itemClass+' itemroot' : 'itemroot'
        // } else {
        //   _props.className = li_item.itemClass ? li_item.itemClass : ''
        // }
        _liItem = React.createElement('li', _props, _item)
      }
      lis.push(_liItem)
    })
    return React.createElement('ul', {
      className: liClassName
    }, lis)
  }
}

function ItemPart(item, index, key, cls, type) {
  var i = index
  var __bodys
  var __cls = cls||''
  var __key = key || uniqueId((type||'normal_'))
  if (typeof item === 'string' || typeof item === 'number') {
    __bodys = item
  }

  if (isPlainObject(item)) {
    if (React.isValidElement(item)) {
      __bodys = React.cloneElement(item, { key: __key })
    } else {
      var title = item.title || item.caption || item.text;
      var itemClass = item.itemClass || item.className
      var itemStyle = item.itemStyle || item.style
      var attr = item.attr
      var dataAttr = {}
      
      __cls = item.caption ? __cls + ' caption' : __cls;
      __cls = itemClass ? __cls + ' ' + itemClass : __cls

      if (isPlainObject(attr)) {
        Object.keys(attr).forEach(function (key, ii) {
          dataAttr['data-' + key] = attr[key]
        })
      }

      if (validSingleItem(title) && typeof item.url === 'string') {
        var _url = blankUrl(item.url)
        title = _url ? <a className={'htitle'} href={_url} target="_blank">{title}</a> : <a className={'htitle'} href={item.url}>{title}</a>
      }

      var subItem = (function () {
        var tmp, temp, tmp_img, __imgs
        var part_img, part_li, part_k

        if (item.img) {
          part_img = true
          if (Array.isArray(item.img)) {
            const __imgs = []
            item.img.forEach(function(pic, j) {
              __imgs.push(lazyimg.call(null, pic, j))
            });
            tmp_img = <ul className="himg">{__imgs}</ul>
          } else {
            tmp_img = lazyimg.call(null, item.img);
          }
        }

        if (item.k) {  //k v结构
          part_k = true
          tmp = <div key={__key} data-pid={i} className={__cls}>{title}{tmp_img}{item.k}{item.v}</div>
        }

        if (item.li) {  //li结构
          part_li = true
          let property_ul_className = 'property-ul'
          if (item.liClass || item.liClassName) {
            property_ul_className += ' ' + (item.liClass || item.liClassName)
          }
          var lis = dealWithLi(item.li, property_ul_className)
          tmp = <div key={__key} className={__cls}>{title}{tmp_img}{lis}</div>
        }

        if (tmp) {
          temp = tmp
        }

        if (typeof title == 'string' && !temp) {
          temp = tmp_img ? <div key={__key} data-pid={i} className={__cls}>{title}{tmp_img}</div> : title
        }

        if (React.isValidElement(title) && !temp) {
          temp = tmp_img ? <div key={__key} data-pid={i} className={__cls}>{title}{tmp_img}</div> : React.cloneElement(title, { key: __key })
        }

        if (typeof temp == 'string') {
          if (itemClass || itemStyle || dataAttr) {
            let tempProps = typeof itemClass=='string' ? merge({}, {className: __cls}) : {}
                tempProps = isPlainObject(itemStyle) ? merge(tempProps, {style: itemStyle}) : tempProps
                tempProps = dataAttr ? {...tempProps, ...dataAttr} : tempProps
                tempProps.key = __key
            return <span {...tempProps}>{temp}</span>
          } 
          return temp
        }
        else {
          let itemProps = {}
          if (isPlainObject(itemStyle)) {
            itemProps['style'] = itemStyle
            // temp = React.cloneElement(temp, {style: itemStyle})
          }
          return React.cloneElement(temp, {...itemProps, ...dataAttr, key: __key})
        }
      })()
      
      __bodys = subItem
    }
  }
  return __bodys
}

/*
* 数据处理部分
* f_div / f_li 的公共数据处理部分
*/
function dealWithData(state){
   var clsName = "item";
   var itemStyle = '';
   var sty = {};
   var wid = '';
   const _state = state
   var data = _state.data
   var hoc = _state.hoc
   var items = [];

   if(_state.itemClass) clsName = "item "+_state.itemClass

   if(data){
     if(!Array.isArray(data)){
       var body;
       var footer;
       var dot;

       var bodys = []
       var footers = []
       var dots = []

       var headerDom;
       var bodyDom;
       var footerDom;
       var dotDom;
       var liDom;

       var __keys = [];
       var __sorts = [];

       if (typeof data == 'string' || typeof data== 'number' || React.isValidElement(data)) {
         data = {title: data}
       }

       if (data.itemClass || data.className) {
         const _clsName = data.itemClass || data.className
         clsName += ' ' + _clsName
       }
      //  clsName = "item " + (data.itemClass||data.className||'')
       if(data.itemStyle){
         sty = data.itemStyle;
       }

      //  var ref = data.foxref
       var ref = _state.foxref
       var k1 = data.id||'',
         v1 = data.url||'javascript:void();',
         k2 = data.title||data.caption||data.catName||data.text||data.model||data.quality||data.vender||'',
         v2 = data.attr||'',
         k3, v3 = data.value||'',
         k4, v4 = data.content

       if (data.url) {
        var _url = blankUrl(data.url)
        k2 = _url ? <a className='htitle' href={_url} target="_blank">{k2}</a> : <a className='htitle' href={data.url}>{k2}</a>
       }

       if(data.li){
         let property_ul_className = 'property-ul'
         if (data.liClassName) {
           property_ul_className += ' ' + data.liClassName
         }
         k3 = dealWithLi(data.li, property_ul_className)
       }

       if(data.img){
         if(Array.isArray(data.img)){
           var tmp_k2 = [];
           data.img.forEach( (pic,j) => tmp_k2.push(lazyimg.call({hoc: hoc}, pic, j)) )
           k4 = <ul className="himg">{tmp_k2}</ul>;
         } else{
           k4 = lazyimg.call({hoc: hoc}, data.img)
         }
       }

       if(data.body){
         body = data.body;
         if(!Array.isArray(body)) body = [ body ]
         body.forEach(function(item,i){
           var __key = itemKey(item, 'body_')
           var __cls = 'hb-item'
           var __type = 'body'
           bodys.push( ItemPart(item, i, __key, __cls, __type) )
         })
       }

       if(data.footer){
           footer = data.footer;
           if(!Array.isArray(footer)) footer = [ footer ]
           footer.forEach(function(item,i){
             var __key = itemKey(item, 'footer_')
             var __cls = 'hf-item'
             var __type = 'footer'
             footers.push( ItemPart(item, i, __key, __cls, __type) )
           })
       }

       if(data.dot){
           dot = data.dot;
           if(!Array.isArray(dot)) dot = [ dot ]
           dot.forEach(function(item,i){
             var __key = itemKey(item, 'dot_')
             var __cls = 'hd-item dot'
             var __type = 'dot'
             dots.push( ItemPart(item, i, __key, __cls, __type) )
           })
       }

       if (k3) liDom = k3

       if (isPlainObject(data)) {
         __sorts = []
         const accessSortsKeys = ['title', 'img', 'li']
         Object.keys(data).forEach( function(key, ii){
           if (accessSortsKeys.indexOf(key)>-1) __sorts.push(key)
         })

         const len = __sorts.length
         if (len) {
           if (len == 1) __sorts = __sorts.concat([undefined, undefined])
           if (len ==2) __sorts = __sorts.concat(undefined)
         } else {
           __sorts = [undefined, undefined, undefined]
         }
       }

       // 排序header的三个部件，title, img, li
       function sortMyHead(){
         const sortItems = []
         __sorts.forEach(function(item) {
           switch (item) {
             case 'title':
               sortItems.push(k2 ? k2 : undefined)
               break;
             case 'img':
               sortItems.push(k4 ? k4 : undefined)
               break;
             case 'li':
               sortItems.push(liDom ? liDom : undefined)
               break;
            }
         })
         return sortItems
       }

       if (k2 || k3 || k4) {
         const sortDom = sortMyHead()
         headerDom = (
           <div className={"hheader"}>
             {sortDom[0]}
             {sortDom[1]}
             {sortDom[2]}
           </div>
         )
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

       if(bodys.length){
         bodyDom = data.img && Array.isArray(data.img)
         ? <div className={'hbody rebody'}>{bodys}</div>
         : <div className={'hbody'}>{bodys}</div>
       }

       if(footers.length) footerDom = <div className={'hfoot'}>{footers}</div>
       if(dots.length) dotDom = dots
     }
   }


   var fill = Array.isArray(data)
   ? items
   : (
      ( k4 || (bodyDom || footerDom || dotDom) )
      ? <div className={'inner'}>{headerDom}{bodyDom}{footerDom}{dotDom}</div>
      : liDom
        ? k2
          ? ( React.isValidElement(k2)
            ? <div className="itemCategory">{itemrootCkb}<div className="caption">{k2}</div>{liDom}</div>
            : <div className="itemCategory">{itemrootCkb}<div className="caption">{k2}</div>{liDom}</div> )
          : liDom
        : k2
     )

   return {
     ref: ref,
     k1: k1,
     v1: v1,
     k2: k2,
     v2: v2,
     clsName: clsName,
     sty: sty,
     fill: fill
   }
}

module.exports = dealWithData;
