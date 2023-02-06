# Welcome to my ML project

## Setup for the project to work
To start you must create an image for the front and back.
When you enter either the directory /app or /server you must run the lines

```bash
# For app
docker build -t ml-front .

# For server
docker build -t mlibre-api .
```

# To use the stack fully (After both images are created)
```bash
docker compose up
```

# To only use the redis portion for local development
```bash
docker compose -f docker-compose-redis-only.yml up
```