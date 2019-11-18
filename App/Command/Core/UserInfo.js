/* eslint-disable */
const BotClient = require('@components/DiscordClient')
const { Message, RichEmbed } = require('discord.js')
const Moment = require('moment')
/* eslint-enable */

module.exports = {
  name: ['userinfo', 'user'],
  desc: 'Cek informasi user di sini.',
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

  const embed = new RichEmbed()
    .setFooter(`Diminta oleh ${message.author.tag}`, message.author.displayAvatarURL)
    .setTimestamp()
    .setColor(member.colorRole.color)

    .setThumbnail(member.user.displayAvatarURL)
    .setTitle(`Informasi tentang ${member.user.username}`)

    .addField('User ID', member.id, true)
    .addField('Nickname', member.nickname || member.user.username, true)
    .addField('Status', member.presence.status, true)

  !member.presence.game
    ? embed.addField('Sedang Bermain', 'Not playing', true)
    : embed.addField('Sedang Bermain', member.presence.game.name, true)

  embed
    .addField(
      'Tanggal Buat Akun',
      Moment(member.user.createdAt).format(
        'MMMM Do YYYY [@] h:mm:ss A [UTC]Z'
      )
    )
    .addField(
      'Masuk Ke Server Ini',
      Moment(member.joinedAt).format(
        'MMMM Do YYYY [@] h:mm:ss A [UTC]Z'
      )
    )

  // Buat sekat untuk roles
  const roles = member.roles.map(role => `<@&${role.id}>`)
  const rolearr = new Map()
  let count = 0
  for (let i = 0; i < roles.length; i++) {
    if (i % 0) count++
    if (rolearr.has(count)) rolearr.get(count).push(roles[i])
    else {
      rolearr.set(count, [])
      rolearr.get(count).push(roles[i])
    }
  }
  // console.log(rolearr)
  rolearr.forEach(r => {
    embed.addField('\u200B', r.join(' | '))
  })

  message.channel.send({ embed: embed })
}
