FROM node:lts-slim

WORKDIR ./code

COPY assets ./assets
COPY components ./components
COPY composables ./composables
COPY layouts ./layouts
COPY models ./models
COPY pages ./pages
COPY public ./public
COPY stores ./stores
COPY nuxt.config.ts .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY package.json .

RUN yarn install
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["node","./.output/server/index.mjs"]
