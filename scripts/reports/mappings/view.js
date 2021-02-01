import html from 'encode-html-template-tag';

export default (...body) => html`
	Describing the core data models of Scratchpads and how they map to Taxonworks data models.

	<h2>Data Types</h2>

	The core data types of Scratchpads are:

	<ul>
		<li>Biblio</li>
		<li>Biblio_Contributor</li>
		<li>Taxonomy Term</li>
		<li>Location</li>
		<li>Specimen/Observation</li>
		<li>Taxon DescriptionTaxonomy Vocabulary</li>
		<li>Person</li>
		<li>Page</li>
		<li>Media Gallery</li>
	</ul>

	${body}
`;
