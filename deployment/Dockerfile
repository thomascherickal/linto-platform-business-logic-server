FROM node:latest

WORKDIR /usr/src/app/business-logic-server

COPY . /usr/src/app/business-logic-server

ARG VERDACCIO_USR
ARG VERDACCIO_PSW
ARG VERDACCIO_REGISTRY_HOST

RUN npm set registry http://${VERDACCIO_USR}:${VERDACCIO_PSW}@${VERDACCIO_REGISTRY_HOST} && npm install

RUN npm install @linto-ai/node-red-linto-core && \
 npm install @linto-ai/node-red-linto-calendar && \
 npm install @linto-ai/node-red-linto-datetime && \
 npm install @linto-ai/node-red-linto-definition && \
 npm install @linto-ai/node-red-linto-meeting && \
 npm install @linto-ai/node-red-linto-memo && \
 npm install @linto-ai/node-red-linto-news && \
 npm install @linto-ai/node-red-linto-pollution && \
 npm install @linto-ai/node-red-linto-weather && \
 npm install @linto-ai/node-red-linto-welcome

CMD ["node", "index.js"]