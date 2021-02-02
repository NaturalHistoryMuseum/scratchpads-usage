import html from 'encode-html-template-tag';

const sortCol = (sort, getUrl) => function sortCol(name, id=name.toLowerCase()) {
	return id===sort ? html`<i>${name}</i>` : html`<a href="${getUrl(id)}">${name}</a>`;
}

/**
 * Template for most recently used sites table
 */
export default (sort, data, getUrl) => {
	const col = sortCol(sort, getUrl);

	return html`
<style>
.numeric {
	text-align:right;
}
</style>
<p>A list of all Scratchpads for which a node or taxonomy term has been edited in the three months up to the data collection date.</p>
<p>This list contains ${data.length} sites.</p>
<table>
	<thead>
		<tr>
			<th rowspan=2>Site</th><th rowspan=2>${col('Changed')}</th>
			<th colspan=3>Number of changed items</th></tr>
		<tr>
			<th>${col('Nodes')}</th><th>${col('Taxa')}</th><th>Total</th></tr>
	</thead>
	<tbody>${data.map(row=>html`
		<tr><td>${row.site}</td>
		<td>${row.changed.toLocaleDateString()}</td>
		<td class="numeric">${row.nodes}</td>
		<td class="numeric">${row.taxa}</td>
		<td class="numeric">${row.total}</td></tr>`)}
	</tbody>
</table>
`};
