const Question = require('../lib/question')

const countdown = require('../services/countdown')

module.exports = (req, res, next) => {
  console.log('POST /question')

  const { answer, cookie, correct, gamecode, picture, question, seconds } = req.body

  const games = req.app.get('games')

  const game = games[gamecode]

  console.log('Answer: ' + answer)
  console.log('Cookie: ' + cookie)
  console.log('Correct: ' + correct)
  console.log('Gamecode: ' + gamecode)
  console.log('Picture: ' + picture)
  console.log('Question: ' + question)
  console.log('Seconds: ' + seconds)

  if (!game) {
    console.log('Line: 23')
    res.status(404)
  } else {
    const host = game.host.id
    const youAreHost = cookie === host
    const youArePlayer = game.players[cookie]

    if (!youArePlayer) {
      console.log('Line: 31')
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

        console.log('Line: 45')
        res.status(200).json({
          game
        })

        const io = req.app.get('io')

        countdown(game, gamecode, io)
      } else {
        console.log('Line: 54')
        res.status(304)
      }
    }
  }
}
