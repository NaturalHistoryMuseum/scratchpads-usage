import getData, {sortColumns} from './data.js';
import view from './view.js';

export default async ({sql, getUrl}, options) => {
	const sort = (options && options.get('sort')) || 'changed';

	return view(sort, await getData(sql, sort), id=>getUrl(new URLSearchParams({sort: id})));
}

export const options = sortColumns.map(col => new URLSearchParams({
	sort: col
}));
