import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';
import { section } from 'sp-templates';

export default section(
	'Ecological Interactions',
	html`
		<p>
			Ecological Interactions can be represented as a BiologicalAssociation record, which links a subject and object taxa,
			and specifies the type of relationship using the BiologicalRelationship model. BiologicalAssociation accepts Notes and
			DataAttributes, so data that does not otherwise fit can be added.
		</p>
		${csvToTable('./ecoint.csv', import.meta)}
	`
);
