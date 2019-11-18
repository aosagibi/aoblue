/* eslint-disable */
const BotClient = require('@components/DiscordClient')
const { Message, RichEmbed } = require('discord.js')
const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
/* eslint-enable */

module.exports = {
  name: 'quotes',
  desc: 'Quotes para member.',
  usage: '| Untuk add quotes gukanan cmd **kc.quotes --add `Text`**',
  example: ['', '--add Tulisan Yanan kebaca Selangkangan. -Ao']
}

/**
 * @param {BotClient} client
 * @param {Message} message
 * @param {string[]} args
 */
module.exports.run = async (client, message, args) => {
  const adapter = new FileSync('Database/quotes.json')
  const db = lowdb(adapter)

  // Cek apabila ada flagnya
  /** @type {'HasFlag' | 'NoFlag'} */
  const hasFlag = !args[0] || !args[0].startsWith('--') ? 'NoFlag' : 'HasFlag'

  if (hasFlag === 'NoFlag') {
    execute()
  } else {
    // Napa ga pake switch? Terlalu pendek
    if (args[0].substring(2) === 'add') add()
    else execute()
  }

  function execute () {
    /** @type {string[]} */
    const arr = db.get('quotes').value()
    const rand = Math.floor(Math.random() * arr.length)
    message.channel.send(arr[rand])
  }

  async function add () {
    const content = args.slice(1).join(' ')
    await db.get('quotes').push(content).write()
    message.reply(':white_check_mark: quotes berhasil ditambah!')
  }
}
