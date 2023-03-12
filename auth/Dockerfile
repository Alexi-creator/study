FROM node:19.3.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .
