FROM node:latest

WORKDIR /usr/src/app/business-logic-server

COPY . /usr/src/app/business-logic-server
RUN npm set registry http://verdaccio.linto.ai && npm install

RUN npm install @linto-ai/node-red-linto-core --registry=http://verdaccio.linto.ai && \
 npm install @linto-ai/node-red-linto-calendar --registry=http://verdaccio.linto.ai && \
 npm install @linto-ai/node-red-linto-datetime --registry=http://verdaccio.linto.ai && \
 npm install @linto-ai/node-red-linto-definition --registry=http://verdaccio.linto.ai && \
 npm install @linto-ai/node-red-linto-meeting --registry=http://verdaccio.linto.ai && \
 npm install @linto-ai/node-red-linto-memo --registry=http://verdaccio.linto.ai && \
 npm install @linto-ai/node-red-linto-news --registry=http://verdaccio.linto.ai && \
 npm install @linto-ai/node-red-linto-pollution --registry=http://verdaccio.linto.ai && \
 npm install @linto-ai/node-red-linto-weather --registry=http://verdaccio.linto.ai && \
 npm install @linto-ai/node-red-linto-welcome --registry=http://verdaccio.linto.ai

CMD ["node", "index.js"]
