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

In development, there isn't much you have to do! Just add the environment that you want to use to `.env.json`, which will be generated for you on installation; the rest is handled by the plugin.  You can use the Ember development server as you normally would.

In production, a command has been added to `ember` that allows you to turn on a Superstatic server that will serve the "build" version of the Ember application along with the environment provided.

### Production Examples

Start the Superstatic server:

```bash
ember superstatic:server
```

Start the Superstatic server on a particular port:

```bash
ember superstatic:server --port 8080
```

Start the Superstatic server with some specific Environment variables set

```bash
FOO='bar' ember superstatic:server
```

You can read more about configuring the environment below.


## Environment Configuration

Setting up your environment variables revolves around the `.env.json` file.  Because we're not using Divshot, we'll actually rely on it more than for just the Development environment, but we'll get to that in a moment.

### Development

After installing `ember-superstatic`, an `.env.json` file will be created automatically.  This defines the environment that will be used when doing local development.  For example, if you have an `.env.json` that looks like this:

```json
{
  "FOO": "bar"
}
```

then your JavaScript code can do something like this:

```javascript
import env from 'superstatic/environment';
console.log(env); // -> { FOO: bar }
```

### Production

Keys can be used in Production in three ways; that might seem like a lot to handle, but it tries to allow for maximum flexibility when considering cases where you might want to run `ember-superstatic` inside a container, where the environment is passed in through Environment variables.

To start with, your `.env.json` file will be used in Production as well; if you want to use the same configuration for something in both development and production, then you can just do nothing at all.

Next, environment variables with the same name as one from `.env.json` file are used.  For example, with the same file as the example above, the following invocation of `ember-superstatic`:

```bash
FOO='baz' ember superstatic:s
```

will result in the following behavior:

```javascript
import env from 'superstatic/environment';
console.log(env); // -> { FOO: baz }
```

Finally, if you want to specify some key that isn't present in your `.env.json` file at all, you can prefix the key with `SUPERSTATIC_`.  The prefix will be stripped off of the key before being used.  So, the following invocation of `ember-superstatic`:

```bash
SUPERSTATIC_HELLO='world' ember superstatic:s
```

will change the configuration to the following:

```javascript
import env from 'superstatic/environment';
console.log(env); // -> { FOO: bar, HELLO: world }
```

If you need to do more advanced configuration, you can use a `superstatic.json` file as specified in the [Superstatic documentation][superstatic-config-docs].


[superstatic-github]: https://github.com/firebase/superstatic
[superstatic-config-docs]: http://superstatic.org/#configuration
