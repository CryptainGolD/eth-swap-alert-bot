import { Telegraf, Context, session } from "telegraf";
import { MINTER_TOKEN } from "./config";
import MainCommands from "./apps";
import Actions from "./apps/actions";

// Define session interface
interface CustomSession {
  state?: string | null;
  messageIds?: number[];
}

interface SessionContext extends Context {
  session: CustomSession;
}

const alert_bot = new Telegraf<SessionContext>(MINTER_TOKEN);

// Use session middleware
alert_bot.use(
  session({ defaultSession: (): CustomSession => ({ state: "" }) })
);

// Setup commands and actions
MainCommands(alert_bot);
Actions(alert_bot);

// Export bot
export default alert_bot;
