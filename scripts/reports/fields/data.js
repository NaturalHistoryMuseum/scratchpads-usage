// Dedupe field query
const field_usage = sql => sql`select * from field_usage where count!='0' group by name, site`;
const fieldUsageCount = sql => sql`select name, count(*) as count from (${field_usage}) as t1 group by name`;

const query = (sql, entity, bundle) =>sql`
SELECT field_name, entity_type, bundle, count(*) as count, usage.count as usage
FROM
	fields
	LEFT JOIN
		(${fieldUsageCount}) AS usage
		ON (fields.field_name = usage.name)
WHERE entity_type=${entity}${
	sql=>bundle?sql` AND bundle=${bundle}`:sql``
}
GROUP BY field_name, bundle, entity_type
ORDER BY usage DESC`

export default async function*(sql, bundles) {
	for(const bundle of bundles) {
		yield { name: bundle, data: await query(sql, 'node', bundle) };
	}
	//yield { name: 'taxonomy_term', data: await query(sql, 'taxonomy_term') };
};

export function biblio(sql) {
	return sql`SELECT name, count(*) as sites, sum(biblio_fields.count) as total FROM biblio_fields where count!='0' group by name order by sites desc, total desc;`;
}
