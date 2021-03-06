const Answer = require('../lib/answer')
const Player = require('../lib/player')

module.exports = (req, res) => {
  console.log('POST /join')

  const games = req.app.get('games')

  const { cookie, gamecode, name, password } = req.body

  console.log('Cookie: ' + cookie)
  console.log('Gamecode: ' + gamecode)
  console.log('Name: ' + name)
  console.log('Password: ' + password)

  const game = games[gamecode]

  if (!game || game.password !== password) {
    console.log('Line: 19')
    res.status(404)
  } else {
    const host = game.host.id
    const id = cookie || Date.now()
    const youAreHost = host === id

    if (youAreHost) {
      game.host.name = name
    }

    if (game.players[id]) {
      game.players[id].name = name
    } else {
      game.players[id] = new Player(name)
    }

    const player = game.players[id]

    for (let i = player.answers.length; i < game.questions.length; i++) {
      player.answers.push(new Answer('-'))
    }

    console.log('Line: 42')
    res.status(200).json({
      game,
      id
    })

    const io = req.app.get('io')

    io.of(gamecode).emit('update game', game)
  }
}
