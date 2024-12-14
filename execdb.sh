#!/bin/bash

docker exec -i bitehack_2024-db-1 mysql -u root -p1234 <<EOF
USE icons;
SOURCE /docker-entrypoint-initdb.d/init.sql;
EOF