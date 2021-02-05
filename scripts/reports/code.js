import html from 'encode-html-template-tag';
import hljs from 'highlight.js';

const toString = (lits, ...vals) => lits.reduce((s, l, i)=>s+vals[i-1]+l);

const styles = html`
<style>
		pre code {
			background: #FEE;
			border: 2px solid #C99;
			display: block;
			padding: 10px;
		}
	</style>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/default.min.css">
`;

const code = language => (...args) => html`${styles}<pre><code>${html.safe(hljs.highlight(language, toString(...args)).value)}</code></pre>`;

export const ruby = code('ruby');
