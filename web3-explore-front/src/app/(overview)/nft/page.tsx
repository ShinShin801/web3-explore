"use client";
import React from "react";
import { useRecoilState } from "recoil";
import { addressState } from "@/app/utils/recoils";

export default function Home() {
  const [currentAddress, setCurrentAddress] = useRecoilState(addressState);

  return (
    <>
      <h1>ATB NFT pages </h1>
    </>
  );
}
