import nodeCounts from './node-counts/main.js';
import recentlyEdited, {options} from './recently-edited/main.js';
import mappings from './mappings/main.js'
import fields from './fields/fields.js'
import { page } from 'sp-templates';

import index from './index.js';

const INDEX = 'index';

const reports = [
	{ title: mappings().title, id: 'taxonworks-mappings', view: () => mappings().body },
	{ title: 'Node Counts', id: 'node-count', view: nodeCounts },
	{ title: 'Recently Edited Sites', id: 'recently-edited', view: recentlyEdited, options },
	{ title: 'Fields', id: 'fields', view: fields }
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

export default function Reports(sql, urlFor = id => '/' + id + '.html') {
	const menu = reports.map(r => ({
		title: r.title,
		path: urlFor(r.id)
	}))

	async function getPage(id, options) {
		const route = router(menu, id);
		Object.assign(
			sql,
			{
				sql,
				getUrl: options => urlFor(id, options)
			}
		)
		const view = route ? (await route.view(sql, options)) : 'Page not found';
		const title = route ? route.title : 'Page not found';

		return page(
			{
				title,
				menu:[{name:'Home', href:urlFor(INDEX)}]
				//menu:[{name:'Home', href:'/'}, ...menu.map(m=>({ name:m.title, href:m.path }))]
			},
			view
		).render()
	}

	getPage[Symbol.iterator] = function*(){
		yield [INDEX, getPage(INDEX)];

		for(const m of reports) {
			if(m.options) {
				yield* m.options.map(o=>[m.id, getPage(m.id, o), o])
			}

			yield [m.id, getPage(m.id)];
		}
	}

	return getPage;
}
