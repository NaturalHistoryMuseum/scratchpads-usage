export default async function(sql){
	const dates = Object.create(null);

	const nodes = await sql`select time, sum(count) as count from monthly_revisions_nodes group by time`;
	for(const node of nodes) {
		dates[node.time] = {
			nodes: node.count,
			taxonomy: 0,
			date: node.time
		}
	}

	const taxa = await sql`select time, sum(count) as count from monthly_revisions_taxonomy group by time`;
	for(const taxon of taxa) {
		const r = dates[taxon.time] ?? (dates[taxon.time] = {
			nodes: 0,
			date: taxon.time
		});

		r.taxonomy = taxon.count;
	}

	return Object.keys(dates).sort().map(d=>dates[d]);
}
