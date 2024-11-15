import { Telegraf, Context } from "telegraf";
import { EventEmitter } from "events";
import { Home } from "./pages/home";

import { colUsers } from "../services/mongo";
import { StartMonitor } from "./pages/monitor";

interface CustomSession {
  state?: string | null;
  messageIds?: number[];
}

interface SessionContext extends Context {
  session: CustomSession;
}

const Actions = async (bot: Telegraf<SessionContext>) => {
  bot.on("callback_query", async (ctx: any) => {
    const tgId = ctx.from?.id.toString();
    const username = ctx.from?.username || "";
    const data = ctx.callbackQuery.data;

    if (data.startsWith("home")) {
      await Home(tgId, ctx);
    } else if (data.startsWith("Register")) {
      await colUsers.insertOne({
        tgId,
        username: `@${username}`,
        registerTime: new Date().toUTCString(),
      });
      await Home(tgId, ctx);
    } else if (data.startsWith("startMonitor")) {
      await StartMonitor(ctx);
    } else if (data.startsWith("cancel_monitor")) {
      await ctx.reply("❌ Monitoring has been stopped.");
    }
  });

  // Handle incoming messages
  bot.on("message", async (ctx: any) => {
    const tgId = ctx.from?.id.toString();

    if (ctx.session.state === "inputPassword") {
    } else {
      await ctx.reply("⚠️ Not expecting input. Use the buttons to navigate.");
    }
  });
};

export default Actions;
