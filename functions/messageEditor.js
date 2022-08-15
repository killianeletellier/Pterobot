const components = require('../assets/components.json');

module.exports = function(client, interaction, embed, component) {
    const messageComponents = [];

    if (component[0] != undefined) {
        messageComponents.push({
            type: 1,
            components: component
        });
    }

    const channelID = interaction.message.channelId || interaction.message.channel_id;
    client.channels.fetch(channelID)
        .then(channel => {
            channel.messages.fetch(interaction.message.id)
                .then(message => {
                    messageComponents.push(
                        {
                            type: 1,
                            components: [components["buttons"]["mainMenu"]]
                        });

                    message.edit({
                        embeds: [embed],
                        components: messageComponents
                    });
                });
        });
}