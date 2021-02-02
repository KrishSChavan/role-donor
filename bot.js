// To run the bot type in terminal "npm start" or "npm run devStart"


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
const CLEAR_MOD = 'clear_mod'

const LOWER_MEMBERS_1 = 'lower_members_1'
const LOWER_MEMBERS_5 = 'lower_members_5'
const LOWER_MEMBERS_10 = 'lower_members_10'
const LOWER_MEMBERS_50 = 'lower_members_50'
const LOWER_MEMBERS_100 = 'lower_members_100'
const CLEAR_MEMBERS = 'clear_members'

// const test = 'test'

const HELP = 'help'
const MEMBER = 'member'
const MOD = 'mod'


                //initializing the bot

client.on('ready', () => {
  console.log(`${client.user.tag}: Let's donate some roles!`) 
  client.user.setActivity(', "give help."')
})

// initializing variables for counting amount of users with a specific role
let members = 0
let mods = 0
let omnis = 0

// initializing an array for invalid users using commands
var denied = ["nope!", "I don't think sooooo!", "Ya think you slick eh?!", "Not gonna happen bud!", "nah", "how about, no!", "You ain't Krish!", "Try again..Never!", "Sure, hold on..", "May I see some id?", "only pro's can do that!", "Bye bye", "Intruder!", "Accident?"];

const usersEmbed = new Discord.MessageEmbed()
	.setColor('FFC900')
	.setTitle('Role Donor | Users')
	.setURL('https://discord.com/oauth2/authorize?client_id=787168353121992724&permissions=8&scope=bot')
	.setAuthor('Krish Chavan', 'https://i.imgur.com/AgSIvDj.png', 'http://krish.krishchavan.repl.co/')
	.setDescription("This is Krish Chavan's first Discord Music Bot. It searches  up the song  you want on youtube and starts playing it in the comfort of your discord voice call. Hope you enjoy!")
	.setThumbnail('https://i.imgur.com/8L8o096.png')
	.addFields(
    { name: '\u200B', value: '\u200B' },
    { name: '"give help"', value: 'Get HELP' },
    { name: '\u200B', value: '\u200B' },
    { name: '"give member"', value: 'Get MEMBER role' },
    { name: '\u200B', value: '\u200B' },
    { name: '"give mod"', value: 'Get MOD role' },
    { name: '\u200B', value: '\u200B' }
		// { name: '\u200B', value: '\u200B' },
    // { name: 'Inline field title', value: 'Some value here', inline: true },
    // { name: '\u200B', value: '\u200B' },
		// { name: 'Inline field title', value: 'Some value here', inline: true },
	)
	//.addField('Inline field title', 'Some value here', true)
	// .setImage('https://i.imgur.com/8L8o096.png')
	.setTimestamp()
  .setFooter('Powered by Krish Chavan', 'https://i.imgur.com/AgSIvDj.png')
  

const krishEmbed = new Discord.MessageEmbed()
	.setColor('FFC900')
	.setTitle('Role Donor | Krish')
	.setURL('https://discord.com/oauth2/authorize?client_id=787168353121992724&permissions=8&scope=bot')
	.setAuthor('Krish Chavan', 'https://i.imgur.com/AgSIvDj.png', 'http://krish.krishchavan.repl.co/')
	.setDescription("This is Krish Chavan's first Discord Music Bot. It searches  up the song  you want on youtube and starts playing it in the comfort of your discord voice call. Hope you enjoy!")
	.setThumbnail('https://i.imgur.com/8L8o096.png')
	.addFields(
    { name: '\u200B', value: '\u200B' },
    { name: 'GET AMOUNT', value: '>' },
    { name: '"give amount"', value: 'Get the amount of people that were given roles' },
    { name: '\u200B', value: '\u200B' },
    { name: '\u200B', value: '\u200B' },
    { name: 'ADJUST MOD', value: '>' },
    { name: '"lower_mod"', value: 'Lower MODS by 1' },
    { name: '\u200B', value: '\u200B' },
    { name: '"clear_mod"', value: 'Clear MODS' },
    { name: '\u200B', value: '\u200B' },
    { name: '\u200B', value: '\u200B' },
    { name: 'ADJUST MEMBERS', value: '>' },
    { name: '"lower_members_1"', value: 'Lower MEMBERS by 1' },
    { name: '\u200B', value: '\u200B' },
    { name: '"lower_members_5"', value: 'Lower MEMBERS by 5' },
    { name: '\u200B', value: '\u200B' },
    { name: '"lower_members_10"', value: 'Lower MEMBERS by 10' },
    { name: '\u200B', value: '\u200B' },
    { name: '"lower_members_50"', value: 'Lower MEMBERS by 50' },
    { name: '\u200B', value: '\u200B' },
    { name: '"lower_members_100"', value: 'Lower MEMBERS by 100' },
    { name: '\u200B', value: '\u200B' },
    { name: '"clear_members"', value: 'Clear MEMBERS' },
		// { name: '\u200B', value: '\u200B' },
    // { name: 'Inline field title', value: 'Some value here', inline: true },
    // { name: '\u200B', value: '\u200B' },
		// { name: 'Inline field title', value: 'Some value here', inline: true },
	)
	//.addField('Inline field title', 'Some value here', true)
	// .setImage('https://i.imgur.com/8L8o096.png')
	.setTimestamp()
  .setFooter('Powered by Krish Chavan', 'https://i.imgur.com/AgSIvDj.png')


client.on('message', async msg => {

  // variable that gets a random number that is then used to sort through the array for invalid users
  var deniedMsg = Math.floor(Math.random() * denied.length)

  // if (msg.content.toLocaleLowerCase() === "krish") {
  //   msg.react("❤️")
  // }

                // help command

  if (msg.content === `${BOT_PREFIX}${HELP}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send(usersEmbed)
    } else {
      msg.channel.send(krishEmbed)
    }
  }

                  // get the amount of people with a role

  if (msg.content === `${BOT_PREFIX}${AMOUNT}`) {
    if (msg.author.id !== '436325131325931538') { // add embed for this (already copied template)
      msg.channel.send(denied[deniedMsg])
    } else {
      const amountEmbed = new Discord.MessageEmbed()
      .setColor('FFC900')
      .setTitle('Role Donor | AMOUNT')
      .setURL('https://discord.com/oauth2/authorize?client_id=787168353121992724&permissions=8&scope=bot')
      .setDescription("Amount of people given roles")
      .setThumbnail('https://i.imgur.com/8L8o096.png')
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'MEMBERS:', value: `${members}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'MODS / OMNIS:', value: `${mods}`, inline: true },
        { name: '\u200B', value: '\u200B' }
      )
      .setTimestamp()
      .setFooter('Powered by Krish Chavan', 'https://i.imgur.com/AgSIvDj.png')

      msg.channel.send(amountEmbed)
    }
  }

  // if (msg.content === `${test}`) {
  //   members+= 10
  //   msg.channel.send(`MEMBERS have been raised by ${members}`)
  // }


            // lowering amount of people with a role commands

  if (msg.content === `${LOWER_MOD}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send(denied[deniedMsg])
    } else {
      mods--
      omnis--
      msg.channel.send(`MODS have been lowered by 1, for a total of ${mods}, ${omnis}`)
    }
  } 

  if (msg.content === `${CLEAR_MOD}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send(denied[deniedMsg])
    } else {
      mods = 0
      omnis = 0
      msg.channel.send(`MODS and OMNIS have been completly cleared to ${mods}, ${omnis}`)
    }
  } 

  // lower commands for members

  if (msg.content === `${LOWER_MEMBERS_1}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send(denied[deniedMsg])
    } else {
      members-= 1
      msg.channel.send(`MEMBERS have been lowered by 1, for a total of ${members}`)
    }
  } 

  if (msg.content === `${LOWER_MEMBERS_5}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send(denied[deniedMsg])
    } else {
      members-= 5
      msg.channel.send(`MEMBERS have been lowered by 5, for a total of ${members}`)
    }
  } 

  if (msg.content === `${LOWER_MEMBERS_10}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send(denied[deniedMsg])
    } else {
      members-= 10
      msg.channel.send(`MEMBERS have been lowered by 10, for a total of ${members}`)
    }
  } 

  if (msg.content === `${LOWER_MEMBERS_50}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send(denied[deniedMsg])
    } else {
      members-= 50
      msg.channel.send(`MEMBERS have been lowered by 50, for a total of ${members}`)
    }
  } 

  if (msg.content === `${LOWER_MEMBERS_100}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send(denied[deniedMsg])
    } else {
      members-= 100
      msg.channel.send(`MEMBERS have been lowered by 100, for a total of ${members}`)
    }
  } 

  if (msg.content === `${CLEAR_MEMBERS}`) {
    if (msg.author.id !== '436325131325931538') {
      msg.channel.send(denied[deniedMsg])
    } else {
      members = 0
      msg.channel.send(`MEMBERS have been completly cleared to ${members}`)
    }
  } 

  // make sure MEMBERS and MODS arn not saved as negitive numbers
  if (members < 0) {
    members = 0
  }
  if (mods < 0) {
    mods = 0
  }
  if (omnis < 0) {
    omnis = 0
  }


              // give MEMBER role

  if (msg.content === `${BOT_PREFIX}${MEMBER}`) {
    if (msg.member.roles.cache.has('802646243770761266') === false) {
      members++
      msg.channel.send("You have been donated the MEMBER role!")
      memberUser(msg.member)
    } else {
      msg.channel.send("You already have the MEMBER role")
    }
  }
  
              // give MOD role

  if (msg.content === `${BOT_PREFIX}${MOD}` && mods <= 3) {
    if (msg.member.roles.cache.has('802668893918199829') === false) {
      mods++
      omnis++
      msg.channel.send("You have been bestowed the MOD role as well as the OMNIS role. Use them wisely!")
      modUser(msg.member)
    } 
    else if (msg.content === `${BOT_PREFIX}${MOD}` && mods >= 3) {
      if (msg.member.roles.cache.has('') === false) {
        msg.channel.send("Sorry we already have all the mods we need")
      }
    } 
    else {
      msg.channel.send("You already have the MOD and OMNIS role")
    }
  }
})

//function for giving MEMBER role
function memberUser(member) {
  member.roles.add('802646243770761266')
}

//function for giving MOD role
function modUser(member) {
  member.roles.add('802668893918199829')
}

//getting bot token to access the bot
client.login(process.env.BOT_TOKEN)