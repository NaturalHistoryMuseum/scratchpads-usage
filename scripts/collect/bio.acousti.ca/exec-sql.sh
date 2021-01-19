# Execute an SQL file on the bioacoustica servers and output the results

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

# Pipe the script to docker and output to a temp file
# Send informational messages to stderr so we don't pollute stdout
echo Generate usage file... >&2
ssh -t sp-bio-01 "
	cd /var/lib
	echo $SQL_SCRIPT | base64 -d | sudo docker exec -i scratchpads.apache drush sqlc --extra=-f > /tmp/usage.txt" >&2

# Download the file by writing it to stdout or to a file if provided
if [ -z "$2" ]; then
	ssh sp-bio-01 "cat /tmp/usage.txt"
else
  echo Download usage file to $2... >&2
	rsync --progress sp-control-01:/tmp/usage.txt $2
fi
