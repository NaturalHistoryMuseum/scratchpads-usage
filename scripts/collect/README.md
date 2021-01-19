# Collection scripts

These scripts run sql queries against the databases on sp-control-01 and sp-bio-01.

The user is expected to be connected to the nhm internal network or VPN, and to have set up passwordless public key ssh login to the servers.

Run the scripts as follows:

`./collect.sh $SQL_FILE_TO_EXECUTE $DIRECTORY_TO_STORE_THE_DATA`
