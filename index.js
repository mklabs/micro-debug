const stream = console.error;

const logger = (prefix) => {
  return (...args) => {
    return stream.apply(console, [prefix].concat(args).concat(time()));
  };
};

// todo: option to have timer per logger
const time = () => {
  let now = Date.now();
  let elapsed = (now - time.last) + 'ms';
  time.last = now;
  return elapsed;
};

time.now = Date.now();

module.exports = (ns) => {
  let prefix = ns || process.env.DEBUG_PREFIX || 'debug';
  return logger(ns);
};
