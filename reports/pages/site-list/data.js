export default function(sql){
	return sql`
		select
			nodes.site,
			nodes.count as nodes,
			taxonomy.terms,
			taxonomy.vocabs
		from
			(select site, sum(count) as count from nodes group by site) as nodes
			left join
				(select site, sum(total) as terms, count(distinct vid) as vocabs from taxonomy_terms group by site) as taxonomy
				on (nodes.site=taxonomy.site);`
}
