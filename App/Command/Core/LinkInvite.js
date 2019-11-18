/* eslint-disable */
const BotClient = require('@components/DiscordClient')
const { Message, RichEmbed } = require('discord.js')
/* eslint-enable */

module.exports = {
  name: 'invite',
  desc: 'Invite link discord KC.',
  usage: '',
  example: []
}

/**
 * @param {BotClient} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports.run = async (client, message, args) => {
  // codenya di sini
  message.channel.send('https://discord.gg/n8XEka8')
}