-- Each section is prefixed by a descriptor that indicates how the data should be parsed once generated
-- table: indicates rows should be treated as-is
-- serialized: indicates each row consists of a single field that has been generated by php#s serialize function
-- total: indicates each row contains a single field representing a number that should be totaled

select "__table:system__" as ``;
--  All modules available and status
select name, status from system;

-- Entity list
-- NB: This might not be reliable if scratchpads_statistics cron job is disabled on newer sites
select "__table:entities__" as ``;
select entity, bundle from scratchpads_statistics_entity_bundle;

-- All nodes
select "__table:nodes__" as ``;
select type, count(*) as count from node where status>0 group by type;

-- Entity/bundle fields
select "__table:fields__" as '';
select field_name, entity_type, bundle from field_config_instance where field_id>0 and deleted=0;

select "__serialized:vids.biological__" as ``;
select value from variable where name like "biological_vids";

select "__serialized:vids.nonbiological__" as ``;
select value from variable where name like "none_biological_vids";

select "__table:taxonomy_terms__" as '';
select t.name, t.machine_name, t.vid, count(*) as total from taxonomy_term_data as d left join taxonomy_vocabulary as t on(t.vid=d.vid) group by vid;

-- Node and taxonomy edits per month
-- If we wanted to count users per entity type we could include  count(distinct if(type='node', uid, null)), count(distinct if(type='taxonomy', uid, null))
select "__table:revisions__" as ``;
select date_format(from_unixtime(timestamp), '%Y-%m') as month, count(*) as count, count(if(type='node', 1, null)) as nodes, count(if(type='taxon', 1, null)) as taxa, count(distinct uid) as users from (select timestamp, 'taxon' as type, uid from taxonomy_term_data_revision union all select timestamp, 'node' as type, uid from node_revision order by timestamp desc) as revisions group by month;

-- Biblio usage data
select "__table:biblio.types__" as ``;
select distinct biblio_type, name from biblio left join biblio_types on (biblio.biblio_type=biblio_types.tid);

select "__table:biblio.fields__" as ``;
select * from (
select "biblio_number" as name, count(*) as count from biblio where biblio_number is not null and biblio_number != ''
union
select "biblio_other_number" as name, count(*) as count from biblio where biblio_other_number is not null and biblio_other_number != ''
union
select "biblio_sort_title" as name, count(*) as count from biblio where biblio_sort_title is not null and biblio_sort_title != ''
union
select "biblio_secondary_title" as name, count(*) as count from biblio where biblio_secondary_title is not null and biblio_secondary_title != ''
union
select "biblio_tertiary_title" as name, count(*) as count from biblio where biblio_tertiary_title is not null and biblio_tertiary_title != ''
union
select "biblio_edition" as name, count(*) as count from biblio where biblio_edition is not null and biblio_edition != ''
union
select "biblio_publisher" as name, count(*) as count from biblio where biblio_publisher is not null and biblio_publisher != ''
union
select "biblio_place_published" as name, count(*) as count from biblio where biblio_place_published is not null and biblio_place_published != ''
union
select "biblio_year" as name, count(*) as count from biblio where biblio_year is not null and biblio_year != ''
union
select "biblio_volume" as name, count(*) as count from biblio where biblio_volume is not null and biblio_volume != ''
union
select "biblio_pages" as name, count(*) as count from biblio where biblio_pages is not null and biblio_pages != ''
union
select "biblio_date" as name, count(*) as count from biblio where biblio_date is not null and biblio_date != ''
union
select "biblio_isbn" as name, count(*) as count from biblio where biblio_isbn is not null and biblio_isbn != ''
union
select "biblio_lang" as name, count(*) as count from biblio where biblio_lang is not null and biblio_lang != ''
union
select "biblio_abst_e" as name, count(*) as count from biblio where biblio_abst_e is not null and biblio_abst_e != ''
union
select "biblio_abst_f" as name, count(*) as count from biblio where biblio_abst_f is not null and biblio_abst_f != ''
union
select "biblio_full_text" as name, count(*) as count from biblio where biblio_full_text is not null and biblio_full_text != ''
union
select "biblio_url" as name, count(*) as count from biblio where biblio_url is not null and biblio_url != ''
union
select "biblio_issue" as name, count(*) as count from biblio where biblio_issue is not null and biblio_issue != ''
union
select "biblio_type_of_work" as name, count(*) as count from biblio where biblio_type_of_work is not null and biblio_type_of_work != ''
union
select "biblio_accession_number" as name, count(*) as count from biblio where biblio_accession_number is not null and biblio_accession_number != ''
union
select "biblio_call_number" as name, count(*) as count from biblio where biblio_call_number is not null and biblio_call_number != ''
union
select "biblio_notes" as name, count(*) as count from biblio where biblio_notes is not null and biblio_notes != ''
union
select "biblio_custom1" as name, count(*) as count from biblio where biblio_custom1 is not null and biblio_custom1 != ''
union
select "biblio_custom2" as name, count(*) as count from biblio where biblio_custom2 is not null and biblio_custom2 != ''
union
select "biblio_custom3" as name, count(*) as count from biblio where biblio_custom3 is not null and biblio_custom3 != ''
union
select "biblio_custom4" as name, count(*) as count from biblio where biblio_custom4 is not null and biblio_custom4 != ''
union
select "biblio_custom5" as name, count(*) as count from biblio where biblio_custom5 is not null and biblio_custom5 != ''
union
select "biblio_custom6" as name, count(*) as count from biblio where biblio_custom6 is not null and biblio_custom6 != ''
union
select "biblio_custom7" as name, count(*) as count from biblio where biblio_custom7 is not null and biblio_custom7 != ''
union
select "biblio_research_notes" as name, count(*) as count from biblio where biblio_research_notes is not null and biblio_research_notes != ''
union
select "biblio_number_of_volumes" as name, count(*) as count from biblio where biblio_number_of_volumes is not null and biblio_number_of_volumes != ''
union
select "biblio_short_title" as name, count(*) as count from biblio where biblio_short_title is not null and biblio_short_title != ''
union
select "biblio_alternate_title" as name, count(*) as count from biblio where biblio_alternate_title is not null and biblio_alternate_title != ''
union
select "biblio_original_publication" as name, count(*) as count from biblio where biblio_original_publication is not null and biblio_original_publication != ''
union
select "biblio_reprint_edition" as name, count(*) as count from biblio where biblio_reprint_edition is not null and biblio_reprint_edition != ''
union
select "biblio_translated_title" as name, count(*) as count from biblio where biblio_translated_title is not null and biblio_translated_title != ''
union
select "biblio_section" as name, count(*) as count from biblio where biblio_section is not null and biblio_section != ''
union
select "biblio_citekey" as name, count(*) as count from biblio where biblio_citekey is not null and biblio_citekey != ''
union
select "biblio_coins" as name, count(*) as count from biblio where biblio_coins is not null and biblio_coins != ''
union
select "biblio_doi" as name, count(*) as count from biblio where biblio_doi is not null and biblio_doi != ''
union
select "biblio_issn" as name, count(*) as count from biblio where biblio_issn is not null and biblio_issn != ''
union
select "biblio_auth_address" as name, count(*) as count from biblio where biblio_auth_address is not null and biblio_auth_address != ''
union
select "biblio_remote_db_name" as name, count(*) as count from biblio where biblio_remote_db_name is not null and biblio_remote_db_name != ''
union
select "biblio_remote_db_provider" as name, count(*) as count from biblio where biblio_remote_db_provider is not null and biblio_remote_db_provider != ''
union
select "biblio_label" as name, count(*) as count from biblio where biblio_label is not null and biblio_label != ''
union
select "biblio_access_date" as name, count(*) as count from biblio where biblio_access_date is not null and biblio_access_date != ''
union
select "biblio_refereed" as name, count(*) as count from biblio where biblio_refereed is not null and biblio_refereed != ''
union
select "biblio_md5" as name, count(*) as count from biblio where biblio_md5 is not null and biblio_md5 != ''
union
select "biblio_formats" as name, count(*) as count from biblio where biblio_formats is not null and biblio_formats != '') as t1;

-- User data
-- This is sensitive so make sure we don't publish it anywhere
-- Only use it for internal stats
select "__table:users__" as ``;
select users.uid, name, mail, from_unixtime(login) as login, from_unixtime(access) as access, status, !isnull(role.uid) as maintainer from users left join users_roles as role on(users.uid=role.uid and role.rid=5) where status > 0;

-- Dates
-- Date the site was created
select "__table:created__" as ``;
select created from users where uid=1;

-- Date of last created node
select "__table:last_created_node" as ``;
select from_unixtime(max(created)) as created from node;

-- Date of last updated node
select "__table:last_updated_node" as ``;
SELECT
	MAX(diff) as diff,
	FROM_UNIXTIME(MAX(timestamp)) as updated
FROM (
	SELECT
		IF(@prev_time=0, NULL, node_revision.timestamp-@prev_time) as diff,
		@prev_time:=node_revision.timestamp as timestamp
	FROM
		node_revision,
		(SELECT @prev_time:=0 AS num) as v
	ORDER BY node_revision.timestamp ASC
)
AS t;

-- Date of last updated taxon
select "__table:last_updated_taxon" as ``;
SELECT
	MAX(diff) as diff,
	FROM_UNIXTIME(MAX(timestamp)) as updated
FROM (
	SELECT
		IF(@prev_time=0, NULL, taxonomy_term_data_revision.timestamp-@prev_time) as diff,
		@prev_time:=taxonomy_term_data_revision.timestamp as timestamp
	FROM
		taxonomy_term_data_revision,
		(SELECT @prev_time:=0 AS num) as v
	ORDER BY taxonomy_term_data_revision.timestamp ASC
)
AS t;
