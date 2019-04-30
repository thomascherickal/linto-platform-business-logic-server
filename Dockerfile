FROM node:latest

WORKDIR /usr/src/app/linto-red

COPY . /usr/src/app/linto-red

RUN npm install && \
  npm i linto-skills/linto-skills-optional && \
  npm i linto-skills/linto-skills-core && \
  npm i linto-skills/linto-utility

CMD ["node", "index.js"]