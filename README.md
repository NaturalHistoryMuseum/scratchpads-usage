# Scratchpads Data Analasys and Mapping

This repository contains the data about Scratchpads usage, the scripts for generating that data, and reports analysing that data.

Run the collection scripts using `./scripts/collect.sh`

After collecting the data it will need to be imported into an sqlite database.

Ensure the node dependencies are available by running `npm install`.

Then import the data into sqlite with `node index.js`.

This will also generate JSON output and create HTML reports.

Some reports are written in markdown and kept in the markdown folder. They can be generated into HTML by running `node reports.js`, which generates HTML files into the reports directory.

Todo:
 - Entity/Content types and counts
 - Non-core fields
 - Enabled modules
