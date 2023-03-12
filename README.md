## Start mode prod:
  docker-compose up --build

## Start mode dev:
  docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build

## Admin
  need add domain for local ip host
  dev.dos.com - dev
  dos.com - prod

## Authorization
  dev.dos.com/api/auth/ - authorization service

## API service
  dev.dos.com/api/v1/ - service api data
  
## Need fill .env file