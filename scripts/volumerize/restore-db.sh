apk add --no-cache postgresql-client

PGPASSWORD=${POSTGRES_PASSWORD} psql -U ${POSTGRES_USERNAME} -h postgres ${DATABASE_NAME} -1 -f ${VOLUMERIZE_SOURCE}/backup.sql
