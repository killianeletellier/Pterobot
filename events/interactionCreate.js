module.exports = (client, interaction) => {
    const component = client.components.get(interaction.customId);

    if (!component) return;

    component.run(client, interaction);
}