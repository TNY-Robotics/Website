FROM node:lts-alpine as base

FROM base as build
ENV PORT=3000
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm prune

FROM base as prod
ENV PORT=3000
WORKDIR /app
EXPOSE 3000
COPY --from=build /app/.output /app/.output
CMD [ "node", ".output/server/index.mjs" ]