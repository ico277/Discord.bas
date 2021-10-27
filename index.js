const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
client.config = require("./config.json");
client.commands = {};

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("Cleaning clibasic_temp...")
    fs.readdirSync("./clibasic_tmp/")
        .forEach((path) => fs.unlinkSync("./clibasic_tmp/" + path));
    console.log("[ loading commands ]");
    fs.readdirSync("./commands/")
        .forEach((file) => {
            if (file.endsWith(".js")) {
                console.log("[ Loading ./commands/%s ]", file);
                client.commands[file.replace(".js", "")] = require(`./commands/${file}`);
            }
        });
        console.log(client.commands)
    console.log("Successfully loaded all commands!");
});

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith(client.config.PREFIX)) return
    let args = message.content.split(/\s|\n/g);
    let command = args[0].substr(client.config.PREFIX.length).trim();
    args.shift();
    //console.log("command: %s, args: %s", command, args);

    if (!command.match(/\w/)) {
        message.reply("Invalid characters in command!");
        return;
    }

    let cmd = client.commands[command];
    if (cmd) {
        try {
            await cmd.cmd(client, message, args);
        } catch (err) {
            await message.reply("there was an unexpected error whilst running command!");
            message.channel.send(`=> ${err}`);
        }
    } else {
        let msg = await message.channel.send(`Command '${command}' not found!`);
        setTimeout(() => {
            if (msg.deletable) msg.delete().catch((_) => {});
        }, 5000);
    }
});

client.login(client.config.TOKEN);