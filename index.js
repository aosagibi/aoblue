require('module-alias/register')
require('dotenv').config()
const Client = require('@components/DiscordClient')
const fs = require('fs')

const client = new Client({
  fetchAllMembers: false
})

client.console.info('Tekan Ctrl+C kemudian ketik Y atau cukup tutup window ini untuk mengakhiri bot ini.')

if (process.argv[2]) {
  process.env.DEV = 'true'
  client.console.info('In develop mode.')
}

// Require Commando in Routes
fs.readdir('./Connector/', (err, files) => {
  if (err) throw err
  files.forEach(file => {
    require(`./Connector/${file}`)(client)
  })
})

client.login(process.env.BOT_TOKEN)
