import { fstat } from 'fs';
import https from 'https';
//import fs from 'fs';

async function getMd() {
	const response = await new Promise(resolve=>https.get('https://api.github.com/repos/NaturalHistoryMuseum/scratchpads-usage/issues/1', { headers: {'User-Agent': 'NodeJS' }}, resolve));
	let body = '';
	for await (const d of response){
		body += d;
	}

	const md = JSON.parse(body).body;
	//fs.writeFileSync('./issue.md', md);

	return md;
}

export default await getMd();
