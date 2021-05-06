import view from './view.js';

import getRecent from '../recently-edited/data.js';
import getNodes from '../node-counts/data.js';

async function getData(sql) {
	const sites = await getRecent(sql);

	const siteNames = sites.map(site => site.site);

	const cols = await getNodes(sql, siteNames);

	const nodes = cols.map(c=>c.type)

	return [ nodes, await Promise.all(siteNames.map(
		async s=>{
			const counts = await sql`select type, count from nodes WHERE site=${s}`;

			return [s, ...nodes.map(n=>counts.find(c=>c.type===n)?.count??'')]
		}))]
}

export default async sql=>view(
	...await getData(sql)
)
