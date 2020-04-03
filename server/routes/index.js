module.exports = {
  create: require('./create'),
  host: require('./host'),
  index: (_, res) => {
    res.status(200).send('hello world')
  },
  join: require('./join'),
  question: require('./question')
}
