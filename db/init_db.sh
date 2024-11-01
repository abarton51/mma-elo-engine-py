#!/bin/bash

# Replace placeholders with actual environment variables and run the SQL commands
psql -U "$POSTGRES_USER" -h "$DATABASE_HOST" -c "CREATE DATABASE $POSTGRES_DB;"
psql -U "$POSTGRES_USER" -h "$DATABASE_HOST" -c "CREATE USER '$POSTGRES_USER' WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD';"
psql -U "$POSTGRES_USER" -h "$DATABASE_HOST" -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO '$POSTGRES_USER';"
