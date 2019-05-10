/*
 * Copyright (c) 2018 Linagora.
 *
 * This file is part of Business-Logic-Server
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

const debug = require('debug')('linto-red:node-red')
const http = require('http')
const utility = require('linto-utility')
const LINTO_MODULE_NAME = 'linto-skills-optional'

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
          } else {
            if (RED.nodes.getNodeList()[i].module === LINTO_MODULE_NAME && process.env.IS_POPULATE === 'true') {
              let populatePath = process.cwd() + '/node_modules/' + RED.nodes.getNodeList()[i].id + '/data/populate.md'
              let nluData = {
                url: process.env.TOCK_API,
                authToken: "Basic " + new Buffer.from(process.env.TOCK_USER + ':' + process.env.TOCK_PASSWORD).toString("base64")
              }
              utility.populateNluSkills(nluData, populatePath)
              utility.populateLmSkills({ url: process.env.LM_API }, populatePath)
            }
          }
        }
      }
    })
    await RED.start()
  }
}

module.exports = RedManager
