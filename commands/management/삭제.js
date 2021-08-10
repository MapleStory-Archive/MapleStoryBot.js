module.exports = {
	name: '삭제', //delete messages
	description: '`삭제 (숫자)\n(숫자)만큼 삭제.',//delete (num) num is amount.
	args: 1,
	usage: "<숫자>",
	execute(message, args) {
		let amount = parseInt(args[0]);
		if(isNaN(amount)) return message.reply("자연수를 입력해주세요");//natural number please.
		if(amount < 1) return message.reply("자연수를 입력해주세요.");//natural number please.
        message.channel.bulkDelete(amount + 1);
	},
};