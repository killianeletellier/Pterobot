const embeds = require('../assets/embeds.json');
const components = require('../assets/components.json');

const messageEditor = require('../functions/messageEditor');

exports.run = (client, interaction) => {
    messageEditor(client, interaction, embeds["editServerSettings"], [components["buttons"]["renameServer"], components["buttons"]["reinstallServer"], components["buttons"]["goBackServerHome"]]);
}