import changed from './recently-changed-sites.js';
import page from './page.js';
import fs from 'fs';
import path from 'path';

/**
 * Generate html reports in `outputDir` based on data in `dataDir`
 */
export default async (dataDir, outputDir) => {
	const data = JSON.parse(fs.readFileSync(path.join(dataDir, 'recently-changed-sites.json')))

	// So far there's only one report, recently changed sites list
	fs.writeFileSync(
		path.join(outputDir, 'changed.html'),
		await page({}, changed(data)).render()
	);
}
