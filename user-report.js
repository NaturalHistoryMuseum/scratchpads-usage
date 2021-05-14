import sqliteDb from 'sqlite-execute-tag';

// This data is sensitive, so we don't include it in the main reports
const which = process.argv[2];

const getUsers = [undefined, 'users'].includes(which);
const getMaintainers = [undefined, 'maintainers'].includes(which);

if(!getUsers && !getMaintainers) {
	console.warn(`Unknown keyword "${which}". Use "users" or "maintainers" keyword or leave empty.`);
	process.exit(1);
}

const sql = sqliteDb('./db.sqlite', {logError:(e, ...args)=>{
	console.error(...args);
	throw e;
}});


const escape = str => `"${str.replace(/"/g, '""')}"`;
const toCsv = (rows, cols) => cols.map(escape).join(',') + '\n' + rows.map(row => cols.map(col=>escape(row[col])).join(',')).join('\n');


if(getUsers){
	const users = await sql`SELECT site, uid, name, login, access from users`;

	const cols = ["site", "uid", "name", "login", "access"];

	console.log(toCsv(users, cols));
}

if(getMaintainers) {
	const maintainers = await sql`SELECT site, uid, name, mail from users where maintainer='1'`;

	console.log(toCsv(maintainers, ["site", "uid", "name", "mail"]));
}
