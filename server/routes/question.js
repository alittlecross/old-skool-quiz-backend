const Question = require('../lib/question')

const countdown = require('../services/countdown')

module.exports = (req, res, next) => {
  const { answer, cookie, correct, gamecode, picture, question, seconds } = req.body

  const games = req.app.get('games')

  const game = games[gamecode]

  if (!game) {
    res.status(404)
  } else {
    const host = game.host.id
    const youAreHost = cookie === host
    const youArePlayer = game.players[cookie]

    if (!youArePlayer) {
      res.status(401)
    } else {
      const { counting } = game

      if (!counting && youAreHost) {
        game.active = new Question(
          answer,
          correct,
          picture,
          question
        )
        game.seconds = +seconds

        res.status(200).json({
          game
        })

        const io = req.app.get('io')

        countdown(game, gamecode, io)
      } else {
        res.status(304)
      }
    }
  }
}
