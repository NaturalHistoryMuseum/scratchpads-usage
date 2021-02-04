import html from 'encode-html-template-tag';
import {tbody} from '../table.js';

/**
 * Template for node count table
 */
export default data => html`
<table>
	<thead>
		<tr><th>Node type</th><th>Total count</th><th>Number of individual sites</th></tr>
	</thead>
	${tbody(['type','sum','sites'], data)}
</table>
`;
