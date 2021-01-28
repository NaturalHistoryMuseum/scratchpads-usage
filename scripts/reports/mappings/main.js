import fs from 'fs';
import path from 'path';
import markdown from 'marked';
import html from 'encode-html-template-tag';

const mappingsFile = path.resolve(new URL(import.meta.url).pathname, '../mappings.md');

export default () => {
	const body = fs.readFileSync(mappingsFile, 'utf8');
	const m = body.match(/^# (.+)$/m);

	const title = m[1];

	return {
		title,
		body: html.safe(markdown(body.replace(m[0], '')))
	}
};
