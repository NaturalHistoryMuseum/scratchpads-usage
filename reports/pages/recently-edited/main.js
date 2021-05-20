import getData from './data.js';
import view from './view.js';

export default async ({sql}) => {
	const data = await getData(sql);
	return view(data);
}

export const options = [];
