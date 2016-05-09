#!/bin/bash

echo "DATABASE_URL=postgres://`whoami`@localhost/fantasy_db" > ./.env
echo "VERSION=LOCAL" >> ./.env

npm install
npm run start:dev
