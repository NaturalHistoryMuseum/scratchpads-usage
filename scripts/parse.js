import parse from './parse/index.js';

export default sql => parse('scripts/_data', sql);
