const Answer = require('../lib/answer')

module.exports = (game, gamecode, io) => {
  io.of(gamecode).emit('update game', game)

  if (game.counting) {
    const { seconds } = game

    --game.seconds

    const countdown = setInterval(_ => {
      if (game.seconds) {
        io.of(gamecode).emit('update game', game)

        --game.seconds
      } else {
        clearInterval(countdown)

        game.counting = false

        for (const question of game.questions) {
          question.showAnswer = true
        }

        game.seconds = seconds

        const i = game.questions.length - 1

        for (const id in game.players) {
          if (game.players[id].answers.length <= i) {
            game.players[id].answers[i] = new Answer('-', false)
          } else {
            game.players[id].answers[i].visible = true
          }
        }

        io.of(gamecode).emit('update game', game)
      }
    }, 1000)
  }
}
