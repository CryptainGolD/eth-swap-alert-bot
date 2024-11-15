import alert_bot from "./alertBot";
import { ConnectDB } from "./services/mongo";

const StartBot = async () => {
  await ConnectDB();

  alert_bot
    .launch(() => {
      console.log("🤖 Bot is running...");
    })
    .then(() => {
      console.log("Alert Bot ended");
    });

  process.once("SIGINT", () => alert_bot.stop("SIGINT"));
  process.once("SIGTERM", () => alert_bot.stop("SIGTERM"));
};

StartBot();
