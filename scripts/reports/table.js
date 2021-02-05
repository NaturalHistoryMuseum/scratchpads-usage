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

function* getHeaderRows(columns) {
	if(!columns.length) {
		return;
	}

	yield columns;

	yield* getHeaderRows(columns.reduce(
		(cols, col) => col.group ? cols.concat(col.group) : cols,
		[]
	));
}

export function thead(columns){
	const rows = Array.from(getHeaderRows(columns));
	return element('thead', {}, rows.map((row, ix)=>trh(row, rows.length-ix)))
}

function bodyColumn(options) {
	if(!(options && typeof options === 'object')) {
		options = { value: options }
	}

	const { value, ...attrs } = options;

	return {
		value: accessor(value),
		attrs
	}
}

function accessor(key) {
	if(key instanceof Function) {
		return key;
	}

	return row => row[key];
}

function td(row, value, attrs={}, ix) {
	return element('td', attrs, value(row, ix));
}

function tr(row, keys) {
	return html`<tr>${keys.map((key, ix) => td(row, key.value, key.attrs, ix))}</tr>`;
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
		const key = options.toLowerCase().replace(/ /g, '_');
		options = {
			title: options,
			value: value || ((row, ix) => {
				const v = Array.isArray(row) ? row[ix] : row[key];
				return v;
			})
		}
	}

	if(options.group) {
		options.group = options.group.map(c=>column(c));
	}

	return options;
}

function getColumnConfigs(cols) {
	const head = [];
	const body = [];

	for(const col of cols) {
		const { title, group, ...bodyCfg } = column(col);

		if(group) {
			const cfgs = getColumnConfigs(group);
			head.push({ title, group: cfgs.head });
			body.push(...cfgs.body);
		} else {
			head.push({title});
			body.push(bodyCfg);
		}
	}

	return {
		head, body
	}
}

export default function table(cols, data) {
	const { head, body } = getColumnConfigs(cols);
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
