"use client";
import React, { useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { addressState } from "@/app/utils/recoils";

export function ConnectWalletButton() {
  const [currentAddress, setCurrentAddress] = useRecoilState(addressState);

  const checkIfWalletIsConnected = useCallback(async () => {
    const { ethereum } = window as any;
    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      if (ethereum === "") return;
      console.log("We have the ethereum object", ethereum);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAddress(account);
    } else {
      console.log("No authorized account found");
    }
  }, [setCurrentAddress]);

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

  const disconnectWallet = () => {
    setCurrentAddress("");
    console.log("Disconnected");
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <>
      {!currentAddress && (
        <button
          onClick={connectWallet}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Connect Wallet
        </button>
      )}
      {currentAddress && (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={disconnectWallet}
        >
          Disconnect Wallet
        </button>
      )}
    </>
  );
}
