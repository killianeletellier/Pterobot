const { MessageEmbed, MessageButton } = require("discord.js");

exports.run = (client, interaction) => {
    const embed = new MessageEmbed()
        .setAuthor("Pterobot")
        .setTitle("Que souhaitez-vous faire ?")
        .setColor("#11529e")
        .setImage("https://camo.githubusercontent.com/25c00e7033eb4cb502c03d59de0311ff97cc152e5d07876a01d5dd1e06827cb3/68747470733a2f2f63646e2e707465726f64616374796c2e696f2f6c6f676f732f6e65772f707465726f64616374796c5f6c6f676f2e706e67")

    const panelButton = new MessageButton()
        .setCustomId("panels")
        .setLabel("Accéder à vos panels")
        .setStyle("PRIMARY")

    const channelID = interaction.message.channelId || interaction.message.channel_id;
    client.channels.fetch(channelID)
        .then(channel => {
            channel.messages.fetch(interaction.message.id)
                .then(message => {
                    message.edit({
                        embeds: [embed],
                        components: [{
                            type: 1,
                            components: [
                                panelButton
                            ]
                        }]
                    });
                });
        });
}