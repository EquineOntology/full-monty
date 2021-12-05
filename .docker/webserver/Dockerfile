FROM node:16-alpine as builder
WORKDIR /var/www/html
COPY package*.json .
RUN npm install
COPY . .

#---
FROM builder as production
ENV NODE_PATH=./build
RUN npm run build

EXPOSE 9090