# Ember Superstatic

Easily include the Superstatic environment from Ember

## What does it do?

Not much, actually, but enough to be useful :wink: it handles adding including the Superstatic environment file to your `index.html` and allows you to easily import it for use within your app:

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

## Configuration

Currently, `ember-superstatic` only helps you out in Development; you'll still need to set up Superstatic in production (although I'm working on a solution to help with that, too).

To set up the environment that will be used in Development, defined an `.env.json` file like so:

```json
{
  "API_URL": "http://api.mysite.com"
}
```

This will be used by Superstatic to define the development environment.
