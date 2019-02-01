FROM node:10.15.1-alpine 
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
RUN apk add --update alpine-sdk
RUN apk add python
ADD . /spf
WORKDIR /spf
RUN npm i
RUN npm run build
