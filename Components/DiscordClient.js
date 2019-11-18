const Discord = require('discord.js')
const Config = require('../config.json')
const Console = require('./Console')

class BotClient extends Discord.Client {
  /**
   * @param {Discord.ClientOptions} props
   */
  constructor (props) {
    super(props)
    this.config = Config
    this.console = Console
    /**
     * @type {Discord.Collection<string, any}
     */
    this.commands = new Discord.Collection()
    /**
     * @type {Discord.Collection<string, string>}
     */
    this.aliases = new Discord.Collection()
    /**
     * @type {Discord.Collection<string, string[]>}
     */
    this.helps = new Discord.Collection()
    /**
     * @param {string} strJson
     * @returns {{} | boolean}
     */
    this.jsonValidate = (strJson) => {
      let ret
      try {
        ret = JSON.parse(strJson)
      } catch (error) {
        return false
      }
      return ret
    }
  }
}

module.exports = BotClient
