import html from 'encode-html-template-tag';
import table, {numeric} from '../table.js'

const id = name=>name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default bundles => html`
	<p>
		So we can prioritise which fields are mapped to the Scratchpads successor platform,
		we want to know which are the most widely used fields.
	</p>
	<p>
		NB:
		<ul>
			<li>The "In Use" column is currently only correct for fields that do not appear on multiple different data types.</li>
			<li>The biblio seciton doesn't take into account the full list of fields, since some of this data is stored in a separate table.</li>
		</ul>
	</p>
	<section>
		<h1>Node Types</h1>
		<ul>
			${bundles.map(({name})=> html`<li><a href="#${id(name)}">${name}</a></li>`)}
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
	Are those fields actually used?
`;
