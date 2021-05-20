// Get a list of the most recently edited sites

export default async function getRecent(sql) {
	return sql`
	select
		created.site,
		created.created as site_created,
		cnode.created as node_created,
		unode.updated as node_updated,
		taxon.updated as taxon_updated
	from created
		left join last_created_node as cnode on (cnode.site=created.site)
		left join last_updated_node as unode on (unode.site=created.site)
		left join last_updated_taxon as taxon on (taxon.site=created.site)
	order by
		max(
			case when node_created == 'NULL' then '0' else node_created end,
			case when node_updated == 'NULL' then '0' else node_updated end,
			case when taxon_updated == 'NULL' then '0' else taxon_updated end
		) desc,
		site_created desc
	;`
}
