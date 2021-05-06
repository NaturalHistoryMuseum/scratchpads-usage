import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';
import { section } from 'sp-templates';

export default section('Location', html`
	<p>
		In Scratchpads, the Location model is part of the Darwincore module.
		It describes where an item was collected or observed with a combination of geographic data and verbatim descriptions.
	</p>

	<p>
		In Taxonworks, the collection location of specimens (aka collection objects) are represented as Collection Events,
		whereas the location of an observation (aka Asserted Distribution) is represented as GeographicArea,
		a data type which has no fields for verbatim location data as specified by DWC.
	</p>

	<table><thead>
	<tr><td></td>	<th>Specimen</th>	<th>Observation</th></tr></thead>
	<tr><th>Location</th>	<td>CollectingEvent</td>	<td>GeographicArea</td></tr>
	<tr><th>Specimen/Obsercation</th>	<td>CollectionObject</td>	<td>AssertedDistribution</td></tr>
	</table>

	<p>
		So the method of migrating location objects differs depending on whether it is referenced by a
		Specimen, an Observation, or both.
	</p>

	<section>
		<h1>Specimen</h1>

		<p>The CollectingEvent model supports a small subset of the DWC location fields.</p>
		<p>It also accepts DataAttributes, so remaining fields can be added using the same method as for the SPM fields.</p>

		${csvToTable('./location-specimen.csv', import.meta)}
	</section>


	<section>
		<h1>Observation</h1>

		<p>For observations, a single location can be translated into a tree of GeographicAreas.</p>
		<p>AssertedDistribution accepts DataAttributes, so remaining fields can be added using the same method as for the SPM fields.</p>
		<p>Since it is considerably easier to create DataAttributes than it is to create GeographicArea items, we may also wish to consider using DataAttributes instead of GeographicAreas.</p>

		${csvToTable('./location-observation.csv', import.meta)}
	</section>

	<p>Geographic items can hold different types of data:</p>

	<ul>
		<li>point</li>
		<li>line_string</li>
		<li>polygon</li>
		<li>multi_point</li>
		<li>multi_line_string</li>
		<li>multi_polygon</li>
		<li>geometry_collection</li>
	</ul>

	By default, locations are point data, but some scratchpads may have elected to change to a different data type.
`);
