process.env.DEBUG = 'test:*';
const env = process.env;
const { stream: createWriteStream } = require('fs');
const { resolve } = require('path');
const { format } = require('util');

const file = env.DEBUG_STREAM;
const stream = typeof file === 'string' ? stream(resolve(file))
  : process.stderr;

// chainable api: debug('foo').debug('bar').log('baz');
//
// todo: better filtering on DEBUG, try to support wildcards
const logger = (prefix) => {
  let log = (msg, ...args) => {
    if ((env.DEBUG || '').indexOf(prefix) === -1) return { debug: log, log };
    args = [prefix + ' ' + msg].concat(args).concat(time());
    msg = format.apply(null, args);
    stream.write(msg + '\n');
    return { debug: log, log };
  };

  return log;
};

// todo: option to have timer per logger
const time = () => {
  let now = Date.now();
  let elapsed = (now - time.last) + 'ms';
  time.last = now;
  return elapsed;
};

time.last = Date.now();

module.exports = (ns) => {
  let prefix = ns || env.DEBUG_PREFIX || 'debug';
  return logger(ns);
};
