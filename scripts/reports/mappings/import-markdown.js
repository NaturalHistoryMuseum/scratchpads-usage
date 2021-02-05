import html from 'encode-html-template-tag';
import path from 'path';
import markdown from 'marked';
import fs from 'fs';

const dirname = path.resolve(new URL(import.meta.url).pathname, '..');

const importMarkdown = file => html.safe(
	markdown(
		fs.readFileSync(
			path.join(dirname, file),
			'utf-8'
		)
	)
)

export default importMarkdown;
