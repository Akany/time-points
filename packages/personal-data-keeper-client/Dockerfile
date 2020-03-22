FROM node:13

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

#Once build setup
#CMD npm run build

# build folder should be copied only
COPY . ./dist
