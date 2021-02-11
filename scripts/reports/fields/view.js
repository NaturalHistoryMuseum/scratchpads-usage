import html from 'encode-html-template-tag';
import {table, numeric} from 'sp-templates'

const id = name=>name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default (bundles, biblio) => html`
	<p>
		So we can prioritise which fields are mapped to the Scratchpads successor platform,
		we want to know which are the most widely used fields.
	</p>
	<p>
		<ul>
			<li>NB: The "In Use" column is currently only correct for fields that do not appear on multiple different data types.</li>
		</ul>
	</p>
	<section>
		<h1>Node Types</h1>
		<ul>
			${bundles.map(({name})=> html`<li><a href="#${id(name)}">${name}</a></li>`)}
			<li><a href="#more-biblio">Core biblio</a></li>
		</ul>
	</section>
	${bundles.map(({name, data}) => html`
		<section>
		<h1 id="${id(name)}">${name}</h1>
		${table([
			'Field name',
			//['Entity', 'entity_type'],
			'Bundle',
			{
				title: 'Number of sites with field',
				group: [
					numeric({ title: 'Present', value: 'count'}),
					numeric({title: 'In use', value: 'usage'})
				]
			}
		], data)}
		</section>`)}

<section id="more-biblio">
	<h1>Core biblio fields</h1>
	<p>The following fields are recorded separately in the database in a special bilio table.</p>
${table(['name',['Number of sites with field in use', 'sites'], ['Total number of field instances in use over all scratchpads', 'total']], biblio)}
</section>
`;
