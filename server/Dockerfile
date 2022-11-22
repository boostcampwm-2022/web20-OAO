FROM node:18-alpine
WORKDIR /server
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install --immutable --immutable-cache --check-cache
EXPOSE 8080
RUN yarn build
ENTRYPOINT [ "yarn", "server" ]
