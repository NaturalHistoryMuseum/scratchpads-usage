import database from 'sqlite-async';
import sqlTag from 'sql-execute-tag';
import parseSites from './scripts/parse.js';
import fs from 'fs';

fs.rmSync('./db-import.sqlite', {force:true})
const db = await database.open('./db-import.sqlite');
const sql = sqlTag((lits, vals) => db.all(lits.sql, vals));

// const stream = fs.createReadStream('scripts/data/bio.acousti.ca');

const tables = await parseSites(sql);

fs.renameSync('./db-import.sqlite', './db.sqlite');
console.log(tables);
