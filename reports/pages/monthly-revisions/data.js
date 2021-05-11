export default async function(sql){
	const dates = Object.create(null);

	const nodes = await sql`
		select
			month,
			sum(count) as total,
			sum(nodes) as nodes,
			sum(taxa) as taxa,
			sum(users) as users,
			count(*) as sites
		from revisions
		group by month
		order by month desc`;

	return nodes;
}
