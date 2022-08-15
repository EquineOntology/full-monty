#####################
# Dependencies
#####################
FROM node:18-alpine AS dependencies
# Required because of node-alpine, see https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json .
RUN npm install


#####################
# Build
#####################
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build


#####################
# Run
#####################
FROM node:18-alpine AS runner
WORKDIR /var/www/html
ARG NODE_ENV=production
ARG NEXTJS_PORT=3000
ENV PORT ${NEXTJS_PORT}
EXPOSE ${NEXTJS_PORT}
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY . .
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules ./node_modules
USER nextjs
ENTRYPOINT ["npm", "run", "start"]