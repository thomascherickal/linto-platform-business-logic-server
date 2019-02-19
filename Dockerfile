FROM node:10

WORKDIR /usr/src/app/linto-red

COPY . /usr/src/app/linto-red
RUN npm install

RUN mv linto-utility/ node_modules/ && \
    mv linto-skills-optional node_modules/  && \
    mv linto-skills-core node_modules && \
    cd node_modules/linto-skills-optional && \
    npm install && \
    cd ../linto-skills-core && \
    npm install
    
CMD ["node", "index.js"]