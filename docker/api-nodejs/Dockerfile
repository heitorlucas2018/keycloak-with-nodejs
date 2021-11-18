FROM node:14
WORKDIR "/application"
COPY config.sh /config.sh

ARG DEBIAN_FRONTEND=noninteractive

ENTRYPOINT cp .env.test .env \
            && npm install nodemon -g \
            && npm install \
            && npm run dev

EXPOSE 3000