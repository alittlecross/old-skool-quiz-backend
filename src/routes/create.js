const Game = require('../models/game');

const generator = require('../utils/generator');

module.exports = (req, res) => {
  const games = req.app.get('games');

  let gamecode;

  do {
    gamecode = generator(1);
  }
  while (games[gamecode]);

  const { name } = req.body;

  const password = generator(0);

  const game = games[gamecode] = new Game(gamecode, name, password);
  const io = req.app.get('io');
  const namespace = io.of(gamecode);

  namespace.on('connection', (socket) => require('../services/socket-server')(game, namespace, socket));

  res.status(200).json({
    gamecode,
    password,
  });
};
