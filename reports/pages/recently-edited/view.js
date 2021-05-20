import {table} from 'sp-templates';

const MINUTE = 60;
const HOUR = 60*MINUTE;
const DAY = 24*HOUR;
const WEEK = 7*DAY;
const YEAR = 365*DAY;

function secToInt(seconds){
	if(seconds >= YEAR) {
		return (seconds/YEAR).toFixed(1) + ' years';
	}

	if(seconds >= WEEK) {
		return Math.round(seconds/WEEK) + ' weeks';
	}

	if(seconds >= DAY) {
		return Math.round(seconds/DAY) + ' days';
	}

	if(seconds >= HOUR) {
		return Math.round(seconds/HOUR) + ' hours';
	}

	if(seconds >= MINUTE) {
		return Math.round(seconds/MINUTE) + ' minutes';
	}

	return seconds + ' seconds';
}

/**
 * Template for most recently used sites table
 */
 export default (data) => {
	return table(
		['site', ['Date created', r=>new Date(r.site_created).toISOString()], 'node_created', 'node_updated', 'taxon_updated', ['Dormancy interval (rounded)', r=>secToInt(r.update_interval)], ['Dormancy interval (seconds)', 'update_interval']],
		data
	)
};
