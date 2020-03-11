FROM node:latest

WORKDIR /usr/src/app/business-logic-server

COPY . /usr/src/app/business-logic-server
RUN npm install

HEALTHCHECK CMD node docker-healthcheck.js || exit 1

ENTRYPOINT ["/usr/src/app/business-logic-server/docker-entrypoint.sh"]

EXPOSE 80
CMD ["node", "index.js"]
