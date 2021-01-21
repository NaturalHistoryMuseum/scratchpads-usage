import bioacoustica from './bio.acousti.ca.js';
import getscratchpadsorg from './get.scratchpads.org.js';

export default async (datadir, sql) => {
	return {
		...await bioacoustica(datadir, sql),
		...await getscratchpadsorg(datadir, sql)
	}
}
