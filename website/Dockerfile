#####################
# Dependencies
#####################
FROM node:16-alpine AS dependencies
# Required because of node-alpine, see https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm install


#####################
# Build
#####################
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build


#####################
# Run
#####################
FROM node:16-alpine AS runner
WORKDIR /var/www/html
ARG NODE_ENV=production
ARG NEXTJS_PORT=3000
ENV PORT ${NEXTJS_PORT}
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
# Automatically leverage output traces to reduce image size https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE ${NEXTJS_PORT}
CMD ["node", "server.js"]