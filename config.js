const debug = require('debug')('linto-red:config')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

function noop() { }

function ifHasNotThrow(element, error) {
  if (!element) throw error
  return element
}
function ifHas(element, defaultValue) {
  if (!element) return defaultValue
  return element
}

function configureDefaults() {
  try {
    dotenv.config()
    const envdefault = dotenv.parse(fs.readFileSync('.envdefault'))

    // Node environment
    process.env.NODE_ENV = ifHas(process.env.NODE_ENV, envdefault.NODE_ENV)

    // Server RED properties
    process.env.HTTP_PORT_RED = ifHas(process.env.HTTP_PORT_RED, envdefault.HTTP_PORT_RED)
    process.env.RED_UI_PATH = ifHas(process.env.RED_UI_PATH, envdefault.RED_UI_PATH)

    // Admin properties
    process.env.ADMIN_URI = ifHas(process.env.ADMIN_URI, envdefault.ADMIN_URI)

    // TZ properties
    process.env.TZ = ifHas(process.env.TZ, envdefault.TZ)
  } catch (e) {
    console.error(debug.namespace, e)
    process.exit(1)
  }
}
module.exports = configureDefaults()