
const debug = require('debug')('linto-interface:webserver:front:red')

module.exports = (webServer) => {
    return {
        '/test': {
            method: 'get',
            controller: async (req, res, next) => {
                res.json('ok')
            }
        },
    }
}