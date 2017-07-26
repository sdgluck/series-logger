'use strict'

const {PassThrough: PassThroughStream} = require('stream')
const getStream = require('get-stream')
const chalk = require('chalk')

const series = require('./index')

const getPassThroughStream = () => {
  const noop = () => {}
  const stream = new PassThroughStream()
  stream.clearLine = noop
  stream.cursorTo = noop
  return stream
}

describe('series-logger', () => {
  it('should throw with zero or negative total', () => {
    const msg = 'expecting total to be larger than zero'
    expect(() => series(0)).toThrowError(msg)
    expect(() => series(-1)).toThrowError(msg)
    expect(() => series(1)).not.toThrowError(msg)
  })

  it('should log a series', () => {
    const log = series(2)
    const stream = getPassThroughStream()
    const output = getStream(stream)

    for (let i = 0; i < 2; i++) {
      const spinner = log('foo')

      spinner.stream = stream
      spinner.color = false
      spinner.enabled = true
      spinner.start()
      spinner.stop()
    }

    stream.end()

    return output.then((output) => {
      expect(output).toContain('[1/2]')
      expect(output).toContain('[2/2]')
      expect(output).toContain('foo')
    })
  })

  it('should throw if calls to log exceed total', () => {
    const msg = 'calls to series logger has exceeded the total'
    const log = series(1)

    expect(() => {
      log('hello')
      log('hello')
    }).toThrowError(msg)
  })
})
