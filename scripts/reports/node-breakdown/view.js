import html from 'encode-html-template-tag';
import {table} from 'sp-templates';

function rotatedTitle(title){
	return {
		title,
		th: {
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
	height: 80vh;
}

thead {
	position:sticky;
	top: 0;
	z-index: 1;
}

.rotate{
	writing-mode: vertical-rl;
	transform: translateY(100%)  rotate(225deg) translateX(50%);
	transform-origin: top;
	vertical-align: top;
}

.site_name {
	position: sticky;
	left: 0;
	background: #EEE;
}
</style>
	${table(
		[{ title: 'Site', class: 'site_name' }, { title: 'Number of nodes by type', group: types.map(rotatedTitle) }],
		data
	)}
`;
