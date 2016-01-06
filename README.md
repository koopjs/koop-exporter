# Koop-Exporter
*Exporter plugin for Koop*

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
