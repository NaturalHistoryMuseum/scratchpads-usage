import html from 'encode-html-template-tag';
import {tbody} from '../table.js';

/**
 * Template for node count table
 */
export default data => html`
<p>
	What are the different node types used across scratchpads,
	and how broadly used are they?
</p>
<p>
	This can help us identify which are the core data types,
	which are added by optional modules,
	and which are custom data types created manually by maintainers.
</p>
<table>
	<thead>
		<tr><th>Node type</th><th>Total count</th><th>Number of individual sites</th></tr>
	</thead>
	${tbody(['type','sum','sites'], data)}
</table>
`;
