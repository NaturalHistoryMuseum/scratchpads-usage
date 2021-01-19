# Data collection scripts

The data collection pipeline consists of the following:

	- Scripts for exporting select data from scratchpads databases
	- Downloading and parsing that data, insterting into an sqlite database
	- Querying that data to generate reports


## Collection scripts

These scripts run sql queries against the databases on sp-control-01 and sp-bio-01.

The user is expected to be connected to the nhm internal network or VPN, and to have set up passwordless public key ssh login to the servers.

The queries to execute are kept in `get-usage-data.sql`, and the data will be saved to the `data` directory.

Run the collection scripts using `./collect.sh`
