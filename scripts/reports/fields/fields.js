import getData, {biblio} from './data.js';
import view from './view.js';

const bundles = ['biblio', 'spm', 'specimen_observation', 'location', 'ecological_interactions'];

export default async sql=>{
	const data = [];

	for await(const d of getData(sql, bundles)) {
		data.push(d)
	}

	return view(data, await biblio(sql))
}
