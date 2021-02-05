import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';

export default html`<section>
<h1>Ecological Interactions</h1>

${csvToTable('./data.csv', import.meta)}

</section>
`;
