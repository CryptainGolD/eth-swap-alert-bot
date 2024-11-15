declare module "./utils/ABIs" {
  export function getSwapABI(): string[];
  export function getERC20ABI(): Array<{
    inputs: Array<{
      internalType: string;
      name: string;
      type: string;
    }>;
    stateMutability: string;
    type: string;
  }>;
}
