const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const { voice } = require("../../Structures");

module.exports = {
        name: "music",
        description: "Literally as the name says.",
        options: [{
                name: "play",
                description: "Plays a song.",
                type: "SUB_COMMAND",
                options: [{ name: "query", description: "Gimmie a name or URL link for the song you want to play!", type: "STRING", required: true }]
            },
            {
                name: "volume",
                description: "Volume Knob.",
                type: "SUB_COMMAND",
                options: [{ name: "percent", description: "Put any number between 1 and 100!", type: "NUMBER", required: true }]
            },
            {
                name: "settings",
                description: "Select an option.",
                type: "SUB_COMMAND",
                options: [{
                    name: "options",
                    description: "Select an option.",
                    type: "STRING",
                    required: true,
                    choices: [
                        { name: "View Queue", value: "queue" },
                        { name: "Skip Song", value: "skip" },
                        { name: "Pause Song", value: "pause" },
                        { name: "Resume Song", value: "resume" },
                        { name: "Stop Music", value: "stop" },
                        { name: "Shuffle Queue", value: "shuffle" },
                        { name: "Toggle Autoplay", value: "autoplay" },
                        { name: "Add a Related Song", value: "relatedsong" },
                        { name: "Toggle Repeat Mode", value: "repeat" }
                    ]
                }]
            }

        ],
        /**
         *  
         * @param {CommandInteraction} interaction 
         * @param {Client} client 
         */
        async execute(interaction, client) {
            const { options, member, guild, channel } = interaction;
            const VoiceChannel = member.voice.channel;

            if (!VoiceChannel)
                return interaction.reply({ content: "😒 You're not in a voice channel, baka! Do you feel stupid? Do you feel dumb? Maybe even a little ashamed?", ephemeral: true });

            if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
                return interaction.reply({ content: `🙄 Wait your turn you dummy! I am already playing music in <#${guild.me.voice.channelId}>.`, ephemeral: true });

            try {
                switch (options.getSubcommand()) {
                    case "play":
                        {
                            client.distube.play(VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                            return interaction.reply({ content: "Gotcha Paisen!" });
                        }
                    case "volume":
                        {
                            const Volume = options.getNumber("percent");
                            if (Volume > 100 || Volume < 1)
                                return interaction.reply({ content: ">:c you need to put a number between 1 and 100 DUMMY!" });

                            client.distube.setVolume(VoiceChannel, Volume);
                            return interaction.reply({ content: `Volume has been set to \`${Volume}%\`` });
                        }
                    case "settings":
                        {
                            const queue = await client.distube.getQueue(VoiceChannel);

                            if (!queue)
                                return interaction.reply({ content: "Theres nothin' in the queue right now silly~" });

                            switch (options.getString("options")) {
                                case "skip":
                                    {
                                        await queue.skip(VoiceChannel);
                                        return interaction.reply({ content: "I agree, that last track was definitely worth skipping~" });
                                    }
                                case "stop":
                                    {
                                        await queue.stop(VoiceChannel);
                                        return interaction.reply({ content: "Thanks for listening to music with me!~" });
                                    }
                                case "pause":
                                    {
                                        await queue.pause(VoiceChannel);
                                        return interaction.reply({ content: "Need to take a break? No worries senpai, I'll be here when you return!" });
                                    }
                                case "resume":
                                    {
                                        await queue.resume(VoiceChannel);
                                        return interaction.reply({ content: "Back so soon?! Alright lets restart these jams~" });
                                    }
                                case "shuffle":
                                    {
                                        await queue.shuffle(VoiceChannel);
                                        return interaction.reply({ content: "Shuffling? Suflihnfg?" });
                                    }
                                case "autoplay":
                                    {
                                        let Mode = await queue.toggleAutoplay(VoiceChannel);
                                        return interaction.reply({ content: `Gotcha! Autoplay: ${Mode ? "On" : "Off"}` });
                                    }
                                case "relatedsong":
                                    {
                                        await queue.addRelatedSong(VoiceChannel);
                                        return interaction.reply({ content: "Oooooh, I think you're gonna like this one paisen!~" });
                                    }
                                case "repeat":
                                    {
                                        let Mode2 = await client.distube.setRepeatMode(queue);
                                        return interaction.reply({ content: `Okaaaay, Repeat mode is set to: ${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}` });
                                    }
                                case "queue":
                                    {
                                        return interaction.reply({
                                                    embeds: [new MessageEmbed()
                                                            .setColor("GREEN")
                                                            .setDescription(`${queue.songs.map(
                                        (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`
                                    )]});
                                }
                                return;
                        }
                    }
            }

        } catch (e) {
            const errorEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`⚠ ALERT: ${e}`)
            return interaction.reply({ embeds: [errorEmbed] });
        }
    }
}