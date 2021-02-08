import html from 'encode-html-template-tag';
import {thead, tbody, numeric} from '../table.js';

const sortCol = (sort, getUrl) => function sortCol(name, id=name.toLowerCase()) {
	return id===sort ? html`<i>${name}</i>` : html`<a href="${getUrl(id)}">${name}</a>`;
}

const date = d => html`<time datetime="${d.toISOString()}">${d.toLocaleDateString()}</time>`

/**
 * Template for most recently used sites table
 */
export default ({sort, urlFor, collectionDate}, data) => {
	const sortable = sortCol(sort, urlFor);

	return html`
<p>A list of all Scratchpads for which a node or taxonomy term has been edited in the three months up to ${date(collectionDate)}.</p>
<p>This list contains ${data.length} sites.</p>
<p>This is a <b>provisional</b> guide for which sites may be migrated to Taxonworks, and has not been finalised.</p>
<table>
	${thead([
		'Site',
		sortable('Changed'),
		{
			title:'Number of changed items',
			group: [
				sortable('Nodes'),
				sortable('Taxa'),
				'Total'
			]
		}
	])}
	${tbody(['site', row=>date(row.changed), numeric('nodes'), numeric('taxa'), numeric('total')], data)}
</table>
`};
