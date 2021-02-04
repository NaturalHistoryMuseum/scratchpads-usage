import fs from 'fs';
import path from 'path';
import markdown from 'marked';
import html from 'encode-html-template-tag';
import biblioBody from './biblio/main.js';
import locationBody from './location/main.js';
import view from './view.js';
import report from './report-view.js';
import loadCsv from './load-csv.js';

const title = 'Scratchpads → Taxonworks Mappings';

const reports = [
	report('Biblio', loadCsv('biblio/biblio.csv'), biblioBody),
	report('SPM', loadCsv('data/spm.csv')),
	report('Specimen/Observation', loadCsv('data/specimen-observation.csv')),
	report('Location', loadCsv('location/location.csv'), locationBody),
	report('Ecological Interaction', loadCsv('data/ecological-interaction.csv'))
];

const dirname = path.resolve(new URL(import.meta.url).pathname, '..');

const importMarkdown = file => html.safe(
	markdown(
		fs.readFileSync(
			path.join(dirname, file),
			'utf-8'
		)
	)
)
const mappings = importMarkdown('taxonomy-term.md');

export default () => {
	return {
		title,
		body: view(reports, mappings),
	}
};
