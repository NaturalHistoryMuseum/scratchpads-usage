drush @$1 sqlq --extra="-sN" "SELECT field_name from field_config_instance where field_id>0 and deleted=0;" | awk "{print \"SELECT '\" \$1 \"' as name, count(*) FROM field_data_\" \$1}" |
while read line ;
do
drush @$1 sqlq "$line" ;
done
