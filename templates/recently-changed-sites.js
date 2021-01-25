import html from 'encode-html-template-tag';

export default data => html`
<table>
	<thead>
		<tr><th>Site</th><th>Changed</th></tr>
	</thead>
	<tbody>${data.map(row=>html`
		<tr><td>${row.site}</td><td>${row.changed}</td></tr>`)}
	</tbody>
</table>
`;
