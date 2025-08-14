# Full-Stack Application Deployment with Docker
This guide provides instructions for setting up and running the complete application stack (Frontend, Backend, WebSocket Server, and PostgreSQL Database) using Docker and Docker Compose.

## Prerequisites
Before you begin, ensure you have the following installed on your local machine:

1. Docker
2. Docker Compose
3. Bun (for running Prisma commands locally)

## Database Configuration
The application requires a PostgreSQL database. The connection string (*DATABASE_URL*) changes depending on how you run the application.

### Understanding the *DATABASE_URL*

1. For Local Development (Outside Docker):
When running your backend on your local machine and connecting to the Dockerized PostgreSQL database, you use *localhost* because the container's port *5432* is mapped to your machine's port *5432*.

```sh
DATABASE_URL="postgres://admin:secret@localhost:5432/postgres"
```
2. For Containerized Development (Inside Docker):
When all services (backend, frontend, etc.) are running in containers on the same Docker network, they can communicate using their container names as hostnames. The backend will connect to the database using the container name *postgres-db* on the internal port *5432*.

```sh
DATABASE_URL="postgres://admin:secret@postgres-db:5432/postgres"
```
## Initial Database Setup (Prisma)
Before running the application for the first time, you must initialize the database schema using Prisma.

*Important*: Make sure you have a *.env* file inside the *packages/db* directory containing the correct *DATABASE_URL* for local development.
1. Navigate to the db package:
```sh
cd packages/db
```

2. Run Prisma Migration:
This command will create the necessary tables in your database based on your schema.

```sh
npx prisma migrate dev --name <any_migration_name>
```
3. Generate Prisma Client:
This command generates the TypeScript types for your database client.

```sh
bunx prisma generate
```
## Running the Application

There are two methods to run the full application stack. Using Docker Compose is the recommended and simplest approach.

### Method 1: Using Docker Compose (Recommended)
This method uses the docker-compose.yml file to build and run all the services with a single command.

```sh
docker-compose up --build
```
This command will build the images for all services if they don't exist and then start all the containers.

### Method 2: Manual Docker Commands (Step-by-Step)

If you prefer to run each service individually, follow these steps in order.

1. Create Docker Network:
```sh
docker network create my-network
```
2. Run PostgreSQL Database:
```sh
docker run -d \
  --name postgres-db \
  --network my-network \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15

```

3. Build and Run Backend:
Note: We pass the container-friendly *DATABASE_URL* as a build argument.
```sh
# Build
docker build -f docker/dockerfile.backend -t backend .

# Run
docker run -p 3001:3001 --network my-network backend


```
4. Build and Run WebSocket (WS) Server:
```sh
# Build
docker build -f docker/dockerfile.ws -t ws .

# Run
docker run -p 8081:8081 --network my-network ws
```

5. Build and Run Frontend:

```sh
# Build
docker build -f docker/dockerfile.frontend --build-arg DATABASE_URL="postgres://admin:secret@postgres-db:5432/postgres" -t frontend .

# Run
docker run -p 3000:3000 --network my-network frontend
```