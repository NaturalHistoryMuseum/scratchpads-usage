# Get the current source directory so we can find files relative to it
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DATE=$(date -u +\"%Y-%m-%d\")
$DIR/collect/collect.sh $DIR/get-usage-data.sql $DIR/_data

echo $DATE > $DIR/_data/date.json
