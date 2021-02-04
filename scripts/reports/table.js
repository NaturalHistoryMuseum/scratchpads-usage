import html, {element} from 'encode-html-template-tag';

function th(cell, depth) {
	const title = cell.title ?? cell;

	const colspan = cell.group && cell.group.length;
	const rowspan = cell.group ? null : depth;

	return element('th', { colspan, rowspan }, title);
}

function trh(cols, depth) {
	return html`<tr>${cols.map(c=>th(c, depth))}</tr>`;
}

function* getRows(columns) {
	if(!columns.length) {
		return;
	}

	yield columns;

	yield* getRows(columns.reduce(
		(cols, col) => col.group ? cols.concat(col.group) : cols,
		[]
	));
}

export function thead(columns){
	const rows = Array.from(getRows(columns));
	return element('thead', {}, rows.map((row, ix)=>trh(row, rows.length-ix)))
}

function bodyColumn(options, ix) {
	if(!(options && typeof options === 'object')) {
		options = { value: options }
	}

	const { value, ...attrs } = options;

	return {
		value: accessor(value, ix),
		attrs
	}
}

function accessor(key, ix) {
	if(key instanceof Function) {
		return key;
	}

	return row => row[key] ?? row[ix];
}

function td(row, value, attrs={}) {
	return element('td', attrs, value(row));
}

function tr(row, keys) {
	return html`<tr>${keys.map(key => td(row, key.value, key.attrs))}</tr>`;
}

export function tbody(keys, data) {
	keys = keys.map(bodyColumn);

	return html`<tbody>
			${data.map(d=>tr(d, keys))}
	</tbody>`;
}

export function column(options, value) {
	if(Array.isArray(options)) {
		return column(...options);
	}

	if(typeof options === 'string') {
		options = {
			title: options,
			value: value || options.toLowerCase().replace(/ /g, '_')
		}
	}

	if(options.group) {
		options.group = options.group.map(c=>column(c));
	}

	return options;
}

export default function table(cols, data) {
	const head = [];
	const body = [];

	for(const col of cols) {
		const { title, group, ...rest } = column(col);

		head.push({title, group});
		body.push(rest);
	}

	return html`<table>${[
		thead(head),
		tbody(body, data)
	]}</table>`;
}

export function numeric(...args) {
	const c = column(...args);
	c.class = 'numeric';
	return c;
}
