const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Server Info",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        const { guild } = interaction;

        const { createdTimestamp, ownerId, description, members, memberCount, channels, emojis, stickers } = guild;

        const Embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor({ name: guild.name }, { iconURL: guild.iconURL({ dynamic: true }) })
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields({
                    name: "🏠 | General",
                    value: [
                        `Name: ${guild.name}`,
                        `Created: <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                        `Owner: <@${ownerId}>`,
                        `Description: ${description}`
                    ].join("\n")
                }, {
                    name: "👥 | Users",
                    value: [
                        `- Members: ${members.cache.filter((m) => !m.user.bot).size}`,
                        `- Bots: ${members.cache.filter((m) => m.user.bot).size}`,
                        ` `,
                        `Total: ${memberCount}`
                    ].join("\n")
                }, {
                    name: "📃 | Channels & Roles",
                    value: [
                        `- Text: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}`,
                        `- Voice: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}`,
                        `- Threads: ${channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD" && "GUILD_NEWS_THREAD").size}`,
                        `- Categories: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}`,
                        `- Stages: ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}`,
                        `- News: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}`,
                        `- Roles: ${guild.roles.cache.size}`,
                        ` `,
                        `Total: ${channels.cache.size}`
                    ].join("\n")
                }, {
                    name: "🖼 | Emojis & Stickers",
                    value: [
                        `- Animated Emojis: ${emojis.cache.filter((e) => e.animated).size}`,
                        `- Static Emojis: ${emojis.cache.filter((e) => !e.animated).size}`,
                        `- Stickers: ${stickers.cache.size}`,
                        ` `,
                        `Total: ${stickers.cache.size + emojis.cache.size}`
                    ].join("\n")
                }, {
                    name: "✨ | Nitro Stats",
                    value: [
                        `- Tier: ${guild.premiumTier.replace("TIER_", "")}`,
                        `- Boosts: ${guild.premiumSubscriptionCount}`,
                        `- Boosters: ${members.cache.filter((m) => m.premiumSince).size}`
                    ].join("\n")
                }

            )
            .setFooter({ text: "Last Checked: " }).setTimestamp();
        interaction.reply({ embeds: [Embed] })
    }
}