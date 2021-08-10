require('dotenv').config(); // to use .env file to hide my token.

const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();


const commandFolders = fs.readdirSync('./commands');
//console.log(commandFiles);

//console.log(typeof(client.commands));
//console.log((client.commands));

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

//console.log(client.commands);

const prefix = config.prefix;
const token = process.env.REACT_APP_TOKEN;

client.once('ready', () => {
	console.log('Ready!');
    console.log(`Version is ${config.version}`);
    console.log(`Version Info:`);
    console.log(`${config.info}`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
    if(message.channel.type === 'dm'){
        return message.reply("아직 1대1 대화는 지원하지 않습니다. 지원 계획또한 없습니다.");
    }

	const args = message.content.slice(prefix.length).trim().split(/ +/); //slice: 문자열을 인자만큼 앞부분 날리고 뒷부분 반환
    //trim: 좌우공백제거
	const commandName = args.shift().toLowerCase(); //shift: 배열에서 맨 앞에 거 제거하고 반환.

    if (!client.commands.has(commandName)) return; //커맨드 존재 여부 확인. 미존재 시 리턴.

    const command = client.commands.get(commandName); //클라이언트.커맨드에서 커맨드 네임 일치하는 놈 가져오기.
    

    if(command.args > args.length){
        let reply = `커맨드 후에 적어도 ${command.args}개의 인자가 필요하지만, 인자를 ${args.length}개 밖에 입력하지 않으셨습니다.\n`;
        console.log(command.usage);
        if(command.usage){
            console.log("zz");
            reply += `커맨드 사용의 올바른 예시는 "${prefix}${commandName} ${command.usage}" 입니다.`;
        }
        return message.reply(reply);
    }

	try {
		command.execute(message, args); //execute 함수 시도
	} catch (error) {
		message.reply(error); //에러 뿌리기
		message.reply('there was an error trying to execute that command!\nPlease send message to Developer.'); //보이기
	}
});

client.login(token);