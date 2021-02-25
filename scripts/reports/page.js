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

section > h1 {
	margin-top: 40px;
}

.numeric{text-align:right;}

p {
    font-size: 1em;
    line-height: calc(1ex / 0.32);
    margin: calc(1ex / 0.32) 0;
}
</style>`;
