"use client";
import React, { useContext } from "react";
import { WalletContext } from "@/app/(overview)/layout";

export default function Home() {
  const { currentAddress, setCurrentAddress } = useContext(WalletContext);

  return (
    <>
      <h1>ATB NFT pages </h1>
    </>
  );
}
