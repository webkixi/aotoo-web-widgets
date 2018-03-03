const cloneDeep = $Aotoo.cloneDeep
const merge = $Aotoo.merge
const uniqueId = $Aotoo.uniqueId
const isPlainObject = $Aotoo.isPlainObject
const filter = $Aotoo.filter
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
      result = _url ? <a href={_url} target="_blank">{result}</a> : <a href={_url}>{result}</a>
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
  if(Array.isArray(prop_li)){
    prop_li.map(function(li_item, li_i){
      if (typeof li_item != 'object') {
        li_item = {title: li_item}
      }
      var _item = normalItem(li_item);
      var _liItem;
      var _props = { "key": uniqueId('li-') }
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
        if (li_item.li) {   // itemroot
          _props.className = li_item.itemClass ? li_item.itemClass+' itemroot' : 'itemroot'
        } else {
          _props.className = li_item.itemClass ? li_item.itemClass : ''
        }
        _liItem = React.createElement('li', _props, _item)
      }
      lis.push(_liItem)
    })
    return React.createElement('ul', {
      className: liClassName
    }, lis)
  }
  else{
    lis.push(<li key={'li-'+li_i}>{prop_li}</li>)
    return React.createElement('ul', {
      className: liClassName
    }, lis)
  }
}

function ItemPart(item, index, key, cls, type) {
  var i = index
  var __bodys
  var __cls = cls
  var __key = key
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
      __cls = item.caption ? __cls + ' caption' : __cls;
      __cls = itemClass ? __cls + ' ' + itemClass : __cls

      if (validSingleItem(title) && typeof item.url === 'string') {
        var _url = blankUrl(item.url)
        title = _url ? <a className={'htitle'} href={_url} target="_blank">{title}</a> : <a className={'htitle'} href={item.url}>{title}</a>
      }

      var subItem = (function () {
        var tmp, temp, tmp_img, __imgs

        if (item.img) {
          if (Array.isArray(item.img)) {
            __imgs = item.img.map(function(pic, j) {
              return lazyimg.call(null, pic, j);
            });
            tmp_img = <ul className="himg">{__imgs}</ul>
          } else {
            tmp_img = lazyimg.call(null, item.img);
          }
        }

        if (item.k) {  //k v结构
          tmp = <div key={__key} data-pid={i} className={__cls}>{title}{tmp_img}{item.k}{item.v}</div>
        }

        if (item.li) {  //li结构
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

        if (typeof title == 'string') {
          temp = title
        }

        if (React.isValidElement(title)) {
          temp = React.cloneElement(title, { key: __key })
        }

        if (typeof temp == 'string') return temp
        else {
          if (isPlainObject(itemStyle)) {
            temp = React.cloneElement(temp, {style: itemStyle})
          }

          if (isPlainObject(attr)) {
            var dataAttr = {}
            Object.keys(attr).forEach(function(key, ii) {
              dataAttr['data-'+key] = attr[key]
            })
            temp = React.cloneElement(temp, { ...dataAttr })
          }
          
          return temp
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

       if(data.itemClass) clsName = "item "+data.itemClass
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
           tmp_k2 = data.img.map( (pic,j) => lazyimg.call({hoc: hoc}, pic, j) )
           k4 = <ul className="himg">{tmp_k2}</ul>;
          //  k4 = k2 = <ul className="himg">{tmp_k2}</ul>;
         } else{
           k4 = lazyimg.call({hoc: hoc}, data.img)
         }
       }

       if(data.body){
         body = data.body;
         if(!Array.isArray(body)) body = [ body ]
         body.map(function(item,i){
           var __key = 'body_'+i
           var __cls = 'hb-item'
           var __type = 'body'
           bodys.push( ItemPart(item, i, __key, __cls, __type) )
         })
       }

       if(data.footer){
           footer = data.footer;
           if(!Array.isArray(footer)) footer = [ footer ]
           footer.map(function(item,i){
             var __key = 'footer_' + i
             var __cls = 'hf-item'
             var __type = 'footer'
             footers.push( ItemPart(item, i, __key, __cls, __type) )
           })
       }

       if(data.dot){
           dot = data.dot;
           if(!Array.isArray(dot)) dot = [ dot ]
           dot.map(function(item,i){
             var __key = 'dot_' + i
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
         return __sorts.map(function(item) { 
           switch (item) {
             case 'title':
               return k2 ? k2 : undefined
               break;
             case 'img':
               return k4 ? k4 : undefined
               break;
             case 'li':
               return liDom ? liDom : undefined
               break;
            }
         })
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
            ? <div className="itemCategory">{itemrootCkb}{k2}{liDom}</div>
            : <div className="itemCategory">{itemrootCkb}<span className="caption">{k2}</span>{liDom}</div> )
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