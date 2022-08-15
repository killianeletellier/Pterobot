const { MessageSelectMenu } = require('discord.js');
const mysql = require('mysql');
const config = require('../config.json');

const embeds = require('../assets/embeds.json');
const components = require('../assets/components.json');

const messageEditor = require('../functions/messageEditor');

exports.run = (client, interaction) => {
    const connection = mysql.createConnection({
        host: config.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPassword,
        database: config.dbDatabase
    });

    connection.query(`SELECT * FROM api_keys WHERE user=${interaction.user.id};`, function (error, results) {
        if (!results || !results[0]) {
            messageEditor(client, interaction, embeds["noPanel"], [components["buttons"]["addPanel"]]);
        } else {
            let linkedPanels = [];

            results.forEach(key => {
                linkedPanels.push(key.panel);
            });

            const uniquePanels = [...new Set(linkedPanels)];

            if (uniquePanels.length > 24) return;

            const panelsSelectMenu = new MessageSelectMenu()
                .setCustomId("panelselected")

            uniquePanels.forEach(panel => {
                connection.query(`SELECT * FROM panels WHERE ID=${panel};`, function (error, results) {
                    results.forEach(panel => {
                        panelsSelectMenu.addOptions({ label: panel["url"], value: panel["ID"].toString() });
                    });

                    panelsSelectMenu.addOptions({ label: "Ajouter un panel", value: "addpanel" });

                    messageEditor(client, interaction, embeds["panelSelection"], [panelsSelectMenu]);
                });
            });
        }
    });
}