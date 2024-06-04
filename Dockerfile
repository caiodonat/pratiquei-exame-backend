# Sempre utilizar a variante `alpine`.

# --- Base Node ---
# Base setup
FROM node:20-alpine3.18 AS base
RUN echo "FROM node:20-alpine3.18 AS base"

WORKDIR /app

COPY package*.json ./

COPY . .

# --- Production Setup ---
# Dependences, Prisma setup, Build and apply Prisma change
FROM base AS prod
RUN echo "base AS prod"

RUN npm ci
RUN npm run build

CMD [ "npm", "run", "start:prod" ]