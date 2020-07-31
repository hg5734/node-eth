FROM node:10.16-alpine

# Create app directory
WORKDIR /usr/src

COPY package*.json ./

RUN yarn

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "yarn", "start" ]