import html from 'encode-html-template-tag';

export default html`
	Location must be split into three records:

	<ul>
		<li>Geographic item (spatial definition of area)</li>
		<li>Geographic Area (nomenclatural details location name, political or cultural definition)</li>
		<li>Georeference (information about a specific collection at a geographic item)</li>
	</ul>`;
