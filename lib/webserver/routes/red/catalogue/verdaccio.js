const fetch = require("node-fetch")

const fs = require('fs')
const cataloguePath = '/root/.node-red/catalogues/catalogue.json'

async function getDataFromAPI(url) {
  let response = await fetch(url)
  let json = await response.json()

  if (response.ok)
    return json
  else {
    throw json
  }
}

function writeFile(redCatalogue) {
  let jsonStr = JSON.stringify(redCatalogue)

  fs.open(cataloguePath, 'r', function (err, fd) {
    if (err) {
      fs.writeFile(cataloguePath, jsonStr, function (err) {
        if (err)
          console.log(err)
        console.log("The file was saved!")
      })
    } else {
      fs.writeFileSync(cataloguePath, jsonStr)
    }
  })
}

module.exports = {
  create: async function (host) {
    try {
      let redCatalogue = {
        name: "verdaccio-catalogue",
        updated_at: new Date(),
        modules: []
      }

      let url = host + "/-/verdaccio/packages"
      let catalogue = await getDataFromAPI(url)

      host += "/-/web/detail/"
      catalogue.map(mod_verdaccio => {
        let catalogue_module = {
          description: mod_verdaccio.description,
          version: mod_verdaccio.version,
          keywords: mod_verdaccio.keywords,
          types: ["node-red"],
          updated_at: mod_verdaccio.time,
          id: mod_verdaccio.name,
          url: host + mod_verdaccio.name
        }
        redCatalogue.modules.push(catalogue_module)
      })

      writeFile(redCatalogue)
      return redCatalogue

    } catch (err) {
      throw err
    }
  }
}