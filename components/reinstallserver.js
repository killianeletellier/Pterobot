const embeds = require('../assets/embeds.json');
const components = require('../assets/components.json');

const messageEditor = require('../functions/messageEditor');

exports.run = (client, interaction) => {
    messageEditor(client, interaction, embeds["reinstallWarning"], [components["buttons"]["confirmReinstallation"], components["buttons"]["goBackServerHome"]]);
}