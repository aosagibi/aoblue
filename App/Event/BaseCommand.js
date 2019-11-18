const BotClient = require('@components/DiscordClient') // eslint-disable-line
const { Message } = require('discord.js') // eslint-disable-line

module.exports.evtName = 'message'
/**
 * @param {BotClient} client
 * @param {Message} message
 */
module.exports.run = (client, message) => {
  // Apabila tidak dimulai dengan prefix
  if (!message.content.startsWith(client.config.bot_prefix)) return undefined

  // Ini selfbot

  // Detek command
  const oldArgs = message.content.split(' ')
  const cmdName = oldArgs[0].substring(client.config.bot_prefix.length)
  const args = oldArgs.slice(1)

  try {
    const cmd = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName))
    client.console.info(`You're executing [${typeof cmd.name !== 'string' ? cmd.name[0] : cmd.name}] command!`)
    cmd.run(client, message, args)
  } catch (e) {
    client.console.error(e.message)
  }
}
