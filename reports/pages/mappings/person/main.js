import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';
import { section } from 'sp-templates';

export default section(
	'Person',
	html`
		<p>
			Taxonworks has only basic support for Person records.
			Name, birth/death year, and ORCID are catered for,
			but the remaining fields will need to be added as DataAttributes.
		</p>
		${csvToTable('./person.csv', import.meta)}
	`
);
