const Answer = require('../models/answer');
const Player = require('../models/player');

module.exports = (req, res) => {
  const games = req.app.get('games');

  const {
    cookie, gamecode, name, password,
  } = req.body;

  const game = games[gamecode];

  if (!game || game.password !== password) {
    res.status(404);
  } else {
    const host = game.host.id;
    const id = cookie || Date.now();
    const youAreHost = host === id;

    if (youAreHost) {
      game.host.name = name;
    }

    if (game.players[id]) {
      game.players[id].name = name;
    } else {
      game.players[id] = new Player(name);
    }

    const player = game.players[id];

    for (let i = player.answers.length; i < game.questions.length; i++) {
      player.answers.push(new Answer('-'));
    }

    res.status(200).json({
      game,
      id,
    });

    const io = req.app.get('io');

    io.of(gamecode).emit('update game', game);
  }
};
