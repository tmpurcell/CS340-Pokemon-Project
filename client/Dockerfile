# Build step 1: build the React front end
FROM node:20-alpine as build-step

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./client .

RUN yarn install

RUN yarn build

# Build step 2: build an nginx container using step 1 build
FROM nginx:stable-alpine

COPY --from=build-step /app/build /usr/share/nginx/html

COPY client/nginx.default.conf /etc/nginx/conf.d/default.conf