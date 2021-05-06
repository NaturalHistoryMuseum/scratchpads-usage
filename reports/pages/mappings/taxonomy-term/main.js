import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';
import {section} from 'sp-templates';

export default section(
	'Taxonomy Term',
	html`

<p>
	Before migrating Taxonomy Term, it is important to know what nomenclatural code to use
	(Iczn, Icnp, Ictv, or Icn).
	Scratchpads does not explicitly record this by default, so it will need to
	be deducted somehow (or entered manually for each taxon vocabulary).
</p>

${csvToTable('./taxonomy-term.csv', import.meta)}

`);
