import React, { useState } from "react";
import MyTokenGeneratorContract from "@/app/utils/MyTokenGenerator.json";
// import { ethers } from "ethers";
const ethers = require("ethers");

import { useRouter } from "next/navigation";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

const TokenForm: React.FC = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [mintAmount, setMintAmount] = useState(0);
  const contractAddress =
    process.env.NEXT_PUBLIC_TOKENGENERATOR_CONTRACT_ADDRESS;

  const tokenGenContractABI = MyTokenGeneratorContract.abi;
  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 15) {
      setName(event.target.value);
    }
  };

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  };

  const handleMintAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMintAmount(Number(event.target.value!)); // amount の変更を処理するハンドラ
  };

  function convertEtherToWei(etherAmount: number): BigInt {
    // Use BigInt for precision calc
    return ethers.utils.parseEther(etherAmount.toString());
  }

  async function GenereMyToken(): Promise<void> {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        console.log(`contract address: ${contractAddress}`);
        const tokenGenContract = new ethers.Contract(
          contractAddress!,
          tokenGenContractABI,
          signer
        );
        const tokenTxn = await tokenGenContract.createMyToken(
          name,
          symbol,
          convertEtherToWei(mintAmount)
        );
        console.log("Mined -- ", tokenTxn.hash);
        const count = await tokenGenContract.myTokensCount();
        console.log("Retrieved total echo count...", Number(count));
        console.log(`Token name: ${name}, sym: ${symbol} published...`);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("error GenereMyToken");
      console.log(error);
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (name.trim() === "" || symbol.trim() === "") {
      alert("Please fill out the fields");
      return;
    }
    console.log("Submitting Token with Name:", name, "and Symbol:", symbol);
    try {
      await GenereMyToken();
      alert("Token has been successfully created!");
      router.push("/erc20");
    } catch (error) {
      console.error("Failed to create the token:", error);
      alert("Failed to create the token.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-5"
    >
      <h2 className="text-lg font-bold mb-6 text-center">Create New Token</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Token Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          minLength={3}
          maxLength={15}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="symbol"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Token Symbol:
        </label>
        <input
          type="text"
          id="symbol"
          value={symbol}
          onChange={handleSymbolChange}
          minLength={3}
          maxLength={3}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="amount"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Initial Mint Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={mintAmount}
          onChange={handleMintAmountChange}
          min="0"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default TokenForm;
