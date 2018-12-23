FROM node:10

LABEL maintainer Jdender~ <jdenderplays@gmail.com> (https://github.com/jdenderplays)

# Install maid
RUN yarn global add maid

# Install and cache packages
WORKDIR /usr/app
COPY package.json .
RUN yarn

# Setup project
COPY . .
EXPOSE 8080

# Switch to a non privliged user
USER node
