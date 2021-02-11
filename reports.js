import start from 'simple-wsgi';
import sqliteDb from 'sqlite-execute-tag';
import live from './reports/live.js';
import generateStatic from './reports/static.js';

const sql = sqliteDb('./db.sqlite', {logError:(e, ...args)=>{
	console.log(...args);
	throw e;
}});

// Serve pages dynamically
start(live(sql));

// Also generate html pages in reports directory
const outputDir = 'docs'
await generateStatic(sql, outputDir);
