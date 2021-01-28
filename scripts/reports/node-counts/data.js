export default async function (sql) {
	return sql`select type, count(site) as sites, sum(count) as sum from nodes group by type order by sites desc, sum desc`;
}
