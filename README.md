# rc-deps

[![Build Status][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![npm Downloads][downloads-image]][downloads-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Install packages required by your `.*rc` files. It supports `.eslintrc` and `.babelrc`.

## Install

```sh
$ npm i -g rc-deps
```

## CLI

```bash
➜ rc-deps
> checking `.eslintrc`...
> npm install --save-dev eslint-config-standard eslint-config-standard-react eslint-config-standard-jsx babel-eslint eslint-plugin-flow-vars
loadDep:lodash.keys → hea ▀ ╢███████████████████████████████████████░░░░░░░░░░░╟
```

## License

MIT © [David da Silva](http://dasilvacont.in)

[travis-image]: https://travis-ci.org/dasilvacontin/rc-deps.svg?branch=master
[travis-url]: https://travis-ci.org/dasilvacontin/rc-deps
[npm-image]: https://img.shields.io/npm/v/rc-deps.svg?style=flat
[npm-url]: https://npmjs.org/package/rc-deps
[downloads-image]: http://img.shields.io/npm/dm/rc-deps.svg
[downloads-url]: https://www.npmjs.org/package/rc-deps
[coveralls-image]: https://coveralls.io/repos/dasilvacontin/rc-deps/badge.svg
[coveralls-url]: https://coveralls.io/r/dasilvacontin/rc-deps
