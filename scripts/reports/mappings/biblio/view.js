import html from 'encode-html-template-tag';

const thead = (...cells) => html`<thead><tr>
	${cells.map(c=>html`<th>${c}</th>`)}
</tr></thead>`;

const tbody = rows => html`<tbody>
	${rows.map(cells => html`<tr>
		${cells.map(c=>html`<td>${c}</td>`)}
	</tr>`)}
</tbody>`;

export default data => html`
<h2>Biblio</h2>

<table>
	${thead('Field', 'Data assumptions', 'Taxonworks content type', 'Taxonworks field name', 'Notes or processing instructions', 'Standard')}
	${tbody(data)}
</table>`;
