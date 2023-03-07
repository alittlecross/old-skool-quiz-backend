const express = require('express');
const http = require('http');

const setupBackend = require('./index');

const app = express();
const httpServer = http.createServer(app);
const originRegex = process.env.ORIGIN_REGEX || 'http://localhost:3001';
const port = process.env.PORT || 3000;
const publicUrl = process.env.PUBLIC_URL || '';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${publicUrl}`, setupBackend(app, httpServer, originRegex));

httpServer.listen(port, () => {
  console.log(`\nlistening on port ${port}\n`); // eslint-disable-line no-console
});
