const BotClient = require('@components/DiscordClient') // eslint-disable-line
const fs = require('fs')

/** @param {BotClient} client */
module.exports = (client) => {
  fs.readdir('./App/Command/', (err, categories) => {
    if (err) throw new Error(err)
    // console.log(categories)
    categories.forEach(category => {
      let hidden = false
      if (category.split('_')[1] === 'Hidden') {
        hidden = true
        category = category.split('_')[0]
      }

      fs.readdir(`./App/Command/${category}/`, (err, files) => {
        if (err) throw new Error(err)
        // console.log(files)
        files.forEach(file => {
          const cmdName = file.split('.')[0]
          const cmd = require(`../App/Command/${category}/${cmdName}`)
          const _cmdCaller = cmd.name
          if (hidden === true) cmd.hidden = true

          // Apabila ada alias
          let cmdCaller = ''
          let alias = []
          if (typeof _cmdCaller !== 'string') {
            cmdCaller = _cmdCaller[0]
            alias = _cmdCaller.slice(1)
          } else {
            cmdCaller = _cmdCaller
          }

          // Register to collection
          // Register command
          client.commands.set(cmdCaller, cmd)
          // Register alias
          if (alias.length > 0) {
            alias.forEach(a => client.aliases.set(a, cmdCaller))
          }
          // Register helps
          if (!client.helps.has(category)) {
            client.helps.set(category, [])
            client.helps.get(category).push(category)
            client.helps.get(category).push(cmdCaller)
          } else {
            client.helps.get(category).push(cmdCaller)
          }
        })
      })
    })
  })
}
