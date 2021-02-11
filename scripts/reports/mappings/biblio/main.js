import html from 'encode-html-template-tag';
import csvToTable from '../csv-to-table.js';

export default html`<section id="biblio">
<h1>Biblio</h1>

<p>While there is a .bib format exporter already in Scratchpads,
there are a large number of extra fields that are excluded from the
exported file, since they are not all supported by the .bib file format.</p>

${csvToTable('./biblio.csv', import.meta)}

<h3 id="biblio_contributor">Biblio_contributor</h3>

<p>Fields:</p>

<ul>
<li><p>  Firstname</p>
</li>
<li><p>  Initials</p>
</li>
<li><p>  Lastname</p>
</li>
<li><p>  Suffix</p>
</li>
</ul>

<p>Taxonworks Mapping:</p>

<p>Create a new Person object with the following properties</p>

<table>
<thead>
<tr>
<th><strong>Taxonworks Person Field</strong></th>
<th><strong>Scratchpads source</strong></th>
</tr>
</thead>
<tbody><tr>
<td>Firstname</td>
<td>Firstname concatenated with Initials, if not empty</td>
</tr>
<tr>
<td>Lastname</td>
<td>lastname</td>
</tr>
<tr>
<td>Suffix</td>
<td>suffix</td>
</tr>
</tbody></table>

</section>
`;
