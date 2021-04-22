# Scratchpads Data Analasys and Mapping to Taxonworks

This repository contains the data about Scratchpads usage, the scripts for generating that data, and reports analysing that data.

The reports are generated as a static site and hosted by GitHub at [naturalhistorymuseum.github.io/scratchpads-usage/](https://naturalhistorymuseum.github.io/scratchpads-usage/index.html).

For conclusions of the project, see [conclusions.md](conclusions.md)

## Set up

Run the collection scripts using `./scripts/collect.sh`

After collecting the data it will need to be imported into an sqlite database.

Ensure the node dependencies are available by running `npm install`.

Then import the data into sqlite with `node import.js`.

Reports can be generated into HTML by running `node reports.js`, which generates HTML files into the docs directory.
