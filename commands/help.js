const { MessageEmbed } = require("discord.js");

module.exports.cmd = (client, message, args) => {
    if (args.length < 1) {
        let embed = new MessageEmbed()
            .setTitle("Help command")
            .addField("commands", Object.keys(client.commands).sort().join(" "))
            .setDescription(
                "This command shows you information about all commands from this bot.\n" +
                `For more information use \`${client.config.PREFIX}help [command]\`.`
            )
            .setFooter("<arg> means required argument ‹› [arg] means optional argument")
            .setColor(client.config.embeds.color);
        message.reply({ embeds: [embed] });
    } else {
        let help = client.commands[args[0].trim().toLowerCase()] ? client.commands[args[0].trim().toLowerCase()].help : undefined;
        if (help) {
            let embed = new MessageEmbed()
            .setTitle("Help command")
            .addField("name", help.name)
            .addField("usage", help.usage.replace("%PREFIX%", client.config.PREFIX))
            .setDescription(help.description.replace("%PREFIX%", client.config.PREFIX))
            .setFooter("<arg> means required argument ‹› [arg] means optional argument")
            .setColor(client.config.embeds.color);
        message.reply({ embeds: [embed] });
        } else {
            let embed = new MessageEmbed()
            .setTitle("Help command")
            .setDescription("Command not found!")
            .setFooter("<arg> means required argument ‹› [arg] means optional argument")
            .setColor(client.config.embeds.error_color);
        message.reply({ embeds: [embed] });
        }
    }
}

module.exports.help = {
    name: "help",
    description: "shows info about commands",
    usage: "%PREFIX%help [command]"
}