apk add --no-cache postgresql-client

echo "Creating $VOLUMERIZE_SOURCE folder if not exists"
mkdir -p $VOLUMERIZE_SOURCE

echo "Creating PG dump"
PGPASSWORD=${POSTGRES_PASSWORD} pg_dump -U ${POSTGRES_USERNAME} -h postgres ${DATABASE} > ${VOLUMERIZE_SOURCE}/backup.sql