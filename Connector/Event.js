const BotClient = require('@components/DiscordClient') // eslint-disable-line
const fs = require('fs')

/** @param {BotClient} client */
module.exports = (client) => {
  fs.readdir('./App/Event/', (err, events) => {
    if (err) throw new Error(err)
    events.forEach(event => {
      const ev = require(`../App/Event/${event}`)
      client.on(ev.evtName, (...args) => ev.run(client, ...args))
    })
  })
}
