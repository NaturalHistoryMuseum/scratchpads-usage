import biblio from './biblio/main.js';
import locationBody from './location/main.js';
import spm from './spm/spm.js';
import specObs from './specimen-observation/main.js';
import ecoInt from './ecoint/main.js';
import html from 'encode-html-template-tag';
import taxonomyTerm from './taxonomy-term/main.js'
import files from './files.js'
import person from './person/main.js';

const title = 'Scratchpads → Taxonworks Mappings';

const body = html`
<h1>${title}</h1>

<p>Describing the core data models of Scratchpads and how they map to Taxonworks data models.</p>

<section>
	<h1>Summary</h1>

	<p>
		Of the core Scratchpads data types, Taxonworks has a direct logical equivilent for Biblio, Taxonomy Term, Ecological Interaction, and Person data types.
		The Specimen/Observation record type has two equivilent models, one for Specimens and one for Observations.
		Similarly, Location can be translated to two different types depending on whether it represents the location of a Specimen or an Observation.
		The Species Profile Model does not have an equivilent in Taxonworks, but since it represents properties of a Taxon, an individual record's field values can be attached to a Taxon in taxonworks.
		Text and Image files are supported in taxonworks, but no other types.
		The Media Gallery type does not have a direct equivilent but can be approximated
		as a Tag that is attached to Image records.
	</p>

	<p>
		The mapping of these data types' field values is often not straight-forward.
		Roughly half of the fields supported by Scratchpads are not directly supported
		by Taxonworks, although there is a method of attaching arbitrary data to records using the concept of DataAttributes.
		Where there is no one-to-one mapping for a Scratchpad field, Taxonworks provides two options for importing data:
	</p>

	<ol>
		<li><p>InternalAttributes, whereby we can define a Predicate based on an RDF URL, and use it to define extra data about a data model. While Taxonworks doesn't apply any special treatment to these data, consuming applications that have knowledge of the RDF term will be able to represent the data in a useful way.</p></li>
		<li><p>ImportAttributes, whereby we can attach extra text data to a model, but without providing any context for what this data means. This allows us to keep data available, but precludes applications from using the data with any kind of special processing or behaviour, since its only context is the association with a data model.</p></li>
	</ol>

	<p>
		Taxonworks also has much stricter data validation requirements than Scratchpads,
		so there may be additional complexity with migrating data that is correct but,
		for example, not in the format required by Taxonworks.
	</p>

	<p>
		The data types not supported by Taxonworks are the presentational and social data types: page, blog, forum, group, event, webform and news/simplenews.
	</p>

	<p>
		Overall, Taxonworks could be a good fit for Scratchpads that are primarily data repositories
		and mostly use the core types.
		However, more specialist sites will require platforms taylored to their specific requirements.
	</p>
</section>

<section>
	<h1>DataAttributes</h1>

	<p>Where there is no one-to-one mapping for a Scratchpad field, Taxonworks provides us with two options for importing data:</p>

	<ol>
		<li><p>InternalAttributes, whereby we can define a Predicate based on an RDF URL, and use it to define extra data about a data model. While Taxonworks doesn't apply any special treatment to these data, consuming applications that have knowledge of the RDF term will be able to represent the data in a useful way.</p></li>
		<li><p>ImportAttributes, whereby we can attach extra text data to a model, but without providing any context for what this data means. This allows us to keep data available, but precludes applications from using the data with any kind of special processing or behaviour, since its only context is the association with a data model.</p></li>
	</ol>
</section>

<nav>
<h1>Data Types</h1>

<p>The core data types of Scratchpads are:</p>

<ul>
	<li><a href="#biblio">${biblio.title}</a></li>
	<li><a href="#spm">Taxon Description</a></li>
	<li><a href="#specimen-observation">${specObs.title}</a></li>
	<li><a href="#location">${locationBody.title}</a></li>
	<li><a href="#taxonomy-term">${taxonomyTerm.title}</a></li>
	<li><a href="#ecological-interactions">${ecoInt.title}</a></li>
	<li><a href="#person">${person.title}</a></li>
	<li><a href="#files">${files.title}</a></li>

</ul>
</nav>

${[
	biblio({id:'biblio'}),
	spm,
	specObs({id:'specimen-observation'}),
	locationBody({id:'location'}),
	taxonomyTerm({id: 'taxonomy-term' }),
	ecoInt({id:'ecological-interactions'}),
	files({id:'files'}),
	person({id:'person'})
]}
`;


export default options => {
	return {
		title,
		body,
	}
};


export { assets } from './spm/spm.js';
