const debug = require('debug')('linto-red:webserver:routes:routes')

module.exports = (webServer) => {

  let routes = {}

  routes[process.env.LINTO_STACK_BLS_SERVICE_API_PATH] = require('./red')(webServer)
  routes['/red'] = require('./services')(webServer)

  return routes
}
