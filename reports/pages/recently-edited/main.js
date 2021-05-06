import getData, {sortColumns} from './data.js';
import view from './view.js';

const getOptionsObject = sort => sort===sortColumns[0] ? null : new URLSearchParams({ sort });

export default async ({sql, getUrl}, options) => {
	const sort = (options && options.get('sort')) || 'changed';

	const data = await getData(sql, sort);
	const collectionDate = new Date(Math.max(...data.map(d=>d.changed)));

	const urlFor = id=>getUrl(getOptionsObject(id))

	return view({sort, urlFor, collectionDate}, data);
}

export const options = sortColumns.map(getOptionsObject);
