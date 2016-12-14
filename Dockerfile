FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Node.js app dependencies
RUN npm config set proxy http://www-proxy.us.oracle.com:80/
RUN npm config set https-proxy http://www-proxy.us.oracle.com:80/
COPY ./service/package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY ./service /usr/src/app/

ENV API_KEY="Please provide API_KEY when running this image: docker run --env API_KEY=<value>"

EXPOSE 3000
CMD [ "npm", "start" ]
#CMD [ "sleep", "3600" ]

