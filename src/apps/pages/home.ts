import { colUsers } from "../../services/mongo";

export const Home = async (tgId: string, ctx: any) => {
  ctx.session.messageIds = null;

  const firstName = ctx.from?.first_name || "";

  try {
    await ctx.deleteMessage();
    let welcome_msg =
      `👋 Hi, <b>${firstName}</b>\n` +
      `Welcome to the Ethereum Swap Alert Bot! 🚀\n\n` +
      `Get real-time alerts whenever 🐳Whales🐳 completes a swap transaction.` +
      `Stay updated with transaction details instantly!!!`;

    const user = await colUsers.findOne({ tgId });
    let home_msg: any;

    if (user) {
      home_msg = await ctx.reply(welcome_msg, {
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
    }

    ctx.session.messageIds = [home_msg.message_id];
  } catch (error) {
    console.error("⚠️ Failed to handle start command:", error);
    ctx.reply(
      "There was an error processing your request to start. Please try again later."
    );
  }
};
