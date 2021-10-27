module.exports.cmd = (_client, message, _args) => {
    message.reply("hi!");
}

module.exports.help = {
    name: "hi",
    description: "replies with 'hi!'",
    usage: "%PREFIX%hi"
}