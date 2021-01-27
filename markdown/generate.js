import fs from 'fs';
import path from 'path';
import markdown from 'marked';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

function generateFile(infile, outfile) {
	const input = fs.readFileSync(infile, 'utf-8');
	const out = markdown(input);
	fs.writeFileSync(outfile, out);
}

function generate(outDir) {
	for(const file of fs.readdirSync(__dirname)){
		const md = file.match(/^(.+)\.md$/);
		if(md) {
			generateFile(
				path.join(__dirname, file),
				path.join(outDir, md[1] + '.html')
			)
		}
	}
}

export default generate;
