import fs from 'fs';
import path from 'path';
import markdown from 'marked';
import html from 'encode-html-template-tag';
import biblio from './biblio/main.js';
import view from './view.js';

const title = 'Scratchpads → Taxonworks Mappings';

const dirname = path.resolve(new URL(import.meta.url).pathname, '..');

const importMarkdown = file => html.safe(
	markdown(
		fs.readFileSync(
			path.join(dirname, file),
			'utf-8'
		)
	)
)
const mappings = importMarkdown('mappings.md');

export default () => {
	return {
		title,
		body: view(biblio, mappings)
	}
};
