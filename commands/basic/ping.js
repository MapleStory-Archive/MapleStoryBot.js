module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	execute(message, args) {
		return interaction.reply('Pong!');
	},
};