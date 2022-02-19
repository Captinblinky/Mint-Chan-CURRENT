const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Message } = require("discord.js");
const malScraper = require("mal-scraper");

module.exports = {
    name: "animesearch",
    description: "Get information about an anime.",
    options: [{
        name: "name",
        description: "The name of the anime you want to search.",
        required: true,
        type: "STRING",
    }, ],
    usage: "/anime <anime name>",

    /**
     * 
     * @param {Client} interaction 
     * @param {CommandInteraction} client 
     */
    async execute(interaction, client) {
        await interaction.deferReply();
        const name = interaction.options.getString("name");
        const search = name;

        malScraper.getInfoFromName(search).then((data) => {
                const malEmbed = new MessageEmbed()
                    .setAuthor({ name: `My Anime List search result for ${data.title}`.split(',').join(' ') })
                    .setThumbnail(data.picture)
                    .setColor("GREEN")
                    .setDescription(data.synopsis)
                    .addField('Premiered', `${data.premiered}`, true)
                    .addField('Broadcast', `${data.broadcast}`, true)
                    .addField('Genres', `${data.genres}`, true)
                    .addField('English Title', `${data.englishTitle}`, true)
                    .addField('Japanese Title', `${data.title}`, true)
                    .addField('Type', `${data.type}`, true)
                    .addField('Episodes', `${data.episodes}`, true)
                    .addField('Rating', `${data.rating}`, true)
                    .addField('Aired', `${data.aired}`, true)
                    .addField('Score', `${data.score}`, true)
                    .addField('Favourite', `${data.favorites}`, true)
                    .addField('Ranked', `${data.ranked}`, true)
                    .addField('Duration', `${data.duration}`, true)
                    .addField('Studios', `${data.studios}`, true)
                    .addField('Popularity', `${data.popularity}`, true)
                    .addField('Members', `${data.members}`, true)
                    .addField('Score Stats', `${data.scoreStats}`, true)
                    .addField('Source', `${data.source}`, true)
                    .addField('Synonyms', `\`${data.synonyms}\``, true)
                    .addField('Status', `${data.status}`, true)
                    .addField('Identifier', `${data.id}`, true)
                    .addField('Link', data.url, true)
                    .setTimestamp()
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setStyle("LINK")
                        .setURL(data.url)
                        .setLabel("My Anime List")
                    );
                interaction.editReply({ embeds: [malEmbed], components: [row] });
            })
            .catch((err) => {
                console.log(err)
                return interaction.editReply({
                    content: "No Anime Found."
                });
            });
    },
};