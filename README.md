# `ember-superstatic`

Provide configuration to an Ember app at runtime, via [`superstatic`][superstatic-github]

## What does it do?

`superstatic` is a tool built by Firebase that serves as both a static asset server and a means for providing a dynamic configuration to a static app based on the runtime of the server. It is no longer the backbone of the Firebase service, but is still maintained by the OSS community.

`ember-superstatic` aims to make it easy to use `superstatic` with Ember.js and the Ember CLI.  Specifically, it does the following:

1. Provides a means for importing the `superstatic` configuration into your application
2. Runs `superstatic` as part of the development server of the Ember CLI
3. Provides an `ember` command for starting a Production-ready `superstatic` server for your app

The result is that you can write Ember code like this, while pulling variables from the environment that the server is running in.

```javascript
import Route from '@ember/routing/route';
import env from 'superstatic';

export default Route.extend({
  model() {
    return fetch(`${env.API_URL}/users`).then(res => res.json());
  }
});
```

## Installation

```bash
ember install ember-superstatic
```

This should generate a configuration file for you automatically in `config/superstatic.js` that you can extend to provide additional values.

## Usage

In development, `superstatic` is automatically hooked into the development server.

In production, you can use `ember superstatic` to turn on a `superstatic` server pre-configured to work with an Ember application.

## Running in Docker

`ember-superstatic` is a great way to set up your Ember application to run inside a Docker container.  A blueprint is provided to generate a working `Dockerfile` that you can use.  The steps from Ember application (assuming `ember-superstatic` is installed) to running Docker container are as follows:

```bash
$ ember g ember-superstatic-dockerfile
$ docker build .
...
Successfully built adccad7b5736
$ docker run -d -p 80:3474 -e "GREETING=Hello, world!" adccad7b5736
```

This will build your Docker image and then run a container from it in the background, bind port `80` of the container to the Superstatic server running inside of it and set the environment variable `GREETING` inside the container to `Hello, world!` (which your Ember application might then include using Superstatic, which is the whole point!).  More information is available in Docker's documentation.


[superstatic-github]: https://github.com/firebase/superstatic
