import html from 'encode-html-template-tag';
import {section} from 'sp-templates';
import csvToTable from '../csv-to-table.js';

export default section('Specimen/Observation',
html`

While there is a DWC_Occurrence class, it is used for auto-generating DWC records from other models.

The model to use depends on the DWC basis_of_record field:

<table>
	<tr><td>
MaterialSample,
PreservedSpecimen,
LivingSpecimen,
FossilSpecimen</td><td>CollectionObject</td></tr>
<tr><td>HumanObservation</td><td>AssertedDistrivution with source=Source::Human</td></tr>
<tr><td>Occurence</td><td>AssertedDistribution with source=Source::Bibtex</td></tr>
<tr><td>MachineObservation</td><td>AssertedDistribution with source=Source::??[Human/Verbatim/Bibtex]</td></tr>
</table>

<section>
<h1>Specimen</h1>
${csvToTable('./specimen.csv', import.meta)}
</section>

<section>
<h1>Observation</h1>
An observation must be created as an AssertedDistribution record, referencing an OTU record, a GeographicArea, and a Citation object.
The citation record is itself a link between a subject and a Source.

${csvToTable('./observation.csv', import.meta)}
</section>
`);
