# source /preexecute/utils/check-env.sh

# check_env "Mysqldump" "MYSQL_PASSWORD" "MYSQL_USERNAME" "MYSQL_HOST" "MYSQL_DATABASE"

echo "Creating $VOLUMERIZE_SOURCE folder if not exists"
mkdir -p $VOLUMERIZE_SOURCE

echo "Creating PG dump"
PGPASSWORD=${POSTGRES_PASSWORD} pg_dump -U ${POSTGRES_USERNAME} -h postgres ${DATABASE_NAME} > ${VOLUMERIZE_SOURCE}/backup.sql