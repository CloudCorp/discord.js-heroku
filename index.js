
client.login(process.env.TOKEN);

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');





fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);

    let cmdfiles = files.filter(f => f.split(".").pop() === "js");
    if(cmdfiles.length <= 0) return console.log('No commands to load!');

    console.log(`${cmdfiles.length} commands are being loaded.`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`Command ${i+1}: ${f} loaded!`);
        client.commands.set(command.name, command);
    });
});

client.on('ready', () => {
    client.user.setActivity('My Console', {type: 'WATCHING'});
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(process.env.TOKEN);


