import {table} from 'sp-templates';

/**
 * Template for most recently used sites table
 */
export default (data) => {
	return table(
		['site', 'site_created', 'node_created', 'node_updated', 'taxon_updated'],
		data
	)
};
