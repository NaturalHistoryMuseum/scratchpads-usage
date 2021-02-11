export default function(sql) {
	return sql`select biblio_type, name, count(*) as count from biblio_types group by biblio_type order by count desc;`
}
