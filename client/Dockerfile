FROM nginx
COPY ./dist /dist
COPY ./default.conf /etc/nginx/nginx.conf

RUN apt-get update && apt-get install vim -y
