# Koop-Exporter

[![Greenkeeper badge](https://badges.greenkeeper.io/koopjs/koop-exporter.svg)](https://greenkeeper.io/)
*Exporter plugin for Koop*

[![npm][npm-img]][npm-url]
[![travis][travis-image]][travis-url]

## Requirements
- A Koop cache must be registered
- GDAL must be installed on the local machine

## Installation
### From package
`npm install koop-exporter`

### From source
```bash
git clone https://www.github.com/koopjs/koop-exporter
cd koop-exporter
npm install -g babel
npm install
npm run compile
```

## Usage
```javascript
const config = require('config')
const Koop = require('koop')
const koop = Koop(config)
const Cache = require('koop-pgcache')
const Exporter = require('koop-exporter')
// exporter depends on Koop-Cache so register it first
koop.register(Cache)
// koop will instantiate a new Exporter with the cache plugged in
koop.register(Exporter)
```

[npm-img]: https://img.shields.io/npm/v/koop-exporter.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/koop-exporter
[travis-image]: https://img.shields.io/travis/koopjs/koop-exporter.svg?style=flat-square
[travis-url]: https://travis-ci.org/koopjs/koop-exporter
