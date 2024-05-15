"use client";
import { ethers } from "ethers";
import React, { useEffect, useContext } from "react";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { addressState } from "@/app/utils/recoils";

const buttonStyle =
  "flex items-center justify-center h-12 w-40 text-lg font-bold text-white rounded-lg bg-blue-500 shadow-lg transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2";

export default function Page() {
  // const { currentAddress, setCurrentAddress } = useContext(WalletContext);
  const [currentAddress, setCurrentAddress] = useRecoilState(addressState);

  return (
    <main className="flex justify-center items-start min-h-screen p-10 pt-20">
      <div className="flex flex-col space-y-4 max-w-lg w-full">
        <div className="flex flex-col items-center justify-center p-5 bg-blue-100 rounded-lg shadow-md">
          {currentAddress && (
            <p className="text-blue-900 font-semibold text-lg mb-4">
              Address: {currentAddress}
            </p>
          )}
        </div>

        <div className="flex justify-center space-x-4 p-4">
          <Link href="/erc20">
            <span className={buttonStyle}>ERC20</span>
          </Link>
          <Link href="/nft">
            <span className={buttonStyle}>NFT</span>
          </Link>
          <Link href="/dex">
            <span className={buttonStyle}>DEX</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

// export default function Page() {
//   return (
//     <WalletProvider>
//       <Overview />
//     </WalletProvider>
//   );
// }
