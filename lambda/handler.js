'use strict'

const bots = [
  'Twitterbot',
  'facebookexternalhit',
  'Slackbot'
]

module.exports.redirect = (event, context, callback) => {
  const request = event.Records[0].cf.request
  const headers = request.headers
  console.log(request.uri)
  console.log(headers['user-agent'])
  const isBot = bots.some(v => {
    return headers['user-agent'][0].value.includes(v)
  })
  if (isBot) {
    request.uri = request.uri.replace(/^\/@note/g, '/@note_bot')
  }
  console.log(request.uri)
  callback(null, request)
}
