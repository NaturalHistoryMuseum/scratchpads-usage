import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';
import {ruby} from '../../code.js';
import asset from '../../asset.js';

const dataAttribute = asset('./data-attribute.png', import.meta);

export default html`<section id="spm">
<h1>SPM</h1>

<figure style="float:right;margin-top:0;text-align:center;">
	<img src="${dataAttribute}" alt="Screenshot of the added attribute as a small note in the Annotations section."/>
	<figcaption>How the extra data appears in Taxonworks</figcaption>
</figure>

<p>The Species Profile Model was an experimental TDWG ontology that is no longer actively supported.</p>

<p>Many of the fields have no direct mapping to a specific type in Taxonworks.</p>

<p>However Taxonworks <i>does</i> support the attachment of extra information to records using the DataAttribute record type.</p>

<p>Under this system, each SPM field can be defined in Taxonworks as a Predicate, and field values defined as InternalAttribute records linking the Predicates to an appropriate TaxonName.</p>

<p>
	${ruby
`# Create the size predicate - only needs doing once per project
sizePredicate = Predicate.create!(
	name: 'Size',
	definition: 'Average size, max, range; type of size (perimeter, length, volume, weight ...)',
	uri: 'https://tdwg.github.io/ontology/ontology/voc/SPMInfoItems.rdf#Size',
	uri_relation: 'skos:exactMatch'
)
# Add the size information to an individual taxon term
sizeData = InternalAttribute.create!(
	attribute_subject_type: TaxonName,
	attribute_subject_id: 1312,
	controlled_vocabulary_term_id: sizePredicate.id,
	value: 'Either very small or very far away'
)
`}
</p>


<section>
	<h1>Predicate definitions</h1>
	<p>Most SPM fields can be represented as Predicates by using the following values.</p>
	${csvToTable([
		'SPM field name',
		{
			title: 'Taxonworks Predicate properties',
			group: [
				'name', 'definition', 'uri', 'uri_relation'
			]
		}
	], './spm-fields.csv', import.meta)}
	</section>

	<section>
		<h1>Other fields</h1>
		<p>The remaining fields require an individual mapping.</p>

		${csvToTable('./spm.csv', import.meta)}
	</section>
</section>`;

export const assets = [dataAttribute];
