import html from 'encode-html-template-tag';

export default (menu) => html`<ul>${menu.map(m=>html`<li><a href="${m.path}">${m.title}</a></li>`)}</ul>`;
