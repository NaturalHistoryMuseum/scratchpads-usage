import nodeCounts from './node-counts/main.js';
import recentlyEdited, {options} from './recently-edited/main.js';
import mappings, {assets} from './mappings/main.js'
import fields from './fields/fields.js'
import nodeBreakdown from './node-breakdown/main.js';
import { page, replaceAsset, dedupeCss } from 'sp-templates';
import css from './page.js';

import index from './index/main.js';
import biblio from './biblio-types/main.js';

export { assets};

const INDEX = 'index';

const reports = [
	{ title: 'Recently Edited Sites', id: 'recently-edited', view: recentlyEdited, options },
	{ title: 'Node Counts', id: 'node-count', view: nodeCounts },
	{ title: 'Per-site Node Breakdown', id: 'node-breakdown', view: nodeBreakdown },
	{ title: 'Fields and field usage', id: 'fields', view: fields },
	{ title: 'Biblio Type Data', id: 'biblio-types', view:biblio },
	{ title: mappings().title, id: 'taxonworks-mappings', view: () => mappings().body }
]

function router(menu, id){
	switch(id) {
		case INDEX:
			return {
				title: 'Report index',
				view: ()=>index(menu)
			}
		default:
			return reports.find(m=>m.id===id)
	}
}

export default function Reports({sql, getUrl, getAssetUrl}) {
	const menu = reports.map(r => ({
		title: r.title,
		path: getUrl(r.id)
	}))

	async function getPage(id, options) {
		const route = router(menu, id);
		Object.assign(
			sql,
			{
				sql,
				getUrl: options => getUrl(id, options)
			}
		)
		const view = route ? (await route.view(sql, options)) : 'Page not found';
		const title = route ? route.title : 'Page not found';

		return page(
			{
				title,
				menu:[{name:'Home', href:getUrl(INDEX)}]
				//menu:[{name:'Home', href:'/'}, ...menu.map(m=>({ name:m.title, href:m.path }))]
			},
			[css,
			view]
		).render([dedupeCss(), replaceAsset(getAssetUrl)].reduce((r1,r2)=>v=>r2(r1(v))))
	}

	getPage[Symbol.iterator] = function*(){
		yield [INDEX, getPage(INDEX)];

		for(const m of reports) {
			if(m.options) {
				yield* m.options.map(o=>[m.id, getPage(m.id, o), o])
			} else {
				yield [m.id, getPage(m.id)];
			}
		}
	}

	return getPage;
}
