FROM node:12 as builder

COPY package.json .
COPY yarn.lock .

RUN yarn install;

COPY . . 
RUN yarn build

ENV NODE_ENV=production

EXPOSE 3000
CMD PORT=$PORT yarn start
