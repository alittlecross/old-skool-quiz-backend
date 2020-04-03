const Host = require('./host')

class Game {
  constructor (gamecode, name, password) {
    this.counting = false
    this.gamecode = gamecode
    this.host = new Host()
    this.id = Date.now()
    this.name = name
    this.password = password
    this.players = {}
    this.questions = []
    this.seconds = 30
  }
}

module.exports = Game
