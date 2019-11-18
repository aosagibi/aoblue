/* eslint-disable */
const BotClient = require('@components/DiscordClient')
const { Message } = require('discord.js')
/* eslint-enable */

module.exports = {
  name: ['ping', 'p'],
  desc: 'Pong',
  usage: ''
}

/**
 * @param {BotClient} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports.run = (client, message, args) => {
  const startTime = Date.now()
  message.channel.send(':ping_pong: Wait for it...')
    .then(msg => {
      const diff = (Date.now() - startTime).toLocaleString()
      const api = client.ping.toFixed(0)
      msg.edit(`Latency: ${diff} ms | API: ${api} ms.`)
    })
}
