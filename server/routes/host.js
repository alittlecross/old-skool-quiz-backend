module.exports = (req, res) => {
  console.log('POST /host')

  const { cookie, gamecode, id } = req.body

  const games = req.app.get('games')

  const game = games[gamecode]

  console.log('Cookie: ' + cookie)
  console.log('Gamecode: ' + gamecode)
  console.log('Id: ' + id)

  if (!game) {
    console.log('Line: 15')
    res.status(404)
  } else {
    const host = game.host.id
    const youArePlayer = game.players[cookie]

    if (!youArePlayer) {
      console.log('Line: 22')
      res.status(401)
    } else if (host) {
      console.log('Line: 25')
      res.status(304)
    } else {
      game.host.id = +id
      game.host.name = game.players[id].name
      game.players[id].visible = false

      console.log('Line: 32')
      res.status(200).json({
        game
      })

      const io = req.app.get('io')

      io.of(gamecode).emit('update game', game)
    }
  }
}
