import start from 'simple-wsgi';
import sqliteDb from 'sqlite-execute-tag';
import GetReport from './scripts/reports/main.js';

const sql = sqliteDb('./db.sqlite');
const getReport = GetReport(sql, id => '/' + id);

// Serve pages dynamically
start(async (req, res)=>{
	let report;

	switch(req.url) {
		case '/':
			report = await getReport('index');
			break;
		default:
			report = await getReport(req.url.substr(1));
	}
	res.end(report);
});

// Also generate html pages in reports directory
import fs from 'fs';

const getReportStatic = GetReport(sql, id => '/' + id + '.html');

for(const [path, page] of getReportStatic) {
	fs.writeFileSync('reports/'+path+'.html', await page);
}
