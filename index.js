import database from 'sqlite-async';
import sqlTag from 'sql-execute-tag';
import parseSites from './scripts/parse.js';
import fs from 'fs';
import sqlite3 from 'sqlite3';
import renderReports from './templates/index.js';

async function sqliteDb(file) {
	const db = await database.open(file);
	const sql = sqlTag((lits, vals) => db.all(lits.sql, vals).catch(e=>{
		console.error(lits);
		throw e;
	}));
	// Limit on the number of variables allowed in SQLITE statements (this was increased in v3.32.0)
	sql.MAX_VARIABLES = Number(sqlite3.VERSION.substr(2)) < 32 ? 999 : 32766;
	return sql;
}

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

import report from './scripts/report/recently-edited.js';

async function generateData() {
	const sql = await sqliteDb('./db.sqlite')
	writeJson('./data/recently-changed-sites.json', await report(sql));
}

console.log('Importing data to database')
await importData();
console.log('Generating interesting information')
await generateData();
console.log('Rendering report info');
await renderReports('./data', './reports')
