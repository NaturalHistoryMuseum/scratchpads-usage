import html from 'encode-html-template-tag';

export default (menu, body) => {
	return html`
<ul>
${menu.map(m=>html`<li><a href="${m.path}">${m.title}</a></li>`)}
</ul>

<section>
<h1>Roadmap</h1>
<a href="https://github.com/NaturalHistoryMuseum/scratchpads-usage/issues/1">View on github</a><br>
${body}
</section>
`;

}
