const debug = require('debug')('linto-red:ctl')
require('./config')

class Ctl {
  constructor() {
    this.init()
  }
  async init() {
    try {
      this.webServer = await require('./lib/webserver')
      debug(`Application is started - Listening on ${process.env.HTTP_PORT_RED}`)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}

new Ctl()
