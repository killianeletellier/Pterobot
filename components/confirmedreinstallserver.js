const axios = require('axios');
const fs = require('fs');

const embeds = require('../assets/embeds.json');
const components = require('../assets/components.json');

const messageEditor = require('../functions/messageEditor');

exports.run = (client, interaction) => {
    const connections = JSON.parse(fs.readFileSync("connections.json"));
    const connection = connections.filter(connection => connection.message === interaction.message.id)[0];

    const url = connection.url;
    const apiKey = connection.apiKey;
    const server = connection.server;

    axios.post(`${url}api/client/servers/${server}/settings/reinstall`, {}, { headers: { Authorization: `Bearer ${apiKey}` } });

    messageEditor(client, interaction, embeds["serverReinstalled"], [components["buttons"]["goBackServerHome"]]);
}