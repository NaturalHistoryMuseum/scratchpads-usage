
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
		yield section;
	}
}

async function parseSection(site, sections, sql) {
	const tables = {};
	for await(const section of sections) {
		const tableName = section.name.replace('.', '_');
		tables[section.name] = tableName;
		const table = sql(tableName);
		switch (section.type) {
			case 'table':
				const [header,...lines] = section.lines;
				const columns = sql(header.join(','))

				await sql`CREATE TABLE IF NOT EXISTS ${table} (site, ${columns})`;
				for(const line of lines) {
					await sql`INSERT INTO ${table} (site, ${columns}) VALUES (${site}, ${line})`;
				}
				//console.log('table', section.name, header, lines);
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
				console.log(`Can't parse table type`, section.type)
		}
	}

	return tables;
}

const main = (site, stream, sql) => parseSection(site, getSections(getLines(stream)), sql);

//main(fs.createReadStream('scripts/data/bio.acousti.ca'), sql);

export default main;
