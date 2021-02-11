import fs from 'fs';
import Router, {assets} from '../scripts/reports/main.js';

const getUrlStatic = (path, options) => {
	const filename = options ? path+'.'+Array.from(options).map(([k,v])=>`${k}_${v}`).join('.') : path;
	return filename + '.html';
}

function getAssetUrl(asset){
	return '/assets/'+asset.location.split('/').pop();
}

function StaticRouter(sql) {
	return Router({sql, getUrl: (...args) => '/scratchpads-usage/' + getUrlStatic(...args), getAssetUrl: a=>'/scratchpads-usage/'+getAssetUrl(a) });
}

// Also generate html pages in reports directory
export default async function(sql, outputDir){
	fs.mkdirSync(outputDir + '/assets', { recursive: true });
	for(const asset of assets) {
		fs.copyFileSync(asset.location, outputDir + getAssetUrl(asset))
	}

	const router = StaticRouter(sql);

	// Erase existing files
	for(const file of fs.readdirSync(outputDir)) {
		if(file.match(/\.html$/)) {
			fs.rmSync([outputDir, file].join('/'))
		}
	}

	for(const [path, page, options] of router) {
		const filename = getUrlStatic(path, options)
		fs.writeFileSync(outputDir + '/'+filename, await page);
	}
}
