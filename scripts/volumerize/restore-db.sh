apk add --no-cache postgresql-client

export PGPASSWORD=${POSTGRES_PASSWORD}

psql -U ${POSTGRES_USERNAME} -h postgres postgres -c "DROP DATABASE ${DATABASE};"
psql -U ${POSTGRES_USERNAME} -h postgres postgres -c "CREATE DATABASE ${DATABASE};"
psql -U ${POSTGRES_USERNAME} -h postgres ${DATABASE} -1 -f ${VOLUMERIZE_SOURCE}/backup.sql
