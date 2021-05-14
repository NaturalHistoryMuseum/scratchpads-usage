import Router, { assets } from './pages/main.js';
import fs from 'fs';

const assetMap = {};

function getAssetUrl(asset){
	const path = '/assets/'+asset.location.split('/').pop();
	assetMap[path] = asset;
	return path;
}

for(const asset of assets) {
	assetMap[getAssetUrl(asset)] = asset;
}

function serveAsset(req, res){
	const url = new URL('file://'+req.url);

	if(assetMap[url.pathname]) {
		fs.createReadStream(assetMap[url.pathname].location).pipe(res);
		return true;
	}

	return false;
}

function LiveRouter(sql, date){
	return  Router({
		sql,
		date,
		getAssetUrl,
		getUrl: (id, options) => '/' + id + (options ? ('?' + options.toString()) : '')
	});
}

export default function(sql, date) {
	const router = LiveRouter(sql, date);

	// Serve pages dynamically
	return async (req, res)=>{
		let report;

		const url = new URL('file://'+req.url);

		if(serveAsset(req, res)) {
			return;
		}

		switch(url.pathname) {
			case '/':
				report = await router('index', url.searchParams);
				break;
			default:
				report = await router(url.pathname.substr(1), url.searchParams);
		}
		res.end(report);
	}
}
