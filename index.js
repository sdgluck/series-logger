'use strict'

var chalk = require('chalk')
var ora = require('ora')

function message (index, total, msg) {
  var position = total > 1 ? chalk.grey('[' + index + '/' + total + '] ') : ''
  return position + msg
}

module.exports = function seriesLogger (total) {
  if (total <= 0) {
    throw new Error('expecting total to be larger than zero')
  }

  var i = 0

  return function (msg) {
    if (++i > total) {
      throw new Error('calls to series logger has exceeded the total')
    }

    msg = message(i, total, msg)

    return ora(msg)
  }
}
