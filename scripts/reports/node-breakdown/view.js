import html from 'encode-html-template-tag';
import table from '../table.js';

function rotatedTitle(title){
	return {
		title,
		attrs: {
			class: 'rotate'
		}
	}
}

export default (types, data) => html`
	<p>A breakdown of node types and counts on each of the 40 most recently edited sites.</p>

<style>
table {
	overflow: auto;
	display: block;
}

.rotate{
	writing-mode: vertical-rl;
	transform: translateY(100%)  rotate(225deg) translateX(50%);
	transform-origin: top;
	vertical-align: top;
}
</style>
	${table(
		['Site', { title: 'Number of nodes by type', group: types.map(rotatedTitle) }],
		data
	)}
`;
