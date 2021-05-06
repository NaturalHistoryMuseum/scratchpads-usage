export default async function (sql, sites) {
	const cond = sites ? sql=>sql`WHERE site IN (${sites})` : sql=>sql``;
	return sql`select type, count(site) as sites, sum(count) as sum from nodes ${cond} group by type order by sites desc, sum desc`;
}
