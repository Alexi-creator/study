FROM node:19.3.0-alpine

WORKDIR /usr/src/app

ARG BUILD_TYPE

COPY package*.json ./

RUN yarn

COPY . .

RUN if [ "$BUILD_TYPE" = "build" ] ; then yarn build ; fi
RUN if [ "$BUILD_TYPE" = "build" ] ; then yarn global add serve ; fi
