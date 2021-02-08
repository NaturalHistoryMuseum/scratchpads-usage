import html from 'encode-html-template-tag';
import table, {numeric} from '../table.js'

export default bundles => html`
	For each of the core data types, what are the most common field names?<br>
	${bundles.map(({name, data}) => html`
		<h2>${name}</h2>
		${table([
			'Field name',
			['Entity', 'entity_type'],
			'Bundle',
			numeric('Count')
		], data)}
		<hr>`)}
	Are those fields actually used?
`;
