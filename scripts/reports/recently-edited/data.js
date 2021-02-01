// Get a list of the most recently edited sites

const recentNodes = sql => sql`select site,	changed,	TRUE as isNode	from recent_changednodes`;
const recentTaxon = sql => sql`select site,	timestamp as changed,	NULL as isNode	from recent_taxonomy`;

export default async function getRecent(sql) {
	const sites = await sql`
		SELECT
			site,
			max(changed) AS changed,
			COUNT(isNode) AS nodes,
			COUNT(*)-COUNT(isNode) AS taxa,
			COUNT(*) as total
		FROM (${recentNodes} UNION ${recentTaxon})
		GROUP BY site
		ORDER BY changed DESC`

	for(const site of sites) {
		site.changed = new Date(parseInt(site.changed, 10)*1000);
	}

	return sites;
}
