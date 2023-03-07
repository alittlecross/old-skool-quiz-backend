const { Server } = require('socket.io');

module.exports = (app, httpServer, originRegex) => {
  app.set('games', {});

  app.set('io', new Server(httpServer, {
    cors: {
      origin: new RegExp(originRegex),
    },
  }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin', '*');

    next();
  });

  return require('./src/routes');
};
