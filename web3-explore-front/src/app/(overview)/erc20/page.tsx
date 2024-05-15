"use client";

const ethers = require("ethers");
import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { addressState } from "@/app/utils/recoils";

import MyTokenGeneratorContract from "@/app/utils/MyTokenGenerator.json";
import MyTokenContract from "@/app/utils/MyToken.json";

import TokenCard from "@/app/ui/tokens/tokenCard";
import { Token } from "@/app/utils/definitions";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

import { convertFromWei } from "@/app/utils/ERC20/utils";

export default function Page() {
  const [currentAddress, setCurrentAddress] = useRecoilState(addressState);
  const [tokens, setTokens] = useState<Token[]>([]);

  const contractAddress =
    process.env.NEXT_PUBLIC_TOKENGENERATOR_CONTRACT_ADDRESS;
  const tokenGenContractABI = MyTokenGeneratorContract.abi;

  const tokenContractABI = MyTokenContract.abi;

  const init = useCallback(async () => {
    try {
      if (!currentAddress) {
        console.log("Current address is not available yet.");
        return;
      }
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();

        const tokenGenContract = new ethers.Contract(
          contractAddress,
          tokenGenContractABI,
          signer
        );
        const tokensArray = await tokenGenContract.myTokens(20, 0);

        // Check if tokensArray is array of addresses
        if (tokensArray && tokensArray.length > 0) {
          const allTokens = await retrieveAllTokenInfo(tokensArray);
          setTokens(allTokens.reverse());
          console.log("Token COUNT...", allTokens.length);
          console.log("Mytokens is set now");
        } else {
          console.log("No tokens found.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentAddress, contractAddress, tokenGenContractABI]);

  async function retrieveAllTokenInfo(addresses: string[]): Promise<Token[]> {
    const tokenPromises = addresses.map((address, index) =>
      retrieveTokenInfo(index + 1, address)
    );

    try {
      // Wait for all the promises
      const allTokens = await Promise.all(tokenPromises);
      return allTokens.filter((token) => token !== null) as Token[]; // null値を除外してToken型として返す
    } catch (error) {
      console.error("Error retrieving token information:", error);
      return [];
    }
  }

  async function retrieveTokenInfo(
    token_id: number,
    tokenContractAddress: string
  ): Promise<Token | null> {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return null;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = await provider.getSigner();

      if (!tokenContractAddress) {
        console.log("No tokens found.");
        return null;
      }

      const tokenContract = new ethers.Contract(
        tokenContractAddress,
        tokenContractABI,
        signer
      );

      const tokenName = await tokenContract.name();
      const tokenSym = await tokenContract.symbol();
      const tokenOwner = await tokenContract.owner();
      const tokenTotalSupply = convertFromWei(
        BigInt(await tokenContract.totalSupply())
      );
      const totalOwned = convertFromWei(
        BigInt(await tokenContract.balanceOf(currentAddress))
      );
      // console.log(`tokenName: ${tokenName}`);
      // console.log(`tokenSym: ${tokenSym}`);
      // console.log(`tokenOwner: ${tokenOwner}`);
      // console.log(`tokenTotal: ${tokenTotalSupply}`);
      // console.log(`totalOwned: ${totalOwned}`);

      return {
        id: token_id,
        name: tokenName,
        symbol: tokenSym,
        address: tokenContractAddress,
        totalSupply: tokenTotalSupply,
        uhold: totalOwned,
      };
    } catch (error) {
      console.error("Failed to parse token:", error);
      return null;
    }
  }

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-5 py-6">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">ERC20 Tokens</h1>
        {currentAddress ? (
          <Link
            href="/erc20/publish"
            className="flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Publish New Token</span>
            <PlusIcon className="h-5 md:ml-4" />
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {tokens.map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  );
}
