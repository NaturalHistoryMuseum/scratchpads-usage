import html from 'encode-html-template-tag';

export default (menu, body) => {
	return html`
<ul>
${menu.map(m=>html`<li><a href="${m.path}">${m.title}</a></li>`)}
</ul>

To-do:<br>

Explain biblio exporter won't work<br>
Factor live/static router into separate files<br>
Create (proper) live/static asset servers: register({asset, [filename]}, getUrl(asset), serve(url)<br>


<section>
<h1>Roadmap</h1>
<a href="https://github.com/NaturalHistoryMuseum/scratchpads-usage/issues/1">View on github</a><br>
${body}
</section>
`;

}
