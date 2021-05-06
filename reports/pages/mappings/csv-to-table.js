import csv from 'papaparse';
import fs from 'fs';
import path from 'path';
import {table, asset} from 'sp-templates';
import html from 'encode-html-template-tag';

function resolveFile(file, meta=import.meta) {
	const filepath = path.resolve(new URL(meta.url).pathname, '..', file);
	return filepath;
}

function loadCsv(filepath) {
	const csvData = fs.readFileSync(filepath, 'utf-8').trim();

	const parsed = csv.parse(csvData);

	const rows = parsed.data;

	return rows;
}

export default async function csvToTable(headers, file, meta) {
	if(typeof headers === 'string') {
		[headers, file, meta] = [undefined, headers, file];
	}

	const filepath = resolveFile(file, meta);
	const assetFile = asset(filepath);

	const [cols, ...rows] = await loadCsv(filepath);
	const el = html`
		<a href="${assetFile}">Download CSV</a>
		${table(headers??cols, rows)}
	`;
	el.asset = assetFile;
	return el;
}
