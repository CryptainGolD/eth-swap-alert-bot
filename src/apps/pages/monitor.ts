import { monitoredAddresses } from "../../config";
import { MonitorSwapEvents, swapEventEmitter } from "../../hooks/confirmedTx";

export async function StartMonitor(ctx: any) {
  await ctx.reply("Monitor is running...");
  MonitorSwapEvents(monitoredAddresses);
  swapEventEmitter.on("newblock", async (newBlock) => {
    await ctx.editMessageText(newBlock);
  });
  swapEventEmitter.on("txhash", async (txHash) => {
    await ctx.reply(txHash);
  });
  swapEventEmitter.on("swap", async (swapEvent) => {
    const message =
      `<b>📈 Swap Detected</b> ` +
      `🔗 <a href="https://etherscan.io/tx/${swapEvent.txHash}">Transaction Link</a>\n` +
      `👤 <b>From:</b> ${swapEvent.from}\n` +
      `💱 <b>Swap:</b> ${swapEvent.amountA.toFixed(4)} ${swapEvent.tokenA.symbol} → ${swapEvent.amountB.toFixed(4)} ${swapEvent.tokenB.symbol}\n` +
      `🪙 <b>Token A:</b> ${swapEvent.tokenA.name} (${swapEvent.tokenA.symbol})\n` +
      `🪙 <b>Token B:</b> ${swapEvent.tokenB.name} (${swapEvent.tokenB.symbol})\n` +
      `💰 <b>Value:</b> ${swapEvent.ethValue.toFixed(4)} ETH\n` +
      `⏰ <b>Timestamp:</b> ${swapEvent.timestamp}`;
    await ctx.reply(message, { parse_mode: "HTML" });
  });
}
