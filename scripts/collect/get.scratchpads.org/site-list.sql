-- Get a list of site names from the aegir database
select node.title
from
	hosting_site as s
	left join node on (node.nid=s.nid)
	left join node as p on (s.platform=p.nid)
where
	s.status>0
	and p.title like "scratchpads-%";
