import biblio from './biblio/main.js';
import locationBody from './location/main.js';
import spm from './spm/spm.js';
import specObs from './specimen-observation/main.js';
import ecoInt from './ecoint/main.js';
import html from 'encode-html-template-tag';
import taxonomyTerm from './taxonomy-term/main.js'
import files from './files.js'

const title = 'Scratchpads → Taxonworks Mappings';

const body = html`
<h1>${title}</h1>

<p>Describing the core data models of Scratchpads and how they map to Taxonworks data models.</p>

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
	files({id:'files'})
]}
`;


export default options => {
	return {
		title,
		body,
	}
};


export { assets } from './spm/spm.js';
