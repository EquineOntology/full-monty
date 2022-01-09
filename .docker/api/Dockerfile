#####################
# Run
#####################
FROM node:16-alpine as dependencies

WORKDIR /app
COPY api/package*.json .
RUN npm install

#####################
# Build
#####################
FROM node:16-alpine AS builder
WORKDIR /app
COPY ./api ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

#####################
# Run
#####################
FROM node:16-alpine as runner

WORKDIR /var/www/html
ARG NODE_PORT=9090
COPY --from=dependencies app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/build ./
EXPOSE ${NODE_PORT}
CMD ["node", "index.js"]