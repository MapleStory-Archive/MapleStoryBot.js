module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	execute(interaction) {
		return interaction.reply('Pong!');
	},
};