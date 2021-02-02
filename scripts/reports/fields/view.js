import html from 'encode-html-template-tag';

export default data => html`
	For each of the core data types, what are the most common field names?<br>
	${JSON.stringify(data.slice(0,20))}<br>
	Are those fields actually used?
`;
