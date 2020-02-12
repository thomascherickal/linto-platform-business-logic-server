const debug = require('debug')('linto-red:node-red')
const http = require('http')

let redSettings = require(process.cwd() + '/settings.js')
let RED = require('node-red')

function ifHas(element, defaultValue) {
  if (!element) return defaultValue
  return element
}

class RedManager {
  constructor(webServer) {
    return this.init(webServer)
  }

  async init(express) {
    let server = http.createServer(express)

    RED.init(server, redSettings)
    express.use(ifHas(process.env.RED_UI_PATH, redSettings.httpAdminRoot), RED.httpAdmin)
    express.use(redSettings.httpNodeRoot, RED.httpNode)

    server.listen(ifHas(process.env.HTTP_PORT_RED, redSettings.uiPort))

    const events = RED.events
    events.once('nodes-started', () => {
      if (redSettings.disableList) {
        for (let i in RED.nodes.getNodeList()) {
          if (redSettings.disableList.indexOf(RED.nodes.getNodeList()[i].name) > -1) {
            RED.nodes.disableNode(RED.nodes.getNodeList()[i].id)
          }
        }
      }
    })
    await RED.start()
  }
}

module.exports = RedManager
