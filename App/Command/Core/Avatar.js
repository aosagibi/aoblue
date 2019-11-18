/* eslint-disable */
const BotClient = require('@components/DiscordClient')
const { Message, RichEmbed } = require('discord.js')
/* eslint-enable */

module.exports = {
  name: ['avatar', 'ava'],
  desc: 'Lihat avatar',
  usage: '[userID|userMention]',
  example: ['xxxxx68812729xxxxx', '@Thomas#4141']
}

/**
 * @param {BotClient} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports.run = (client, message, args) => {
  const guild = message.guild
  // Ambil member dari ID dan Mention, apabila gaada yanmg ketemu terakhir ambil
  // id author/pengirim pesan
  const member = message.mentions.members.first() ||
    guild.members.get(args[0]) ||
    guild.members.get(message.author.id)

  // Embed Constructor
  const embed = new RichEmbed()
    .setTitle(`Avatar from ${member.user.username}`)
    .setColor(message.member.colorRole.color)
    .setDescription(`[Avatar Link](${member.user.displayAvatarURL})`)
    .setImage(member.user.displayAvatarURL)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL)
    .setTimestamp()

  // Kirim deh
  message.channel.send({ embed: embed })
}
