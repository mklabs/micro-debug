const debug = require('.')('test:install');

debug('Define %s suite', 'foo');

setTimeout(() => {
  debug('done');
}, 200);
