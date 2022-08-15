const embeds = require('../assets/embeds.json');
const components = require('../assets/components.json');

const messageEditor = require('../functions/messageEditor');

exports.run = (client, interaction) => {
    messageEditor(client, interaction, embeds["changePowerState"], [components["buttons"]["startServer"], components["buttons"]["restartServer"], components["buttons"]["killServer"]])
}