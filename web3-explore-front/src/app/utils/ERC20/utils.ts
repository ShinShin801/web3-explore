import { ethers } from "ethers";

import { Token } from "@/app/utils/definitions";

export class TokenContract {
  public contract: ethers.Contract | undefined;
  private readonly contractAddress: string;
  private readonly abi: any;

  constructor(contractAddress: string, abi: any) {
    this.contractAddress = contractAddress;
    this.abi = abi;
  }

  async connectContract(): Promise<ethers.Contract | null> {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        console.error("Ethereum object not found");
        return null;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      this.contract = new ethers.Contract(
        this.contractAddress,
        this.abi,
        signer
      );
      return this.contract;
    } catch (error) {
      console.error("Failed to connect to contract:", error);
      return null;
    }
  }

  async mint(amount: number, toAddress: string): Promise<void> {
    if (!this.contract) {
      console.error("Contract is not initialized");
      return;
    }

    const weiAmount = ethers.utils.parseEther(amount.toString());

    try {
      const mintTx = await this.contract.mint(toAddress, weiAmount);
      console.log(`Successfully minted ${amount} tokens to ${toAddress}`);
      this.logTotalSupply();
    } catch (error) {
      console.error("Failed to mint token:", error);
    }
  }

  async burn(amount: number, fromAddress: string): Promise<void> {
    if (!this.contract) {
      console.error("Contract is not initialized");
      return;
    }

    const weiAmount = ethers.utils.parseEther(amount.toString());

    try {
      const burnTx = await this.contract["burn(address,uint256)"](
        fromAddress,
        weiAmount
      );
      console.log(`Successfully burned ${amount} tokens from ${fromAddress}`);
      this.logTotalSupply();
    } catch (error) {
      console.error("Failed to burn token:", error);
    }
  }

  async transfer(amount: number, toAddress: string): Promise<void> {
    if (!this.contract) {
      console.error("Contract is not initialized");
      return;
    }
    if (!toAddress) {
      console.error("Address is required for transfer");
      return;
    }

    const weiAmount = ethers.utils.parseEther(amount.toString());

    try {
      const transferTx = await this.contract.transfer(toAddress, weiAmount);
      console.log(`Successfully transferred ${amount} tokens to ${toAddress}`);
      this.logTotalSupply();
    } catch (error) {
      console.error("Failed to transfer token:", error);
    }
  }

  private async logTotalSupply(): Promise<void> {
    if (!this.contract) return;
    try {
      const totalSupply = await this.contract.totalSupply();
      console.log("Token Total supply now is...", totalSupply.toString());
    } catch (error) {
      console.error("Failed to fetch total supply:", error);
    }
  }

  async tokenInfo(address: string): Promise<Token | null> {
    if (!this.contract) {
      console.error("Contract is not initialized");
      return null;
    }

    if (!address) {
      // console.log("Address is not yet ready");
      return null;
    }

    try {
      const tokenName = await this.contract.name();
      const tokenSym = await this.contract.symbol();
      const tokenTotalSupply = convertFromWei(
        BigInt(await this.contract.totalSupply())
      );
      const totalOwned = convertFromWei(
        BigInt(await this.contract.balanceOf(address))
      );

      return {
        id: 1,
        name: tokenName,
        symbol: tokenSym,
        address: this.contractAddress,
        totalSupply: tokenTotalSupply,
        uhold: totalOwned,
      };
    } catch (error) {
      console.error("Failed to fetch tokeninfo:", error);
      return null;
    }
  }
}

/**
 * Converts a blockchain number from wei (or similar small units) to a more readable format.
 * Assumes that the number uses 18 decimal places (standard for many tokens).
 *
 * @param {bigint} rawValue - The value returned from the contract, assumed to be in wei or similar.
 * @returns {number} - The value converted to a more manageable number.
 */
export function convertFromWei(rawValue: bigint): number {
  const divisor = BigInt("1000000000000000000"); // 10^18
  const convertedValue_bi = rawValue / divisor;
  return Number(convertedValue_bi); // `Number`で通常の数値に変換する
}
