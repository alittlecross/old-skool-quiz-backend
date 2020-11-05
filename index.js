const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const socket = require('socket.io')

const { create, host, index, join, question } = require('./server/routes')

const app = express()
const games = {}
const port = process.env.PORT || 3001
const server = http.createServer(app)

const io = socket(server)

app.set('games', games)
app.set('io', io)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', index)

app.post('/create', create)
app.post('/join', join)
app.post('/host', host)
app.post('/question', question)

server.listen(port)
