import fs from 'fs';


class Asset {
	#filename

	isAsset = true

	constructor(filename) {
		this.#filename = filename;
	}

	get location(){
		return this.#filename;
	}

	toString(){
		return 'data:;base64,' + fs.readFileSync(this.#filename).toString('base64');
	}
}

const asset = (file, source) => {
	if(source) {
		file = new URL(file, source.url ?? source).pathname;
	}
	return new Asset(file);
}

export default asset;
