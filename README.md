# series-logger

> Log a series w/ spinner and op count

Made with ❤ at <a href="http://www.twitter.com/outlandish">@outlandish</a>

## Install

```bash
npm install --save series-logger
```

```bash
yarn add series-logger
```

## Import

```js
// ES2015
import log from 'series-logger' 
```

```js
// CommonJS
var log = require('series-logger') 
```

## Usage

### `series(number) : Function`

- __number__ {Number} The number of log operations in the series

Returns a function that can be called `number` times.

Each invocation should be passed a message and returns an instance of `ora`.

For details on ora [see it's GitHub repo](https://github.com/sindresorhus/ora).

## Example

```js
const log = series(5)

var operation = log('first operation').start()
//=> {spinner} [1/5] first operation

doSomethingAsync()
  .then(() => operation.success()) //=> {tick} [1/5] first operation 
  .catch(() => operation.fail()) //=> {cross} [1/5] first operation

log('second operation').start()
//=> {spinner} [2/5] second operation

// ...and so on
```

## License

MIT © [Sam Gluck](github.com/sdgluck)

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out the [great video tutorials on egghead.io](http://bit.ly/2aVzthz)!
