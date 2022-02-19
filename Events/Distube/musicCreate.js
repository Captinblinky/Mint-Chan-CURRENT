const client = require("../../Structures/index.js");
const { MessageEmbed } = require("discord.js");


const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({
        embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
        ]
    }))

.on("addSong", (queue, song) => queue.textChannel.send({
    embeds: [new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
    ]
}))

.on("addList", (queue, playlist) => queue.textChannel.send({
    embdes: [new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
    ]
}))

.on("error", (channel, e) => {
    channel.send({
        embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Uh Ohs! There was an error 😓: ${e.toString().slice(0, 1974)}`)
        ]
    })
    console.error(e)
})

.on("empty", queue => queue.textChannel.send({
    embeds: [new MessageEmbed()
        .setColor("GREEN")
        .setDescription("The voice channel is empty... guess no one wanted to listen to music with me. *sniffle*")
    ]
}))

.on("searchNoResult", (message, query) => message.channel.send({
    embeds: [new MessageEmbed()
        .setColor("GREEN")
        .setDescription("`Sorry Senpai, I couldn't find any results for \`${query}\`!`")
    ]
}))

.on("finish", queue => queue.textChannel.send({
    embeds: [new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Songs Finished! Shall we play another senpai?~")
    ]
}))