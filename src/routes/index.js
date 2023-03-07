const { Router } = require('express');

const create = require('./create');
const host = require('./host');
const join = require('./join');
const question = require('./question');

const router = Router();

router.post('/', (_, res) => {
  res.status(200).json({});
});

router.post('/create', create);
router.post('/host', host);
router.post('/join', join);
router.post('/question', question);

module.exports = router;
