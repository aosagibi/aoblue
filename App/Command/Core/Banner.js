/* eslint-disable */
const BotClient = require('@components/DiscordClient')
const { Message, RichEmbed } = require('discord.js')
/* eslint-enable */

module.exports = {
  name: 'banner',
  desc: 'Cek banner KC.',
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
  const embed = new RichEmbed()
  .setImage(`https://cdn.discordapp.com/attachments/623432857720717312/641616798101405707/banner-welcome.gif`)
  .setColor(`#3367D6`)
message.channel.send({ embed: embed })
}