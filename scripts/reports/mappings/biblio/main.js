import { section } from 'sp-templates';
import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';

export default section('Biblio', html`
<p>Taxonworks can import sources as Bibtex files, creating ImportAttributes
for any unrecognised fields. Import attributes are text attributes
with no special meaning or behaviour.
While there is a .bib format exporter already in Scratchpads,
there are a large number of extra fields that are excluded from the
exported file, since they are not all supported by the .bib file format.
However, bibtex is a simple format, so writing a new exporter for biblio records
is a straightforward task, making sure to follow these naming conventions:</p>

${csvToTable('./biblio.csv', import.meta)}

<section>
<h1>Field Name Matrix</h1>
<p>
Some field types vary their meaning depending on the value of biblio_type.
For properties that are stored as ImportAttributes, particularly the "custom" fields, it may be more useful to use the values in the following matrix as the field names:
</p>

<details>
${csvToTable('./biblio-field-names.csv', import.meta)}
</details>
</section>

`);
