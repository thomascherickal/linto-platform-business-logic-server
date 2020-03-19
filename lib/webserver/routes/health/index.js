'use strict'
const debug = require('debug')('linto-red:webserver:front:red')

module.exports = (webServer) => {
  return {
    '/health': {
      method: 'get',
      controller: async (req, res, next) => {
        res.sendStatus(200)
      }
    }
  }
}
