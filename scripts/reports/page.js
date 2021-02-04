import html from 'encode-html-template-tag';

export default html`
<style>
table {
	width: 100%;
	border-width: 1px;
	border-color: #D9DADD;
	border-style: solid solid none solid;
	border-collapse: collapse;
}

thead {
	background: #EBEDED;
	border: 0;
}

thead, tbody tr {
	border-bottom: 1px solid #ccc;
}

tbody tr:nth-child(odd) {
	background: #F1F4FB;
}

th, td {
	padding: 2px 7px;
}
</style>`;
