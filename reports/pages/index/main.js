import view from './view.js';
import data from './issue.js'
import markdown from 'marked';
import html from 'encode-html-template-tag';

const body = ''//html.safe(markdown(data));

export default menu => {
	return view(menu, body)
};
