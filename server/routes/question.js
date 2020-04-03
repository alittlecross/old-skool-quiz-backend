const Question = require('../lib/question')

const updateGame = require('../services/update-game')

module.exports = (req, res, next) => {
  const { answer, cookie, gamecode, picture, question, seconds } = req.body

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
        game.counting = true
        game.questions.push(new Question(
          answer,
          picture,
          question,
          false
        ))
        game.seconds = +seconds

        const io = req.app.get('io')

        res.status(200).json({
          game
        })

        updateGame(game, gamecode, io)
      } else {
        res.status(304)
      }
    }
  }
}
