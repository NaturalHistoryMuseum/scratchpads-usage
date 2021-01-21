import path from 'path';
import fs from 'fs';
import parseSite from './parse-site.js';

export default async (dataDir, sql) => {
	const name = 'bio.acousti.ca';
	const stream = fs.createReadStream(path.join(dataDir, name));
	return parseSite(name, stream, sql);
}
