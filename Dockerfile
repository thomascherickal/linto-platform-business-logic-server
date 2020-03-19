FROM node:latest

WORKDIR /usr/src/app/business-logic-server

COPY . /usr/src/app/business-logic-server
RUN npm install

HEALTHCHECK CMD node docker-healthcheck.js || exit 1
EXPOSE 80

COPY ./docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
# CMD ["node", "index.js"]
