"use client";
import { ethers } from "ethers";
import React, { useEffect, useContext } from "react";
import { WalletContext } from "@/app/(overview)/layout";

import MyTokenGeneratorContract from "@/app/utils/MyTokenGenerator.json";
import MyTokenContract from "@/app/utils/MyToken.json";

const buttonStyle =
  "flex h-10 w-3/5 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export default function Page() {
  const { currentAddress, setCurrentAddress } = useContext(WalletContext);

  const contractAddress = "0xBe90161986AfeF740FdD7054DFeDB7a987FfeAb1";
  const tokenGenContractABI = MyTokenGeneratorContract.abi;
  const tokenContractABI = MyTokenContract.abi;

  const MyTokenGeneratorEcho = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();

        const tokenGenContract = new ethers.Contract(
          contractAddress,
          tokenGenContractABI,
          signer
        );
        let count = await tokenGenContract.myTokensCount();
        console.log("Retrieved total token count...", Number(count));
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GenereMyToken = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();

        const tokenGenContract = new ethers.Contract(
          contractAddress,
          tokenGenContractABI,
          signer
        );

        const name = "STAFFORD";
        const sym = "STF";
        const tokenTxn = await tokenGenContract.createMyToken(name, sym);
        console.log("Mined -- ", tokenTxn.hash);
        const count = await tokenGenContract.myTokensCount();
        console.log("Retrieved total echo count...", Number(count));
        console.log(`Token name: ${name}, sym: ${sym} generated...`);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MyTokenEcho = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();

        const tokenGenContract = new ethers.Contract(
          contractAddress,
          tokenGenContractABI,
          provider
        );
        const tokens = await tokenGenContract.myTokens(25, 0);
        const tokens_one_contract_address = tokens[0];
        // const tokens_one_contract_address =
        //   "0x182bcE510FFcc2B88e9389888eAB3c26B9E4E6B5";
        const tokenContract = new ethers.Contract(
          tokens_one_contract_address,
          tokenContractABI,
          provider
        );
        const token_owner = await tokenContract.owner();
        const token_total = Number(await tokenContract.totalSupply());

        const name = await tokenContract.name();
        const sym = await tokenContract.symbol();
        console.log("First token...", tokens_one_contract_address);
        console.log("Token Onwer is...", token_owner);
        console.log("Token Total supply is...", token_total);
        console.log("Token Name...", name);
        console.log("Token sym...", sym);
        console.log("Showing tokens...", tokens);
        console.log("Showing tokens type...", typeof tokens);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MyTokenMint = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const tokenGenContract = new ethers.Contract(
          contractAddress,
          tokenGenContractABI,
          signer
        );
        const tokens = await tokenGenContract.myTokens(25, 0);
        const tokens_one_contract_address = tokens[0];
        const tokenContract = new ethers.Contract(
          tokens_one_contract_address,
          tokenContractABI,
          signer
        );
        const token_owner = await tokenContract.owner();
        const amount = 1000000;
        console.log("Amount...", amount);
        await tokenContract.mint(token_owner, amount);
        alert(`Successfully Minted amount: ${amount}`);
        const token_total = await tokenContract.totalSupply();
        console.log("First token...", tokens_one_contract_address);
        console.log("Token Total supply is...", token_total);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MyTokenBurn = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const tokenGenContract = new ethers.Contract(
          contractAddress,
          tokenGenContractABI,
          signer
        );
        const tokens = await tokenGenContract.myTokens(25, 0);
        const tokens_one_contract_address = tokens[0];
        const tokenContract = new ethers.Contract(
          tokens_one_contract_address,
          tokenContractABI,
          signer
        );
        const token_owner = await tokenContract.owner();
        // let token_total = await tokenContract.totalSupply();
        const amount = 50000;
        await tokenContract["burn(address,uint256)"](token_owner, amount);
        alert(`Successfully Burned amount: ${amount}`);
        const token_total = await tokenContract.totalSupply();
        console.log("First token...", tokens_one_contract_address);
        console.log("Token Total supply is...", token_total);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MyTokenBalance = async () => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const tokenGenContract = new ethers.Contract(
          contractAddress,
          tokenGenContractABI,
          signer
        );
        const tokens = await tokenGenContract.myTokens(25, 0);
        const tokens_one_contract_address = tokens[0];
        const tokenContract = new ethers.Contract(
          tokens_one_contract_address,
          tokenContractABI,
          signer
        );

        const token_total = await tokenContract.totalSupply();
        const token_balance = await tokenContract.balanceOf(currentAddress);
        console.log("Token Total supply is...", token_total);
        console.log("First token...", tokens_one_contract_address);
        console.log("Token balance of ", currentAddress, " is ", token_balance);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = (await ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      console.log("Connected: ", accounts[0]);
      setCurrentAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <div className="flex flex-col items-center justify-center">
        {!currentAddress && (
          <button
            onClick={connectWallet}
            type="button"
            className={`${buttonStyle} bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 mb-4`}
          >
            Connect Wallet
          </button>
        )}
        {currentAddress && (
          <p className={`text-black mb-4`}>Address: {currentAddress}</p>
        )}
        {currentAddress && (
          <button
            className={`${buttonStyle} bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 mb-4`}
            onClick={MyTokenGeneratorEcho}
          >
            Token count
          </button>
        )}
        {currentAddress && (
          <button
            className={`${buttonStyle} bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 mb-4`}
            onClick={GenereMyToken}
          >
            Create Token
          </button>
        )}
        {currentAddress && (
          <button
            className={`${buttonStyle} bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 mb-4`}
            onClick={MyTokenEcho}
          >
            Token Check
          </button>
        )}
        {currentAddress && (
          <button
            className={`${buttonStyle} bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 mb-4`}
            onClick={MyTokenMint}
          >
            Token Mint
          </button>
        )}
        {currentAddress && (
          <button
            className={`${buttonStyle} bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 mb-4`}
            onClick={MyTokenBalance}
          >
            Balance check
          </button>
        )}
        {currentAddress && (
          <button
            className={`${buttonStyle} bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 mb-4`}
            onClick={MyTokenBurn}
          >
            Burn Token
          </button>
        )}
      </div>
    </div>
  );
}
