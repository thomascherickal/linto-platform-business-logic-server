'use strict'
const debug = require('debug')('linto-red:webserver:front:red')
const fs = require('fs')
const verdaccio = require('./catalogue/verdaccio')

module.exports = (webServer) => {
  return {
    '/config/admin': {
      method: 'get',
      controller: async (req, res, next) => {
        let baseRequest = "http://"
        if (process.env.LINTO_STACK_USE_SSL === 'true')
          baseRequest = "https://"

        res.status(200).json({ admin: baseRequest + process.env.LINTO_STACK_DOMAIN + '/api' })
      },
    },
    '/health': {
      method: 'get',
      controller: async (req, res, next) => {
        res.sendStatus(200)
      }
    },
    '/catalogue/verdaccio/generate': {
      method: 'post',
      controller: async (req, res, next) => {
        try {
          if (process.env.LINTO_STACK_NPM_CUSTOM_REGISTRY !== 'undefined') {
            let catalogue = await verdaccio.create(process.env.LINTO_STACK_NPM_CUSTOM_REGISTRY)
            res.status(200).json({ msg: "Registry generated for : " + process.env.LINTO_STACK_NPM_CUSTOM_REGISTRY, ...catalogue })
          } else {
            res.status('409').json({ error: "Registry not defined" })
          }
        } catch (err) {
          res.status('404').json(err)
        }
      }
    },
    '/catalogue/read': {
      method: 'get',
      controller: async (req, res, next) => {
        const cataloguePath = '/root/.node-red/catalogues/catalogue.json'
        let jsonBuffer = fs.readFileSync(cataloguePath)
        let json = JSON.parse(jsonBuffer)
        res.status(200).json(json)
      }
    }
  }
}
