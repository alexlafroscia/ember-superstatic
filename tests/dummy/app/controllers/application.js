import Ember from 'ember';
import env from 'superstatic/environment';

const { Controller, computed } = Ember;
const { alias } = computed;

export default Controller.extend({

  env: env,

  greeting: alias('env.GREETING')

});
