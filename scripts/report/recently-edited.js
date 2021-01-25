// Get a list of the most recently edited sites

const recentNodes = sql => sql`select site, changed from recent_changednodes`;
const recentTaxon = sql => sql`select site, timestamp as changed from recent_taxonomy`;

export default async function getRecent(sql) {
	const sites =	await sql`select site, max(changed) as changed from (${recentNodes} union ${recentTaxon}) group by site order by changed desc`

	for(const site of sites) {
		site.changed = new Date(parseInt(site.changed, 10)*1000);
	}

	return sites;
}
