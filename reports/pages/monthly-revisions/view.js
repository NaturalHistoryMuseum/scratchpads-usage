import html from 'encode-html-template-tag';
import {table, numeric} from 'sp-templates';

export default (data) => html`

	${table(
		[['Month', 'date'], numeric('Node modifications', 'nodes'), numeric('Taxonomy term modifications', 'taxonomy')],
		data
	)}
`;
