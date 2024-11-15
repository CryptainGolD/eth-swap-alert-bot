import { ethers } from "ethers";

const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WETH_ABI = ["function balanceOf(address) view returns (uint256)"];

const provider = new ethers.WebSocketProvider(
  // `https://eth-mainnet.g.alchemy.com/v2/lBsnumlNVsOQUAoLYFwEFlnLkqYmkISK`
  `wss://eth-mainnet.g.alchemy.com/v2/lBsnumlNVsOQUAoLYFwEFlnLkqYmkISK`
);

export async function getBalance(addresses: any) {
  const wethContract = new ethers.Contract(WETH_ADDRESS, WETH_ABI, provider);

  for (const address of addresses) {
    const ethBalance = await provider.getBalance(address);
    const ethBalanceInEther = ethers.formatEther(ethBalance);

    const wethBalance = await wethContract.balanceOf(address);
    const wethBalanceInEther = ethers.formatEther(wethBalance);
    console.log(
      `- ${address}: ${ethBalanceInEther} ETH / ${wethBalanceInEther} WETH`
    );
  }
}
