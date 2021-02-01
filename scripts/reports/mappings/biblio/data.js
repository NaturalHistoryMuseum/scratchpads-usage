import csv from 'papaparse';
import fs from 'fs';
import path from 'path';

const biblioFile = path.resolve(new URL(import.meta.url).pathname, '../biblio.csv');

const biblioCsv = fs.readFileSync(biblioFile, 'utf-8');

const parsed = csv.parse(biblioCsv);

// const data = parsed.data.map(
// 	row => ({field: row[0], assumptions: row[1], taxonworksModel: row[2], taxonworksField: row[3], notes: row[4], standard: row[5]})
// );
const data = parsed.data.slice(1);

export default data;
