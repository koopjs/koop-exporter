/* @flow */
'use strict'
const EventEmitter = require('events').EventEmitter
const GeoXForm = require('geo-xform')
const util = require('util')
const config = require('config')
const Logger = require('koop-logger')
const log = new Logger(config)
const path = require('path')

function Exporter (dependencies) {
  // queue is optional
  if (!dependencies || !dependencies.cache || !dependencies.files) throw new Error('Missing dependencies')
  this.cache = dependencies.cache
  this.queue = dependencies.queue
  this.files = dependencies.files
}

Exporter.version = require('./package.json').version
Exporter.plugin_name = 'exporter'
Exporter.dependencies = ['cache', 'queue', 'files']
Exporter.type = 'plugin'

Exporter.prototype.createJob = function (options) {
  if (!this.queue) return this._doLocal(options)
  else return this.queue.enqueue('xport', options)
}

Exporter.prototype._doLocal = function (options) {
  const job = new Job()
  job.emit('start')

  const fileName = `${path.join(options.filePath, options.name)}.${options.format}`

  this.cache.createStream(options.table, options)
  .on('error', e => job.emit('fail', e))
  .pipe(GeoXForm.createStream(options.format, options))
  .on('error', e => job.emit('fail', e))
  .on('log', l => log[l.level](l.message))
  .pipe(this.files.createWriteStream(fileName))
  .on('error', e => job.emit('fail', e))
  .on('log', l => log[l.level](l.message))
  .on('finish', () => job.emit('finish'))
  return job
}

function Job (options) {
  this.options = options
}
util.inherits(Job, EventEmitter)

module.exports = Exporter
