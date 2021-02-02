import start from 'simple-wsgi';
import sqliteDb from 'sqlite-execute-tag';
import GetReport from './scripts/reports/main.js';

const sql = sqliteDb('./db.sqlite');
const getReport = GetReport(sql, (id, options) => '/' + id + (options ? ('?' + options.toString()) : ''));

// Serve pages dynamically
start(async (req, res)=>{
	let report;

	const url = new URL('file://'+req.url);

	switch(url.pathname) {
		case '/':
			report = await getReport('index', url.searchParams);
			break;
		default:
			report = await getReport(url.pathname.substr(1), url.searchParams);
	}
	res.end(report);
});

// Also generate html pages in reports directory
import fs from 'fs';


const getUrlStatic = (path, options) => {
	const filename = options ? path+'.'+Array.from(options).map(([k,v])=>`${k}_${v}`).join('.') : path;
	return filename + '.html';
}

const getReportStatic = GetReport(sql, (...args) => '/scratchpads-usage/' + getUrlStatic(...args));

for(const [path, page, options] of getReportStatic) {
	const filename = getUrlStatic(path, options)
	fs.writeFileSync('docs/'+filename, await page);
}
