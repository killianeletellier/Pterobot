const axios = require('axios');
const mysql = require('mysql');

const embeds = require('../assets/embeds.json');
const components = require('../assets/components.json');

const messageEditor = require("../functions/messageEditor");
const config = require('../config.json');

exports.run = (client, interaction) => {
    messageEditor(client, interaction, embeds["addPanelURL"], []);

    interaction.channel.awaitMessages({ max: 1, time: 60_000, errors: ["time"] })
        .then(url_collector => {
            const url = url_collector.first().content;

            messageEditor(client, interaction, embeds["addPanelAPIKey"], []);

            interaction.channel.awaitMessages({ max: 1, time: 60_000, errors: ["time"] })
                .then(apikey_collector => {
                    const apikey = apikey_collector.first().content;

                    axios.get(`${url}api/client/`, {
                        headers: {
                            Authorization: `Bearer ${apikey}`
                        }
                    })
                        .then(() => {
                            messageEditor(client, interaction, embeds["addPanelAPILabel"], []);

                            interaction.channel.awaitMessages({ max: 1, time: 60_000, errors: ["time"] })
                                .then(apilabel_collector => {
                                    const apilabel = apilabel_collector.first().content;

                                    messageEditor(client, interaction, embeds["addPanelSuccess"], []);

                                    const connection = mysql.createConnection({
                                        host: config.dbHost,
                                        user: process.env.dbUser,
                                        password: process.env.dbPassword,
                                        database: config.dbDatabase
                                    });

                                    connection.query(`SELECT * FROM panels WHERE url="${url}";`, function (error, panels) {
                                        if (!panels || !panels[0]) {
                                            connection.query(`INSERT INTO panels (url) VALUES ("${url}");`, function (error, results) {
                                                connection.query(`INSERT INTO api_keys (api_key, label, panel, user) VALUES ("${apikey}", "${apilabel}", ${results.insertId}, "${interaction.user.id}");`);
                                            });
                                        } else {
                                            connection.query(`INSERT INTO api_keys (api_key, label, panel, user) VALUES ("${apikey}", "${apilabel}", ${panels[0]["ID"]}, "${interaction.user.id}");`);
                                        }
                                    });
                                })
                                .catch(err => {
                                    messageEditor(client, interaction, embeds["timeout"], [components["buttons"]["addPanelRetry"]]);
                                });
                        })
                        .catch(() => {
                            messageEditor(client, interaction, embeds["addPanelError"], [components["buttons"]["addPanelRetry"]]);
                        });
                })
                .catch(err => {
                    messageEditor(client, interaction, embeds["timeout"], [components["buttons"]["addPanelRetry"]]);
                });
        })
        .catch(() => {
            messageEditor(client, interaction, embeds["timeout"], [components["buttons"]["addPanelRetry"]]);
        });
}