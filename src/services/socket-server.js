const Answer = require('../models/answer');

module.exports = (game, namespace, socket) => {
  socket.on('add answer', (answer, id) => {
    game.players[id].active = new Answer(answer);

    namespace.emit('update game', game);
  });

  socket.on('add/remove points', (i, id, points) => {
    game.players[id].answers[i].points += points;

    namespace.emit('update game', game);
  });

  socket.on('end countdown', (_) => {
    game.seconds = 0;
  });

  socket.on('merge players', (a, b) => {
    const players = [a, b].sort();

    game.players[players[1]].answers.forEach((answer, i) => {
      if (answer.answer === '-') {
        game.players[players[1]].answers[i].answer = game.players[players[0]].answers[i].answer;
        game.players[players[1]].answers[i].points = game.players[players[0]].answers[i].points;
      }
    });

    delete game.players[players[0]];

    namespace.emit('remove player', players[0]);
    namespace.emit('update game', game);
  });

  socket.on('remove player', (id) => {
    delete game.players[id];

    namespace.emit('remove player', id);
    namespace.emit('update game', game);
  });

  socket.on('switch host', (id) => {
    const host = game.host.id;

    game.players[host].visible = true;

    game.host.id = +id;
    game.host.name = game.players[id].name;
    game.players[id].visible = false;

    namespace.emit('update game', game);
  });
};
