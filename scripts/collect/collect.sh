# Download sql data from the servers

if [ -z "$1" ]; then
	echo You must provide the sql file to execute >&2
	exit 1
fi

if [ -z "$2" ]; then
	echo You must provide a directory to save the data in >&2
	exit 1
fi


echo Execute $1 on the remote servers and store the data in $2 >&2

DATA_DIR=$2
GET_USAGE_DATA=$1

# Get the current source directory so we can find files relative to it
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Clear any existing data from $DATA_DIR
rm -r $DATA_DIR/*

# Get bioacoustica data
$DIR/bio.acousti.ca/exec-sql.sh $GET_USAGE_DATA > $DATA_DIR/bio.acousti.ca

# Get other site data
AEGIR_DATA_DIR=$DATA_DIR/get.scratchpads.org
TAR_FILE=$AEGIR_DATA_DIR.tar.gz
mkdir $AEGIR_DATA_DIR
$DIR/get.scratchpads.org/exec-sql.sh $GET_USAGE_DATA > $TAR_FILE
tar -xf $TAR_FILE -C $AEGIR_DATA_DIR
rm $TAR_FILE
