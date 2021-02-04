import html from 'encode-html-template-tag';
import table from '../table.js';

export default (name, data, ...etc) => html`
<h2>${name}</h2>

${table(['Field', 'Data assumptions', 'Taxonworks content type', 'Taxonworks field name', 'Notes or processing instructions', 'Standard'], data)}

${etc}`;
