import parseSites from './scripts/parse.js';
import fs from 'fs';
import sqliteDb from 'sqlite-execute-tag';

function writeJson(file, json) {
	fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

async function importData(db='./db.sqlite', tablefile = './scripts/_data/table-list.json'){
	fs.rmSync('./db-import.sqlite', {force:true});
	const sql = await sqliteDb('./db-import.sqlite', {logError(e, ...etc){
		console.log(...etc)
		throw e;
	}});

	const tables = await parseSites(sql);

	console.log('Sites parsed, moving db file');
	fs.renameSync('./db-import.sqlite', db);

	console.log('Saving list of created tables to ', tablefile);
	writeJson(tablefile, tables);
}

console.log('Importing data to database')
await importData();
