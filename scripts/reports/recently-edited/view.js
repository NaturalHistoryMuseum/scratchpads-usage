import html from 'encode-html-template-tag';

/**
 * Template for most recently used sites table
 */
export default (data) => html`
<p>A list of all Scratchpads for which a node or taxonomy term has been edited in the three months up to ${data[0].changed.toLocaleDateString()}.</p>
<p>This list contains ${data.length} sites.</p>
<table>
	<thead>
		<tr><th rowspan=2>Site</th><th rowspan=2>Changed</th>	<th colspan=3>Number of changed items</th></tr>
		<tr>	<th>Nodes</th><th>Taxa</th><th>Total</th></tr>
	</thead>
	<tbody>${data.map(row=>html`
		<tr><td>${row.site}</td><td>${row.changed.toLocaleDateString()}</td><td>${row.nodes}</td><td>${row.taxa}</td><td>${row.total}</td></tr>`)}
	</tbody>
</table>
`;
