import './prototypes';
import {str} from './types';
import {maybeOf, none, just} from './functors';

export function User(){
  this.username = none(); // initially set to `none`
};
User.prototype.setUsername = function(name) {
  this.username = just(str(name)); // it's now a `just
};
User.prototype.getUsernameMaybe = function() {
  var usernameMaybe = maybeOf.curry()(str);
  return usernameMaybe(this.username).orElse('anonymous');
};
