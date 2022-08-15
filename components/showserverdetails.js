const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

const components = require('../assets/components.json');

const messageEditor = require('../functions/messageEditor');

exports.run = (client, interaction) => {
    const connections = JSON.parse(fs.readFileSync("connections.json"));
    const connection = connections.filter(connection => connection.message === interaction.message.id)[0];

    const url = connection.url;
    const apiKey = connection.apiKey;
    const server = connection.server;
    
    axios.get(`${url}api/client/servers/${server}/`, { headers: { Authorization: `Bearer ${apiKey}` } })
        .then(res => {
            const attributes = res.data.attributes;

            const detailsEmbed = new MessageEmbed()
                .setAuthor("Pterobot")
                .setColor(1135262)
                .setTitle(`Détails du serveur`)
                .addField("🪧 Nom", attributes.name, true)
                .addField("🔍 ID", attributes.identifier, true)
                .addField("🖥️ Node", attributes.node, true)
                .addField("📂 SFTP", `${attributes.sftp_details.ip}:${attributes.sftp_details.port}`, true)
                .addField("🖼️ Docker image", attributes.docker_image, true)
            
            messageEditor(client, interaction, detailsEmbed, [components["buttons"]["editServerSettings"], components["buttons"]["goBackServerHome"]]);
        });
}