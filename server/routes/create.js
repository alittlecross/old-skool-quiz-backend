const Game = require('../lib/game')

const generator = require('../utils/generator')

module.exports = (req, res) => {
  console.log('POST /create')

  const games = req.app.get('games')

  let gamecode

  do {
    gamecode = generator(1)
  }
  while (games[gamecode])

  const { name } = req.body

  const password = generator(0)

  const game = games[gamecode] = new Game(gamecode, name, password)
  const io = req.app.get('io')
  const namespace = io.of(gamecode)

  namespace.on('connection', socket => require('../services/socket-server')(game, namespace, socket))

  console.log('Name: ' + name)
  console.log('Gamecode: ' + gamecode)
  console.log('Password: ' + password)

  console.log('Line 31')
  res.status(200).json({
    gamecode,
    password
  })
}
