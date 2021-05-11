import html from 'encode-html-template-tag';
import {table, numeric} from 'sp-templates';

export default (data) => html`

	${table(
		['Month', numeric('Node modifications', 'nodes'), numeric('Taxonomy term modifications', 'taxa'), numeric('Total'), numeric('Users'), numeric('Sites')],
		data
	)}
`;
