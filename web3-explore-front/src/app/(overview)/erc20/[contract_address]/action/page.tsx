"use client";
const ethers = require("ethers");
import React, { useEffect, useContext, useState } from "react";
import { WalletContext } from "@/app/(overview)/layout";

import MyTokenContract from "@/app/utils/MyToken.json";

import TokenModal from "@/app/ui/tokens/TokenModal";
import {
  FireIcon,
  BanknotesIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import { TokenContract } from "@/app/utils/ERC20/utils";
import { Token } from "@/app/utils/definitions";

export default function Page({
  params,
}: {
  params: { contract_address: string };
}) {
  const { currentAddress, setCurrentAddress } = useContext(WalletContext);

  const contract_address = params.contract_address;
  const tokenContractABI = MyTokenContract.abi;
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"mint" | "burn" | "transfer">(
    "mint"
  );
  const [isOwner, setIsOwner] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<Token | null>(null);
  const tokenManager = new TokenContract(contract_address, tokenContractABI);

  const handleOpenModal = (type: "mint" | "burn" | "transfer") => {
    setActionType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTokenAction = async (amount: string, address?: string) => {
    console.log(
      `${actionType}ing`,
      amount,
      "tokens",
      address ? `to ${address}` : ""
    );

    await tokenManager.connectContract();

    switch (actionType) {
      case "mint":
        await tokenManager.mint(Number(amount), currentAddress!);
        alert(
          "Token has been successfully minted! The balance might take a while to reflect."
        );
        break;
      case "burn":
        await tokenManager.burn(Number(amount), currentAddress!);
        alert(
          "Token has been successfully burned! The balance might take a while to reflect."
        );
        break;
      case "transfer":
        if (address) {
          await tokenManager.transfer(Number(amount), address);
          alert(
            "Token has been successfully transfered! The balance might take a while to reflect."
          );
        } else {
          // console.error("Address required for sending tokens");
          alert("Address required for sending tokens");
        }
        break;
      default:
        console.error("Invalid action type");
    }
  };

  async function checkOwnership() {
    const token_contract = await tokenManager.connectContract();
    if (token_contract) {
      const token_owner = await token_contract!.owner();
      const token_info = await tokenManager.tokenInfo(currentAddress!);
      setTokenInfo(token_info);
      token_owner.toLowerCase() === currentAddress!.toLowerCase()
        ? setIsOwner(true)
        : setIsOwner(false);
    } else {
      setIsOwner(false);
    }
  }

  function formatAddress(address: string | undefined): string {
    if (!address) return "N/A";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  useEffect(() => {
    // if (!isOpen) {
    //   setAmount("");
    // }
    checkOwnership();
    // console.log(`isowner: ${isOwner}`);
  }, [currentAddress, isOwner]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-4">
      {/* Token Information Section */}
      <div className="bg-white shadow-md rounded-lg p-4 w-full md:max-w-xl mx-2">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Token Information:
        </h3>
        <div className="grid grid-cols-1 gap-4 text-gray-600">
          <div className="flex flex-col">
            <span className="font-medium">Token Name:</span>
            <span>{tokenInfo?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Symbol:</span>
            <span>{tokenInfo?.symbol}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Contract Address:</span>
            <span className="text-sm">{tokenInfo?.address}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Total Supply:</span>
            <span>{tokenInfo?.totalSupply}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Your Balance:</span>
            <span>{tokenInfo?.uhold}</span>
          </div>
        </div>
      </div>

      {/* Token Actions Section */}
      {isOwner && (
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => handleOpenModal("mint")}
          >
            <span className="hidden md:block">Mint Tokens</span>
            <BanknotesIcon className="h-5 md:ml-4" />
          </button>
          <button
            className="flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => handleOpenModal("burn")}
          >
            <span className="hidden md:block">Burn Tokens</span>
            <FireIcon className="h-5 md:ml-4" />
          </button>
          <button
            className="flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => handleOpenModal("transfer")}
          >
            <span className="hidden md:block">Send Tokens</span>
            <ChevronDoubleRightIcon className="h-5 md:ml-4" />
          </button>
        </div>
      )}

      <TokenModal
        isOpen={modalOpen}
        actionType={actionType}
        onClose={handleCloseModal}
        onSubmit={handleTokenAction}
      />
    </div>
  );
}
