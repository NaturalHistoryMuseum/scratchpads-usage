export default function(sql){
	return sql`
		select
			system.site as name,
			ifnull(nodes.count, 0) as nodes,
			ifnull(taxonomy.terms, 0) as terms,
			ifnull(taxonomy.vocabs, 0) as vocabs
		from
			(select site from system group by site) as system
			left join
				(select site, sum(count) as count from nodes group by site) as nodes
				on (system.site = nodes.site)
			left join
				(select site, sum(total) as terms, count(distinct vid) as vocabs from taxonomy_terms group by site) as taxonomy
				on (system.site=taxonomy.site);`
}
