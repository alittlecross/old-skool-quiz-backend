const Answer = require('../lib/answer')

module.exports = (game, gamecode, io) => {
  const { seconds } = game

  io.of(gamecode).emit('update game', game)

  --game.seconds

  const countdown = setInterval(_ => {
    if (game.seconds) {
      io.of(gamecode).emit('update game', game)

      --game.seconds
    } else {
      clearInterval(countdown)

      game.questions.push(game.active)
      game.active = null
      game.seconds = seconds

      for (const id in game.players) {
        if (!game.players[id].active) game.players[id].active = new Answer('-')

        game.players[id].answers.push(game.players[id].active)
        game.players[id].active = null
      }

      io.of(gamecode).emit('update game', game)
    }
  }, 1000)
}
