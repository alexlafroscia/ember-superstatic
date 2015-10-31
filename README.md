# Ember Superstatic

Easily include the Superstatic environment from Ember

## What does it do?

`ember-superstatic` aims to make it really easy to use [Superstatic][superstatic-github] with Ember.js and the Ember CLI.  Specifically, it does the following:

1. Allows Ember to automatically pull in the environment from Superstatic
2. Provides a nice wrapper around the Superstatic environment, allowing you to interface with it in an Ember-ish way
3. Sets up a wrapper around the Superstatic server that can be used in Production to pull in environment variables

The result is that you can write Ember code like this, while pulling variables from the environment that the server is running in.

```javascript
import Ember from 'ember';
import ajax from 'ic-ajax';
import env from 'superstatic/environment';

const { Route } = Ember;

export default Route.extend({

    model() {
        return ajax(`${env.API_URL}/users`);
    }

});
```

## Installation

Assuming you have a modern version of the Ember CLI:

```bash
ember install ember-superstatic
```

## Usage

In development, there isn't much you have to do! Just set up the environment (see below) Superstatic will be added to the regular Ember development server.

In production, you can use `ember superstatic` to turn on a Superstatic server that will work with the environment configuration information below.  However, using this server isn't required; you application can be hosted anywhere that exposes an `/__/env.js` file that sets up a `window.__env` variable with your desired configuration.


## Environment Configuration

`ember-superstatic` will look for a file (`.env.json`, `.env.js`, `env.json`, or `env.js`) that will be imported and used as the environment to expose to your Ember application.

If you want a simple configuration, using a `JSON` file will be easier for you.  For example, you can set up a file like this:

```json
// env.json
{
  "FOO": "bar"
}
```

to expose that configuration.

If you need something more complex, like pulling in variables from your `BASH` environment, you can use an `env.js` file to export the environment through a module, like so:

```javascript
// env.js
module.exports = (function() {
  return {
    FOO: process.env.FOO
  }
})();
```

A starter `env.js` configuration file can be generated using `ember g superstatic-config` if you want help getting started.

## Server Configuration

If you need to do more advanced sever configuration, you can use a `superstatic.json` file as specified in the [Superstatic documentation][superstatic-config-docs].


## Running in Docker

`ember-superstatic` is a great way to set up your Ember application to run inside a Docker container.  A blueprint is provided to generate a working `Dockerfile` that you can use.  The steps from Ember application (assuming `ember-superstatic` is installed) to running Docker container are as follows:

```bash
$ ember g superstatic-dockerfile
$ docker build .
...
Successfully built adccad7b5736
$ docker run -d -p 80:3474 -e "GREETING=Hello, world!" adccad7b5736
```

This will build your Docker image and then run a container from it in the background, bind port `80` of the container to the Superstatic server running inside of it and set the environment variable `GREETING` inside the container to `Hello, world!` (which your Ember application might then include using Superstatic, which is the whole point!).  More information is available in Docker's documentation.


[superstatic-github]: https://github.com/firebase/superstatic
[superstatic-config-docs]: http://superstatic.org/#configuration
