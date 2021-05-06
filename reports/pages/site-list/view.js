import html from 'encode-html-template-tag';
import {table, numeric} from 'sp-templates';

export default (data) => html`

	${table(
		['Site', numeric('Nodes'), numeric('Taxonomy Terms', 'terms'), numeric('Taxonomy Vocabularies', 'vocabs')],
		data
	)}
`;
