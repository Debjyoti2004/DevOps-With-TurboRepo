FROM oven/bun:latest

RUN apt-get update -y && apt-get install -y nodejs npm openssl libssl-dev

WORKDIR /app

COPY package.json bun.lock ./ 
COPY apps/ws/package.json ./apps/ws/package.json
COPY packages/db/package.json ./packages/db/package.json

RUN bun install --filter ./apps/ws...

COPY apps/ws ./apps/ws
COPY packages/db ./packages/db

WORKDIR /app/packages/db
RUN bunx prisma generate

WORKDIR /app/apps/ws
RUN bun run build

EXPOSE 8081

CMD ["bun", "run", "start"]
