const axios = require('axios');
const { MessageSelectMenu } = require('discord.js');

const embeds = require('../assets/embeds.json');

const messageEditor = require('../functions/messageEditor');

module.exports = (client, interaction, url, api_key) => {
    axios.get(`${url}api/client/`, {
        headers: {
            Authorization: `Bearer ${api_key}`
        }
    })
        .then(res => {
            const servers = (res.data.meta.total <= 25) ? res.data.data : res.data.data.splice(0,25);

            const serversSelectMenu = new MessageSelectMenu()
                .setCustomId("serverselected")

            servers.forEach(server => {
                serversSelectMenu.addOptions({ label: server.attributes.name, value: server.attributes.identifier });
            });

            messageEditor(client, interaction, embeds["serverSelection"], [serversSelectMenu])
        })
}