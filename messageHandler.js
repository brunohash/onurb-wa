const comandos = require("./commands.js");

module.exports = msgHandler = async (client, message) => {
  try {
    const {
      sender,
      isGroupMsg,
      chat,
      caption,
    } = message;
    let { body } = message;
    const { formattedTitle } = chat;
    let { pushname, verifiedName } = sender;
    pushname = pushname || verifiedName;
    const commands = caption || body || "";
    const falas = commands.toLowerCase();
    const command = commands.toLowerCase().split(" ")[0] || "";
    const args = commands.split(" ");

    const msgs = (message) => {
      if (command.startsWith("!")) {
        if (message.length >= 10) {
          return `${message.substr(0, 15)}`;
        } else {
          return `${message}`;
        }
      }
    };

    if (!isGroupMsg && command.startsWith("/"))
      console.log(
        "\x1b[1;31m~\x1b[1;37m>",
        "[\x1b[1;32mEXEC\x1b[1;37m]",
        msgs(command),
        "from",
        pushname
      );

    if (isGroupMsg && command.startsWith("/"))
      console.log(
        "\x1b[1;31m~\x1b[1;37m>",
        "[\x1b[1;32mEXEC\x1b[1;37m]",
        msgs(command),
        "from",
        pushname,
        "in",
        formattedTitle
      );

    if (isGroupMsg && !command.startsWith("/"))
      console.log(
        "\x1b[1;33m~\x1b[1;37m>",
        "[\x1b[1;31mMSG\x1b[1;37m]",
        body,
        "from",
        pushname,
        "in",
        formattedTitle
      );

    console.log("FROM 		===>", pushname);
    console.log("FROM_ID 	===>", chat.id);
    console.log("ARGUMENTOS	===>", args);
    console.log("FALAS 		===>", falas);
    console.log("COMANDO 	===>", command);

    function getComands(commands) {
      if (comandos[commands]?.status) {
        comandos[commands].pasta(client, args, message);
      }
    }

    if (command) {
      getComands(command);
    }
  } catch (err) {
    await client.sendText(`Erro: ${err}`);

    console.log(("[ERROR]", "red"), err);
    client.kill().then((a) => console.log(a));
  }
};
