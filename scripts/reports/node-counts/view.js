import html from 'encode-html-template-tag';

/**
 * Template for node count table
 */
export default data => html`
<table>
	<thead>
		<tr><th>Node type</th><th>Total count</th><th>Number of individual sites</th></tr>
	</thead>
	<tbody>${data.map(row=>html`
		<tr><td>${row.type}</td><td>${row.sum}</td><td>${row.sites}</td></tr>`)}
	</tbody>
</table>
`;
