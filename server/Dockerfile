FROM node:16-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install -g nodemon
RUN npm install -g cross-env
RUN npm install

COPY . . 

EXPOSE 8081

CMD ["npm", "start"]