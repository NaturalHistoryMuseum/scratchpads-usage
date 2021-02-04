// Filter out duplication - remove this after running the collection scripts again
const fields = sql => sql`(SELECT * FROM fields GROUP BY field_name, bundle, entity_type, site)`;

const query = (sql, entity, bundle) => sql`SELECT field_name, entity_type, bundle, count(*) as count FROM ${fields}
WHERE entity_type=${entity}${
	sql=>bundle?sql` AND bundle=${bundle}`:sql``
}
GROUP BY field_name, bundle, entity_type
ORDER BY count DESC`

export default async function*(sql, bundles) {
	for(const bundle of bundles) {
		yield { name: bundle, data: await query(sql, 'node', bundle) };
	}
	//yield { name: 'taxonomy_term', data: await query(sql, 'taxonomy_term') };
};
