require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client({
  partials: ["MESSAGE"]
})

//start of message to trigger bot
const BOT_PREFIX = "give "

//command names
const AMOUNT = 'amount'
const LOWER_MOD = 'lower_mod'

const HELP = 'help'
const MEMBER = 'member'
const MOD = 'mod'

client.on('ready', () => {
  console.log(`${client.user.tag}: Let's donate some roles!`) 
  client.user.setActivity(', "give help."')
})

let members = 0
let mods = 0

client.on('message', async msg => {
  if (msg.content === `${BOT_PREFIX}${HELP}`) {
    msg.channel.send(`Hello and welcome! 
To get a role use the commands bellow:
    
give member --> member role
give mod --> moderator role`)
  }

  if (msg.content === `${BOT_PREFIX}${AMOUNT}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send("nah")
    } else {
      msg.channel.send(`Members: ${members}
      Mods: ${mods}`)
    }
  }

  if (msg.content === `${LOWER_MOD}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send("nope!")
    } else {
      mods--
      msg.channel.send(`Mods has been lowered by 1, for a total of ${mods}`)
    }
  } 

  if (msg.content === `${BOT_PREFIX}${MEMBER}`) {
    if (msg.member.roles.cache.has('802646243770761266') === false) {
      members++
      msg.channel.send("You have been donated the MEMBER role!")
      memberUser(msg.member)
    } else {
      msg.channel.send("You already have the MEMBER role")
    }
  }
  
  if (msg.content === `${BOT_PREFIX}${MOD}` && mods !== 3) {
    if (msg.member.roles.cache.has('802668893918199829') === false) {
      mods++
      msg.channel.send("You have been bestowed the MOD role. Use it wisely!")
      modUser(msg.member)
    } 
    else if (msg.content === `${BOT_PREFIX}${MOD}` && mods === 3) {
      if (msg.member.roles.cache.has('') === false) {
        msg.channel.send("Sorry we already have all the mods we need")
      }
    } 
    else {
      msg.channel.send("You already have the MOD role")
    }
  }
})

function memberUser(member) {
  member.roles.add('802646243770761266')
}

function modUser(member) {
  member.roles.add('802668893918199829')
}


client.login(process.env.BOT_TOKEN)