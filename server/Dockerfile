FROM node:18-alpine
WORKDIR /server
COPY package.json yarn.lock ./
RUN yarn install --immutable --immutable-cache --check-cache
RUN yarn dev
