FROM node:alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/package.json
RUN npm install --unsafe-perm=true
# ADD package-lock.json /usr/src/package-lock.json
# COPY . /usr/src/app

# start app
CMD ["npm", "start"]
