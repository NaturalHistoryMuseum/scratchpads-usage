import view from './view.js';
import data from './data.js';

export default async ({sql}) => {
	return view(await data(sql));
}
