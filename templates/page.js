import html from 'encode-html-template-tag';

export default (head, body) => html`<!DOCTYPE html><html>
<head>
<title>${head.title}</title>
</head><body>
${body}`;
