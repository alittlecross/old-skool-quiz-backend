module.exports = {
  create: require('./create'),
  host: require('./host'),
  index: (_, res) => {
    console.log('GET /index')
    console.log('Line: 6')
    res.status(200).send('hello world')
  },
  join: require('./join'),
  question: require('./question')
}
