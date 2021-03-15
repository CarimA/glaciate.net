'use strict'

const config = {
  multiCore: true,
  mobileThemeColor: '#105b4d',
  gitRepository: 'https://github.com/CarimA/glaciate.net',
  forceHttps: true,
  enableCompression: true,
  copyright: 'Copyright © 2020 Carim A. All rights reserved. 🚀',
  navigation: {
    header: [
      {
        'url': 'https://discord.gg/GCSjhTT',
        'html': 'Photeus'
      },
      {
        'url': 'http://twitter.com/nitrixr',
        'html': 'Twitter'
      }
    ]
  }
}

const express = require('express')
const pug = require('pug')
const path = require('path')
const fs = require('fs-extra')

let articles = []
let indexed = {}
let about = ''

main()

function main () {
  if (config.multiCore) {
    spawnClusters()
  } else {
    loadArticles()
    runServer()
  }
}

function spawnClusters () {
  const os = require('os')
  const cluster = require('cluster')

  if (cluster.isMaster) {
    spawnForks(os.cpus().length, cluster)
  } else {
    loadArticles()
    runServer()
  }
}

function loadArticles () {
  const parseMD = require('parse-md')
  about = renderMarkdown(parseMD.default(fs.readFileSync(path.join(__dirname, 'articles', 'work.md'), 'utf8')).content)

  createTemporaryDirectories()
  const articles = getDirectories(path.join(__dirname, 'articles'))
    .map(buildArticle)
    .filter(article => !article.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((item, index, arr) => {
      if (index > 0) {
        item.previous = arr[index - 1]
      }
      if (index < arr.length - 1) {
        item.next = arr[index + 1]
      }
      return item
    })
    .map(renderArticle)
}

function createTemporaryDirectories () {
  createDirectory(path.join(__dirname, 'dynamic'))
  createDirectory(path.join(__dirname, 'dynamic', 'article'))
  createDirectory(path.join(__dirname, 'dynamic', 'page'))
}

function buildArticle (filepath) {
  const parseMD = require('parse-md')

  const directory = path.join(__dirname, './articles', filepath, '/')
  const file = path.join(directory, 'index.md')
  const data = fs.readFileSync(path.join(file), 'utf8')

  var { metadata, content } = parseMD.default(data)
  metadata.slug = metadata.slug.toLowerCase()
  metadata.date = new Date(Date.parse(metadata.date))
  metadata.prettyDate = toPrettyDate(metadata.date)
  metadata.content = renderMarkdown(content)
  metadata.directory = directory
  metadata.draft = metadata.draft || false
  metadata.root = path.join('/articles', filepath, '/index.md')

  return metadata
}

function renderArticle (article) {
  indexed[article.slug] = article
  articles.push(article)
  articles.sort((a, b) => a.date > b.date)

  const newDir = path.join(__dirname, 'dynamic', 'article', article.slug)
  createDirectory(newDir)
  fs.copy(article.directory, newDir)
}

function createDirectory (dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

function spawnForks (total, cluster) {
  for (let i = 0; i < total; i++) {
    fork(cluster)
  }
}
function fork (cluster) {
  cluster.fork()
  cluster.on('exit', forkExit)
  cluster.on('listening', forkListening)
}

function forkExit (worker, code, signal) {
  console.log(`Worker ${worker.process.pid} died`)
  fork()
}

function forkListening (worker, address) {
  console.log(`Worker ${worker.process.pid} started`)
}

function runServer () {
  const http = require('http')
  const app = express()
  const server = http.Server(app)
  const port = process.env.PORT || config.port || 3000

  loadMiddleware(app)

  app.use(express.static(path.join(__dirname, 'static')))
  app.get('/', serveHome)
  app.get('/article/', serveArchive)
  app.get('/article/:url/', serveArticle)
  app.get('/blog/post/:url', (req, res) => res.redirect(301, '/article/' + req.params.url))
  app.use(express.static(path.join(__dirname, 'dynamic')))
  app.get('*', serve404)

  server.listen(port, serverListening)
}

function loadMiddleware (app) {
  app.enable('strict routing')
  app.set('views', path.join(__dirname, 'templates'))
  app.set('view engine', 'pug')

  if (config.forceHttps) {
    const forceHttps = require('express-force-https')
    app.use(forceHttps)
  }

  if (config.enableCompression) {
    const compression = require('compression')
    app.use(compression())
  }

  if (config.enableLogging) {
    const logger = require('morgan')
    app.use(logger('dev'))
  }

  const lessMiddleware = require('less-middleware')
  app.use(lessMiddleware(path.join(__dirname, 'static')))
}

function serve404 (req, res) {
  res.status(404).render('404', { config: config })
}

function serveHome (req, res) {
  res.render('home', { config: config, articles: articles, about: about })
}

function serveArchive (req, res) {
  res.render('archive', { config: config, articles: articles })
}

function serveArticle (req, res, next) {
  const article = indexed[req.params.url]
  if (article) {
    res.render('article', { config :config, article: article })
  } else {
    next()
  }
}

function serverListening () {
  console.log(`Server listening`)
}

function createDirectory (dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

function getDirectories (path) {
  return fs.readdirSync(path).filter((file) =>
    fs.statSync(`${path}/${file}`).isDirectory())
}

function renderMarkdown (markdown) {
  const showdown = require('showdown')
  showdown.setFlavor('github')
  const converter = new showdown.Converter()
  return converter.makeHtml(markdown)
}

function toPrettyDate (date) {
  const month = [ 'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov',
    'Dec'][date.getMonth()]
  return `${date.getDate(0)} ${month}`
}

function chunk (xs, size) {
  return xs.reduce((segments, _, index) =>
    index % size === 0 ? [...segments, xs.slice(index, index + size)] : segments, [])
}
