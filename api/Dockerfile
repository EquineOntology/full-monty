#####################
# Dependencies
#####################
FROM node:16-alpine as dependencies

WORKDIR /app
COPY package*.json .
RUN npm install

#####################
# Run
#####################
FROM node:16-alpine as runner

WORKDIR /var/www/html
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ARG NODE_PORT=9090
EXPOSE ${NODE_PORT}
ENTRYPOINT ["npm", "run", "start"]