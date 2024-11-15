import dotenv from "dotenv";
dotenv.config();

const {
  ALERT_BOT_TOKEN,

  MONGO_URI,
  MONGO_DB,
  MONGO_COL_USERS,
} = process.env;

if (!ALERT_BOT_TOKEN || !MONGO_URI || !MONGO_DB || !MONGO_COL_USERS) {
  throw new Error("⚠️ Missing required environment variables");
}

export const monitoredAddresses = [
  "0xb0ba33566bd35bcb80738810b2868dc1ddd1f0e9", // B0B
  "0x3b40af8e80b09f4a54b1eb763031d4880f765bdc", //
  "0xab7b44ae25af88d306dc0a5c6c39bbeb8916eabb",
  "0x49c543e8873aeda1b60c176f55a78fc62f9c9fbb",
  "0x3ccce09b4ad94968f269375c0999134a6617f795",
  "0xacbcb2724cfafb839c752d71997a8a7a16989b2e",
  "0x16d59f67bd39ac0d952e48648548217b62183403",
  // "0xae2Fc483527B8EF99EB5D9B44875F005ba1FaE13", // jaredfromsubway.eth
].map((address) => address.toLowerCase());

export const monitoredTokenAddresses = [
  // "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
  "0x3ffeea07a27fab7ad1df5297fa75e77a43cb5790", // PEIPEI
].map((address) => address.toLowerCase());

export const MINTER_TOKEN = ALERT_BOT_TOKEN;

export const URI = MONGO_URI;
export const DB = MONGO_DB;
export const COL_USERS = MONGO_COL_USERS;
