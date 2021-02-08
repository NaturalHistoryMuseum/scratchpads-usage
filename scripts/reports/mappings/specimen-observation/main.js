import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';

export default html`<section id="#specimen-observation">
<h1>Specimen/Observation</h1>

${csvToTable('./data.csv', import.meta)}

</section>
`;
