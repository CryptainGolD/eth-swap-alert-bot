import { monitoredAddresses } from "../../config";
import { MonitorSwapEvents, swapEventEmitter } from "../../hooks/confirmedTx";

export async function StartMonitor(ctx: any) {
  MonitorSwapEvents(monitoredAddresses);
  // swapEventEmitter.on("newblock", async (newBlock) => {
  //   await ctx.replyWithHTML(newBlock);
  // });
  // swapEventEmitter.on("txhash", async (txHash) => {
  //   await ctx.replyWithHTML(txHash);
  // });
  swapEventEmitter.on("swap", async (swapEvent) => {
    const message =
      `<b>📈 Swap Detected</b> ` +
      `<a href="https://etherscan.io/tx/${swapEvent.txHash}">Txn</a> 🔗\n\n` +
      `👤 <code>${swapEvent.from}</code>\n\n` +
      `💱 <b>Swap:</b> <code>${swapEvent.amountA.toFixed(4)}</code> ${swapEvent.tokenA.symbol} → <code>${swapEvent.amountB.toFixed(4)}</code> ${swapEvent.tokenB.symbol}\n` +
      `        |_🪙 ${swapEvent.tokenA.name} (${swapEvent.tokenA.symbol}): <code>${swapEvent.tokenA.supply}</code> (<code>${swapEvent.tokenA.decimals}</code>)\n` +
      `        |_🪙 ${swapEvent.tokenB.name} (${swapEvent.tokenB.symbol}): <code>${swapEvent.tokenB.supply}</code> (<code>${swapEvent.tokenB.decimals}</code>)\n` +
      `💰 <b>Value:</b> <code>${swapEvent.ethValue.toFixed(4)}</code> ETH\n`;
    await ctx.replyWithHTML(message);
  });
}
