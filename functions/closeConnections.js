const fs = require('fs');

const embeds = require('../assets/embeds.json');
const components = require('../assets/components.json');

module.exports = function (client) {
    const connections = JSON.parse(fs.readFileSync("connections.json"));

    const currentEpoch = parseInt(Date.now().toString().slice(0, -3));

    connections.forEach((connection, i) => {
        if (connection.lastActivity + 3600 <= currentEpoch) {
            client.channels.fetch(connection.channel)
                .then(channel => {
                    channel.messages.fetch(connection.message)
                        .then(message => {
                            message.edit({ embeds: [embeds["connectionTimeout"]], components: [{ type: 1, components: [components['buttons']["mainMenu"]] }] });
                        });
                });

            connections.splice(i, 1);

            fs.writeFileSync('connections.json', JSON.stringify(connections));
        }
    });
}