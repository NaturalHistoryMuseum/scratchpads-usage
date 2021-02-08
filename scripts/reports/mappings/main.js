import biblio from './biblio/main.js';
import locationBody from './location/main.js';
import spm from './spm/spm.js';
import specObs from './specimen-observation/main.js';
import ecoInt from './ecoint/main.js';
import importMarkdown from './import-markdown.js';
import html from 'encode-html-template-tag';

const title = 'Scratchpads → Taxonworks Mappings';

const body = html`
<h1>${title}</h1>

Describing the core data models of Scratchpads and how they map to Taxonworks data models.

<section>
<h1>Data Types</h1>

The core data types of Scratchpads are:

<ul>
	<li><a href="#biblio">Biblio</a></li>
	<li>Biblio_Contributor</li>
	<li>Taxonomy Term</li>
	<li><a href="#location">Location</a></li>
	<li><a href="#specimen-observation">Specimen/Observation</a></li>
	<li><a href="#spm">Taxon Description</a></li>
	<li>Taxonomy Vocabulary</li>
	<li>Person</li>
	<li>Page</li>
	<li>Media Gallery</li>
</ul>
</section>

${[
	biblio,
	spm,
	specObs,
	locationBody,
	ecoInt,
	importMarkdown('taxonomy-term.md')
]}
`;


export default () => {
	return {
		title,
		body,
	}
};
