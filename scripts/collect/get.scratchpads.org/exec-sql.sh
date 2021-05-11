# Execute an SQL file on the sites hosted at get.scratchpads.eu and output the results

# Read sql either from file at $1 or from stdin
if [ -z "$1" ]; then
	echo You must pass a filename to read from >&2
	exit 1
	# echo Reading SQL from stdin >&2
	# SQL_FILE="/dev/stdin"
else
	echo Reading SQL from $1 >&2
	SQL_FILE=$1
fi

# Base64 is an easy way to escape characters so we can send the sql script in the ssh command
SQL_SCRIPT=$(base64 -w0 $SQL_FILE)

# Get the sql script for finding the site list
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
GET_SITE_LIST=$(base64 -w0 $DIR/site-list.sql)

OUT_DIR="/tmp/output"

# Upload the field-usage script
rsync scripts/field-usage.sh sp-control-01:.

# Get the list of sites and for each one pipe the sql script to the database via drush
# Send informational messages to stderr so we don't pollute stdout
echo Generate usage file... >&2
ssh -t sp-control-01 "
	mkdir $OUT_DIR
	rm $OUT_DIR/*
	echo $GET_SITE_LIST | base64 -d | sudo -u aegir drush @hm sqlc --extra=-N | while read line
	do
		n=\$((n+1));
		echo -n \"  [ \$n:\" \$line ']     ' \$'\\r'
		./field-usage.sh \"sudo -u aegir drush @\$line\" > /tmp/field-usage.sql
		cat /tmp/field-usage.sql | sudo -u aegir drush @\$line sqlc --extra=-fsN > $OUT_DIR/\$line
		echo $SQL_SCRIPT | base64 -d | sudo -u aegir drush @\$line sqlc --extra=-f >> $OUT_DIR/\$line
	done
	tar -czf $OUT_DIR.tar.gz -C $OUT_DIR ./ && rm -rf $OUT_DIR
" >&2

# Download the file by writing it to stdout or to a file if provided
if [ -z "$2" ]; then
  echo Download usage file to stdout... >&2
	ssh sp-control-01 "cat $OUT_DIR.tar.gz"
else
  echo Download usage file to $2... >&2
	rsync --progress sp-control-01:$OUT_DIR.tar.gz $2
fi
