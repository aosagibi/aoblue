/* eslint-disable */
const BotClient = require('@components/DiscordClient')
const { Message, RichEmbed } = require('discord.js')
/* eslint-enable */

module.exports = {
  name: ['chat', 'c'],
  desc: 'Embed chat orang lain.',
  usage: '<idMessage>',
  example: '644192412612165642'
}

/**
 * @param {BotClient} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports.run = async (client, message, args) => {
  message.delete()

  const idMessage = args[0]
  const content = args.slice(1).join(' ')
  const embed = new RichEmbed()
  embed
    .setTimestamp()
    .setFooter(`#${message.channel.name}`)

  message.channel.fetchMessage(idMessage).then(msg => {
    // console.log(msg.content)
    embed
      .setAuthor(`${msg.author.username}`, msg.author.displayAvatarURL)
      .setDescription(`\n${msg.content === null ? '\u200B' : msg.content}`)
      .addField('\u200B', `[Lihat chat asli](https://discordapp.com/channels/${msg.guild.id}/${msg.channel.id}/${msg.id})`)
      .setColor(message.member.colorRole.color)

    // Apabila sang pengirim punya gambar, ntar yang diembed satu aja
    if (msg.attachments.size > 0) {
      // Gambar doang ya, file ga diterima
      try {
        embed.setImage(msg.attachments.first().url)
      } catch (error) {
        message.reply('lain kali, reply image aja ya.').then(m => setTimeout(() => m.delete(), 3000))
      }
    }

    message.channel.send({ embed: embed })
  })
}
