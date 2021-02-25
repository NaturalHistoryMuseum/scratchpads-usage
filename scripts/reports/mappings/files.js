import html from 'encode-html-template-tag';
import { section } from 'sp-templates';

export default section('Files, Images and Galleries', html`
	<p>
		Taxonworks currently only has support for storing two different kinds of files: Image files and Document (i.e. text or PDF) files.
		These are stored on the filesystem and represented with the Image and Document models, respectively.
		Other kinds of files, for example audio, are not supported.
	</p>

	<p>
		The Depiction model can be used to link an Image to specific models, including the following:
	</p>

	<ul>
		<li>CollectingEvent</li>
		<li>CollectionObject</li>
		<li>Observation</li>
		<li>OTU</li>
		<li>TaxonDetermination</li>
		<li>TaxonName</li>
	</ul>

	<p>
		The Documentation model can be used to link a Document to either a CollectingEvent or a Source.
	</p>

	<p>
		There is no built-in media gallery, but a collection of Images can be simulated by creating an instance of Tag to represent the collection
		and using it to tag the Images in that collection.
	</p>
`);
