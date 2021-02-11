import csv from 'papaparse';
import fs from 'fs';
import path from 'path';
import {table} from 'sp-templates';

function loadCsv(file, meta=import.meta) {
	const filepath = path.resolve(new URL(meta.url).pathname, '..', file);

	const csvData = fs.readFileSync(filepath, 'utf-8').trim();

	const parsed = csv.parse(csvData);

	const rows = parsed.data;

	return rows;
}

export default async function csvToTable(headers, file, meta) {
	if(typeof headers === 'string') {
		[headers, file, meta] = [undefined, headers, file];
	}

	const [cols, ...rows] = await loadCsv(file, meta);
	return table(headers??cols, rows);
}
