const debug = require('debug')('linto-red:webserver:routes:routes')

module.exports = (webServer) => {
  return {
    '/red': require('./red')(webServer),
  }
}
