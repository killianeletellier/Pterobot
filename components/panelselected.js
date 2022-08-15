const fs = require('fs');
const mysql = require('mysql');
const { MessageSelectMenu } = require('discord.js');

const messageEditor = require('../functions/messageEditor');
const askServers = require('../functions/askServers');

const config = require('../config.json');

const embeds = require('../assets/embeds.json');

const database = mysql.createConnection({
    host: config.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: config.dbDatabase
});

exports.run = (client, interaction) => {
    if (interaction.values[0] === "addpanel") {
        return client.components.get("addpanel").run(client, interaction);
    }

    const connections = JSON.parse(fs.readFileSync('connections.json'));

    database.query(`SELECT * FROM api_keys WHERE (panel=${interaction.values[0]} AND user=${interaction.user.id});`, function (error, keys) {
        if (keys.length > 1) {
            const apikeySelectMenu = new MessageSelectMenu()
                .setCustomId("apikeyselected")

            keys.forEach(key => {
                apikeySelectMenu.addOptions({ label: key.label, value: key["ID"].toString() });
            });

            messageEditor(client, interaction, embeds["apikeySelection"], [apikeySelectMenu]);
        } else {
            database.query(`SELECT url FROM panels WHERE ID=${keys[0].panel};`, function (error, panel) {
                connections.push({
                    apiKey: keys[0].api_key,
                    url: panel[0].url,
                    lastActivity: parseInt(Date.now().toString().slice(0, -3)),
                    channel: interaction.message.channelId || interaction.message.channel_id,
                    message: interaction.message.id
                });

                fs.writeFileSync('connections.json', JSON.stringify(connections));

                askServers(client, interaction, panel[0].url, keys[0].api_key);
            });
        }
    });
}