FROM node:lts-alpine as base

FROM base as build
ENV PORT=3000
ENV NODE_OPTIONS=--max-old-space-size=4096
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune

FROM base as prod
ENV PORT=3000
WORKDIR /app
EXPOSE 3000
COPY --from=build /app/.output /app/.output
CMD [ "node", ".output/server/index.mjs" ]