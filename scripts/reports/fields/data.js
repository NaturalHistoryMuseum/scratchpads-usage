export default sql => sql`SELECT site, field_name, entity_type, bundle, count(*) as c FROM fields
	WHERE field_name='endpoints'
	GROUP BY bundle, site
	ORDER BY c DESC
`;

//count(*) AS count
//GROUP BY field_name, entity_type, bundle
//	ORDER BY count DESC
