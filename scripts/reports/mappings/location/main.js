import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';

export default html`<section id="location">
<h1>Location</h1>
	Location must be split into three records:

	<ul>
		<li>Geographic item (spatial definition of area)</li>
		<li>Geographic Area (nomenclatural details location name, political or cultural definition)</li>
		<li>Georeference (information about a specific collection at a geographic item)</li>
	</ul>

	${csvToTable('./location.csv', import.meta)}
</section>`;
