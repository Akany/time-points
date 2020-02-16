FROM node:13

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD ["npm", "start"]