FROM node:0.12.7
MAINTAINER Alex LaFroscia <alex@lafroscia.com>

# Path to Ember executable
ENV EMBER_EXEC /opt/app/node_modules/ember-cli/bin/ember
# Port that Superstatic runs on
EXPOSE 3474

# Install bower
RUN npm install -g bower \
    && echo '{ "allow_root": true }' > /root/.bowerrc

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json /tmp/package.json
RUN cd /tmp/ \
    && npm install
RUN mkdir -p /opt/app \
    && cp -a /tmp/node_modules /opt/app/

COPY bower.json /tmp/bower.json
RUN cd /tmp/ \
    && bower install
RUN cp -a /tmp/bower_components /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
COPY . /opt/app

RUN mkdir -p tests \
    && touch tests/index.html \
    && $EMBER_EXEC build \
    && rm -rf tmp
CMD ["/opt/app/node_modules/ember-cli/bin/ember", "superstatic"]
