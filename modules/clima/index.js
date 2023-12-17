const axios = require('axios');

async function clima (client, args, message) {
  
    try {
        if (args.length === 1)
        return client.reply(
          message.from,
          "Digite a cidade que deseja saber o clima. Exemplo: SaoPaulo",
          message.id
        );

      if (typeof args[1] == "undefined") {
        return await client.reply(message.from, `Erro ao identificar a cidade`, message.id);
      }

      let cidade = message.body.split(" ");
      console.log(typeof cidade[1]);

      if (typeof cidade[1] !== "undefined") {
        if (cidade[1].length == 0)
          return client.reply(message.from, "Digite a cidade que deseja saber o clima. Exemplo: SaoPaulo", message.id);

        await client.reply(
          message.from,
          `Verificando com São Pedro como está o clima em ${cidade[1]}... pera um pouco`,
          message.id
        );

        let clima = await axios.get(
          `https://weather.contrateumdev.com.br/api/weather/city/?city=${encodeURI(
            cidade[1]
          )}`
        );

        if (clima?.data?.cod == "404")
          return await client.reply(
            message.from,
            `Uai... ${clima?.data?.message}`,
            message.id
          );

        await client.sendText(
          message.from,
          `*Temperatura:* ${clima?.data?.main?.temp} ºC \n*Sensação térmica:* ${clima?.data?.main?.feels_like} ºC \n*Temperatura mínima:* ${clima?.data?.main?.temp_min} ºC \n*Temperatura máxima:* ${clima?.data?.main?.temp_max} ºC \n*Pressão atmosférica:* ${clima?.data?.main?.pressure}\n*Umidade:* ${clima?.data?.main?.humidity}%
----------------------\n${clima?.data?.name} - lat: ${clima?.data?.coord?.lat} lon: ${clima?.data?.coord?.lon}
              `
        );
      } else {
        return client.reply(message.from, "Digite a cidade que deseja saber o clima. Exemplo: SaoPaulo", message.id);
      }
    } catch (error) {
        console.error(error)
    }
}

module.exports = clima