FROM node:16.15.0-alpine3.14 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


FROM node:16.15.0-alpine3.14 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build


FROM node:16.15.0-alpine3.14 AS runner
RUN apk add --no-cache dumb-init
WORKDIR /app

ENV NODE_ENV production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist/ ./

USER node

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT [ "dumb-init" ]
CMD ["node", "server.js"]
