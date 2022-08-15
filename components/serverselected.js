const fs = require('fs');
const mysql = require('mysql');

const config = require('../config.json');

const database = mysql.createConnection({
    host: config.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: config.dbDatabase
});

const embeds = require('../assets/embeds.json');
const components = require('../assets/components.json');

const messageEditor = require('../functions/messageEditor');

exports.run = (client, interaction) => {
    const connections = JSON.parse(fs.readFileSync('connections.json'));
    const connection = connections.filter(connection => connection.message === interaction.message.id)[0];

    if (interaction.values) {
        connection.server = interaction.values[0];
        connections[connections.indexOf(connection)] = connection;

        fs.writeFileSync('connections.json', JSON.stringify(connections));
    }

    messageEditor(client, interaction, embeds["server"], [components["buttons"]["changePowerSate"], components["buttons"]["showServerDetails"]]);
}