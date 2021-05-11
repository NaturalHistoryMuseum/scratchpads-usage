import html from 'encode-html-template-tag';
import {table, numeric} from 'sp-templates';

const json = data=>html`
<textarea>[
${data.map(d=>JSON.stringify(d)).join(',\n')}
]</textarea>`;

export default (data) => html`
	${table(
		[['Site', 'name'], numeric('Nodes'), numeric('Taxonomy Terms', 'terms'), numeric('Taxonomy Vocabularies', 'vocabs')],
		data
	)}

	${json(data)}
`;
