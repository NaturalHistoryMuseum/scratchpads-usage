import csv from 'papaparse';
import fs from 'fs';
import path from 'path';

export default function loadCsv(file, meta=import.meta) {
	const filepath = path.resolve(new URL(meta.url).pathname, '..', file);

	const csvData = fs.readFileSync(filepath, 'utf-8').trim();

	const parsed = csv.parse(csvData);

	const rows = parsed.data.slice(1);

	return rows;
}
