// Get a list of the most recently edited sites

const recentNodes = sql => sql`select site,	changed,	TRUE as isNode	from recent_changednodes`;
const recentTaxon = sql => sql`select site,	timestamp as changed,	NULL as isNode	from recent_taxonomy`;

export const sortColumns = ['changed', 'nodes', 'taxa'];

export default async function getRecent(sql, sort='changed') {
	if(!sortColumns.includes(sort)) {
		throw new TypeError(`Invalid sort column '${sort}'`);
	}
	const sites = await sql`
		SELECT
			site,
			max(changed) AS changed,
			COUNT(isNode) AS nodes,
			COUNT(*)-COUNT(isNode) AS taxa,
			COUNT(*) as total
		FROM (${recentNodes} UNION ${recentTaxon})
		GROUP BY site
		ORDER BY ${sql(sort)} DESC`

	for(const site of sites) {
		site.changed = new Date(parseInt(site.changed, 10)*1000);
	}

	return sites;
}
