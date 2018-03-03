/**
itemView
放回 li 结构, 用于modules/list 调用，作为ul/li部分
*/
// const React = (typeof React != 'undefined' ? React : require('react'))
var dealWithDataMethod = require('./common/itemDealWithDataX')

function getClass(resault){
	const state = this.props
	const data = state.data
	let cls = resault.clsName
	if (data) {
		if (data.className) cls = data.className
		if (data.li) cls += ' itemroot'
	}
	return cls
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

class fox extends React.Component {
	constructor(props) {
		super(props)
		this.dealWithData = this::dealWithDataMethod
	}

	_preRender(){
		this.resault = this.dealWithData(this.props)
		this.idf = this.props.idf
		this.parent = this.props.operate.parent
	}

	render(){
		this._preRender()
		const self = this
		let {ref, k1, v1, k2, v2, clsName, sty, fill} = this.resault
		let data_attr = {}

		const stateData = this.props.data

		if (typeof stateData == 'object') {
			Object.keys(stateData).map( key => {
				const value = stateData[key]
				if (key.indexOf('data-')>-1) { data_attr[key] = value }
				if (key=='attr') {
					Object.keys(stateData['attr']).map(function(item, ii){
						if (item.indexOf('data-')!=0) {
							data_attr['data-'+item] = stateData['attr'][item]
						} else {
							data_attr[item] = stateData['attr'][item]
						}
					})
				}
			})
		}

		const _props = {
			// ref: ref
			id: k1
			, style: sty
			, className: getClass.call(self, this.resault)
		}
		return <li {..._props} {...data_attr}>{fill}</li>
	}
}
module.exports = $Aotoo.wrap(fox);
