FROM node:16-alpine as builder
WORKDIR /var/www/html
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 9090