/* eslint-disable */
const BotClient = require('@components/DiscordClient')
const { Message, RichEmbed } = require('discord.js')
const strFormat = require('string-format')
/* eslint-enable */

module.exports = {
  name: 'help',
  desc: 'List command yang tersedia',
  usage: '[command]',
  example: 'ping'
}

/**
 * @param {BotClient} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports.run = (client, message, args) => {
  const embed = new RichEmbed()
    .setColor(message.member.colorRole.color)
    .setFooter(`Diminta oleh ${message.author.tag}`, message.author.displayAvatarURL)
    .setThumbnail(client.user.displayAvatarURL)
    .setTimestamp()

  // Apabila args kosong atau command tidak ada, berarti tampilkan semua commandnya
  if (!client.commands.has(args[0])) {
    embed
      .setTitle('Daftar Command')
      .setThumbnail(client.user.displayAvatarURL)

    client.helps.forEach(category => {
      const cate = category[0]
      const newCate = category.slice(1)

      embed.addField(cate, `\`${newCate.join('`, `')}\``)
    })
  } else {
    const commands = client.commands.get(args[0])
    const cmdName = typeof commands.name !== 'string' ? commands.name[0] : commands.name
    embed
      .setAuthor(`${client.config.bot_prefix}${cmdName}`)
      .addField('Deskripsi', commands.desc)
      .addField(
        'Alias',
        typeof commands.name !== 'string'
          ? `${client.config.bot_prefix}${commands.name.slice(1).join(', ' + client.config.bot_prefix)}`
          : 'Tidak ada alias'
      )
      .addField(
        'Cara Penggunaan',
        `${client.config.bot_prefix}${cmdName} ${commands.usage}`
      )

    if (typeof commands.example !== 'undefined') {
      embed.addField(
        'Contoh',
        typeof commands.example !== 'string'
          ? `${client.config.bot_prefix}${cmdName} ${commands.example.join(`\n${client.config.bot_prefix}${cmdName} `)}`
          : `${client.config.bot_prefix}${cmdName} ${commands.example}`
      )
    }
  }

  message.channel.send(`<@!${message.author.id}>`, { embed: embed }
  )
}
