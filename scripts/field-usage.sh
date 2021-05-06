echo "select \"__table:field_usage__\";";
echo "select \"name\", \"type\", \"bundle\",	\"count\";";
$1 sqlq --extra="-sN" "SELECT field_name from field_config_instance where field_id>0 and deleted=0;" | awk "{print \"SELECT '\" \$1 \"' as name, entity_type, bundle, count(*) FROM field_data_\" \$1 \";\"}"
