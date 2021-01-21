import path from 'path';
import fs from 'fs';
import parseSite from './parse-site.js';

export default async (dataDir, sql) => {
	const directory = path.join(dataDir, 'get.scratchpads.org');
	const tables = {};

	for await(const file of await fs.promises.opendir(directory)) {
		const name = file.name;

		const stream = fs.createReadStream(path.join(directory, name));
		Object.assign(tables, await parseSite(name, stream, sql));
	}

	return tables;
}
