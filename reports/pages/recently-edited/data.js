// Get a list of the most recently edited sites

export default async function getRecent(sql) {
	return sql`
	select
		created.site,
		datetime(created.created, 'unixepoch') as site_created,
		datetime(cnode.created) as node_created,
		datetime(unode.updated) as node_updated,
		datetime(taxon.updated) as taxon_updated,
		MIN(
			case when unode.diff == 'NULL' then 9e999 else CAST(unode.diff as decimal) end,
			case when taxon.diff == 'NULL' then 9e999 else CAST(taxon.diff as decimal) end
		) as update_interval
	from created
		left join last_created_node as cnode on (cnode.site=created.site)
		left join last_updated_node as unode on (unode.site=created.site)
		left join last_updated_taxon as taxon on (taxon.site=created.site)
	order by
		max(
			node_created,
			node_updated,
			taxon_updated
		) desc,
		site_created desc
	;`
}
