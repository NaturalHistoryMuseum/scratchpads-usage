import data from './data.js';
import view from './view.js';

export default async sql=>view(await data(sql))
