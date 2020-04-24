'use strict'
const debug = require('debug')('linto-red:webserver:front:red')

module.exports = (webServer) => {
  return {
    '/config/admin': {
      method: 'get',
      controller: async (req, res, next) => {
        res.status(200).json({ admin: process.env.LINTO_STACK_DOMAIN + '/api' })
      },
    },
    '/health': {
      method: 'get',
      controller: async (req, res, next) => {
        res.sendStatus(200)
      }
    }
  }
}
