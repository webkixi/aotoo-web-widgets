const cloneDeep = Aotoo.cloneDeep
const merge = Aotoo.merge
const uniqueId = Aotoo.uniqueId
const isPlainObject = Aotoo.isPlainObject
const filter = Aotoo.filter

var mapKeys = function(obj, cb){
  const keys = Object.keys(obj)
  return keys.map(function(item, ii){
    cb(obj[item], item)
  })
}

// var isPlainObject = function(obj){
//   if (typeof obj == 'object') {
//     return !Array.isArray(obj)
//   }
// }

const itemrootCkb = <input type='checkbox' className='itemrootCkb'/>

function lazyimg(img, idf){
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
          title = <a className='htitle' href={obj.url} >{obj.title}</a>
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
        //  clsName = 'item';
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
        //  k2 = <a href={v1} target="_blank">{k2}</a>
        k2 = <a className='htitle' href={v1}>{k2}</a>
        if (data.target) {
          k2 = <a href={v1} target="_blank">{k2}</a>
        }
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
           if(typeof item==='string'|| typeof item==='number'){
             bodys.push(<div data-pid={i} key={'body_'+i}>{item}</div>)
           }
           if(isPlainObject(item)){
             var cls = item.caption?'hb-item caption':'hb-item';
             if(!React.isValidElement(item)){
               var title = item.title||item.caption||item.text;
               if (React.isValidElement(title)) {
                //  let props = cloneDeep(title.props)
                //  props.key = 'body_'+i
                //  title = React.createElement(title.type, props)
                 title = React.cloneElement(title, {key: 'body_'+i})
               }
               else
               if ( (typeof title==='string'||typeof title=='number') && typeof item.url==='string' ){
                 title = <a className='htitle' href={item.url} key={'body_'+i}>{title}</a>
               }

               var ppp = (function(){
                 if (item.k){  //k v结构
                   return  <div key={'bodyk-'+i} data-pid={i} className={cls}>{title}{item.k}{item.v}</div>
                 }
                 if (item.li){  //li结构
                   let property_ul_className = 'property-ul'
                   if (item.liClassName) {
                     property_ul_className += ' ' + item.liClassName
                   }
                   var lis = dealWithLi(item.li, property_ul_className)
                   return <div key={'bodyul-'+i} className={cls}>{title}{lis}</div>
                 }
                 return title
               })()
               bodys.push(ppp)
             }else{
               let props = merge({}, item.props)
               props.key = 'bodyitem_'+i
               bodys.push(React.createElement(item.type, props))
             }
           }
         })
       }

       if(data.footer){
           footer = data.footer;
           if(!Array.isArray(footer)) footer = [ footer ]

           footer.map(function(item,i){
             if(typeof item==='string'|| typeof item==='number'){
               footers.push(<div data-pid={i} key={'footer'+i}>{item}</div>)
             }
             if(isPlainObject(item)){
                 var cls = item.caption?'hf-item caption':'hf-item';
                 if(!React.isValidElement(item)){
                   var title = item.title||item.caption||item.text;
                   if (React.isValidElement(title)) {
                    //  let props = cloneDeep(title.props)
                    //  props.key = 'footer_'+i
                    //  title = React.createElement(title.type, props)
                    title = React.cloneElement(title, {key: 'footer_'+i})
                   }
                   else
                   if ( (typeof title==='string'||typeof title=='number') && typeof item.url==='string' ){
                     title = <a className='htitle' href={item.url}>{title}</a>
                   }

                   //attr定义一些特殊的状态
                   var ppp = (function(){
                     if (item.k) { //k v结构
                       return <div data-pid={i} key={'footer'+i} className={cls}>{title}{item.k}{item.v}</div>
                     }
                     if (item.li){  //li结构
                       let property_ul_className = 'property-ul'
                       if (item.liClassName) {
                         property_ul_className += ' ' + item.liClassName
                       }
                       var lis = dealWithLi(item.li, property_ul_className)
                       return <div key={'footerul'+i} className={cls}>{title}{lis}</div>
                     }
                     return title
                   })()
                   footers.push(ppp)
                 }else{
                   let props = merge({}, item.props)
                   props.key = 'footer_'+i
                   footers.push(React.createElement(item.type, props))
                 }
             }
           })
       }

       if(data.dot){
           dot = data.dot;
           if(!Array.isArray(dot)) dot = [ dot ]

           dot.map(function(item,i){
               if(typeof item==='string'|| typeof item==='number'){
                 dots.push(<div key={'dot-'+i} data-did={i} key={'dot'+i} className={'dot'}>{item}</div>)
               }
               if(isPlainObject(item)){
                 if(React.isValidElement(item)){
                   var it = item;
                  //  var props = cloneDeep(it.props)
                  //  var styl = props.style;
                  //  delete props.style;
                  //  var tmp = React.createElement(it.type, props, it.props.children)

                   var styl = props.style
                   var tmp = React.cloneElement(it, {style: {}})
                   dots.push(<div data-did={i} key={'dot'+i} className={'dot'} style={styl}>{tmp}</div>)
                 }
                 else {
                   var lft, top, botm, rht;
                   if(item.position){
                     lft = item.position.left
                     top = item.position.top
                     botm = item.position.bottom
                     rht = item.position.right
                   }

                   var styl = (function(){
                     var kkk = {}
                       lft ? kkk.left = lft : '';
                       top ? kkk.top  = top : '';
                       botm ? kkk.bottom = botm : '';
                       rht ? kkk.right = rht : '';
                       return kkk;
                   })()

                   var title = item.title||item.caption||item.text||item.price;
                   if (title &&
                     typeof title==='string' &&
                     item.url &&
                     typeof item.url==='string'
                   ){
                     title = <a className='htitle' href={item.url}>{title}</a>
                   }
                   if(title){
                     dots.push(<div data-did={i} key={'dot'+i} className={'dot'} style={styl}><div>{title}</div></div>)
                   }
                 }
               }
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
