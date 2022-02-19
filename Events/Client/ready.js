const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../Structures/config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log("*Yawn~* Good Morning Senpai!~");
        client.user.setActivity("my creator suffer.", { type: "WATCHING" });

        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("I managed to connect to our databases senpai! :3");
        }).catch((err) => {
            console.log(err, "I couldn't find the database senpai :c");
        })
    }
}