const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL", "USER", "MESSAGE"] });

require('dotenv').config();

const fs = require('fs');
const Enmap = require('enmap');

client.login(process.env.token);

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Chargement en cours de l'événement ${eventName}.`);
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Chargement en cours de la commande ${commandName}.`);
        client.commands.set(commandName, props);
    });
});

client.components = new Enmap();

fs.readdir("./components/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./components/${file}`);
        let componentName = file.split(".")[0];
        console.log(`Chargement en cours du composant de message ${componentName}.`);
        client.components.set(componentName, props);
    });
});