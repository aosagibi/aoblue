const BotClient = require('@components/DiscordClient') // eslint-disable-line

module.exports.evtName = 'ready'
/** @param {BotClient} client */
module.exports.run = (client) => {
  client.user.setGame('with Komikcast.com')
  client.console.info(
    `Selfbot is ready! (${client.user.tag})`
  )

  if (process.argv[2] && process.env.DEV === 'true') {
    console.log('Commands')
    console.log(client.commands)
    console.log('Alias')
    console.log(client.aliases)
    console.log('Helps')
    console.log(client.helps)
  }
}
