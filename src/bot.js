const { Client, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const client = new Client({ intents: ['Guilds'] });

const { QuickDB } = require("quick.db");
const database = new QuickDB();

const dotenv = require('dotenv');
dotenv.config();

// const axios = require('axios');

const { CHANNEL_ID } = process.env;
const { TOKEN } = process.env;

//
client.on('ready', () => {
    console.log('Bot está online!');

    // 
    setInterval(async () => {
        const now = Date.now();
        const lastSent = await database.get('lastNewsTime') || 0;
        const cooldown = 10000; // 1 hora em milissegundos (3600000)

        console.log('Agora:', now);
        console.log('Ultimo enviado:', lastSent);
        if (now - lastSent < cooldown) {
            console.log('Ainda não é hora de enviar a notícia.');
            return;
        }


        // if (now - lastSent >= cooldown) {
            try {
                // Correção: Use .get() em vez de .guid()
                const channel = client.channels.cache.get(CHANNEL_ID);
                if (!channel) {
                    console.log('Canal não encontrado!');
                    return;
                }

                const sentNews = await database.get('sentNews') || [];

                // Buscar noticias
                // const response = await axios.get(`https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=pt`);
                const articles = [
                    {
                        title: 'Notícia 1',
                        url: 'https://example.com/noticia1'
                    },
                    {
                        title: 'Notícia 2',
                        url: 'https://example.com/noticia2'
                    },
                    {
                        title: 'Notícia 3',
                        url: 'https://example.com/noticia3'
                    },
                    {
                        title: 'Notícia 4',
                        url: 'https://example.com/noticia4'
                    },
                    {
                        title: 'Notícia 5',
                        url: 'https://example.com/noticia5'
                    }
                ];

                // const articles = response.slice(0, 3); // 3 notícias

                // crar card para cda noticias
                // const articles = response.articles.slice(0, 3); // 3 notícias
                // const articles = response.articles.filter(article => !sentNews.includes(article.url)).slice(0, 3); // 3 notícias

                const embed = new EmbedBuilder()
                .setTitle("🚀 Notícias do Espaço")
                .setDescription("As últimas descobertas da NASA!")
                .setColor(0x2ecc71)
                .setURL("https://nasa.gov")
                .setAuthor({
                    name: "NASA",
                    iconURL: "https://nasa.gov/logo.png",
                    url: "https://nasa.gov"
                })
                .setThumbnail("https://nasa.gov/thumb.jpg")
                .addFields(
                    { name: "Missão Artemis", value: "Volta à Lua em 2026", inline: true },
                    { name: "Mars Rover", value: "Novas amostras coletadas", inline: true }
                )
                .setImage("https://nasa.gov/mars.jpg")
                .setFooter({
                    text: "Fonte: NASA",
                    iconURL: "https://nasa.gov/icon.png"
                })
                .setTimestamp();
                    // .setColor(0x2ecc71)
                    // .setTitle('📢 **Notícias Recentes**')
                    // .setDescription('Aqui estão as últimas notícias:')
                    // .setTimestamp()
                    // .setAuthor({
                    //     name: "NASA",
                    //     iconURL: "https://nasa.gov/logo.png",
                    //     url: "https://nasa.gov"
                    // })
                    // .setThumbnail("https://nasa.gov/thumb.jpg")

                articles.forEach(async article => {
                    // Cria embed para cada notícia
                    embed.addFields({
                        name: article.title,
                        value: `${article?.description}... [Leia mais](${article.url})`,
                        inline: false
                    })

                    // Salva o link da notícia no banco
                    await sentNews.push(article.url);
                });

                await channel.send({ embeds: [embed] });
                await database.set('lastNewsTime', now); // Atualiza o horário do último envio
                await database.set('sentNews', sentNews.slice(-100)); // Mantém apenas os últimos 100 links enviados 
                console.log('Notícias enviadas!');
            } catch (error) {
                console.error('Erro ao enviar notícia:', error);
            }
        // }
    }, 10000 ); // 10 seg 1 hora (3600000)
});

client.login(TOKEN);