import { table, numeric } from 'sp-templates';
import html from 'encode-html-template-tag';

export default data => html`
<h1>Biblio Type Usage</h1>

<p>
Biblio nodes have different sub-types.
Each sub-type gives ceratin fields a different meaning,
so each will need a slightly different migration path.</p>

<p>The following table shows how many Scratchpads use each sub-type. NULL indicates biblio nodes where no sub-type has been selected.</p>

${
	table(
		[
			{
				title: 'Biblio type',
				group: [
					['ID', 'biblio_type'],
					'Name'
				]
			},
			numeric(['Number of Scratchpads using type', 'count'])
		],
		data
	)
}`;
