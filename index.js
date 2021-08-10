const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

const prefix = '~';

client.once('ready', () => {
	console.log('Ready!');
    console.log(`Version is ${config.version}`);
    console.log(`Version Info:`);
    console.log(`${config.info}`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/); //slice: 문자열을 인자만큼 앞부분 날리고 뒷부분 반환
    //trim: 좌우공백제거
	const command = args.shift().toLowerCase(); //shift: 배열에서 맨 앞에 거 제거하고 반환.

	if (command === 'ping') {
		message.channel.send('Pong.');
	} else if (command === 'kick') {
		if (!message.mentions.users.size) {
			return message.reply("You have to mention User!");
		}
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You really want to kick ${taggedUser.username}?`);
	} else if(command == 'delete'){
        let number = parseInt(args[0]) + 1;
        if(isNaN(number)){
            return message.reply("You must type the natural number!");
        } else if(number < 2){
            return message.reply("You must type the natural number!");
        }
        message.channel.bulkDelete(number, true);
    } else if(command == 'avatar'){
        if(!message.mentions.users.size){
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({format: 'png', dynamic: true})}>`);
        }
        
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({format: 'png', dynamic: true})}>`;
        });

        message.channel.send(avatarList);
    }
});

client.login(config.token);