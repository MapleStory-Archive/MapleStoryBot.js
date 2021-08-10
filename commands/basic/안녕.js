module.exports = {
	name: '안녕',//hello
	description: '핑크빈이 인사함',//pinkbean greeting
	execute(message, args) {
        //console.log(args[0]);
        let pink = "https://d30y0swoxkbnsm.cloudfront.net/forum/20181116/28a232e5-f2c8-4351-9ab1-f4e61b561e12.gif";
        message.channel.send(`안녕, <@!${message.author.id}>`, {files: ["./commands/basic/pinkbean.gif"]});
	},
};