import parseSites from './scripts/parse.js';
import fs from 'fs';
import sqliteDb from 'sqlite-execute-tag';

function writeJson(file, json) {
	fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

async function importData(db='./db.sqlite', tablefile = './scripts/_data/table-list.json'){
	fs.rmSync('./db-import.sqlite', {force:true});
	const sql = await sqliteDb('./db-import.sqlite');

	const tables = await parseSites(sql);

	console.log('Sites parsed, moving db file');
	fs.renameSync('./db-import.sqlite', db);
	writeJson(tablefile, tables);
}

import report from './scripts/reports/recently-edited.js';

async function generateData() {
	const sql = await sqliteDb('./db.sqlite')
	writeJson('./data/recently-changed-sites.json', await report(sql));
}

console.log('Importing data to database')
await importData();
console.log('Generating interesting information')
await generateData();
