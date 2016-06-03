# micro-debug

`console.error` wrapper that replicates [debug][] output.

[debug]: https://github.com/visionmedia/debug

## Install

    $ npm install debug -S

## Usage

```js
const debug = require('micro-debug')('test:install');

debug('Define %s suite', 'foo');
setTimeout(() => {
  debug('done');
}, 200);
```

Output

```
test:install Define foo suite 0ms
test:install done 203ms
```

## Options

Configuration is done via environment variables:

- `DEBUG_PREFIX` - default namespace when not provided (`require('micro-debug')()`)
- `DEBUG_STREAM` - output stream. If it is a String, will attempt to open a new
  WriteStream and use it to redirect log output (default: `process.stderr`)
