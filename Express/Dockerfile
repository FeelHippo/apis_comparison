FROM node:16

WORKDIR /app
RUN chown node:node /app

EXPOSE 3000

COPY --chown=node:node package-lock.json package-lock.json
COPY --chown=node:node package.json package.json
RUN npm ci

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm prune --only=production

USER node

CMD ["node", "build/server.js"]
