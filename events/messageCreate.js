const { MessageEmbed, MessageButton } = require("discord.js");

module.exports = (client, message) => {
    if (!message.mentions.users.first() || message.mentions.users.first().id != client.user.id) return;

    message.delete();

    const startEmbed = new MessageEmbed()
        .setAuthor("Pterobot")
        .setTitle("Que souhaitez-vous faire ?")
        .setColor("#11529e")
        .setImage("https://camo.githubusercontent.com/25c00e7033eb4cb502c03d59de0311ff97cc152e5d07876a01d5dd1e06827cb3/68747470733a2f2f63646e2e707465726f64616374796c2e696f2f6c6f676f732f6e65772f707465726f64616374796c5f6c6f676f2e706e67")

    const panelButton = new MessageButton()
        .setCustomId("panels")
        .setLabel("Accéder à vos panels")
        .setStyle("PRIMARY")

    message.author.send({
        embeds: [startEmbed],
        components: [{
            type: 1,
            components: [
                panelButton
            ]
        }]
    })
        .catch(() => {
            const closedDM = new MessageEmbed()
                .setAuthor("Pterabot")
                .setTitle("Erreur")
                .setColor("RED")
                .setDescription(`${message.author}, par mesure de confidentialité, ce bot s'utilise en messages privés. Merci donc de les ouvrir pour pouvoir commencer à utiliser Pterabot.`)

            message.channel.send({
                embeds: [closedDM]
            });
        });
}