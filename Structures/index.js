const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const { Token } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");

const PG = promisify(glob);
const Ascii = require("ascii-table");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { DiscordTogether } = require("discord-together");

client.commands = new Collection()

module.exports = client;

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    youtubeDL: false,
    plugins: [new SpotifyPlugin()]
});

client.DiscordTogether = new DiscordTogether(client);

["Events", "Commands"].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token);