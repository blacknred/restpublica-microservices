FROM node:alpine

# install graphicsmagick
RUN apk update && apk add graphicsmagick && rm -rf /var/cache/apk/*

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/package.json
RUN npm install --unsafe-perm=true

# start app
CMD ["npm", "start"]
