FROM node:latest

WORKDIR /usr/src/app/linto-red

COPY . /usr/src/app/linto-red
RUN npm install

CMD ["node", "index.js"]