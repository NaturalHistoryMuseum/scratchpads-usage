import start from 'simple-wsgi';
import sqliteDb from 'sqlite-execute-tag';
import live from './reports/live.js';
import generateStatic from './reports/static.js';
import fs from 'fs';

const date = JSON.parse(fs.readFileSync('./scripts/_data/date.json', 'utf-8'));

const sql = sqliteDb('./db.sqlite', {logError:(e, ...args)=>{
	console.log(...args);
	throw e;
}});

// Serve pages dynamically
start(live(sql, date));

// Also generate html pages in reports directory
const outputDir = 'docs'
await generateStatic(sql, date, outputDir);
