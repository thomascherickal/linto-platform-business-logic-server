const debug = require('debug')('linto-red:config')
const dotenv = require('dotenv')
const fs = require('fs')

function ifHas(element, defaultValue) {
  if (!element) return defaultValue
  return element
}

function configureDefaults() {
  try {
    dotenv.config()
    const envdefault = dotenv.parse(fs.readFileSync('.envdefault'))

    // Node environment
    process.env.LINTO_STACK_NODE_ENV = ifHas(process.env.LINTO_STACK_NODE_ENV, envdefault.LINTO_STACK_NODE_ENV)

    // Server RED properties
    process.env.LINTO_BLS_RED_HTTP_PORT = ifHas(process.env.LINTO_BLS_RED_HTTP_PORT, envdefault.LINTO_BLS_RED_HTTP_PORT)
    process.env.LINTO_BLS_RED_UI_PATH = ifHas(process.env.LINTO_BLS_RED_UI_PATH, envdefault.LINTO_BLS_RED_UI_PATH)

    // Admin properties
    process.env.LINTO_STACK_ADMIN_URI = ifHas(process.env.LINTO_STACK_ADMIN_URI, envdefault.LINTO_STACK_ADMIN_URI)

    // TZ properties
    process.env.TZ = ifHas(process.env.TZ, envdefault.TZ)
  } catch (e) {
    console.error(debug.namespace, e)
    process.exit(1)
  }
}
module.exports = configureDefaults()
