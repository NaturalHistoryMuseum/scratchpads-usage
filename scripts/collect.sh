# Get the current source directory so we can find files relative to it
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

date -u +\"%Y-%m-%d\" > $DIR/_data/date.json

$DIR/collect/collect.sh $DIR/get-usage-data.sql $DIR/_data
