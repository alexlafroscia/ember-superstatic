import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import env from 'superstatic/environment';

export default Controller.extend({
  env,

  greeting: alias('env.GREETING')
});
