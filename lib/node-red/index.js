const debug = require('debug')('linto-interface:redmanager')
const redSettings = require(process.cwd() + "/settings.js")
const http = require('http');
var RED = require("node-red");

class RedManager {
    constructor(webServer) {
        return this.init(webServer)
    }

    async init(express) {
        let server = http.createServer(express);
        process.env.HTTP_PORT_RED = 8000
        RED.init(server, redSettings);
        express.use(redSettings.httpAdminRoot, RED.httpAdmin);

        debug(redSettings.httpNodeRoot, RED.httpNode)
        express.use(redSettings.httpNodeRoot, RED.httpNode);
        server.listen(process.env.HTTP_PORT_RED);

        const events = require(process.cwd() +'/node_modules/node-red/red/runtime/events')
        events.once("nodes-started", () => {
            // RED.nodes.disableNode('node-red/watch');
        })

        await RED.start();
    }
}

module.exports = RedManager