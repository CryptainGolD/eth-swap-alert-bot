import { Telegraf, Markup, Context } from "telegraf";
import { colUsers } from "../services/mongo";
import { logUserAction } from "../services/logUserAction";

// Define session interface
interface CustomSession {
  state?: string | null;
  messageIds?: number[];
}

interface SessionContext extends Context {
  session: CustomSession;
}

const MainCommands = (bot: Telegraf<SessionContext>) => {
  // Start command
  bot.start(async (ctx) => {
    const tgId = ctx.from?.id.toString();
    const username = ctx.from?.username || "";
    const firstName = ctx.from?.first_name || "";

    try {
      ctx.session.state = null;
      let welcome_msg = "";

      const user = await colUsers.findOne({ tgId });
      let start_msg: any;

      if (user) {
        welcome_msg =
          `👋 Hi, <b>${firstName}</b>. Welcome back! 🌟\n` +
          `You’re set to receive alerts for swap transactions for tracking.` +
          `We’ll notify you with transaction details whenever a swap happens.\n\n`;
        start_msg = await ctx.reply(welcome_msg, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [{ text: "🖲 Start monitor", callback_data: "startMonitor" }],
              [
                // { text: "❔ FAQ", url: "https://launchb0xx.xyz" },
                { text: "💬 Support", callback_data: "support" },
              ],
            ],
          },
        });
      } else {
        welcome_msg =
          `👋 Hi, <b>${firstName}</b>\n` +
          `Welcome to the Ethereum Swap Alert Bot! 🚀\n\n` +
          `Get real-time alerts whenever 🐳Whales🐳 completes a swap transaction.\n` +
          `Stay updated with transaction details instantly!!!\n\n` +
          // `🔑 To begin tracking, register and specify the Ethereum address you want to monitor.`;
          `🔑 To begin tracking, register first.`;
        start_msg = await ctx.reply(welcome_msg, {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "✨ Register",
                  callback_data: "Register",
                },
              ],
            ],
          },
        });
      }

      ctx.session.messageIds = [start_msg.message_id];
      logUserAction(ctx, "🤖 Started the bot");
    } catch (error) {
      console.error("⚠️ Failed to handle start command:\n", error);
    }
  });

  // Help command
  bot.help(async (ctx) => {
    ctx.replyWithHTML(
      `Here are the commands you can use:\n\n` +
        `/start - Start the bot for minting NFT on Aptos\n` +
        `/help - Get this help message\n`,
      Markup.inlineKeyboard([
        [Markup.button.callback("🏠 Go to Home", "home")],
        [Markup.button.callback("💬 Contact Support", "support")],
      ])
    );
  });

  // Setting bot commands
  bot.telegram.setMyCommands([
    {
      command: "start",
      description: "Start the bot for minting NFT on Aptos",
    },
    { command: "help", description: "Get a list of available commands" },
  ]);
};

export default MainCommands;
