const axios = require('axios');
const fs = require('fs');

const embeds = require('../assets/embeds.json');
const components = require('../assets/components.json');

const messageEditor = require('../functions/messageEditor');

exports.run = (client, interaction) => {
    messageEditor(client, interaction, embeds["renameServer"], [components["buttons"]["goBackServerHome"]]);

    interaction.channel.awaitMessages({ max: 1, time: 60_000, errors: ["time"] })
        .then(name_collector => {
            const name = name_collector.first().content;

            const connections = JSON.parse(fs.readFileSync("connections.json"));
            const connection = connections.filter(connection => connection.message === interaction.message.id)[0];

            const url = connection.url;
            const apiKey = connection.apiKey;
            const server = connection.server;

            axios.post(`${url}api/client/servers/${server}/settings/rename`, { name: name }, { headers: { Authorization: `Bearer ${apiKey}` } });

            messageEditor(client, interaction, embeds["serverRenamed"], [components["buttons"]["goBackServerHome"]]);
        })
        .catch(err => {
            messageEditor(client, interaction, embeds["timeout"], [components["buttons"]["renameServerRetry"]]);
        });
}