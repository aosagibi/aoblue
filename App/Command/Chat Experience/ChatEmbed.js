/* eslint-disable */
const BotClient = require('@components/DiscordClient')
const { Message, RichEmbed } = require('discord.js')
/* eslint-enable */

module.exports = {
  name: ['chatembed', 'cembed'],
  desc: 'Embed Chat\nCek propertinya [di sini!](https://leovoel.github.io/embed-visualizer/)',
  usage: '[--edit [msgID]] <json>',
  example: ['{"description": "Hello world"}', '--edit 645147469482819594']
}

/**
 * @param {BotClient} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports.run = async (client, message, args) => {
  const data = client.jsonValidate(args.join(' '))
  if (!data) {
    if (args[0] !== '--edit') return message.reply(':x: JSON tidak valid!')
    // Apabila minta edit
    await edit(args[1])
    return undefined
  } else {
    await message.delete()
    return message.channel.send(new RichEmbed(data))
  }

  async function edit (idPesan) {
    await message.channel.fetchMessage(idPesan)
      .then(async msg => {
        await message.channel.send('Masukkan embed JSON...')
        message.channel.awaitMessages((m) => typeof m.content === 'string', { errors: ['time'], max: 1, time: 600000 })
          .then(async col => {
            const content = col.first().content
            if (!client.jsonValidate(content)) {
              message.reply(':x: JSON tidak valid!')
            } else {
              await msg.edit('', { embed: new RichEmbed(JSON.parse(content)) })
              message.reply(':white_check_mark: Embed berhasil diubah!')
            }
          })
          .catch(err => {
            message.reply(':grey_exclamation: Timed out!')
            console.log(err)
          })
      })
      .catch(err => {
        message.reply('Whoops, you got some error!\n' + err.message)
      })
  }
}