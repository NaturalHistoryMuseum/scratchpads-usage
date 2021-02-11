import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';

export default html`<section id="#specimen-observation">
<h1>Specimen/Observation</h1>

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

${csvToTable('./data.csv', import.meta)}

</section>
`;
