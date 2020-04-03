const updateGame = require('../services/update-game')

module.exports = (req, res) => {
  const { cookie, gamecode, id } = req.body

  const games = req.app.get('games')

  const game = games[gamecode]

  if (!game) {
    res.status(404)
  } else {
    const host = game.host.id
    const youArePlayer = game.players[cookie]

    if (!youArePlayer) {
      res.status(401)
    } else if (host) {
      res.status(304)
    } else {
      game.host.id = +id
      game.host.name = game.players[id].name
      game.players[id].visible = false

      const io = req.app.get('io')

      res.status(200).json({
        game
      })

      updateGame(game, gamecode, io)
    }
  }
}
