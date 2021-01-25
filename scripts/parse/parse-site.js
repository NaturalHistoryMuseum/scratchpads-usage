
import { unserialize } from 'php-serialize';

async function* getLines(stream) {
	let lastPart = '';
	for await(const part of stream) {
		const parts = (lastPart+part).split('\n');
		lastPart = parts.pop();
		yield* parts;
	}

	yield lastPart;
}

import fs from 'fs';

async function* getSections(lines) {
	let section;

	for await(const line of lines) {
		const m = line.match(/^__([^:]+):(.+)__$/);
		if(m) {
			if(section && section.lines.length) {
				yield section;
			}

			section = {
				type: m[1],
				name: m[2],
				lines: []
			}
			continue;
		}

		if(section && line) {
			section.lines.push(line.split('\t'));
		}
	}

	if(section) {
		// Add blank line at end of file
		//section.lines.push([]);
		yield section;
	}
}

async function parseSection(site, sections, sql) {
	const tables = {};
	console.log(site);
	for await(const section of sections) {
		const tableName = section.name.replace('.', '_');
		tables[section.name] = tableName;
		const table = sql(tableName);
		switch (section.type) {
			case 'table':
				const [header,...lines] = section.lines;
				if(!header) {
					console.warn(`No data for table ${section.name} (${site})`, section)
					break;
				}

				if(header.length === 0) {
					break;
				}

				const columns = sql(header.join(','))

				const rows = lines.map(line => [site, ...line]);

				await sql`CREATE TABLE IF NOT EXISTS ${table} (site, ${columns})`;

				// Have to do inserts in batches since sqlite has a limit on the number of variables it can handle in one statement
				while(rows.length > 0) {
					const values = rows.splice(0, Math.floor(sql.MAX_VARIABLES/rows[0].length));
					await sql`INSERT INTO ${table} (site, ${columns}) VALUES ${values}`;
				}
				break;
			case 'total':
				const count = parseInt(section.lines[1][0], 10);

				await sql`CREATE TABLE IF NOT EXISTS ${table} (site, count INT)`;

				await sql`INSERT INTO ${table} (site, count) VALUES (${site}, ${count})`;
				break;
			case 'serialized':
				const data = unserialize(section.lines[1][0]);

				await sql`CREATE TABLE IF NOT EXISTS ${table} (site, key, value)`;

				for(const [key, value] of Object.entries(data)) {
					await sql`INSERT INTO ${table} (site, key, value) VALUES (${site}, ${key}, ${value})`;
				}
				break;
			default:
				console.warn(`Can't parse table type`, section.type)
		}
	}

	return tables;
}

const main = (site, stream, sql) => parseSection(site, getSections(getLines(stream)), sql);

//main(fs.createReadStream('scripts/data/bio.acousti.ca'), sql);

export default main;
