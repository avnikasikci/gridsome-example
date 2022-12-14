
const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const yaml = require('js-yaml')
const Prism = require('prismjs')

// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(async ({ addMetadata, addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    let gridsomeVersion = ''

    try {
      const { stdout } = await execa('npm', ['show', 'gridsome', 'version'])
      gridsomeVersion = stdout
    } catch (err) {
      console.warn('Failed to get gridsome version from npm.')
    }

    addMetadata('gridsomeVersion', gridsomeVersion)

    //authors

    const authorsPath = path.join(__dirname, 'database/authors.json')
    const authorsRaw = await fs.readFile(authorsPath, 'utf8')
    const authorsJson = JSON.parse(authorsRaw)
    const authors = addCollection('Author')

    authorsJson.forEach(({ id, name,bio,displayName,avatar, ...fields }) => {
      authors.addNode({
        id,
        name,
        bio,
        displayName,
        avatar,
        internal: {
          origin: authorsPath
        },
        ...fields
      })
    })
    //authors



    // contributors
    const contributorsPath = path.join(__dirname, 'contributors/contributors.yaml')
    const contributorsRaw = await fs.readFile(contributorsPath, 'utf8')
    const contributorsJson = yaml.safeLoad(contributorsRaw)
    const contributors = addCollection('Contributor')

    contributorsJson.forEach(({ id, name: title, ...fields }) => {
      contributors.addNode({
        id,
        title,
        internal: {
          origin: contributorsPath
        },
        ...fields
      })
    })


  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })

}
