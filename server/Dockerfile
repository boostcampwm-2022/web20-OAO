FROM node:18-alpine

WORKDIR /server

COPY package.json /server/package.json
COPY yarn.lock /server/yarn.lock
COPY ./dist /server/dist

RUN yarn

ENTRYPOINT [ "yarn", "server" ]
